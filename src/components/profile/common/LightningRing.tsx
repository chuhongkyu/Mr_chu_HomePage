import { useEffect, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export type LightningRingProps = {
  bone: THREE.Bone;
  visible?: boolean;
  radius?: number;
  color?: THREE.ColorRepresentation;
};

export const LightningRing = ({
  bone,
  visible = true,
  radius = 0.15,
  color = "#ff5500",
}: LightningRingProps) => {
  const texture = useLoader(THREE.TextureLoader, "/assets/textures/glow.png");

  const group = useMemo(() => {
    const g = new THREE.Group();
    g.scale.setScalar(50); // counteract model's 0.02 scale → 1 unit = 1 world unit

    const mat = new THREE.SpriteMaterial({
      map: texture,
      color,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const inner = new THREE.Sprite(mat);
    inner.scale.set(radius * 4, radius * 4, 1);
    g.add(inner);

    const outer = new THREE.Sprite(mat.clone());
    (outer.material as THREE.SpriteMaterial).opacity = 0.45;
    outer.scale.set(radius * 6, radius * 6, 1);
    g.add(outer);

    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 1.8, 0.01, 8, 32),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    ring1.rotation.x = Math.PI / 2;
    g.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 2.3, 0.008, 8, 32),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    ring2.rotation.y = Math.PI / 2;
    g.add(ring2);

    return g;
  }, [texture, color, radius]);

  // Attach to bone — automatically follows skeletal animation
  useEffect(() => {
    bone.add(group);
    return () => {
      bone.remove(group);
      group.traverse((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.Sprite) {
          (child as THREE.Mesh).geometry?.dispose();
          ((child as THREE.Mesh).material as THREE.Material)?.dispose();
        }
      });
    };
  }, [bone, group]);

  useEffect(() => {
    group.visible = visible;
  }, [group, visible]);

  useFrame(({ clock }) => {
    if (!visible) return;
    const t = clock.elapsedTime;
    group.rotation.x += 0.01;
    group.rotation.y += 0.015;
    group.rotation.z += 0.02;
    group.scale.setScalar(50 * (1 + Math.sin(t * 6) * 0.08));
  });

  return null;
};
