function Floor() {
  return (
    <mesh
      castShadow
      receiveShadow
      position={[0, 0.1, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[80, 80]} />
      <shadowMaterial color="#ffffff" />
    </mesh>
  );
}

export default Floor;
