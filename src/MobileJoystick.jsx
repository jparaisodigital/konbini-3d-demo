import { useRef, useState } from 'react'

export default function MobileJoystick({ onMove }) {
  const pointerId = useRef(null)
  const [stick, setStick] = useState({ x: 0, y: 0 })

  const updatePosition = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const dx = event.clientX - centerX
    const dy = event.clientY - centerY
    const maxRadius = 42
    const length = Math.hypot(dx, dy)
    const factor = length > maxRadius ? maxRadius / length : 1

    const x = dx * factor
    const y = dy * factor

    setStick({ x, y })
    onMove({ x: x / maxRadius, y: y / maxRadius })
  }

  const stop = (event) => {
    if (event.pointerId !== pointerId.current) return

    pointerId.current = null
    setStick({ x: 0, y: 0 })
    onMove({ x: 0, y: 0 })
  }

  return (
    <div
      aria-label="Movement joystick"
      onPointerDown={(event) => {
        pointerId.current = event.pointerId
        event.currentTarget.setPointerCapture(event.pointerId)
        updatePosition(event)
      }}
      onPointerMove={(event) => {
        if (event.pointerId === pointerId.current) {
          updatePosition(event)
        }
      }}
      onPointerUp={stop}
      onPointerCancel={stop}
      onLostPointerCapture={() => {
        pointerId.current = null
        setStick({ x: 0, y: 0 })
        onMove({ x: 0, y: 0 })
      }}
      style={{
        position: 'fixed',
        left: '25px',
        bottom: '30px',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'rgba(30, 65, 55, 0.45)',
        border: '2px solid rgba(255,255,255,0.5)',
        touchAction: 'none',
        userSelect: 'none',
        zIndex: 15,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: '#f5edda',
          border: '3px solid #315c48',
          transform: `translate(calc(-50% + ${stick.x}px), calc(-50% + ${stick.y}px))`,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
