/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Duck_Bottle_1: THREE.Mesh;
  };
  materials: {};
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./3D/Duck_Bottle_1.glb") as GLTFResult;
  return (
    <group {...props} dispose={null} renderOrder={99}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Duck_Bottle_1.geometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial color="#b7a71b" />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Duck_Bottle_1.glb");
