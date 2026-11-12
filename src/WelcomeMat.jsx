import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

export default function WelcomeMat() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512

    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#234b3e'
    ctx.fillRect(0, 0, 1024, 512)

    ctx.strokeStyle = '#c8ab73'
    ctx.lineWidth = 18
    ctx.strokeRect(35, 35, 954, 442)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#fff3dc'

    ctx.font = 'bold 100px Arial'
    ctx.fillText('KONBINI', 512, 210)

    ctx.font = 'bold 65px sans-serif'
    ctx.fillText('いらっしゃいませ', 512, 320)

    ctx.font = 'bold 35px Arial'
    ctx.fillText('WELCOME!', 512, 390)

    const map = new THREE.CanvasTexture(canvas)
    map.colorSpace = THREE.SRGBColorSpace
    map.anisotropy = 4

    return map
  }, [])

  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  return (
    <mesh
      position={[0, 0.012, 7.1]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[2.8, 1.4]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}
