import { AVATAR_ANIMATION } from "./animationNames";

export function getMovementAnimation({
  isMoving = false,
  isRunning = false,
  isJumping = false,
  isFalling = false,
  isLanding = false,
} = {}) {
  if (isLanding) return AVATAR_ANIMATION.LANDING;
  if (isFalling) return AVATAR_ANIMATION.FALLING_IDLE;
  if (isJumping) return AVATAR_ANIMATION.JUMP;
  if (isMoving && isRunning) return AVATAR_ANIMATION.RUN;
  if (isMoving) return AVATAR_ANIMATION.WALK;

  return AVATAR_ANIMATION.IDLE;
}