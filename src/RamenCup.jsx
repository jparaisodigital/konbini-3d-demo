import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

function createRamenTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512

  const ctx = canvas.getContext('2d')

  // Main red packaging
  ctx.fillStyle = '#b93629'
  ctx.fillRect(0, 0, 512, 512)

  // Decorative cream bands
  ctx.fillStyle = '#fff0c9'
  ctx.fillRect(0, 30, 512, 85)
  ctx.fillRect(0, 395, 512, 75)

  // Center branding
  ctx.textAlign = 'center'
  ctx.fillStyle = '#fff8e5'
  ctx.font = 'bold 74px sans-serif'
  ctx.fillText('ラーメン', 256, 230)

  ctx.font = 'bold 45px Arial'
  ctx.fillText('TOKYO', 256, 310)

  ctx.font = 'bold 22px Arial'
  ctx.fillText('ORIGINAL NOODLES', 256, 355)

  // Small decorative circles
  ctx.fillStyle = '#f2c66d'
  for (let i = 0; i < 10; i++) {
    ctx.beginPath()
    ctx.arc(25 + i * 52, 435, 10, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.anisotropy = 8

  return texture
}

export default function RamenCup() {
  const texture = useMemo(() => createRamenTexture(), [])

  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  return (
    <group>
      {/* Tapered noodle cup */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.145, 0.4, 32, 1, false]} />
        <meshStandardMaterial map={texture} roughness={0.78} />
      </mesh>

      {/* Sealed foil lid */}
      <mesh position={[0, 0.205, 0]} castShadow>
        <cylinderGeometry args={[0.205, 0.205, 0.018, 32]} />
        <meshStandardMaterial color="#f6e9cc" metalness={0.22} roughness={0.55} />
      </mesh>

      {/* Bottom rim */}
      <mesh position={[0, -0.197, 0]}>
        <cylinderGeometry args={[0.148, 0.148, 0.018, 32]} />
        <meshStandardMaterial color="#f2e3c7" roughness={0.7} />
      </mesh>
    </group>
  )
}
