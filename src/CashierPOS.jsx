export default function CashierPOS() {
  return (
    <group>
      {/* POS terminal base */}
      <mesh position={[0, 0.045, 0]} castShadow>
        <boxGeometry args={[0.48, 0.09, 0.38]} />
        <meshStandardMaterial color="#273532" roughness={0.7} />
      </mesh>

      {/* Screen support */}
      <mesh position={[0, 0.22, -0.08]} castShadow>
        <boxGeometry args={[0.08, 0.34, 0.08]} />
        <meshStandardMaterial color="#34413d" />
      </mesh>

      {/* Angled monitor */}
      <group position={[0, 0.38, -0.1]} rotation={[-0.18, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.48, 0.07]} />
          <meshStandardMaterial color="#202b29" roughness={0.55} />
        </mesh>

        {/* Display screen */}
        <mesh position={[0, 0, 0.041]}>
          <planeGeometry args={[0.61, 0.39]} />
          <meshStandardMaterial
            color="#8ac9b4"
            emissive="#3b8a76"
            emissiveIntensity={0.45}
            roughness={0.35}
          />
        </mesh>

        {/* Simple interface bars */}
        {[-0.1, 0, 0.1].map((y) => (
          <mesh key={y} position={[-0.08, y, 0.044]}>
            <planeGeometry args={[0.32, 0.025]} />
            <meshBasicMaterial color="#d9f4e5" />
          </mesh>
        ))}
      </group>
    </group>
  )
}
