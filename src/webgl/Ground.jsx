import { usePlane } from "@react-three/cannon";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Grond = ()=> {
    const isMobile = useMediaQuery({
        query: '(min-width: 681px)'
    })
    const [ref] = usePlane(
        () => ({ 
          type: 'Static', 
          material: 'ground',
          rotation: [-Math.PI / 2, 0, 0],
          position: isMobile ? [0, 1.5, 0] : [0, 0.9, 0]
        }), 
        useRef(null)
    );
    return(
        <mesh ref={ref}>
            <planeGeometry args={[10,10]}/>
            <meshBasicMaterial color='white' opacity={0} transparent/>
        </mesh>
    )
}

export default Grond;