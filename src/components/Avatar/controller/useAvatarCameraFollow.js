import { useRef } from "react";
import { Vector3 } from "three";
import { getSafeCameraPosition } from "../../camera/useCameraCollision";

export function useAvatarCameraFollow({ cameraTarget, cameraPosition }) {
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());

  function updateCameraFollow(state) {
    if (!cameraPosition.current || !cameraTarget.current) return;

    cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);

    const safeCameraPosition = getSafeCameraPosition({
      from: cameraLookAtWorldPosition.current,
      to: cameraWorldPosition.current,
      scene: state.scene,
    });

    state.camera.position.lerp(safeCameraPosition, 0.1);

    cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);
    state.camera.lookAt(cameraLookAt.current);
  }

  return updateCameraFollow;
}