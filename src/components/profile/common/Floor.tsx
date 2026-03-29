import { useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";

function Floor() {
  const texture = useTexture("/assets/profile/bg.jpg");
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(4, 4);

  return (
    <mesh
      castShadow
      receiveShadow
      position={[0, -0.05, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default Floor;
