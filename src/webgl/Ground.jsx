import { usePlane } from "@react-three/cannon";
import { useRef } from "react";

const Grond = ()=> {
    const [ref] = usePlane(
        () => ({ 
          type: 'Static', 
          material: 'ground',
          rotation: [-Math.PI / 2, 0, 0],
          position: [0, 1.5, 0]
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