import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

function createSticksTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 768
  const ctx = canvas.getContext('2d')

  // Strawberry pink packaging
  ctx.fillStyle = '#e88c9c'
  ctx.fillRect(0, 0, 512, 768)

  // Cream center panel
  ctx.fillStyle = '#fff0df'
  ctx.fillRect(35, 35, 442, 698)

  // Branding
  ctx.fillStyle = '#b83d55'
  ctx.fillRect(35, 35, 442, 110)

  ctx.textAlign = 'center'
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 75px Arial'
  ctx.fillText('POKI', 256, 115)

  ctx.fillStyle = '#b83d55'
  ctx.font = 'bold 62px Arial'
  ctx.fillText('STICKS', 256, 250)

  ctx.font = 'bold 34px sans-serif'
  ctx.fillText('いちご味', 256, 305)

  // Biscuit stick illustrations
  const sticks = [
    [165, 420, -0.22],
    [230, 440, 0.12],
    [295, 410, -0.1],
    [350, 445, 0.22],
  ]

  sticks.forEach(([x, y, rotation]) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)

    ctx.fillStyle = '#e4b26a'
    ctx.fillRect(-9, -90, 18, 180)

    ctx.fillStyle = '#d76d87'
    ctx.fillRect(-11, -90, 22, 120)

    ctx.restore()
  })

  ctx.fillStyle = '#b83d55'
  ctx.font = 'bold 26px Arial'
  ctx.fillText('STRAWBERRY BISCUIT', 256, 670)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8

  return texture
}

export default function SnackSticks() {
  const texture = useMemo(() => createSticksTexture(), [])

  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.23, 0.58, 0.13]} />
        <meshStandardMaterial color="#e88c9c" roughness={0.72} />
      </mesh>

      {/* Front packaging */}
      <mesh position={[0, 0, 0.066]}>
        <planeGeometry args={[0.225, 0.575]} />
        <meshStandardMaterial map={texture} roughness={0.75} />
      </mesh>

      {/* Back packaging */}
      <mesh position={[0, 0, -0.066]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.225, 0.575]} />
        <meshStandardMaterial map={texture} roughness={0.75} />
      </mesh>
    </group>
  )
}
