import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const cashierPosition = new THREE.Vector3(0, 1.8, -7.5)
const forward = new THREE.Vector3()
const toCashier = new THREE.Vector3()

export default function CashierDetector({ onNearbyChange, disabled = false }) {
  const { camera } = useThree()
  const lastNearby = useRef(false)

  useFrame(() => {
    const horizontalDistance = Math.hypot(
      camera.position.x - cashierPosition.x,
      camera.position.z - cashierPosition.z
    )

    camera.getWorldDirection(forward)
    toCashier.copy(cashierPosition).sub(camera.position).normalize()

    const facingCashier = forward.dot(toCashier) > 0.65
    const nearby = !disabled && horizontalDistance < 3.2 && facingCashier

    if (nearby !== lastNearby.current) {
      lastNearby.current = nearby
      onNearbyChange(nearby)
    }
  })

  return null
}
