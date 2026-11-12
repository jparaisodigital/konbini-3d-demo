export default function KonbiniCeiling() {
  const lightPositions = [-6, -3.5, -1, 1.5, 4, 6.5]

  return (
    <group>
      {/* Main ceiling */}
      <mesh position={[0, 5.05, 0]} receiveShadow>
        <boxGeometry args={[9, 0.12, 18]} />
        <meshStandardMaterial color="#E8BC65" roughness={0.95} />
      </mesh>

      {/* Recessed LED light fixtures along the center aisle */}
      {lightPositions.map((z) => (
        <group key={z} position={[0, 4.96, z]}>
          {/* Dark fixture frame */}
          <mesh>
            <boxGeometry args={[1.15, 0.065, 1.65]} />
            <meshStandardMaterial color="#c8c7c1" roughness={0.65} />
          </mesh>

          {/* Warm-white LED panel */}
          <mesh position={[0, -0.038, 0]}>
            <boxGeometry args={[1.02, 0.012, 1.52]} />
            <meshStandardMaterial
              color="#fff8e8"
              emissive="#fff2d4"
              emissiveIntensity={1.2}
              roughness={0.35}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}


