import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { Vector3 } from "three";

import { AvatarRig } from "./AvatarRig";
import { useAvatarClickInput } from "./useAvatarClickInput";
import { useAvatarControlLevaControls } from "./useAvatarControlLevaControls";
import { useAvatarCameraFollow } from "./useAvatarCameraFollow";
import { useAvatarMaterialLevaControls } from "../AvatarMaterialLevaControls";

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

export const AvatarController = () => {
  const { camera } = useThree();

  const { USE_ORBIT_CONTROLS, WALK_SPEED, RUN_SPEED, ROTATION_SPEED } =
    useAvatarControlLevaControls();

  const materialOverrides = useAvatarMaterialLevaControls();

  const rb = useRef(null);
  const container = useRef(null);
  const character = useRef(null);

  const cameraTarget = useRef(null);
  const cameraPosition = useRef(null);
  const orbitControls = useRef(null);

  const orbitTarget = useRef(new Vector3(0, 1, 0));

  const rotationTarget = useRef(0);
  const characterRotationTarget = useRef(0);
  const lastHorizontalKey = useRef(HORIZONTAL_KEYS.LEFT);

  const wasJumpPressed = useRef(false);

  const [animation, setAnimation] = useState("idle");

  const [, get] = useKeyboardControls();
  const isClicking = useAvatarClickInput();

  const updateCameraFollow = useAvatarCameraFollow({
    cameraTarget,
    cameraPosition,
  });

  const updateAnimation = (nextAnimation) => {
    setAnimation((currentAnimation) =>
      currentAnimation === nextAnimation ? currentAnimation : nextAnimation
    );
  };

  useEffect(() => {
    if (!USE_ORBIT_CONTROLS) return;
    if (!cameraTarget.current) return;

    cameraTarget.current.getWorldPosition(orbitTarget.current);

    if (orbitControls.current) {
      orbitControls.current.target.copy(orbitTarget.current);
      orbitControls.current.update();
    }
  }, [USE_ORBIT_CONTROLS]);

  useFrame((state) => {
    const controls = get();

    const jumpPressed = controls.jump;
    const justPressedJump = jumpPressed && !wasJumpPressed.current;
    wasJumpPressed.current = jumpPressed;

    updateLastHorizontalKeyFromControls({
      controls,
      lastHorizontalKey,
    });

    if (rb.current) {
      const vel = rb.current.linvel();

      const isGrounded = Math.abs(vel.y) < 0.05;
      const isJumping = vel.y > 0.1;
      const isFalling = vel.y < -0.1;

      if (justPressedJump && isGrounded) {
        vel.y = 4.5;
      }

      const keyboardInput = getKeyboardMovementInput(controls);

      const mouseInput = getMouseMovementInput({
        keyboardInput,
        mouse: state.mouse,
        isClicking: isClicking.current && !USE_ORBIT_CONTROLS,
      });

      const { turnInput, moveInput } = clampMovementInput(mouseInput);

      const isRunning = controls.run || mouseInput.isMouseRunning;
      const speed = isRunning ? RUN_SPEED : WALK_SPEED;

      if (turnInput !== 0) {
        rotationTarget.current += ROTATION_SPEED * turnInput;
      }

      if (moveInput !== 0) {
        characterRotationTarget.current = getCharacterRotationTarget({
          moveInput,
          lastHorizontalKey: lastHorizontalKey.current,
          mouseX: mouseInput.mouseX,
          isClicking: isClicking.current && !USE_ORBIT_CONTROLS,
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

      if (isJumping) {
        updateAnimation("jump");
      } else if (isFalling) {
        updateAnimation("fallingIdle");
      } else {
        updateAnimation(
          getAnimationName({
            moveInput,
            isRunning,
          })
        );
      }

      rb.current.setLinvel(vel, true);
    }

    if (container.current) {
      container.current.rotation.y = lerpAngle(
        container.current.rotation.y,
        rotationTarget.current,
        0.3
      );
    }

    if (character.current) {
      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.3
      );
    }

    if (!USE_ORBIT_CONTROLS) {
      updateCameraFollow(state);
    }
  });

  return (
    <>
      {USE_ORBIT_CONTROLS && (
        <OrbitControls
          ref={orbitControls}
          args={[camera]}
          makeDefault
          enablePan
          enableZoom
          enableRotate
          target={[
            orbitTarget.current.x,
            orbitTarget.current.y,
            orbitTarget.current.z,
          ]}
        />
      )}

      <AvatarRig
        rb={rb}
        container={container}
        character={character}
        cameraTarget={cameraTarget}
        cameraPosition={cameraPosition}
        animation={animation}
        materialOverrides={materialOverrides}
      />
    </>
  );
};