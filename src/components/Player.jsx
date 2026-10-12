import { Avatar } from "./Avatar";
import { AVATAR_ANIMATION } from "../animations/animationNames";

export function Player({
  animation = AVATAR_ANIMATION.IDLE,
  scale = 0.18,
  ...props
}) {
  return (
    <Avatar
      scale={scale}
      rotation-x={-Math.PI / 2}
      animation={animation}
      {...props}
    />
  );
}