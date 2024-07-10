import * as THREE from "three";
import React from "react";
import {
  GradientTexture,
  GradientType,
  Outlines,
  useGLTF,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Tea: THREE.Mesh;
  };
  materials: {
    Tea_Tea_initialShadingGroup: THREE.MeshPhysicalMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("./3D/Tea.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tea.geometry}
        material={materials.Tea_Tea_initialShadingGroup}
        rotation={[Math.PI / 2, 0, 0]}
      >
        {/* <meshBasicMaterial>
          <GradientTexture
            stops={[0.9, 0.4, 0.6]} // As many stops as you want
            colors={["brown", "coral", "red"]} // Colors need to match the number of stops
            size={1024} // Size is optional, default = 1024'
          />
        </meshBasicMaterial> */}
        <meshPhysicalMaterial
          transparent
          opacity={0.4}
          transmission={0.6}
          ior={1.1}
          color="#8A2B2B"
        >
          {/* <GradientTexture
            stops={[0.9, 0.4, 0.6]} // As many stops as you want
            colors={["brown", "coral", "red"]} // Colors need to match the number of stops
            size={1024} // Size is optional, default = 1024'
            rotation={-90}
          /> */}
        </meshPhysicalMaterial>
        <Outlines thickness={0.1} color={"#463333"} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Tea.glb");
