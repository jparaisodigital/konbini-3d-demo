import { useMemo } from 'react'
import * as THREE from 'three'

function createCoffeeTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#3f5145'
  ctx.fillRect(0, 0, 512, 512)

  ctx.fillStyle = '#d8b578'
  ctx.fillRect(0, 25, 512, 45)
  ctx.fillRect(0, 440, 512, 45)

  ctx.textAlign = 'center'

  ctx.fillStyle = '#fff3d9'
  ctx.font = 'bold 92px Arial'
  ctx.fillText('KOFFEE', 256, 205)

  ctx.font = 'bold 38px sans-serif'
  ctx.fillText('珈琲', 256, 275)

  ctx.font = 'bold 30px Arial'
  ctx.fillText('ORIGINAL BLEND', 256, 340)

  ctx.fillStyle = '#d8b578'
  ctx.font = 'bold 24px Arial'
  ctx.fillText('JAPANESE STYLE COFFEE', 256, 400)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  texture.anisotropy = 8

  return texture
}

let sharedCoffeeTexture = null

export default function CoffeeCan() {
  const texture = useMemo(() => {
    if (!sharedCoffeeTexture) {
      sharedCoffeeTexture = createCoffeeTexture()
    }

    return sharedCoffeeTexture
  }, [])

  return (
    <group>
      {/* Printed aluminum can */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.42, 32]} />
        <meshStandardMaterial map={texture} roughness={0.48} metalness={0.18} />
      </mesh>

      {/* Silver top */}
      <mesh position={[0, 0.213, 0]}>
        <cylinderGeometry args={[0.112, 0.112, 0.012, 32]} />
        <meshStandardMaterial color="#d4d6d3" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Bottom aluminum rim */}
      <mesh position={[0, -0.213, 0]}>
        <cylinderGeometry args={[0.112, 0.112, 0.012, 32]} />
        <meshStandardMaterial color="#c3c6c3" metalness={0.65} roughness={0.35} />
      </mesh>
    </group>
  )
}

