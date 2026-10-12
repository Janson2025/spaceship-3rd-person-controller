import React from "react";
import { useGLTF } from "@react-three/drei";

import { elevatorConfig } from "./elevatorConfig";

export function ElevatorBasket(props) {
  const { nodes } = useGLTF("/models/elevator.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.frate_elevator.geometry}
        material={nodes.frate_elevator.material}
        position={elevatorConfig.basketLocalPosition}
        castShadow
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload("/models/elevator.glb");