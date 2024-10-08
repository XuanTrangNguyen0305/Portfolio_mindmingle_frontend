/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Panda_Cup2: THREE.Mesh;
  };
  materials: {};
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./3D/Panda_Cup2.glb") as GLTFResult;
  return (
    <group {...props} dispose={null} renderOrder={99}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Panda_Cup2.geometry}
        material={nodes.Panda_Cup2.material}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial
          transparent
          opacity={0.4}
          transmission={0.6}
          thickness={0.8}
          ior={1.3}
          roughness={0.8}
          clearcoat={0.6}
          color={"white"}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Panda_Cup2.glb");
