import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

const bannerTextures = new Map()

function createBannerTexture(jpText, enText, accent) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 768

  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f5edda'
  ctx.fillRect(0, 0, 512, 768)

  ctx.fillStyle = accent
  ctx.fillRect(0, 0, 512, 110)
  ctx.fillRect(0, 690, 512, 78)

  ctx.strokeStyle = accent
  ctx.lineWidth = 12
  ctx.strokeRect(20, 20, 472, 728)

  ctx.textAlign = 'center'

  ctx.fillStyle = '#f5edda'
  ctx.font = 'bold 42px Arial'
  ctx.fillText('KONBINI', 256, 72)

  ctx.fillStyle = accent
  ctx.font = 'bold 86px sans-serif'
  ctx.fillText(jpText, 256, 360)

  ctx.font = 'bold 36px Arial'
  ctx.fillText(enText, 256, 460)

  ctx.font = '24px Arial'
  ctx.fillText('EVERYDAY GOOD FINDS', 256, 530)

  ctx.fillStyle = '#f5edda'
  ctx.font = 'bold 26px Arial'
  ctx.fillText('いらっしゃいませ', 256, 740)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4

  return texture
}

export default function HangingBanner({ jpText, enText, accent = '#d9503d' }) {
  const texture = useMemo(() => {
    const key = `${jpText}-${enText}-${accent}`

    if (!bannerTextures.has(key)) {
      bannerTextures.set(key, createBannerTexture(jpText, enText, accent))
    }

    return bannerTextures.get(key)
  }, [jpText, enText, accent])

  return (
    <group dispose={null}>
      {/* Two suspension cables connecting the banner to the ceiling */}
      {[-0.36, 0.36].map((x) => (
        <mesh key={x} position={[x, 1.0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.6, 6]} />
          <meshStandardMaterial color="#52635b" metalness={0.4} roughness={0.6} />
        </mesh>
      ))}

      {/* Horizontal mounting rod */}
      <mesh position={[0, 0.72, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 1.0, 8]} />
        <meshStandardMaterial color="#52635b" />
      </mesh>

      {/* Double-sided printed Japanese promotional banner */}
      <mesh>
        <planeGeometry args={[0.95, 1.4]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}


