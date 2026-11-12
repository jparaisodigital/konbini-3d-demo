import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import GroceryProduct from './GroceryProduct.jsx'

function RotatingProduct({ product }) {
  const group = useRef()

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.55
    }
  })

  return (
    <group ref={group} rotation={[0, -0.3, 0]}>
      <GroceryProduct
        type={product.type}
        color={product.color}
        scale={2.2}
      />
    </group>
  )
}

export default function ProductPreview({ product }) {
  if (!product) return null

  return (
    <Canvas
      camera={{ position: [0, 0.15, 2.7], fov: 38 }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <RotatingProduct product={product} />
    </Canvas>
  )
}
