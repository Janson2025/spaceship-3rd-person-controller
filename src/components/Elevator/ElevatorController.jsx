import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

export function ElevatorController({
  rb,
  elevatorState,
  basePosition = [0, 0, 0],
  floors = [0, 3, 6, 9],
  speed = 0.5,
  waitTime = 1.25,
}) {
  const currentFloorIndex = useRef(0);
  const direction = useRef(1);
  const waitTimer = useRef(waitTime);
  const currentY = useRef(basePosition[1] + floors[0]);

  useFrame((_, delta) => {
    if (!rb.current) return;

    if (waitTimer.current > 0) {
      waitTimer.current -= delta;

      rb.current.setNextKinematicTranslation({
        x: basePosition[0],
        y: currentY.current,
        z: basePosition[2],
      });

      elevatorState.current.currentY = currentY.current;
      elevatorState.current.floorIndex = currentFloorIndex.current;
      elevatorState.current.direction = direction.current;

      return;
    }

    const targetY = basePosition[1] + floors[currentFloorIndex.current];

    currentY.current = MathUtils.damp(
      currentY.current,
      targetY,
      speed,
      delta
    );

    rb.current.setNextKinematicTranslation({
      x: basePosition[0],
      y: currentY.current,
      z: basePosition[2],
    });

    elevatorState.current.currentY = currentY.current;
    elevatorState.current.floorIndex = currentFloorIndex.current;
    elevatorState.current.direction = direction.current;

    const reachedFloor = Math.abs(currentY.current - targetY) < 0.02;

    if (!reachedFloor) return;

    currentY.current = targetY;
    waitTimer.current = waitTime;

    const nextFloorIndex = currentFloorIndex.current + direction.current;

    if (nextFloorIndex >= floors.length) {
      direction.current = -1;
      currentFloorIndex.current = floors.length - 2;
      return;
    }

    if (nextFloorIndex < 0) {
      direction.current = 1;
      currentFloorIndex.current = 1;
      return;
    }

    currentFloorIndex.current = nextFloorIndex;
  });

  return null;
}