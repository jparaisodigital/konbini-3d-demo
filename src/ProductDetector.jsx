import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function ProductDetector({ onTargetChange }) {
  const { camera, scene } = useThree()
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const center = useMemo(() => new THREE.Vector2(0, 0), [])
  const lastTarget = useRef(null)

  useFrame(() => {
    raycaster.setFromCamera(center, camera)
    raycaster.far = 2.5

    const hits = raycaster.intersectObjects(scene.children, true)

    // The nearest object must belong to a grocery product.
    const nearest = hits[0]
    let product = null

    if (nearest) {
      let object = nearest.object

      while (object) {
        if (object.userData.interactive) {
          product = object
          break
        }
        object = object.parent
      }
    }

    const targetId = product ? product.uuid : null

    if (targetId !== lastTarget.current) {
      lastTarget.current = targetId

      onTargetChange(
        product
          ? {
              id: product.uuid,
              type: product.userData.productType,
              color: product.userData.productColor,
            }
          : null
      )
    }
  })

  return null
}
