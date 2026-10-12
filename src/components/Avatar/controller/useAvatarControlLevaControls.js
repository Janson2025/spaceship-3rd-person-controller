import { MathUtils } from "three";
import { useControls } from "leva";

export function useAvatarControlLevaControls() {
  return useControls("Avatar Control", {
    USE_ORBIT_CONTROLS: false,
    SHOW_COLLIDERS: false,

    WALK_SPEED: { value: 0.8, min: 0.1, max: 4, step: 0.1 },
    RUN_SPEED: { value: 1.6, min: 0.1, max: 4, step: 0.1 },
    ROTATION_SPEED: {
      value: MathUtils.degToRad(0.5),
      min: MathUtils.degToRad(0.1),
      max: MathUtils.degToRad(2),
      step: MathUtils.degToRad(0.1),
    },
  });
}