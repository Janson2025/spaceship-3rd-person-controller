import { useRef } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

import { ElevatorBasket } from "./ElevatorBasket";
import { ElevatorCables } from "./ElevatorCables";
import { ElevatorController } from "./ElevatorController";
import { elevatorConfig } from "./elevatorConfig";

export function ElevatorRig({
  position = elevatorConfig.position,
  rotation = elevatorConfig.rotation,
  scale = elevatorConfig.scale,
  floors = elevatorConfig.floors,
  speed = elevatorConfig.speed,
  waitTime = elevatorConfig.waitTime,
}) {
  const rb = useRef(null);

  const elevatorState = useRef({
    currentY: position[1] + floors[0],
    floorIndex: 0,
    direction: 1,
  });

  return (
    <>
      <RigidBody
        ref={rb}
        type="kinematicPosition"
        colliders={false}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <ElevatorBasket />

        <CuboidCollider
          args={[1.25, 0.12, 1.25]}
          position={elevatorConfig.basketLocalPosition}
        />
      </RigidBody>

      <ElevatorCables
        elevatorState={elevatorState}
        basePosition={position}
        scale={scale}
      />

      <ElevatorController
        rb={rb}
        elevatorState={elevatorState}
        basePosition={position}
        floors={floors}
        speed={speed}
        waitTime={waitTime}
      />
    </>
  );
}