import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { MeshTransmissionMaterial } from "@react-three/drei";

type GLTFResult = GLTF & {
  nodes: {
    Cup: THREE.Mesh;
  };
  materials: {};
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("3D/cup.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cup.geometry}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Cup" }}
      >
        <MeshTransmissionMaterial opacity={0.9} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/cup.glb");
