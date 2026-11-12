import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

const PRODUCT_PRICES = {
  box: { name: 'CRUNCH CEREAL', price: 149 },
  ramen: { name: 'CUP RAMEN', price: 79 },
  chips: { name: 'POTATO CHIPS', price: 65 },
  can: { name: 'CANNED COFFEE', price: 55 },
  bottle: { name: 'GREEN TEA', price: 89 },
  sticks: { name: 'SNACK STICKS', price: 99 },
}

export default function ShelfPriceTag({ type = 'box' }) {
  const product = PRODUCT_PRICES[type] || PRODUCT_PRICES.box

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 256

    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#fffdf5'
    ctx.fillRect(0, 0, 512, 256)

    ctx.fillStyle = '#315c48'
    ctx.fillRect(0, 0, 512, 15)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#333333'
    ctx.font = 'bold 34px Arial'
    ctx.fillText(product.name, 256, 95)

    ctx.fillStyle = '#1d463a'
    ctx.font = 'bold 76px Arial'
    ctx.fillText(`PHP ${product.price}`, 256, 195)

    const map = new THREE.CanvasTexture(canvas)
    map.colorSpace = THREE.SRGBColorSpace
    map.anisotropy = 8

    return map
  }, [product.name, product.price])

  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  return (
    <mesh>
      <planeGeometry args={[0.42, 0.18]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.85}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
