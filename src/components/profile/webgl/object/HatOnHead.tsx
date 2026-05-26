import { useEffect, useMemo } from "react";
import { createPortal } from "@react-three/fiber";
import * as THREE from "three";

import { Hats, HatName } from "@/components/profile/webgl/object/Hats";

type Props = {
  headBone: THREE.Bone;
  hatName: HatName;
};

export const HatOnHead = ({ headBone, hatName }: Props) => {
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

  return createPortal(<Hats hatName={hatName} />, group);
};
