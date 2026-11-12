export default function BarcodeScanner() {
  return (
    <group rotation={[0, 0.35, -0.15]}>
      {/* Scanner handle */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.055, 0.24, 12]} />
        <meshStandardMaterial color="#303a39" roughness={0.65} />
      </mesh>

      {/* Scanner head */}
      <mesh position={[0, 0.26, 0.055]} rotation={[0.35, 0, 0]} castShadow>
        <boxGeometry args={[0.22, 0.12, 0.18]} />
        <meshStandardMaterial color="#26312f" roughness={0.55} />
      </mesh>

      {/* Red scanning window */}
      <mesh position={[0, 0.285, 0.15]} rotation={[0.35, 0, 0]}>
        <planeGeometry args={[0.16, 0.055]} />
        <meshStandardMaterial
          color="#b82c2c"
          emissive="#7c1010"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Scanner stand */}
      <mesh position={[0, 0.025, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.05, 16]} />
        <meshStandardMaterial color="#202c29" roughness={0.8} />
      </mesh>
    </group>
  )
}
