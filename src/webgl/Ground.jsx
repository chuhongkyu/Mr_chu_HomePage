import { usePlane } from "@react-three/cannon";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Grond = ()=> {
    const isMoible = useMediaQuery({
        query: '(min-width: 681px)'
    })
    return(
        <mesh>
            <planeGeometry args={[9,9]}/>
            <meshBasicMaterial color='white' opacity={0} transparent/>
        </mesh>
    )
}

export default Grond;