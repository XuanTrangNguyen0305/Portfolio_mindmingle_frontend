/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import {
  GradientTexture,
  GradientType,
  Outlines,
  useGLTF,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Tea: THREE.Mesh;
  };
  materials: {
    Tea_initialShadingGroup: THREE.MeshPhysicalMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./3D/Tea.glb") as GLTFResult;
  return (
    <group {...props} dispose={null} renderOrder={1}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tea.geometry}
        material={materials.Tea_initialShadingGroup}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial
          transparent
          opacity={0.3}
          transmission={0.9}
          ior={1.1}
          color="#C5E3C5"
        ></meshPhysicalMaterial>
        <Outlines thickness={0.1} color={"#5A9168"} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Tea.glb");
