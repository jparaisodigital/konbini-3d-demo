import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

export default function KonbiniPoster() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 768

    const ctx = canvas.getContext('2d')

    // Retro cream background
    ctx.fillStyle = '#f4e8cf'
    ctx.fillRect(0, 0, 512, 768)

    // Orange header
    ctx.fillStyle = '#d94e32'
    ctx.fillRect(0, 0, 512, 180)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#fff7e7'
    ctx.font = 'bold 72px Arial'
    ctx.fillText('KONBINI', 256, 100)

    ctx.font = 'bold 38px sans-serif'
    ctx.fillText('おいしい毎日', 256, 150)

    // Main circle graphic
    ctx.beginPath()
    ctx.arc(256, 390, 170, 0, Math.PI * 2)
    ctx.fillStyle = '#e9b65f'
    ctx.fill()

    // Stylized ramen bowl
    ctx.beginPath()
    ctx.ellipse(256, 420, 135, 65, 0, 0, Math.PI * 2)
    ctx.fillStyle = '#fff8e8'
    ctx.fill()
    ctx.lineWidth = 12
    ctx.strokeStyle = '#315c48'
    ctx.stroke()

    // Noodle lines
    ctx.strokeStyle = '#d94e32'
    ctx.lineWidth = 8

    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(170 + i * 35, 410)
      ctx.quadraticCurveTo(185 + i * 35, 450, 200 + i * 30, 410)
      ctx.stroke()
    }

    // Footer typography
    ctx.fillStyle = '#315c48'
    ctx.font = 'bold 52px Arial'
    ctx.fillText('GOOD FOOD', 256, 635)

    ctx.font = 'bold 29px Arial'
    ctx.fillText('EVERY SINGLE DAY', 256, 690)

    const map = new THREE.CanvasTexture(canvas)
    map.colorSpace = THREE.SRGBColorSpace
    map.anisotropy = 8

    return map
  }, [])

  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  return (
    <group>
      {/* Poster backing */}
      <mesh castShadow>
        <boxGeometry args={[1.55, 2.25, 0.045]} />
        <meshStandardMaterial color="#315c48" />
      </mesh>

      {/* Printed artwork */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[1.48, 2.18]} />
        <meshStandardMaterial map={texture} roughness={0.85} />
      </mesh>
    </group>
  )
}
