import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Scene } from "./Scene"
import { Physics } from "@react-three/cannon";
import Loading from "./Loading";

const Webgl = () => {
    return(
        <Canvas camera={{ position: [0,0,10], fov: 45}}>
            <Physics broadphase="SAP" gravity={[0, -9.8, 0]} allowSleep>
                <Suspense fallback={<Loading/>}>
                    <Scene/>
                </Suspense>
            </Physics>
        </Canvas>
    )
}

export default Webgl