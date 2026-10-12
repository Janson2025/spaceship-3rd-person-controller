import { useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { LoopOnce, LoopRepeat } from "three";
import { avatarAnimationConfig } from "./animationConfig";

export function useCharacterAnimations(animations, group, currentAnimation) {
  const { actions, mixer } = useAnimations(animations, group);
  const previousAnimation = useRef(null);

  useEffect(() => {
    const config = avatarAnimationConfig[currentAnimation];
    const action = actions?.[currentAnimation];

    if (!action || !config) return;

    const previousAction = actions?.[previousAnimation.current];

    if (previousAction && previousAction !== action) {
      previousAction.fadeOut(config.fade ?? 0.2);
    }

    action.reset();
    action.setLoop(config.loop ? LoopRepeat : LoopOnce);
    action.clampWhenFinished = !config.loop;
    action.fadeIn(config.fade ?? 0.2);
    action.play();

    previousAnimation.current = currentAnimation;
  }, [actions, currentAnimation]);

  return {
    actions,
    mixer,
  };
}