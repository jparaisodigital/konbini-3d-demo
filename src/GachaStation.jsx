import { useMemo } from 'react'
import * as THREE from 'three'

function makeGachaTexture(accent) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 640

  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#fff3df'
  ctx.fillRect(0, 0, 512, 640)

  // Japanese branding
  ctx.fillStyle = accent
  ctx.fillRect(0, 0, 512, 120)

  ctx.textAlign = 'center'
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 56px sans-serif'
  ctx.fillText('ガチャガチャ', 256, 73)

  ctx.font = 'bold 27px Arial'
  ctx.fillText('GACHA CORNER', 256, 105)

  // Capsule display window
  ctx.fillStyle = '#cce6db'
  ctx.fillRect(26, 145, 460, 397)

  ctx.strokeStyle = '#315c48'
  ctx.lineWidth = 12
  ctx.strokeRect(26, 145, 460, 397)

  const capsules = [
    [112, 250, '#d9503d'],
    [260, 225, '#e8bc65'],
    [395, 265, '#e9a9b5'],
    [160, 390, '#a67bc2'],
    [330, 410, '#69a9a0'],
  ]

  capsules.forEach(([x, y, color]) => {
    // Capsule body
    ctx.beginPath()
    ctx.arc(x, y, 57, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()

    // Capsule upper half
    ctx.beginPath()
    ctx.arc(x, y, 57, Math.PI, 0)
    ctx.fillStyle = '#fff8e8'
    ctx.fill()

    ctx.strokeStyle = '#315c48'
    ctx.lineWidth = 5
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(x - 55, y)
    ctx.lineTo(x + 55, y)
    ctx.stroke()
  })

  ctx.fillStyle = '#315c48'
  ctx.font = 'bold 24px Arial'
  ctx.fillText('CAPSULE TOYS', 256, 585)

  ctx.font = '19px Arial'
  ctx.fillText('DEMO DISPLAY', 256, 612)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4

  return texture
}

export default function GachaStation() {
  const textures = useMemo(() => [
    makeGachaTexture('#d9503d'),
    makeGachaTexture('#e9a9b5'),
  ], [])

  const machines = [
    { x: -0.39, color: '#d9503d' },
    { x: 0.39, color: '#e9a9b5' },
  ]

  return (
    <group dispose={null}>
      {machines.map((machine, index) => (
        <group key={index} position={[machine.x, 0, 0]}>

          {/* Machine body */}
          <mesh position={[0, 0.78, 0]} castShadow>
            <boxGeometry args={[0.7, 1.46, 0.5]} />
            <meshStandardMaterial color={machine.color} roughness={0.7} />
          </mesh>

          {/* Printed capsule display */}
          <mesh position={[0, 1.03, 0.257]}>
            <planeGeometry args={[0.61, 0.85]} />
            <meshBasicMaterial map={textures[index]} />
          </mesh>

          {/* Turn knob */}
          <mesh
            position={[0.13, 0.4, 0.295]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.09, 0.09, 0.075, 12]} />
            <meshStandardMaterial color="#f5edda" metalness={0.25} />
          </mesh>

          {/* Knob handle */}
          <mesh position={[0.13, 0.4, 0.347]}>
            <boxGeometry args={[0.13, 0.028, 0.035]} />
            <meshStandardMaterial color="#315c48" />
          </mesh>

          {/* Coin slot */}
          <mesh position={[-0.14, 0.4, 0.258]}>
            <boxGeometry args={[0.14, 0.035, 0.012]} />
            <meshStandardMaterial color="#263f35" />
          </mesh>

          {/* Capsule collection opening */}
          <mesh position={[0, 0.18, 0.259]}>
            <boxGeometry args={[0.28, 0.16, 0.014]} />
            <meshStandardMaterial color="#263f35" />
          </mesh>

          {/* Machine base */}
          <mesh position={[0, 0.05, 0]} castShadow>
            <boxGeometry args={[0.74, 0.1, 0.54]} />
            <meshStandardMaterial color="#315c48" />
          </mesh>

          {/* Top red/pink trim */}
          <mesh position={[0, 1.53, 0]}>
            <boxGeometry args={[0.75, 0.09, 0.55]} />
            <meshStandardMaterial color={machine.color} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
