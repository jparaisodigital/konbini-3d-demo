import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

function createChipsTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 768
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#e6aa35'
  ctx.fillRect(0, 0, 512, 768)

  ctx.fillStyle = '#b83e32'
  ctx.fillRect(0, 0, 512, 105)
  ctx.fillRect(0, 675, 512, 93)

  ctx.textAlign = 'center'
  ctx.fillStyle = '#fff8e5'
  ctx.font = 'bold 54px Arial'
  ctx.fillText('POTA', 256, 80)

  ctx.fillStyle = '#293e35'
  ctx.font = 'bold 78px Arial'
  ctx.fillText('CHIPS', 256, 245)

  ctx.font = 'bold 42px sans-serif'
  ctx.fillText('ポテト', 256, 310)

  // Stylized potato chip illustrations
  const chips = [
    [180, 455, -0.35],
    [285, 430, 0.3],
    [245, 530, -0.1],
  ]

  chips.forEach(([x, y, rotation]) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)
    ctx.beginPath()
    ctx.ellipse(0, 0, 74, 43, 0, 0, Math.PI * 2)
    ctx.fillStyle = '#f5d381'
    ctx.fill()
    ctx.lineWidth = 7
    ctx.strokeStyle = '#c78d36'
    ctx.stroke()
    ctx.restore()
  })

  ctx.fillStyle = '#293e35'
  ctx.font = 'bold 25px Arial'
  ctx.fillText('CRISPY POTATO SNACK', 256, 630)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

export default function ChipsBag() {
  const texture = useMemo(() => createChipsTexture(), [])

  const geometry = useMemo(() => {
    const shape = new THREE.BoxGeometry(0.32, 0.47, 0.12, 4, 6, 2)
    const pos = shape.attributes.position

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)

      const puff = Math.max(0, 1 - Math.pow(y / 0.235, 2))
      const sign = Math.sign(z)

      pos.setZ(i, z + sign * puff * 0.045)
      pos.setX(i, x * (1 + puff * 0.12))
    }

    pos.needsUpdate = true
    shape.computeVertexNormals()
    return shape
  }, [])

  useEffect(() => {
    return () => {
      texture.dispose()
      geometry.dispose()
    }
  }, [texture, geometry])

  return (
    <group>
      {/* Inflated snack bag with label printed on its surface */}
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          map={texture}
          roughness={0.68}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sealed top and bottom edges */}
      {[-0.225, 0.225].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[0.33, 0.025, 0.13]} />
          <meshStandardMaterial color="#b83e32" roughness={0.55} />
        </mesh>
      ))}
    </group>
  )
}
