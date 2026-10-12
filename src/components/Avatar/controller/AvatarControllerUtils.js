import { MathUtils } from "three";

export const HORIZONTAL_KEYS = {
  LEFT: "left",
  RIGHT: "right",
};

export const BACKWARD_LEFT_ROTATION = Math.PI - 0.001;
export const BACKWARD_RIGHT_ROTATION = -Math.PI + 0.001;

export const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;

  return angle;
};

export const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(MathUtils.lerp(start, end, t));
};

export const getKeyboardMovementInput = (controls) => {
  return {
    turnInput: Number(controls.left) - Number(controls.right),
    moveInput: Number(controls.forward) - Number(controls.backward),
  };
};

export const updateLastHorizontalKeyFromControls = ({
  controls,
  lastHorizontalKey,
}) => {
  if (controls.left) {
    lastHorizontalKey.current = HORIZONTAL_KEYS.LEFT;
  }

  if (controls.right) {
    lastHorizontalKey.current = HORIZONTAL_KEYS.RIGHT;
  }
};

export const getMouseMovementInput = ({
  keyboardInput,
  mouse,
  isClicking,
  mouseTurnSensitivity = 1.5,
  mouseMoveSensitivity = 1.4,
  mouseDeadZone = 0.08,
  runThreshold = 0.55,
}) => {
  if (!isClicking) {
    return {
      ...keyboardInput,
      mouseDistanceFromCenter: 0,
      isMouseRunning: false,
      mouseTurnInput: 0,
      mouseX: 0,
    };
  }

  const mouseDistanceFromCenter = MathUtils.clamp(
    Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y),
    0,
    1
  );

  const mouseTurnInput = Math.abs(mouse.x) < mouseDeadZone ? 0 : -mouse.x;
  const mouseMoveInput = Math.abs(mouse.y) < mouseDeadZone ? 0 : mouse.y;

  return {
    turnInput: keyboardInput.turnInput + mouseTurnInput * mouseTurnSensitivity,
    moveInput: keyboardInput.moveInput + mouseMoveInput * mouseMoveSensitivity,
    mouseDistanceFromCenter,
    isMouseRunning: mouseDistanceFromCenter >= runThreshold,
    mouseTurnInput,
    mouseX: mouse.x,
  };
};

export const clampMovementInput = ({ turnInput, moveInput }) => {
  return {
    turnInput: MathUtils.clamp(turnInput, -1, 1),
    moveInput: MathUtils.clamp(moveInput, -1, 1),
  };
};

export const getBackwardCharacterRotation = (lastHorizontalKey) => {
  return lastHorizontalKey === HORIZONTAL_KEYS.LEFT
    ? BACKWARD_LEFT_ROTATION
    : BACKWARD_RIGHT_ROTATION;
};

export const getCharacterRotationTarget = ({
  moveInput,
  lastHorizontalKey,
  mouseX = 0,
  isClicking = false,
  mouseDeadZone = 0.08,
}) => {
  if (moveInput > 0) {
    return 0;
  }

  if (isClicking && Math.abs(mouseX) > mouseDeadZone) {
    return mouseX < 0
      ? BACKWARD_LEFT_ROTATION
      : BACKWARD_RIGHT_ROTATION;
  }

  return getBackwardCharacterRotation(lastHorizontalKey);
};

export const getMovementVelocity = ({ direction, speed, moveInput }) => {
  return {
    x: Math.sin(direction) * speed * moveInput,
    z: Math.cos(direction) * speed * moveInput,
  };
};

export const getAnimationName = ({ moveInput, isRunning }) => {
  if (moveInput === 0) {
    return "idle";
  }

  return isRunning ? "run" : "walk";
};