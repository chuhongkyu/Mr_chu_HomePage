import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

import outlineFrag from "@/shaders/outline.frag.glsl";
import outlineVert from "@/shaders/outlineHat.vert.glsl";

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: {
    HatsMaterial: THREE.MeshStandardMaterial;
  };
};

export type HatName =
  | "tophat"
  | "party"
  | "helmet"
  | "skull"
  | "beret"
  | "cowboy"
  | "box"
  | "cross"
  | "wizard"
  | "witch"
  | "drum";

type Props = {
  hatName: HatName;
} & React.JSX.IntrinsicElements["group"];

type ToonMeshProps = React.JSX.IntrinsicElements["mesh"] & {
  geometry: THREE.BufferGeometry;
  toonMat: THREE.Material;
  outlineMat: THREE.Material;
};

function buildSmoothNormals(src: THREE.BufferGeometry): THREE.BufferGeometry {
  const pos = src.attributes.position;
  const norm = src.attributes.normal;
  const accum = new Map<string, THREE.Vector3>();

  for (let i = 0; i < pos.count; i++) {
    const key = `${pos.getX(i).toFixed(4)},${pos.getY(i).toFixed(4)},${pos.getZ(i).toFixed(4)}`;
    if (!accum.has(key)) accum.set(key, new THREE.Vector3());
    accum
      .get(key)!
      .add(new THREE.Vector3(norm.getX(i), norm.getY(i), norm.getZ(i)));
  }
  for (const v of accum.values()) v.normalize();

  const data = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const key = `${pos.getX(i).toFixed(4)},${pos.getY(i).toFixed(4)},${pos.getZ(i).toFixed(4)}`;
    const v = accum.get(key)!;
    data[i * 3] = v.x;
    data[i * 3 + 1] = v.y;
    data[i * 3 + 2] = v.z;
  }

  const out = src.clone();
  out.setAttribute("aSmoothNormal", new THREE.BufferAttribute(data, 3));
  return out;
}

function ToonMesh({ geometry, toonMat, outlineMat, ...rest }: ToonMeshProps) {
  const outlineGeo = useMemo(() => buildSmoothNormals(geometry), [geometry]);
  return (
    <>
      <mesh
        geometry={outlineGeo}
        material={outlineMat}
        renderOrder={0}
        {...rest}
      />
      <mesh geometry={geometry} material={toonMat} renderOrder={1} {...rest} />
    </>
  );
}

const HATS_MODEL_PATH = "/assets/models/hats_draco.glb";

export function Hats({ hatName, ...props }: Props) {
  const { nodes, materials } = useGLTF(
    HATS_MODEL_PATH
  ) as unknown as GLTFResult;

  const toonMat = useMemo(() => {
    const src = materials.HatsMaterial;
    return new THREE.MeshToonMaterial({
      color: src.color.clone(),
      map: src.map ?? null,
      normalMap: src.normalMap ?? null,
    });
  }, [materials.HatsMaterial]);

  const outlineMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: outlineVert,
        fragmentShader: outlineFrag,
        uniforms: { outlineWidth: { value: 0.009 } },
        side: THREE.BackSide,
      }),
    []
  );

  const show = (name: HatName) => hatName === name;

  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.8, 0]}>
        <group
          visible={show("tophat")}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2.5}
        >
          <ToonMesh
            geometry={nodes.Cilindro_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
          />
          <ToonMesh
            geometry={nodes.Cilindro001_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
          />
        </group>

        <group
          visible={show("party")}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2.5}
        >
          <ToonMesh
            geometry={nodes.Cilindro030_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
          />
          <ToonMesh
            geometry={nodes.Esfera001_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
            position={[-0.001, 0, -0.134]}
            rotation={[0, 0, Math.PI]}
            scale={0.909}
          />
          {nodes["Esfera_geodésica004_HatsMaterial_0"] && (
            <ToonMesh
              geometry={nodes["Esfera_geodésica004_HatsMaterial_0"].geometry}
              toonMat={toonMat}
              outlineMat={outlineMat}
            />
          )}
        </group>

        <group
          visible={show("helmet")}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2.5}
        >
          <ToonMesh
            geometry={nodes.Light001_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
            rotation={[1.309, Math.PI / 2, 0]}
            scale={[0.25, 0.25, 0.04]}
          />
          <ToonMesh
            geometry={nodes.Helmet002_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
            position={[0, 0, 0.5]}
            scale={[0.8, 0.8, 0.75]}
          />
        </group>

        <group
          visible={show("skull")}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2.5}
        >
          <ToonMesh
            geometry={nodes.Hatskull001_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
            position={[0.672, 0, 0]}
            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
            scale={[0.167, 0.125, 0.125]}
          />
          <ToonMesh
            geometry={nodes.Hat001_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
            scale={[0.667, 0.667, 0.833]}
          />
        </group>

        <group
          visible={show("beret")}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2.5}
        >
          <ToonMesh
            geometry={nodes.Circle_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
          />
          <ToonMesh
            geometry={nodes.Plane_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
            position={[-0.064, 0.067, 1.022]}
          />
        </group>

        <group
          visible={show("cowboy")}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2.5}
        >
          <ToonMesh
            geometry={nodes.Hat002_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
          />
        </group>

        <group
          visible={show("box")}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2.5}
        >
          {nodes["Círculo001_HatsMaterial_0"] && (
            <ToonMesh
              geometry={nodes["Círculo001_HatsMaterial_0"].geometry}
              toonMat={toonMat}
              outlineMat={outlineMat}
            />
          )}
          <ToonMesh
            geometry={nodes.Cubo_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
          />
        </group>

        <group
          visible={show("cross")}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2.5}
        >
          {nodes["Círculo002_HatsMaterial_0"] && (
            <ToonMesh
              geometry={nodes["Círculo002_HatsMaterial_0"].geometry}
              toonMat={toonMat}
              outlineMat={outlineMat}
            />
          )}
          <ToonMesh
            geometry={nodes.Cubo001_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
          />
          {nodes["Círculo004_HatsMaterial_0"] && (
            <ToonMesh
              geometry={nodes["Círculo004_HatsMaterial_0"].geometry}
              toonMat={toonMat}
              outlineMat={outlineMat}
              rotation={[0, 0, Math.PI / 2]}
            />
          )}
          <ToonMesh
            geometry={nodes.Cubo003_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
            rotation={[0, 0, Math.PI / 2]}
          />
          <ToonMesh
            geometry={nodes.Cubo004_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
          />
        </group>

        <group
          visible={show("wizard")}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2.5}
        >
          <ToonMesh
            geometry={nodes.Hat003_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
          />
        </group>

        <group
          visible={show("witch")}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2.5}
        >
          <ToonMesh
            geometry={nodes.Hat_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
          />
        </group>

        <group
          visible={show("drum")}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2.5}
        >
          <ToonMesh
            geometry={nodes.Cilindro002_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
            scale={[0.75, 0.75, 0.375]}
          />
          <ToonMesh
            geometry={nodes.Cilindro004_HatsMaterial_0.geometry}
            toonMat={toonMat}
            outlineMat={outlineMat}
            position={[0, 0, -0.187]}
            scale={0.375}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(HATS_MODEL_PATH);
