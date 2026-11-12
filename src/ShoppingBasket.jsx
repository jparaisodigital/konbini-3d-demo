export default function ShoppingBasket() {
  const red = '#c94435'
  const dark = '#303b38'

  return (
    <group>
      {/* Basket base */}
      <mesh position={[0, 0.035, 0]} castShadow>
        <boxGeometry args={[0.68, 0.07, 0.43]} />
        <meshStandardMaterial color={red} roughness={0.8} />
      </mesh>

      {/* Front and back walls with basket slats */}
      {[-0.21, 0.21].map((z) => (
        <group key={z}>
          {[-0.28, -0.14, 0, 0.14, 0.28].map((x) => (
            <mesh key={x} position={[x, 0.18, z]}>
              <boxGeometry args={[0.055, 0.29, 0.025]} />
              <meshStandardMaterial color={red} roughness={0.8} />
            </mesh>
          ))}
          <mesh position={[0, 0.32, z]}>
            <boxGeometry args={[0.7, 0.045, 0.035]} />
            <meshStandardMaterial color={red} roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Left and right walls */}
      {[-0.34, 0.34].map((x) => (
        <group key={x}>
          {[-0.13, 0, 0.13].map((z) => (
            <mesh key={z} position={[x, 0.18, z]}>
              <boxGeometry args={[0.025, 0.29, 0.05]} />
              <meshStandardMaterial color={red} roughness={0.8} />
            </mesh>
          ))}
          <mesh position={[x, 0.32, 0]}>
            <boxGeometry args={[0.035, 0.045, 0.45]} />
            <meshStandardMaterial color={red} roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Folded basket handles */}
      {[-0.12, 0.12].map((z) => (
        <mesh key={z} position={[0, 0.345, z]}>
          <boxGeometry args={[0.55, 0.025, 0.025]} />
          <meshStandardMaterial color={dark} roughness={0.75} />
        </mesh>
      ))}
    </group>
  )
}
