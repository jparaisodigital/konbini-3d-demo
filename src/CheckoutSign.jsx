import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

export default function CheckoutSign() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 384

    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#234b3e'
    ctx.fillRect(0, 0, 1024, 384)

    ctx.strokeStyle = '#dfc58d'
    ctx.lineWidth = 12
    ctx.strokeRect(22, 22, 980, 340)

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillStyle = '#fff4dc'
    ctx.font = 'bold 170px sans-serif'
    ctx.fillText('レジ', 512, 145)

    ctx.font = 'bold 90px Arial'
    ctx.fillText('CASHIER', 512, 280)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8

    return texture
  }, [])

  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[2.5, 0.9, 0.07]} />
        <meshStandardMaterial color="#234b3e" />
      </mesh>

      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[2.43, 0.83]} />
        <meshStandardMaterial map={texture} roughness={0.85} />
      </mesh>
    </group>
  )
}
