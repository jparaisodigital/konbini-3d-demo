import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

export default function KonbiniATM() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 1024

    const ctx = canvas.getContext('2d')

    // Main front panel
    ctx.fillStyle = '#f5edda'
    ctx.fillRect(0, 0, 512, 1024)

    // Branding
    ctx.fillStyle = '#d9503d'
    ctx.fillRect(0, 0, 512, 160)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 55px Arial'
    ctx.fillText('KONBINI', 256, 75)

    ctx.font = 'bold 42px Arial'
    ctx.fillText('PAY', 256, 130)

    // Screen frame
    ctx.fillStyle = '#315c48'
    ctx.fillRect(42, 200, 428, 370)

    // Screen display
    ctx.fillStyle = '#a8cdba'
    ctx.fillRect(56, 214, 400, 342)

    ctx.fillStyle = '#194c3d'
    ctx.font = 'bold 52px Arial'
    ctx.fillText('ATM', 256, 300)

    ctx.font = 'bold 34px Arial'
    ctx.fillText('CASH-IN', 256, 360)

    ctx.font = '28px sans-serif'
    ctx.fillText('チャージ・ATM', 256, 425)

    ctx.font = 'bold 19px Arial'
    ctx.fillText('SELF SERVICE TERMINAL', 256, 500)

    // Card slot
    ctx.fillStyle = '#315c48'
    ctx.fillRect(110, 614, 292, 38)

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 20px Arial'
    ctx.fillText('CARD', 256, 640)

    // Keypad
    const labels = [
      '1', '2', '3',
      '4', '5', '6',
      '7', '8', '9',
    ]

    labels.forEach((label, i) => {
      const col = i % 3
      const row = Math.floor(i / 3)
      const x = 130 + col * 126
      const y = 710 + row * 76

      ctx.fillStyle = '#d8ccb8'
      ctx.fillRect(x - 45, y - 33, 90, 59)

      ctx.fillStyle = '#263f35'
      ctx.font = 'bold 30px Arial'
      ctx.fillText(label, x, y + 8)
    })

    // Demo label
    ctx.fillStyle = '#d9503d'
    ctx.font = 'bold 19px Arial'
    ctx.fillText('DEMO TERMINAL', 256, 984)

    const map = new THREE.CanvasTexture(canvas)
    map.colorSpace = THREE.SRGBColorSpace
    return map
  }, [])

  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  return (
    <group>
      {/* Machine body */}
      <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.95, 1.9, 0.58]} />
        <meshStandardMaterial color="#315c48" roughness={0.7} />
      </mesh>

      {/* Printed front panel */}
      <mesh position={[0, 0.95, 0.297]}>
        <planeGeometry args={[0.84, 1.74]} />
        <meshStandardMaterial map={texture} roughness={0.75} />
      </mesh>

      {/* Top trim */}
      <mesh position={[0, 1.92, 0]}>
        <boxGeometry args={[1.02, 0.09, 0.65]} />
        <meshStandardMaterial color="#d9503d" />
      </mesh>

      {/* Bottom platform */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <boxGeometry args={[1.05, 0.08, 0.68]} />
        <meshStandardMaterial color="#263f35" />
      </mesh>
    </group>
  )
}
