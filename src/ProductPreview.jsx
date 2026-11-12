import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Environment } from '@react-three/drei'

function PreviewModel({ type, color }) {
  const model = useRef()

  useFrame((_, delta) => {
    if (model.current) model.current.rotation.y += delta * 0.6
  })

  return (
    <group ref={model}>
      {type === 'can' ? (
        <mesh castShadow>
          <cylinderGeometry args={[0.48, 0.48, 1.5, 32]} />
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
        </mesh>
      ) : type === 'bottle' ? (
        <group>
          <mesh castShadow>
            <cylinderGeometry args={[0.4, 0.4, 1.4, 24]} />
            <meshStandardMaterial color={color} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.85, 0]} castShadow>
            <cylinderGeometry args={[0.19, 0.19, 0.35, 24]} />
            <meshStandardMaterial color="#f3e9d2" />
          </mesh>
        </group>
      ) : (
        <mesh castShadow>
          <boxGeometry args={[1.1, 1.7, 0.55]} />
          <meshStandardMaterial color={color} roughness={0.65} />
        </mesh>
      )}
    </group>
  )
}

export default function ProductPreview({ type, color }) {
  return (
    <div style={{ width: '100%', height: '180px', background: '#e7e2d7' }}>
      <Canvas camera={{ position: [2.8, 1.7, 3.4], fov: 35 }}>
        <ambientLight intensity={1.4} />
        <directionalLight position={[3, 5, 4]} intensity={2.5} />
        <Environment preset="studio" />
        <PreviewModel type={type} color={color} />
      </Canvas>
    </div>
  )
}
