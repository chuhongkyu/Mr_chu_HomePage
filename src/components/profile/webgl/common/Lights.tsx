import { useRef } from "react";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

const Lights = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  return (
    <>
      <Environment preset="forest" />
      <ambientLight intensity={0.4} />
      <directionalLight
        ref={lightRef}
        position={[15, 15, 0]}
        intensity={1}
        castShadow
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-bias={-0.001}
      />
    </>
  );
};

export default Lights;
