import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function MobileLookControls() {
  const { camera, gl } = useThree()
  const touch = useRef(null)

  useEffect(() => {
    const element = gl.domElement

    const previousStyles = {
      touchAction: element.style.touchAction,
      userSelect: element.style.userSelect,
      webkitUserSelect: element.style.webkitUserSelect,
      webkitTouchCallout: element.style.webkitTouchCallout,
    }

    element.style.touchAction = 'none'
    element.style.userSelect = 'none'
    element.style.webkitUserSelect = 'none'
    element.style.webkitTouchCallout = 'none'

    const preventContextMenu = (event) => event.preventDefault()
    element.addEventListener('contextmenu', preventContextMenu)

    const onPointerDown = (event) => {
      if (event.pointerType !== 'touch') return
      if (touch.current) return

      touch.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
      }

      element.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event) => {
      if (!touch.current || touch.current.id !== event.pointerId) return

      const dx = event.clientX - touch.current.x
      const dy = event.clientY - touch.current.y

      touch.current.x = event.clientX
      touch.current.y = event.clientY

      camera.rotation.order = 'YXZ'
      camera.rotation.y -= dx * 0.003
      camera.rotation.x -= dy * 0.003

      camera.rotation.x = THREE.MathUtils.clamp(
        camera.rotation.x,
        -Math.PI / 2.5,
        Math.PI / 2.5
      )
    }

    const onPointerEnd = (event) => {
      if (touch.current?.id === event.pointerId) {
        touch.current = null
      }
    }

    element.addEventListener('pointerdown', onPointerDown)
    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerup', onPointerEnd)
    element.addEventListener('pointercancel', onPointerEnd)

    return () => {
      element.removeEventListener('pointerdown', onPointerDown)
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerup', onPointerEnd)
      element.removeEventListener('pointercancel', onPointerEnd)
      element.removeEventListener('contextmenu', preventContextMenu)
      element.style.touchAction = previousStyles.touchAction
      element.style.userSelect = previousStyles.userSelect
      element.style.webkitUserSelect = previousStyles.webkitUserSelect
      element.style.webkitTouchCallout = previousStyles.webkitTouchCallout
    }
  }, [camera, gl])

  return null
}

