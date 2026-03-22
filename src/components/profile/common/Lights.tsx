import { Environment } from "@react-three/drei";

const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" background={false} />
      {/* <pointLight position={[-10, -10, -5]} intensity={0.5} /> */}
    </>
  );
};

export default Lights;
