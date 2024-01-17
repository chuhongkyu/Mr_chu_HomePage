import { useMemo } from "react";
import { Text3D } from "@react-three/drei";
import { TextureLoader } from "three";
import { motion } from "framer-motion-3d"
import { useMediaQuery } from "react-responsive";

const fontUrl = '/assets/fonts/Pretendard_MrChu.json'

interface LetterProps {
  offsetX: number;
  offsetY: number;
  offsetZ: number;
  text: string;
  mat: THREE.Texture;
}

const Letter = ({ offsetX, offsetY, offsetZ, text, mat }:LetterProps) => {

  const isMoible = useMediaQuery({
    query: '(min-width: 681px)'
  })

  if (!text) {
    return null;
  }

  return (
    <motion.mesh 
      initial={{x: offsetX, y: offsetY, z:offsetZ}}
      animate={isMoible ? {y: 2, transition:{ duration: 0.45}}: {y: 1, transition:{ duration: 0.5}}}
      >
      <Text3D
        font={fontUrl} 
        size={1}
        curveSegments={24}
        bevelEnabled
        bevelSize={0.08}
        bevelThickness={0.03}
        height={0.5}
        letterSpacing={0.1}
      >
        {text}
        <meshMatcapMaterial matcap={mat} />
      </Text3D>
    </motion.mesh>
  );
};

interface Text3DComponentProps {
  text: string;
  textPosition: { x: number; y: number; z: number };
  mat: THREE.Texture;
}

const Text3DComponent:React.FC<Text3DComponentProps>  = ({ text, textPosition, mat }) => {
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
                key={letter+"text-key"}
                offsetX={textPosition.x + idx * spacing.first}
                offsetY={textPosition.y + idx/2}
                offsetZ={textPosition.z}
                mat={mat}
                text={letter}
              />
          )
        }else if(letter === 'u'){
          return(
            <Letter
                key={letter+"text-key"}
                offsetX={textPosition.x + idx * spacing.second}
                offsetY={textPosition.y + idx/2}
                offsetZ={textPosition.z}
                mat={mat}
                text={letter}
              />
          )
        }else if(idx >= 3){
          return(
            <Letter
                key={letter+"text-key"}
                offsetX={textPosition.x + idx * spacing.third -0.5}
                offsetY={textPosition.y + idx/2}
                offsetZ={textPosition.z}
                mat={mat}
                text={letter}
              />
          )
        }else{
          return(
            <Letter
              key={letter+"text-key"}
              offsetX={textPosition.x + idx * spacing.fourth}
              offsetY={textPosition.y + idx/2}
              offsetZ={textPosition.z}
              mat={mat}
              text={letter}
            />)
        }
      })}
    </group>
  );
};

const TextGroup = () => {
    const matcapTexture = useMemo(() => {
      const textureLoader = new TextureLoader();
      const matcapTexture = textureLoader.load(`/assets/matcap/white.webp`);
      return matcapTexture;
    }, []);

    return (
      <Text3DComponent key={"Text-KEY"} text="Mr.Chu" textPosition={{ x: -3.2, y: 5, z: 0 }} mat={matcapTexture} />
    );
}

export default TextGroup;