import { useMemo, useRef } from "react";
import { useBox } from "@react-three/cannon";
import { Text3D } from "@react-three/drei";
import { TextureLoader } from "three";

const fontUrl = '/assets/fonts/Pretendard_MrChu.json'

const Letter = ({ offset, offsetY, offsetZ, text, mat }) => {

  const [ref] = useBox(() => ({
    mass: 10,
    position: [offset-2.8, offsetY, offsetZ],
    args: [text ? text.length * 0.2 : 0, 0.2, 0.1],
  }),useRef(null));

  if (!text) {
    return null;
  }

  return (
    <mesh ref={ref}>
      <Text3D
        position-x={-0.5}
        font={fontUrl} 
        color="white"
        size={1}
        curveSegments={24}
        brevelSegments={1}
        bevelEnabled
        bevelSize={0.08}
        bevelThickness={0.03}
        height={0.5}
        letterSpacing={0.1}
      >
        {text}
        <meshMatcapMaterial matcap={mat} />
      </Text3D>
    </mesh>
  );
};

const Text3DComponent = ({ text, textPosition, mat }) => {
  const spacing = {
    first: 1.2,
    second: 1.16,
    third: 1.3,
    fourth: 1.5
  }
  return (
    <group>
      {text.split('').map((letter, idx) => {
        if(letter === '.'){
          return(
            <Letter
                key={idx}
                offset={textPosition.x + idx * spacing.first}
                offsetY={textPosition.y + idx}
                offsetZ={textPosition.z}
                mat={mat}
                text={letter}
              />
          )
        }else if(letter === 'u'){
          return(
            <Letter
                key={idx}
                offset={textPosition.x + idx * spacing.second}
                offsetY={textPosition.y + idx}
                offsetZ={textPosition.z}
                mat={mat}
                text={letter}
              />
          )
        }else if(idx >= 3){
          return(
            <Letter
                key={idx}
                offset={textPosition.x + idx * spacing.third -0.5}
                offsetY={textPosition.y + idx}
                offsetZ={textPosition.z}
                mat={mat}
                text={letter}
              />
          )
        }else{
          return(
            <Letter
              key={idx}
              offset={textPosition.x + idx * spacing.fourth}
              offsetY={textPosition.y + idx}
              offsetZ={textPosition.z}
              mat={mat}
              text={letter}
            />)
        }
      })}
    </group>
  );
};

export function TextGroup() {
    const matcapTexture = useMemo(() => {
      const textureLoader = new TextureLoader();
      const matcapTexture = textureLoader.load(`/assets/matcap/white.webp`);
      return matcapTexture;
    }, []);

    return (
      <Text3DComponent text="Mr.Chu" textPosition={{ x: 0, y: 4, z: 0 }} mat={matcapTexture} />
    );
}