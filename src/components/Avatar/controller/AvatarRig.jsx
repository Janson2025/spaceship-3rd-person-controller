import { BallCollider, CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Avatar } from "../../Avatar";

export function AvatarRig({
  rb,
  container,
  character,
  cameraTarget,
  cameraPosition,
  animation,
  materialOverrides,
}) {
  return (
    <RigidBody
      ref={rb}
      colliders={false}
      lockRotations
      position={[-10.0, -3.75, -5.0]} 
      type="dynamic"
    >
      <group ref={container}>
        <group ref={cameraTarget} position-y={1.05} position-z={0} />

        <group
          ref={cameraPosition}
          position-y={1.5}
          position-x={-0.2}
          position-z={-1.5}
        />

        <group ref={character} userData={{ ignoreCameraCollision: true }}>
          <Avatar
            scale={0.35}
            position-y={0.475}
            rotation-x={-Math.PI / 2}
            animation={animation}
            materialOverrides={materialOverrides}
          />
        </group>

        <CapsuleCollider args={[0.05, 0.15]} position={[0, 0.8, 0]} visible={false}/>
        {/* <CapsuleCollider args={[0.05, 0.25]} position={[0, 0.8, 0]} /> */}
        <BallCollider args={[0.175]} position={[0, 0.65, 0]} visible={false} />
      </group>
    </RigidBody>
  );
}