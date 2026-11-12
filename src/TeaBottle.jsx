import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

function createTeaTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f3efdd'
  ctx.fillRect(0, 0, 512, 512)

  // Green label borders
  ctx.fillStyle = '#315c48'
  ctx.fillRect(0, 0, 512, 80)
  ctx.fillRect(0, 425, 512, 87)

  ctx.textAlign = 'center'

  ctx.fillStyle = '#315c48'
  ctx.font = 'bold 90px sans-serif'
  ctx.fillText('緑茶', 256, 225)

  ctx.font = 'bold 55px Arial'
  ctx.fillText('MIDORI', 256, 300)

  ctx.font = 'bold 29px Arial'
  ctx.fillText('GREEN TEA', 256, 355)

  ctx.fillStyle = '#fff8e7'
  ctx.font = 'bold 23px Arial'
  ctx.fillText('JAPANESE TEA', 256, 475)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  texture.anisotropy = 8

  return texture
}

export default function TeaBottle() {
  const labelTexture = useMemo(() => createTeaTexture(), [])

  useEffect(() => {
    return () => labelTexture.dispose()
  }, [labelTexture])

  return (
    <group>
      {/* Green tea bottle body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.38, 24]} />
        <meshStandardMaterial
          color="#83ad80"
          transparent
          opacity={0.88}
          roughness={0.2}
          metalness={0}
        />
      </mesh>

      {/* Printed wrap label */}
      <mesh position={[0, -0.025, 0]}>
        <cylinderGeometry args={[0.092, 0.092, 0.22, 24, 1, true]} />
        <meshStandardMaterial
          map={labelTexture}
          roughness={0.75}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bottle shoulder */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.09, 0.1, 24]} />
        <meshStandardMaterial color="#83ad80" transparent opacity={0.88} roughness={0.2} />
      </mesh>

      {/* Bottle neck */}
      <mesh position={[0, 0.285, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.05, 24]} />
        <meshStandardMaterial color="#83ad80" transparent opacity={0.88} roughness={0.2} />
      </mesh>

      {/* Plastic screw cap */}
      <mesh position={[0, 0.325, 0]} castShadow>
        <cylinderGeometry args={[0.052, 0.052, 0.065, 24]} />
        <meshStandardMaterial color="#f2eee3" roughness={0.7} />
      </mesh>

      {/* Cap ring */}
      <mesh position={[0, 0.285, 0]}>
        <cylinderGeometry args={[0.056, 0.056, 0.012, 24]} />
        <meshStandardMaterial color="#d9d6ce" roughness={0.65} />
      </mesh>
    </group>
  )
}
