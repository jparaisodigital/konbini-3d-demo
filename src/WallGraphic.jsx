import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

export default function WallGraphic() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')

    // Vintage cream background
    ctx.fillStyle = '#efe5d2'
    ctx.fillRect(0, 0, 1024, 512)

    // Retro color blocks
    ctx.fillStyle = '#c94e35'
    ctx.fillRect(0, 0, 160, 512)

    ctx.fillStyle = '#315c48'
    ctx.fillRect(864, 0, 160, 512)

    // Main typography
    ctx.textAlign = 'center'
    ctx.fillStyle = '#243e34'
    ctx.font = 'bold 100px Arial'
    ctx.fillText('KONBINI', 512, 190)

    ctx.font = 'bold 58px sans-serif'
    ctx.fillText('毎日のおいしさ', 512, 290)

    ctx.font = 'bold 38px Arial'
    ctx.fillText('FRESH FINDS EVERY DAY', 512, 375)

    // Accent stripe
    ctx.fillStyle = '#c94e35'
    ctx.fillRect(230, 425, 564, 12)

    const map = new THREE.CanvasTexture(canvas)
    map.colorSpace = THREE.SRGBColorSpace
    map.anisotropy = 4

    return map
  }, [])

  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  return (
    <mesh>
      <planeGeometry args={[3.8, 1.9]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}
