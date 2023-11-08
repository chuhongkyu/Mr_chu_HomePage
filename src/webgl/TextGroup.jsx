import { useMemo } from "react";
import { useBox } from "@react-three/cannon";
import { Text3D } from "@react-three/drei";
import { TextureLoader } from "three";

const fontUrl = '/assets/fonts/Pretendard.json'

const Letter = ({ offset, offsetY, offsetZ, mass = 1, text }) => {

  const matcapTexture = useMemo(() => {
    const textureLoader = new TextureLoader();
    const matcapTexture = textureLoader.load(`/assets/matcap/white.png`);
    return matcapTexture;
  }, []);

  const [ref] = useBox(() => ({
    mass,
    position: [offset, offsetY, offsetZ],
    args: [text ? text.length * 0.2 : 0, 0.2, 0.1],
    onCollide: onCollider
  }));

  const onCollider = () => {
   
  }

  if (!text) {
    return null;
  }

  return (
    <mesh ref={ref}>
      <Text3D
        castShadow
        font={fontUrl} 
        color="white"
        lineHeight={1}
        fontSize={1} 
        curveSegments={24}
        brevelSegments={1}
        bevelEnabled
        bevelSize={0.08}
        bevelThickness={0.03}
        height={0.5}
        letterSpacing={0.1}
      >
        {text}
        <meshMatcapMaterial matcap={matcapTexture} />
      </Text3D>
    </mesh>
  );
};

const Text3DComponent = ({ text, textPosition, mass }) => {
  return (
    <group>
      {text.split('').map((letter, idx) => {
        if(letter == '.'){
          return(
            <Letter
                key={idx}
                offset={textPosition.x + idx * 1.2}
                offsetY={textPosition.y + idx}
                offsetZ={textPosition.z}
                mass={mass}
                text={letter}
              />
          )
        }else if(idx >= 3){
          return(
            <Letter
                key={idx}
                offset={textPosition.x + idx * 1.5 -1.2}
                offsetY={textPosition.y + idx}
                offsetZ={textPosition.z}
                mass={mass}
                text={letter}
              />
          )
        }else{
          return(
            <Letter
              key={idx}
              offset={textPosition.x + idx * 1.5}
              offsetY={textPosition.y + idx}
              offsetZ={textPosition.z}
              mass={mass}
              text={letter}
            />)
        }
      })}
    </group>
  );
};

export function TextGroup() {
    return (
      <>
        <Text3DComponent text="Mr.Chu" textPosition={{ x: -3.5, y: 4, z: 0 }} mass={10} />
      </>
    );
}