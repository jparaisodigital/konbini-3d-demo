import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function MobileFirstPersonController({ movementRef, disabled = false }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 1.7, 7.5)
    camera.rotation.set(0, 0, 0)
  }, [camera])

  const forward = useRef(new THREE.Vector3())
  const right = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())

  useFrame((_, delta) => {
    if (disabled) return

    const joystick = movementRef.current
    if (!joystick) return

    const x = joystick.x || 0
    const y = joystick.y || 0

    if (Math.abs(x) < 0.05 && Math.abs(y) < 0.05) return

    camera.getWorldDirection(forward.current)
    forward.current.y = 0
    forward.current.normalize()

    right.current.crossVectors(forward.current, camera.up).normalize()

    const movement = direction.current.set(0, 0, 0)

    movement.addScaledVector(forward.current, -y)
    movement.addScaledVector(right.current, x)

    if (movement.lengthSq() === 0) return

    movement.clampLength(0, 1)
    movement.multiplyScalar(Math.min(delta, 0.05) * 4)

    const next = camera.position.clone().add(movement)

    // Match existing desktop shelf collision boundaries
    const shelves = [
      { x: -3.3, z: 3.5 },
      { x: -3.3, z: -2.5 },
      { x: 3.3, z: 3.5 },
      { x: 3.3, z: -2.5 },
    ]

    const collides = (px, pz) =>
      shelves.some((shelf) =>
        Math.abs(px - shelf.x) < 1.35 &&
        Math.abs(pz - shelf.z) < 2.85
      ) ||
      (Math.abs(px) < 2.35 && Math.abs(pz + 7.5) < 1.15) ||
      // Entrance machine collisions
      (Math.abs(px + 3.65) < 0.65 && Math.abs(pz - 6.95) < 0.80) ||
      (Math.abs(px - 3.65) < 0.65 && Math.abs(pz - 7.4) < 1.10) ||
      pz < -5.0

    if (!collides(next.x, camera.position.z)) {
      camera.position.x = next.x
    }

    if (!collides(camera.position.x, next.z)) {
      camera.position.z = next.z
    }

    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -3.9, 3.9)
    camera.position.y = 1.7
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -8.3, 8.3)
  })

  return null
}




