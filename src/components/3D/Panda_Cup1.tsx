/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Panda_Cup1: THREE.Mesh;
  };
  materials: {};
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./3D/Panda_Cup1.glb") as GLTFResult;
  return (
    <group {...props} dispose={null} renderOrder={99}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Panda_Cup1.geometry}
        material={nodes.Panda_Cup1.material}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial color={"black"} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Panda_Cup1.glb");
