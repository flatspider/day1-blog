import { useState, useRef, useEffect } from 'react'
import './ControlPanel.css'

function ControlPanel({ isOn, onToggle, scanlineOpacity, onScanlineChange, onResetConway }) {
  // Knob rotation state (in degrees)
  const [gainRotation, setGainRotation] = useState(scanlineOpacity * 270) // 0-270 degree range
  const [freqRotation, setFreqRotation] = useState(135) // Start at middle

  // Drag state
  const draggingRef = useRef(null)
  const startYRef = useRef(0)
  const startRotationRef = useRef(0)

  // Handle mouse down on knob
  const handleKnobMouseDown = (e, knobType, currentRotation) => {
    e.preventDefault()
    draggingRef.current = knobType
    startYRef.current = e.clientY
    startRotationRef.current = currentRotation
    document.body.style.cursor = 'grabbing'
  }

  // Handle global mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!draggingRef.current) return

      // Calculate rotation change based on vertical drag
      // Moving up = clockwise (increase), moving down = counter-clockwise (decrease)
      const deltaY = startYRef.current - e.clientY
      const sensitivity = 1.5 // degrees per pixel
      let newRotation = startRotationRef.current + (deltaY * sensitivity)

      // Clamp rotation to 0-270 degrees
      newRotation = Math.max(0, Math.min(270, newRotation))

      if (draggingRef.current === 'gain') {
        setGainRotation(newRotation)
        // Convert rotation to opacity (0-270 degrees -> 0-0.15 opacity)
        const opacity = (newRotation / 270) * 0.15
        onScanlineChange(opacity)
      } else if (draggingRef.current === 'freq') {
        setFreqRotation(newRotation)
      }
    }

    const handleMouseUp = () => {
      if (draggingRef.current === 'freq') {
        // Trigger Conway reset when freq knob is released
        onResetConway()
      }
      draggingRef.current = null
      document.body.style.cursor = ''
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [onScanlineChange, onResetConway])

  return (
    <div className="control-panel">
      {/* Corner screws */}
      <div className="panel-screw screw-tl" />
      <div className="panel-screw screw-tr" />
      <div className="panel-screw screw-bl" />
      <div className="panel-screw screw-br" />

      <div className="panel-inner">
        {/* Knobs clustered to far right */}
        <div className="knobs-cluster">
          <div className="knob-assembly">
            <div className="knob-bezel">
              <button
                className={`knob ${!isOn ? 'power-off' : ''}`}
                onClick={onToggle}
                aria-label="Power toggle"
              >
                <span className="knob-indicator" />
              </button>
            </div>
            <span className="knob-label">Power</span>
          </div>

          <div className="knob-assembly">
            <div className="knob-bezel">
              <div
                className="knob knob-draggable"
                style={{ transform: `rotate(${gainRotation - 135}deg)` }}
                onMouseDown={(e) => handleKnobMouseDown(e, 'gain', gainRotation)}
                title="Drag up/down to adjust scanlines"
              >
                <span className="knob-indicator" />
              </div>
            </div>
            <span className="knob-label">Gain</span>
          </div>

          <div className="knob-assembly">
            <div className="knob-bezel">
              <div
                className="knob knob-draggable"
                style={{ transform: `rotate(${freqRotation - 135}deg)` }}
                onMouseDown={(e) => handleKnobMouseDown(e, 'freq', freqRotation)}
                title="Drag and release to reset Conway"
              >
                <span className="knob-indicator" />
              </div>
            </div>
            <span className="knob-label">Freq</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel
