import { useMemo } from 'react'

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

  return (
    <group position={position} scale={scale} userData={{ interactive: true, productType: type, productColor: color }}>
      {type === 'can' ? (
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.11, 0.11, dimensions[1], 12]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      ) : type === 'bottle' ? (
        <group>
          <mesh castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.38, 12]} />
            <meshStandardMaterial color={color} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.24, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.12, 12]} />
            <meshStandardMaterial color="#f3e9d2" />
          </mesh>
        </group>
      ) : (
        <mesh castShadow receiveShadow>
          <boxGeometry args={dimensions} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>
      )}
    </group>
  )
}

