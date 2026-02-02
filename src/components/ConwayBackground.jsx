import { useRef, useEffect, useCallback } from 'react'
import './ConwayBackground.css'

const CELL_SIZE = 25
const TICK_INTERVAL = 250
const INITIAL_DENSITY = 0.15
const FADE_STEPS = 3

export default function ConwayBackground() {
  const canvasRef = useRef(null)
  const gridRef = useRef(null)
  const fadeGridRef = useRef(null)
  const animationRef = useRef(null)
  const lastTickRef = useRef(0)
  const isVisibleRef = useRef(true)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const scrollOffsetRef = useRef(0)

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

  const createFadeGrid = useCallback((cols, rows) => {
    const grid = []
    for (let i = 0; i < rows; i++) {
      grid[i] = []
      for (let j = 0; j < cols; j++) {
        grid[i][j] = 0
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

  const updateFadeGrid = useCallback((fadeGrid, grid, prevGrid, rows, cols) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j]) {
          // Cell is alive - fade in
          fadeGrid[i][j] = Math.min(FADE_STEPS, fadeGrid[i][j] + 1)
        } else if (prevGrid && prevGrid[i][j]) {
          // Cell just died - start fade out
          fadeGrid[i][j] = FADE_STEPS - 1
        } else if (fadeGrid[i][j] > 0) {
          // Cell is fading out
          fadeGrid[i][j] = Math.max(0, fadeGrid[i][j] - 1)
        }
      }
    }
  }, [])

  const draw = useCallback((ctx, fadeGrid, rows, cols) => {
    const canvas = canvasRef.current
    if (!canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const parallaxOffset = scrollOffsetRef.current * 0.1
    const mouseX = mouseRef.current.x
    const mouseY = mouseRef.current.y
    const proximityRadius = 150

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (fadeGrid[i][j] > 0) {
          const x = j * CELL_SIZE
          const y = i * CELL_SIZE + parallaxOffset

          // Calculate distance from mouse for proximity effect
          const cellCenterX = x + CELL_SIZE / 2
          const cellCenterY = y + CELL_SIZE / 2
          const distance = Math.sqrt(
            Math.pow(cellCenterX - mouseX, 2) + Math.pow(cellCenterY - mouseY, 2)
          )

          // Base opacity from fade state
          let opacity = (fadeGrid[i][j] / FADE_STEPS) * 0.2

          // Intensify cells near cursor
          if (distance < proximityRadius) {
            const proximityFactor = 1 - (distance / proximityRadius)
            opacity = Math.min(0.4, opacity + proximityFactor * 0.15)
          }

          ctx.fillStyle = `rgba(100, 140, 160, ${opacity})`
          ctx.beginPath()
          ctx.arc(
            x + CELL_SIZE / 2,
            y + CELL_SIZE / 2,
            CELL_SIZE / 3,
            0,
            Math.PI * 2
          )
          ctx.fill()
        }
      }
    }
  }, [])

  const init = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const { cols, rows } = getGridDimensions()
    gridRef.current = createGrid(cols, rows, true)
    fadeGridRef.current = createFadeGrid(cols, rows)

    // Initialize fade grid based on initial state
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (gridRef.current[i][j]) {
          fadeGridRef.current[i][j] = FADE_STEPS
        }
      }
    }
  }, [getGridDimensions, createGrid, createFadeGrid])

  const animate = useCallback((timestamp) => {
    if (!isVisibleRef.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const { cols, rows } = getGridDimensions()

    // Update game state at tick interval
    if (timestamp - lastTickRef.current > TICK_INTERVAL) {
      const prevGrid = gridRef.current
      gridRef.current = nextGeneration(gridRef.current, rows, cols)
      updateFadeGrid(fadeGridRef.current, gridRef.current, prevGrid, rows, cols)
      lastTickRef.current = timestamp
    }

    draw(ctx, fadeGridRef.current, rows, cols)
    animationRef.current = requestAnimationFrame(animate)
  }, [getGridDimensions, nextGeneration, updateFadeGrid, draw])

  useEffect(() => {
    init()

    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden
    }

    const handleResize = () => {
      init()
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

  return (
    <canvas
      ref={canvasRef}
      className="conway-background"
      aria-hidden="true"
    />
  )
}
