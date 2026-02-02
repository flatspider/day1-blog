import { useEffect, useState } from 'react'
import './ConwayTooltip.css'

export default function ConwayTooltip({ visible, x, y, pattern }) {
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (visible && pattern) {
      // Small delay before showing for smoother experience
      const timer = setTimeout(() => setShow(true), 50)
      return () => clearTimeout(timer)
    } else {
      setShow(false)
    }
  }, [visible, pattern])

  useEffect(() => {
    // Offset from cursor
    const offsetX = 15
    const offsetY = 15

    // Keep tooltip in viewport
    const tooltipWidth = 200
    const tooltipHeight = 80

    let newX = x + offsetX
    let newY = y + offsetY

    // Flip to left side if too close to right edge
    if (newX + tooltipWidth > window.innerWidth - 20) {
      newX = x - tooltipWidth - offsetX
    }

    // Flip above cursor if too close to bottom
    if (newY + tooltipHeight > window.innerHeight - 20) {
      newY = y - tooltipHeight - offsetY
    }

    setPosition({ x: newX, y: newY })
  }, [x, y])

  if (!pattern) return null

  const typeEmoji = {
    still: '⬛',
    oscillator: '🔄',
    spaceship: '🚀',
    dead: '💀',
    unknown: '✨'
  }

  return (
    <div
      className={`conway-tooltip ${show ? 'visible' : ''}`}
      style={{
        left: position.x,
        top: position.y
      }}
    >
      <div className="conway-tooltip-header">
        <span className="conway-tooltip-emoji">{typeEmoji[pattern.type] || '?'}</span>
        <span className="conway-tooltip-name">{pattern.name}</span>
      </div>
      <p className="conway-tooltip-description">{pattern.description}</p>
    </div>
  )
}
