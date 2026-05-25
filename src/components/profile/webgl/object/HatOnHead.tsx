import { useEffect, useMemo } from "react";
import { createPortal } from "@react-three/fiber";
import * as THREE from "three";

import { Hat } from "@/components/profile/webgl/object/Hat";

type Props = {
  headBone: THREE.Bone;
};

export const HatOnHead = ({ headBone }: Props) => {
  const group = useMemo(() => {
    const g = new THREE.Group();
    g.scale.setScalar(10);
    g.position.set(0, 0.5, 0);
    return g;
  }, []);

  useEffect(() => {
    headBone.add(group);
    return () => {
      headBone.remove(group);
    };
  }, [headBone, group]);

  return createPortal(<Hat />, group);
};
