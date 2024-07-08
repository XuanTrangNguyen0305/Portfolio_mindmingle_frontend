import * as THREE from "three";
import React from "react";
import {
  GradientTexture,
  GradientType,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Tea: THREE.Mesh;
  };
  materials: {
    blinn2SG: THREE.MeshPhysicalMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("./3D/Tea.glb") as GLTFResult;

  // Load gradient texture
  const gradientMap = useTexture("/angryimg.png");
  gradientMap.minFilter = THREE.NearestFilter;
  gradientMap.magFilter = THREE.NearestFilter;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tea.geometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial>
          <GradientTexture
            stops={[0, 0.3, 1]} // As many stops as you want
            colors={["Brown", "Coral", "White"]} // Colors need to match the number of stops
            size={1024} // Size is optional, default = 1024
          />
        </meshBasicMaterial>
      </mesh>
    </group>
  );
}

useGLTF.preload("/Tea.glb");
