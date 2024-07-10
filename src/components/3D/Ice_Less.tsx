/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Less_Ice: THREE.Mesh;
  };
  materials: {};
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./3D/Less_Ice.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Less_Ice.geometry}
        material={nodes.Less_Ice.material}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial
          // clearcoat={0.6}
          color={"#1e90ff"}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Less_Ice.glb");
