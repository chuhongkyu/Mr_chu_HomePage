"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { Player } from "@/components/profile/webgl/character/Player";
import { Background } from "@/components/profile/webgl/common/Background";
import CameraManager from "@/components/profile/webgl/common/CameraManager";
import Lights from "@/components/profile/webgl/common/Lights";
import { FlightPath } from "@/components/profile/webgl/object/FlightPath";
import { InkStrokes } from "@/components/profile/webgl/object/InkStrokes";
import { GRID_CENTER } from "@/components/profile/webgl/object/InventoryGridEngine";

import styles from "@/components/profile/Scene.module.scss";

const Scene = () => {
  return (
    <div className={styles.container}>
      <Canvas shadows dpr={[1, 2]}>
        <Lights />
        <Background />
        <Suspense fallback={null}>
          <CameraManager />
          {/* <Floor /> */}
          <Player position={[GRID_CENTER[0], 0, GRID_CENTER[2]]} />
          {/* <Islands /> */}
          <FlightPath />
          <InkStrokes />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
