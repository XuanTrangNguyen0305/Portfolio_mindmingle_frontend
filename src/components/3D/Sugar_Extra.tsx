/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Sugar_Extra: THREE.Mesh;
  };
  materials: {};
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./3D/Sugar_Extra.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sugar_Extra.geometry}
        material={nodes.Sugar_Extra.material}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial
          color={"white"}
          roughness={0.1}
          thickness={0.2}
          ior={9}
          clearcoat={0.2}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Sugar_Extra.glb");
