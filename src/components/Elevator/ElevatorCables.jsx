import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { MathUtils } from "three";

import { elevatorConfig } from "./elevatorConfig";

export function ElevatorCables({
  elevatorState,
  basePosition = elevatorConfig.position,
  scale = elevatorConfig.scale,
  cableTopY = elevatorConfig.cableTopY,
  minCableScaleY = elevatorConfig.minCableScaleY,
}) {
  const cableScaleGroup = useRef(null);
  const { nodes, materials } = useGLTF("/models/elevator.glb");

  const cableLocalPosition = elevatorConfig.cableLocalPosition;
  const basketLocalPosition = elevatorConfig.basketLocalPosition;

  const originalCableLength = cableTopY - basketLocalPosition[1];

  useFrame(() => {
    if (!cableScaleGroup.current) return;

    const currentElevatorY = elevatorState.current.currentY;
    const elevatorTravelY = currentElevatorY - basePosition[1];

    const currentCableLength = originalCableLength - elevatorTravelY;

    const nextScaleY = MathUtils.clamp(
      currentCableLength / originalCableLength,
      minCableScaleY,
      1
    );

    cableScaleGroup.current.scale.y = nextScaleY;
  });

  return (
    <group
      position={[
        basePosition[0],
        basePosition[1] + cableTopY,
        basePosition[2] + cableLocalPosition[2],
      ]}
      scale={scale}
    >
      <group ref={cableScaleGroup}>
        <mesh
          geometry={nodes.frate_elevator_cables.geometry}
          material={materials["metal cable"]}
          position={[
            cableLocalPosition[0],
            cableLocalPosition[1] - cableTopY,
            0,
          ]}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/elevator.glb");