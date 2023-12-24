import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Scene } from "./Scene"
import { Physics } from "@react-three/cannon";
import Loading from "./Loading";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const Wrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  @media ${(props) => props.theme.device.mobile} {
    aspect-ratio: 13 / 10;
  }
`;


const Webgl = () => {
    const isMoible = useMediaQuery({
        query: '(min-width: 681px)'
    })
    return(
        <Wrapper>
            <Canvas camera={
                isMoible ? { position: [0,0, 11.5], fov: 45} : 
                { position: [0,0, 10], fov: 45}
                }>
                <Physics broadphase="Naive" gravity={[0, -9.8, 0]} allowSleep>
                    <Suspense fallback={<Loading/>}>
                        <Scene/>
                    </Suspense>
                </Physics>
            </Canvas>
        </Wrapper>
    )
}

export default Webgl