import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Duck_Bottle_2: THREE.Mesh;
  };
  materials: {};
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./3D/Duck_Bottle_2.glb") as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Duck_Bottle_2.geometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial
          transparent
          opacity={0.6}
          thickness={1}
          ior={1}
          roughness={0.4}
          clearcoat={0.8}
          color={"#ffffff"}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Duck_Bottle_2.glb");
