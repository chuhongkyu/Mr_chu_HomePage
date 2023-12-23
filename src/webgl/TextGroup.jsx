import { useEffect, useMemo } from "react";
import { useBox } from "@react-three/cannon";
import { Center, Text3D } from "@react-three/drei";
import { TextureLoader } from "three";
import { useThree } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue } from "recoil";
import { typing } from "atoms";

const fontUrl = '/assets/fonts/Pretendard_MrChu.json'

const Letter = ({ offset, offsetY, offsetZ, text, mat }) => {
  const { width: w, height: h } = useThree((state) => state.viewport);
  const typingValue = useRecoilValue(typing)
  const isDeskTop = useMediaQuery({
    query: '(min-width: 1281px)'
  })

  const isMobile = useMediaQuery({
    query: '(min-width: 681px)'
  })

  const [ref, api] = useBox(() => ({
    mass: 10,
    position: [offset, offsetY, offsetZ],
    args: [text ? text.length * 0.2 : 0, 0.2, 0.1],
    onCollide: onCollider
  }));

  const onCollider = () => {
  
  }

  useEffect(()=>{
    if(typingValue == true){
      switch (text) {
        case '.':
          api.velocity.set(0, 2, 0)
          break;
      
        default:
          break;
      }
      
    }
  },[typingValue, text])

  if (!text) {
    return null;
  }

  return (
    <mesh ref={ref}>
      <Text3D
        font={fontUrl} 
        color="white"
        size={isMobile ? w / 15 : 0.4}
        curveSegments={24}
        brevelSegments={1}
        bevelEnabled
        bevelSize={isDeskTop ? 0.08 : 0.05}
        bevelThickness={isDeskTop ? 0.03 : 0.02}
        height={isDeskTop ? 0.5 : 0.3}
        letterSpacing={0.1}
      >
        {text}
        <meshMatcapMaterial matcap={mat} />
      </Text3D>
    </mesh>
  );
};

const Text3DComponent = ({ text, textPosition, mat }) => {
  const isDeskTop = useMediaQuery({
    query: '(min-width: 1281px)'
  })
  const spacing = isDeskTop ? {
    first: 1.2,
    second: 1.16,
    third: 1.3,
    fourth: 1.5
  } : {
    first: 1,
    second: 1,
    third: 1,
    fourth: 1
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
                offset={isDeskTop ? textPosition.x + idx * spacing.second : textPosition.x + idx * spacing.second - 0.7}
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

const Mobil3DComponent = ({ text, textPosition, mat }) => {
  return (
    <group>
      {text.split('').map((letter, idx) => {
        if(letter === 'r'){
          return(
            <Letter
                key={idx}
                offset={textPosition.x + idx * 0.6}
                offsetY={textPosition.y + idx}
                offsetZ={textPosition.z}
                text={letter}
                mat={mat}
              />
          )
        }else{
          return(
            <Letter
              key={idx}
              offset={textPosition.x + idx * 0.5}
              offsetY={textPosition.y + idx}
              offsetZ={textPosition.z}
              text={letter}
              mat={mat}
            />)
        }
      })}
    </group>
  );
};

export function TextGroup() {
    const matcapTexture = useMemo(() => {
      const textureLoader = new TextureLoader();
      const matcapTexture = textureLoader.load(`/assets/matcap/white.png`);
      return matcapTexture;
    }, []);

    const isMobile = useMediaQuery({
      query: '(min-width: 681px)'
    })
    return (
      <Center position={[0,7,0]}>
       {isMobile ? <Text3DComponent text="Mr.Chu" textPosition={{ x: 0, y: 4, z: 0 }} mat={matcapTexture} /> :
        <Mobil3DComponent text="Mr.Chu" textPosition={{ x: 0, y: 3, z: 0 }} mat={matcapTexture} />
       }
      </Center>
    );
}