import { useRef, useEffect, useCallback, useState } from 'react'
import './ConwayBackground.css'
import ConwayTooltip from './ConwayTooltip'
import { detectPattern } from './PatternDetector'

const CELL_SIZE = 25
const TICK_INTERVAL = 250
const INITIAL_DENSITY = 0.15
const STABLE_CHECK_GENERATIONS = 3

// Test mode: show restart button after 5 seconds regardless of stability
const TEST_MODE = import.meta.env.DEV && false // Set to true to enable test mode

// Check if device is touch-only (mobile)
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export default function ConwayBackground() {
  const canvasRef = useRef(null)
  const gridRef = useRef(null)
  const opacityGridRef = useRef(null)
  const targetOpacityGridRef = useRef(null)
  const animationRef = useRef(null)
  const lastTickRef = useRef(0)
  const isVisibleRef = useRef(true)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const scrollOffsetRef = useRef(0)
  const historyRef = useRef([])
  const isPausedRef = useRef(false)
  const highlightedCellsRef = useRef([])

  const [isStable, setIsStable] = useState(false)
  const [showTestButton, setShowTestButton] = useState(false)
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, pattern: null })
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile on mount
  useEffect(() => {
    setIsMobile(isTouchDevice())
  }, [])

  const getGridDimensions = useCallback(() => {
    const cols = Math.ceil(window.innerWidth / CELL_SIZE) + 2
    const rows = Math.ceil(window.innerHeight / CELL_SIZE) + 2
    return { cols, rows }
  }, [])

  const createGrid = useCallback((cols, rows, random = false) => {
    const grid = []
    for (let i = 0; i < rows; i++) {
      grid[i] = []
      for (let j = 0; j < cols; j++) {
        grid[i][j] = random ? (Math.random() < INITIAL_DENSITY ? 1 : 0) : 0
      }
    }
    return grid
  }, [])

  const createOpacityGrid = useCallback((cols, rows, initialValue = 0) => {
    const grid = []
    for (let i = 0; i < rows; i++) {
      grid[i] = []
      for (let j = 0; j < cols; j++) {
        grid[i][j] = initialValue
      }
    }
    return grid
  }, [])

  const countNeighbors = useCallback((grid, x, y, rows, cols) => {
    let count = 0
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue
        const newX = (x + i + rows) % rows
        const newY = (y + j + cols) % cols
        count += grid[newX][newY] ? 1 : 0
      }
    }
    return count
  }, [])

  const nextGeneration = useCallback((grid, rows, cols) => {
    const newGrid = createGrid(cols, rows)
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const neighbors = countNeighbors(grid, i, j, rows, cols)
        if (grid[i][j]) {
          newGrid[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0
        } else {
          newGrid[i][j] = neighbors === 3 ? 1 : 0
        }
      }
    }
    return newGrid
  }, [createGrid, countNeighbors])

  const gridToString = useCallback((grid) => {
    return grid.map(row => row.join('')).join('|')
  }, [])

  const checkStability = useCallback((grid, history) => {
    const currentState = gridToString(grid)

    // Check if all dead
    const hasLife = grid.some(row => row.some(cell => cell === 1))
    if (!hasLife) return true

    // Check if pattern repeats (static or oscillating)
    return history.includes(currentState)
  }, [gridToString])

  const updateTargetOpacities = useCallback((targetGrid, grid, rows, cols) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        targetGrid[i][j] = grid[i][j] ? 1 : 0
      }
    }
  }, [])

  const interpolateOpacities = useCallback((opacityGrid, targetGrid, rows, cols, factor) => {
    // Smooth interpolation - not instant, but not too slow
    const lerpFactor = factor * 0.15
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const current = opacityGrid[i][j]
        const target = targetGrid[i][j]
        const diff = target - current
        if (Math.abs(diff) > 0.001) {
          opacityGrid[i][j] = current + diff * lerpFactor
        } else {
          opacityGrid[i][j] = target
        }
      }
    }
  }, [])

  const draw = useCallback((ctx, opacityGrid, rows, cols) => {
    const canvas = canvasRef.current
    if (!canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const parallaxOffset = scrollOffsetRef.current * 0.1
    const mouseX = mouseRef.current.x
    const mouseY = mouseRef.current.y
    const proximityRadius = 150
    const highlightedCells = highlightedCellsRef.current
    const isPaused = isPausedRef.current

    // Create a set for fast lookup of highlighted cells
    const highlightSet = new Set(
      highlightedCells.map(c => `${c.row},${c.col}`)
    )

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (opacityGrid[i][j] > 0.01) {
          const x = j * CELL_SIZE
          const y = i * CELL_SIZE + parallaxOffset

          const cellCenterX = x + CELL_SIZE / 2
          const cellCenterY = y + CELL_SIZE / 2
          const distance = Math.sqrt(
            Math.pow(cellCenterX - mouseX, 2) + Math.pow(cellCenterY - mouseY, 2)
          )

          // Base opacity from interpolated state (slightly higher for dark background)
          let opacity = opacityGrid[i][j] * 0.25

          // Intensify cells near cursor
          if (distance < proximityRadius) {
            const proximityFactor = 1 - (distance / proximityRadius)
            opacity = Math.min(0.4, opacity + proximityFactor * 0.15 * opacityGrid[i][j])
          }

          // Check if this cell is highlighted
          const isHighlighted = highlightSet.has(`${i},${j}`)

          // Draw the cell - phosphor green
          ctx.fillStyle = isHighlighted && isPaused
            ? `rgba(57, 255, 20, ${Math.max(opacity, 0.8)})`
            : `rgba(57, 255, 20, ${opacity})`

          ctx.beginPath()
          ctx.arc(
            x + CELL_SIZE / 2,
            y + CELL_SIZE / 2,
            CELL_SIZE / 3,
            0,
            Math.PI * 2
          )
          ctx.fill()

          // Draw green outline for highlighted cells
          if (isHighlighted && isPaused) {
            ctx.strokeStyle = '#39ff14'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(
              x + CELL_SIZE / 2,
              y + CELL_SIZE / 2,
              CELL_SIZE / 3 + 3,
              0,
              Math.PI * 2
            )
            ctx.stroke()
          }
        }
      }
    }
  }, [])

  const init = useCallback((resetStable = true) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const { cols, rows } = getGridDimensions()
    gridRef.current = createGrid(cols, rows, true)
    opacityGridRef.current = createOpacityGrid(cols, rows, 0)
    targetOpacityGridRef.current = createOpacityGrid(cols, rows, 0)
    historyRef.current = []

    // Initialize opacity grid based on initial state
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (gridRef.current[i][j]) {
          opacityGridRef.current[i][j] = 1
          targetOpacityGridRef.current[i][j] = 1
        }
      }
    }

    if (resetStable) {
      setIsStable(false)
    }
  }, [getGridDimensions, createGrid, createOpacityGrid])

  const restart = useCallback(() => {
    init(true)
    lastTickRef.current = 0
  }, [init])

  const animate = useCallback((timestamp) => {
    if (!isVisibleRef.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const { cols, rows } = getGridDimensions()

    // Update game state at tick interval (only if not paused)
    if (timestamp - lastTickRef.current > TICK_INTERVAL && !isStable && !isPausedRef.current) {
      // Store current state in history
      const currentState = gridToString(gridRef.current)
      historyRef.current.push(currentState)
      if (historyRef.current.length > STABLE_CHECK_GENERATIONS) {
        historyRef.current.shift()
      }

      gridRef.current = nextGeneration(gridRef.current, rows, cols)
      updateTargetOpacities(targetOpacityGridRef.current, gridRef.current, rows, cols)

      // Check for stability
      if (checkStability(gridRef.current, historyRef.current)) {
        setIsStable(true)
      }

      lastTickRef.current = timestamp
    }

    // Always interpolate opacities for smooth animation
    interpolateOpacities(opacityGridRef.current, targetOpacityGridRef.current, rows, cols, 1)

    draw(ctx, opacityGridRef.current, rows, cols)
    animationRef.current = requestAnimationFrame(animate)
  }, [getGridDimensions, nextGeneration, updateTargetOpacities, interpolateOpacities, draw, gridToString, checkStability, isStable])

  // Test mode timer
  useEffect(() => {
    if (TEST_MODE) {
      const timer = setTimeout(() => {
        setShowTestButton(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [])

  // Handle hover for pattern detection - PAUSES THE GAME
  const handleCanvasHover = useCallback((e) => {
    // Skip pattern detection on mobile
    if (isMobile) return

    const canvas = canvasRef.current
    if (!canvas || !gridRef.current) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const parallaxOffset = scrollOffsetRef.current * 0.1

    // Convert to grid coordinates
    const gridCol = Math.floor(x / CELL_SIZE)
    const gridRow = Math.floor((y - parallaxOffset) / CELL_SIZE)

    const { cols, rows } = getGridDimensions()

    if (gridRow >= 0 && gridRow < rows && gridCol >= 0 && gridCol < cols) {
      const pattern = detectPattern(gridRef.current, gridRow, gridCol, rows, cols)
      if (pattern) {
        // Pause the game and show tooltip
        isPausedRef.current = true
        highlightedCellsRef.current = pattern.cells || []
        setTooltip({
          visible: true,
          x: e.clientX,
          y: e.clientY,
          pattern
        })
      } else {
        // No pattern, unpause
        isPausedRef.current = false
        highlightedCellsRef.current = []
        setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev)
      }
    }
  }, [getGridDimensions, isMobile])

  const handleCanvasLeave = useCallback(() => {
    // Resume the game when mouse leaves
    isPausedRef.current = false
    highlightedCellsRef.current = []
    setTooltip(prev => ({ ...prev, visible: false }))
  }, [])

  useEffect(() => {
    init()

    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden
    }

    const handleResize = () => {
      init(false)
    }

    const handleScroll = () => {
      scrollOffsetRef.current = window.scrollY
    }

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [init, animate])

  const showButton = isStable || (TEST_MODE && showTestButton)

  return (
    <>
      {/* Only render hover layer on desktop */}
      {!isMobile && (
        <div
          className="conway-hover-layer"
          onMouseMove={handleCanvasHover}
          onMouseLeave={handleCanvasLeave}
        />
      )}
      <canvas
        ref={canvasRef}
        className="conway-background"
        aria-hidden="true"
      />
      {!isMobile && (
        <ConwayTooltip
          visible={tooltip.visible}
          x={tooltip.x}
          y={tooltip.y}
          pattern={tooltip.pattern}
        />
      )}
      {showButton && (
        <button
          className="conway-restart-button"
          onClick={restart}
          aria-label="Restart Game of Life"
        >
          <span className="conway-restart-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
            </svg>
          </span>
          <span className="conway-restart-text">New Life</span>
        </button>
      )}
    </>
  )
}
