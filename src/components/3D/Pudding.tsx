/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { Outlines, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Pudding: THREE.Mesh;
  };
  materials: {};
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./3D/Pudding.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pudding.geometry}
        material={nodes.Pudding.material}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial color={"#F5C26E"} roughness={0.4} />
        <Outlines thickness={0.1} color={"Orange"} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Pudding.glb");
