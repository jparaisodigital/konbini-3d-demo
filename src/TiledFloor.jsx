import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

export default function TiledFloor() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256

    const ctx = canvas.getContext('2d')

    // Thin warm-gray grout
    ctx.fillStyle = '#aaa69e'
    ctx.fillRect(0, 0, 256, 256)

    // Ceramic tile surface
    ctx.fillStyle = '#e7e3d9'
    ctx.fillRect(3, 3, 250, 250)

    // Subtle inner edge for depth
    ctx.strokeStyle = 'rgba(255,255,255,0.28)'
    ctx.lineWidth = 2
    ctx.strokeRect(5, 5, 246, 246)

    const map = new THREE.CanvasTexture(canvas)
    map.wrapS = THREE.RepeatWrapping
    map.wrapT = THREE.RepeatWrapping
    map.repeat.set(15, 30)
    map.colorSpace = THREE.SRGBColorSpace
    map.anisotropy = 8

    return map
  }, [])

  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[9, 18]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.78}
        metalness={0}
      />
    </mesh>
  )
}
