import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Scene } from "./Scene"
import { Physics } from "@react-three/cannon";

const Webgl = () => {
    return(
        <Canvas camera={{ position: [0,0,10], fov: 45}}>
            <Physics broadphase="SAP" gravity={[0, -9.8, 0]}>
            <Suspense fallback={null}>
                <Scene/>
            </Suspense>
            </Physics>
        </Canvas>
    )
}

export default Webgl