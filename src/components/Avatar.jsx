import React, { useEffect, useMemo, useRef } from "react";
import { useGraph } from "@react-three/fiber";
import { useFBX, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

import { avatarAnimationFiles } from "./animations/animationFiles";
import { AVATAR_ANIMATION } from "./animations/animationNames";
import { useCharacterAnimations } from "./animations/useCharacterAnimations";

import { AVATAR_MESH_PARTS } from "./avatar/avatarMeshParts";
import { createAvatarMaterials } from "./avatar/avatarMaterialUtils";

export function Avatar({
  animation = AVATAR_ANIMATION.IDLE,
  materialOverrides = {},
  ...props
}) {
  const group = useRef();

  const { scene } = useGLTF("/models/Avatar_materials.glb");

  const idle = useFBX(avatarAnimationFiles[AVATAR_ANIMATION.IDLE]);
  const walk = useFBX(avatarAnimationFiles[AVATAR_ANIMATION.WALK]);
  const run = useFBX(avatarAnimationFiles[AVATAR_ANIMATION.RUN]);
  const jump = useFBX(avatarAnimationFiles[AVATAR_ANIMATION.JUMP]);
  const fallingIdle = useFBX(avatarAnimationFiles[AVATAR_ANIMATION.FALLING_IDLE]);
  const landing = useFBX(avatarAnimationFiles[AVATAR_ANIMATION.LANDING]);

  const looking = useFBX(avatarAnimationFiles[AVATAR_ANIMATION.LOOKING]);
  const honkingHorn = useFBX(avatarAnimationFiles[AVATAR_ANIMATION.HONKING_HORN]);

  const runningUpStairs = useFBX(
    avatarAnimationFiles[AVATAR_ANIMATION.RUNNING_UP_STAIRS]
  );

  const sitting = useFBX(avatarAnimationFiles[AVATAR_ANIMATION.SITTING]);
  const seatedIdle = useFBX(avatarAnimationFiles[AVATAR_ANIMATION.SEATED_IDLE]);
  const standToSit = useFBX(avatarAnimationFiles[AVATAR_ANIMATION.STAND_TO_SIT]);
  const sitToStand = useFBX(avatarAnimationFiles[AVATAR_ANIMATION.SIT_TO_STAND]);
  const sitToType = useFBX(avatarAnimationFiles[AVATAR_ANIMATION.SIT_TO_TYPE]);
  const typing = useFBX(avatarAnimationFiles[AVATAR_ANIMATION.TYPING]);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  const avatarMaterials = useMemo(() => {
    return createAvatarMaterials(materials, materialOverrides);
  }, [materials, materialOverrides]);

  const animations = useMemo(() => {
    const loadedAnimations = [
      [AVATAR_ANIMATION.IDLE, idle],
      [AVATAR_ANIMATION.WALK, walk],
      [AVATAR_ANIMATION.RUN, run],
      [AVATAR_ANIMATION.JUMP, jump],
      [AVATAR_ANIMATION.FALLING_IDLE, fallingIdle],
      [AVATAR_ANIMATION.LANDING, landing],
      [AVATAR_ANIMATION.LOOKING, looking],
      [AVATAR_ANIMATION.HONKING_HORN, honkingHorn],
      [AVATAR_ANIMATION.RUNNING_UP_STAIRS, runningUpStairs],
      [AVATAR_ANIMATION.SITTING, sitting],
      [AVATAR_ANIMATION.SEATED_IDLE, seatedIdle],
      [AVATAR_ANIMATION.STAND_TO_SIT, standToSit],
      [AVATAR_ANIMATION.SIT_TO_STAND, sitToStand],
      [AVATAR_ANIMATION.SIT_TO_TYPE, sitToType],
      [AVATAR_ANIMATION.TYPING, typing],
    ];

    return loadedAnimations
      .map(([name, fbx]) => {
        const clip = fbx.animations[0];

        if (!clip) return null;

        clip.name = name;
        return clip;
      })
      .filter(Boolean);
  }, [
    idle,
    walk,
    run,
    jump,
    fallingIdle,
    landing,
    looking,
    honkingHorn,
    runningUpStairs,
    sitting,
    seatedIdle,
    standToSit,
    sitToStand,
    sitToType,
    typing,
  ]);

  useCharacterAnimations(animations, group, animation);

  useEffect(() => {
    clone.traverse((child) => {
      if (child.isMesh || child.isSkinnedMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = false;
      }
    });
  }, [clone]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips} />

      {AVATAR_MESH_PARTS.map((part) => {
        const node = nodes[part.nodeName];
        const material = avatarMaterials[part.materialSlot];

        if (!node) {
          console.warn(`Missing avatar node: ${part.nodeName}`);
          return null;
        }

        if (!material) {
          console.warn(`Missing avatar material slot: ${part.materialSlot}`);
          return null;
        }

        return (
          <skinnedMesh
            key={part.nodeName}
            name={part.meshName}
            geometry={node.geometry}
            material={material}
            skeleton={node.skeleton}
            morphTargetDictionary={node.morphTargetDictionary}
            morphTargetInfluences={node.morphTargetInfluences}
            castShadow
            receiveShadow
            frustumCulled={false}
          />
        );
      })}
    </group>
  );
}

useGLTF.preload("/models/Avatar_materials.glb");

Object.values(avatarAnimationFiles).forEach((file) => {
  useFBX.preload(file);
});