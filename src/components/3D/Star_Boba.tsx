/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { Float, Outlines, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Star_Boba: THREE.Mesh;
  };
  materials: {
    phong1SG: THREE.MeshPhysicalMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./3D/Star_Boba.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Star_Boba.geometry}
        material={materials.phong1SG}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial color={"yellow"} roughness={0.9} />{" "}
        <Outlines thickness={0.1} color={"orange"} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Star_Boba.glb");
