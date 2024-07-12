/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { Outlines, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Flavor_Sakura: THREE.Mesh;
  };
  materials: {};
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./3D/Flavor_Sakura.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Flavor_Sakura.geometry}
        material={nodes.Flavor_Sakura.material}
        rotation={[Math.PI / 2, 0, 0]}
      >
        {" "}
        <meshPhysicalMaterial
          color={"#F5D3E5"}
          opacity={9}
          transmission={0.6}
          thickness={0.8}
          ior={1}
          roughness={0.2}
          clearcoat={0.6}
        />
        <Outlines thickness={0.05} color={"#FFB7C5"} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Flavor_Strawberry.glb");
