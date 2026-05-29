import { useEffect, useMemo } from "react";
import { createPortal } from "@react-three/fiber";
import * as THREE from "three";

import { StickObject } from "@/components/profile/webgl/object/StickObject";

type Props = {
  handBone: THREE.Bone;
};

export const BrushStick = ({ handBone }: Props) => {
  const group = useMemo(() => {
    const g = new THREE.Group();
    g.scale.setScalar(10);
    g.position.set(0, 3, 0);
    return g;
  }, []);

  useEffect(() => {
    handBone.add(group);
    return () => {
      handBone.remove(group);
    };
  }, [handBone, group]);

  return createPortal(<StickObject />, group);
};
