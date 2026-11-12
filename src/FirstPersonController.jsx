import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'

export default function FirstPersonController() {
  const { camera } = useThree()
  const keys = useRef({})
  const locked = useRef(false)
  const direction = useRef(new THREE.Vector3())
  const right = useRef(new THREE.Vector3())
  const forward = useRef(new THREE.Vector3())

  useEffect(() => {
    camera.position.set(0, 1.7, 7.5)
    camera.rotation.set(0, 0, 0)

    const onKeyDown = (event) => {
      keys.current[event.code] = true
    }

    const onKeyUp = (event) => {
      keys.current[event.code] = false
    }

    const onBlur = () => {
      keys.current = {}
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [camera])

  useFrame((_, delta) => {
    if (!locked.current) return

    const movement = direction.current.set(0, 0, 0)

    camera.getWorldDirection(forward.current)
    forward.current.y = 0
    forward.current.normalize()

    right.current.crossVectors(forward.current, camera.up).normalize()

    if (keys.current.KeyW) movement.add(forward.current)
    if (keys.current.KeyS) movement.sub(forward.current)
    if (keys.current.KeyD) movement.add(right.current)
    if (keys.current.KeyA) movement.sub(right.current)

    if (movement.lengthSq() > 0) {
      movement.normalize().multiplyScalar(Math.min(delta, 0.05) * 4)
      const next = camera.position.clone().add(movement)

      // Shelf collision boxes with player clearance
      const shelves = [
        { x: -3.3, z: 3.5 },
        { x: -3.3, z: -2.5 },
        { x: 3.3, z: 3.5 },
        { x: 3.3, z: -2.5 },
      ]

      const collides = (x, z) =>
        shelves.some((shelf) =>
          Math.abs(x - shelf.x) < 1.2 &&
          Math.abs(z - shelf.z) < 2.85
        ) ||
        (Math.abs(x) < 2.35 && Math.abs(z + 7.5) < 1.15)

      // Test axes separately so the player can slide along shelves
      if (!collides(next.x, camera.position.z)) {
        camera.position.x = next.x
      }

      if (!collides(camera.position.x, next.z)) {
        camera.position.z = next.z
      }
    }

    camera.position.y = 1.7

    // Temporary room boundaries
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -3.9, 3.9)
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -8.3, 8.3)
  })

  return (
    <PointerLockControls
      onLock={() => {
        locked.current = true
      }}
      onUnlock={() => {
        locked.current = false
        keys.current = {}
      }}
    />
  )
}



