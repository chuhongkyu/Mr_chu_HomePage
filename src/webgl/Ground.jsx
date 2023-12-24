import { usePlane } from "@react-three/cannon";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Grond = ()=> {
    const isMoible = useMediaQuery({
        query: '(min-width: 681px)'
    })

    const [ref] = usePlane(
        () => ({ 
          type: 'Static', 
          material: 'ground',
          rotation: [-Math.PI / 2, 0, 0],
          position: isMoible ? [0, 2, 0] : [0, 1, 0]
        }), 
        useRef(null)
    );
    return(
        <mesh ref={ref}>
            <planeGeometry args={[9,9]}/>
            <meshBasicMaterial color='white' opacity={0} transparent/>
        </mesh>
    )
}

export default Grond;