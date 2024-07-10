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
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cup.geometry}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Cup" }}
      >
        <meshPhysicalMaterial
          transparent
          opacity={0.4}
          transmission={0.6}
          thickness={0.8}
          ior={1}
          roughness={0}
          clearcoat={0.6}
          color={"#a7a7a7"}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Cup2.glb");
