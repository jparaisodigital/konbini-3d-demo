import SnackSticks from './SnackSticks.jsx'
import TeaBottle from './TeaBottle.jsx'
import CoffeeCan from './CoffeeCan.jsx'
import ChipsBag from './ChipsBag.jsx'
import RamenCup from './RamenCup.jsx'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

function createCerealTexture(color) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 768

  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  // Main package color
  ctx.fillStyle = color
  ctx.fillRect(0, 0, w, h)

  // Cream-colored branding panel
  ctx.fillStyle = '#fff3d5'
  ctx.fillRect(35, 35, 442, 698)

  // Header band
  ctx.fillStyle = '#254c43'
  ctx.fillRect(35, 35, 442, 95)

  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.font = 'bold 40px Arial'
  ctx.fillText('KONBINI', 256, 97)

  // Main product typography
  ctx.fillStyle = '#243a35'
  ctx.font = 'bold 82px Arial'
  ctx.fillText('CRUNCH', 256, 250)

  ctx.font = 'bold 42px Arial'
  ctx.fillText('CORN', 256, 310)

  ctx.font = '30px sans-serif'
  ctx.fillText('サクサク', 256, 365)

  // Stylized cereal bowl
  ctx.beginPath()
  ctx.ellipse(256, 525, 155, 90, 0, 0, Math.PI * 2)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  ctx.lineWidth = 12
  ctx.strokeStyle = '#254c43'
  ctx.stroke()

  // Cereal pieces
  const pieces = [
    [180, 505], [225, 475], [275, 490],
    [320, 520], [200, 555], [260, 540],
    [300, 560], [250, 510]
  ]

  pieces.forEach(([x, y]) => {
    ctx.beginPath()
    ctx.arc(x, y, 21, 0, Math.PI * 2)
    ctx.fillStyle = '#e0a340'
    ctx.fill()
    ctx.lineWidth = 5
    ctx.strokeStyle = '#ad6c29'
    ctx.stroke()
  })

  // Footer
  ctx.fillStyle = '#254c43'
  ctx.font = 'bold 25px Arial'
  ctx.fillText('SWEET & CRISPY', 256, 675)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8

  return texture
}

export default function GroceryProduct({
  type = 'box',
  color = '#e8a23c',
  position = [0, 0, 0],
  scale = 1,
}) {
  const dimensions = useMemo(() => {
    if (type === 'can') return [0.22, 0.42, 0.22]
    if (type === 'bottle') return [0.18, 0.55, 0.18]
    return [0.36, 0.55, 0.2]
  }, [type])

  const cerealTexture = useMemo(
    () => type === 'box' ? createCerealTexture(color) : null,
    [type, color]
  )

  useEffect(() => {
    return () => cerealTexture?.dispose()
  }, [cerealTexture])

  return (
    <group
      position={position}
      scale={scale}
      userData={{
        interactive: true,
        productType: type,
        productColor: color,
      }}
    >
      {type === 'ramen' ? (
        <RamenCup />
      ) : type === 'chips' ? (
        <ChipsBag />
      ) : type === 'sticks' ? (
        <SnackSticks />
      ) : type === 'can' ? (
        <CoffeeCan />
      ) : type === 'bottle' ? (
        <TeaBottle />
      ) : (
        <group>
          <mesh castShadow receiveShadow>
            <boxGeometry args={dimensions} />
            <meshStandardMaterial color={color} roughness={0.7} />
          </mesh>

          {/* Front packaging label */}
          <mesh position={[0, 0, 0.101]}>
            <planeGeometry args={[0.35, 0.54]} />
            <meshStandardMaterial
              map={cerealTexture}
              roughness={0.82}
            />
          </mesh>

          {/* Back packaging label */}
          <mesh
            position={[0, 0, -0.101]}
            rotation={[0, Math.PI, 0]}
          >
            <planeGeometry args={[0.35, 0.54]} />
            <meshStandardMaterial
              map={cerealTexture}
              roughness={0.82}
            />
          </mesh>
        </group>
      )}
    </group>
  )
}





