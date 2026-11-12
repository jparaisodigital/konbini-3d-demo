import { useMemo } from 'react'
import * as THREE from 'three'

export default function CashierTileWall({ color = '#A8CDBA' }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512

    const ctx = canvas.getContext('2d')

    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const tileWidth = 64
    const tileHeight = 52

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)'
    ctx.lineWidth = 2

    for (let y = 0; y <= canvas.height; y += tileHeight) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    for (let x = 0; x <= canvas.width; x += tileWidth) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    const result = new THREE.CanvasTexture(canvas)
    result.colorSpace = THREE.SRGBColorSpace
    result.anisotropy = 4

    return result
  }, [color])

  return (
    <group>
      <mesh position={[0, 2.5, -8.842]}>
        <planeGeometry args={[8.98, 4.98]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.75}
          metalness={0}
        />
      </mesh>
    </group>
  )
}
