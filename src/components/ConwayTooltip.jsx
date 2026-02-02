import { useEffect, useState } from 'react'
import './ConwayTooltip.css'

const TYPE_LABELS = {
  still: 'Still Life',
  oscillator: 'Oscillator',
  spaceship: 'Spaceship',
  dead: 'Void',
  unknown: 'Unknown'
}

export default function ConwayTooltip({ visible, x, y, pattern }) {
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (visible && pattern) {
      const timer = setTimeout(() => setShow(true), 50)
      return () => clearTimeout(timer)
    } else {
      setShow(false)
    }
  }, [visible, pattern])

  useEffect(() => {
    const offsetX = 15
    const offsetY = 15
    const tooltipWidth = 200
    const tooltipHeight = 80

    let newX = x + offsetX
    let newY = y + offsetY

    if (newX + tooltipWidth > window.innerWidth - 20) {
      newX = x - tooltipWidth - offsetX
    }

    if (newY + tooltipHeight > window.innerHeight - 20) {
      newY = y - tooltipHeight - offsetY
    }

    setPosition({ x: newX, y: newY })
  }, [x, y])

  if (!pattern) return null

  const typeLabel = TYPE_LABELS[pattern.type] || 'Unknown'

  return (
    <div
      className={`conway-tooltip ${show ? 'visible' : ''}`}
      style={{
        left: position.x,
        top: position.y
      }}
    >
      <div className="conway-tooltip-header">
        <span className="conway-tooltip-type">{typeLabel.toUpperCase()}</span>
        <span className="conway-tooltip-separator">›</span>
        <span className="conway-tooltip-name">{pattern.name}</span>
      </div>
      <p className="conway-tooltip-description">{pattern.description}</p>
    </div>
  )
}
