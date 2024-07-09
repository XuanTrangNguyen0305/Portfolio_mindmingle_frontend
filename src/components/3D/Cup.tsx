import * as THREE from "three";
import React, { useRef } from "react";
import { Outlines, Resize, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { MeshTransmissionMaterial } from "@react-three/drei";

type GLTFResult = GLTF & {
  nodes: {
    Cup: THREE.Mesh;
  };
  materials: {};
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./3D/Cup2.glb") as GLTFResult;
  return (
    <group {...props} dispose={null} renderOrder={99}>
      <mesh geometry={nodes.Cup.geometry} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          transparent
          opacity={0.35}
          side={THREE.BackSide}
          color={"#ffffff"}
          roughness={1}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Cup2.glb");
