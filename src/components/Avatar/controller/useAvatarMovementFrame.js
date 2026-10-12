import { useState } from "react";

import {
  HORIZONTAL_KEYS,
  lerpAngle,
  getKeyboardMovementInput,
  updateLastHorizontalKeyFromControls,
  getMouseMovementInput,
  clampMovementInput,
  getCharacterRotationTarget,
  getMovementVelocity,
  getAnimationName,
} from "./AvatarControllerUtils";

export function useAvatarMovementFrame({
  rb,
  container,
  character,
  getControls,
  isClicking,
  walkSpeed,
  runSpeed,
  rotationSpeed,
  rotationTarget,
  characterRotationTarget,
  lastHorizontalKey,
}) {
  const [animation, setAnimation] = useState("idle");

  const updateAnimation = (nextAnimation) => {
    setAnimation((currentAnimation) =>
      currentAnimation === nextAnimation ? currentAnimation : nextAnimation
    );
  };

  function updateAvatarMovementFrame(state) {
    const controls = getControls();

    updateLastHorizontalKeyFromControls({
      controls,
      lastHorizontalKey,
    });

    if (rb.current) {
      const vel = rb.current.linvel();

      const keyboardInput = getKeyboardMovementInput(controls);

      const mouseInput = getMouseMovementInput({
        keyboardInput,
        mouse: state.mouse,
        isClicking: isClicking.current,
      });

      const { turnInput, moveInput } = clampMovementInput(mouseInput);

      const isRunning = controls.run || mouseInput.isMouseRunning;
      const speed = isRunning ? runSpeed : walkSpeed;

      if (turnInput !== 0) {
        rotationTarget.current += rotationSpeed * turnInput;
      }

      if (moveInput !== 0) {
        characterRotationTarget.current = getCharacterRotationTarget({
          moveInput,
          lastHorizontalKey: lastHorizontalKey.current,
          mouseX: mouseInput.mouseX,
          isClicking: isClicking.current,
        });

        const movementVelocity = getMovementVelocity({
          direction: rotationTarget.current,
          speed,
          moveInput,
        });

        vel.x = movementVelocity.x;
        vel.z = movementVelocity.z;
      } else {
        vel.x = 0;
        vel.z = 0;
      }

      updateAnimation(
        getAnimationName({
          moveInput,
          isRunning,
        })
      );

      rb.current.setLinvel(vel, true);
    }

    if (container.current) {
      container.current.rotation.y = lerpAngle(
        container.current.rotation.y,
        rotationTarget.current,
        0.1
      );
    }

    if (character.current) {
      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.1
      );
    }
  }

  return {
    animation,
    updateAvatarMovementFrame,
  };
}

export function createAvatarMovementRefs(useRef) {
  return {
    rotationTarget: useRef(0),
    characterRotationTarget: useRef(0),
    lastHorizontalKey: useRef(HORIZONTAL_KEYS.LEFT),
  };
}