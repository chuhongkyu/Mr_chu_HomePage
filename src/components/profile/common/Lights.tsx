import { Environment } from "@react-three/drei";
import { useRef } from "react";

import * as THREE from "three";

const Lights = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        ref={lightRef}
        position={[15, 15, 0]}
        intensity={2}
        castShadow
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.001}
      />
      <Environment preset="city" background={false} />
    </>
  );
};

export default Lights;
