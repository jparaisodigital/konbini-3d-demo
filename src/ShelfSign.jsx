import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

const SHELF_LABELS = {
  snacks: { english: 'SNACKS', japanese: 'お菓子' },
  ramen: { english: 'INSTANT NOODLES', japanese: 'カップ麺' },
  drinks: { english: 'BEVERAGES', japanese: '飲み物' },
  breakfast: { english: 'BREAKFAST', japanese: '朝食' },
}

export default function ShelfSign({ category = 'snacks' }) {
  const label = SHELF_LABELS[category] || SHELF_LABELS.snacks

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 256

    const ctx = canvas.getContext('2d')

    // Warm cream background
    ctx.fillStyle = '#f5edda'
    ctx.fillRect(0, 0, 1024, 256)

    // Dark green accent
    ctx.fillStyle = '#315c48'
    ctx.fillRect(0, 0, 1024, 18)
    ctx.fillRect(0, 238, 1024, 18)

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillStyle = '#263f35'
    ctx.font = 'bold 78px Arial'
    ctx.fillText(label.english, 512, 100)

    ctx.font = '48px sans-serif'
    ctx.fillText(label.japanese, 512, 190)

    const map = new THREE.CanvasTexture(canvas)
    map.colorSpace = THREE.SRGBColorSpace
    map.anisotropy = 8

    return map
  }, [label.english, label.japanese])

  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  return (
    <group>
      {/* Sign backing */}
      <mesh castShadow>
        <boxGeometry args={[3.8, 0.55, 0.08]} />
        <meshStandardMaterial color="#315c48" roughness={0.8} />
      </mesh>

      {/* Front signage */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[3.7, 0.48]} />
        <meshStandardMaterial map={texture} roughness={0.85} />
      </mesh>

      {/* Back signage */}
      <mesh position={[0, 0, -0.045]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[3.7, 0.48]} />
        <meshStandardMaterial map={texture} roughness={0.85} />
      </mesh>
    </group>
  )
}
