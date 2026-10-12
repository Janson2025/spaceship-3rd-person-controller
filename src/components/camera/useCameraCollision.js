import { Raycaster, Vector3 } from "three";

const raycaster = new Raycaster();
const cameraDirection = new Vector3();
const safeCameraPosition = new Vector3();

export const getSafeCameraPosition = ({
  from,
  to,
  scene,
  collisionOffset = 0.2,
  minDistance = 0.4,
}) => {
  cameraDirection.subVectors(to, from);

  const cameraDistance = cameraDirection.length();

  if (cameraDistance === 0) {
    return safeCameraPosition.copy(to);
  }

  cameraDirection.normalize();

  raycaster.set(from, cameraDirection);
  raycaster.far = cameraDistance;

  const hits = raycaster.intersectObjects(scene.children, true);

  const cameraCollisionHit = hits.find((hit) => {
    return !hit.object.userData?.ignoreCameraCollision;
  });

  if (cameraCollisionHit) {
    return safeCameraPosition
      .copy(from)
      .addScaledVector(
        cameraDirection,
        Math.max(cameraCollisionHit.distance - collisionOffset, minDistance)
      );
  }

  return safeCameraPosition.copy(to);
};