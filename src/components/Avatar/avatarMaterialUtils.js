import * as THREE from "three";
import {
  AVATAR_MATERIAL_CONFIG,
  AVATAR_MATERIAL_PRESETS,
} from "./avatarMaterialConfig";

function mergeMaterialSettings(presetName, override = {}) {
  const preset =
    AVATAR_MATERIAL_PRESETS[presetName] ?? AVATAR_MATERIAL_PRESETS.default;

  return {
    ...preset,
    ...override,
  };
}

export function createAvatarMaterial(baseMaterial, options = {}) {
  if (!baseMaterial) return null;

  const { presetName = "default", override = {} } = options;

  const settings = mergeMaterialSettings(presetName, override);

  const material = baseMaterial.clone();

  if (material.color && settings.tint) {
    material.color = new THREE.Color(settings.tint);
  }

  if ("roughness" in material && settings.roughness !== undefined) {
    material.roughness = settings.roughness;
  }

  if ("metalness" in material && settings.metalness !== undefined) {
    material.metalness = settings.metalness;
  }

  if ("transparent" in material && settings.transparent !== undefined) {
    material.transparent = settings.transparent;
  }

  if ("opacity" in material && settings.opacity !== undefined) {
    material.opacity = settings.opacity;
  }

  material.needsUpdate = true;

  return material;
}

export function createAvatarMaterials(materials, materialOverrides = {}) {
  return Object.fromEntries(
    Object.entries(AVATAR_MATERIAL_CONFIG).map(([slotName, config]) => {
      const baseMaterial = materials[config.sourceMaterialName];

      return [
        slotName,
        createAvatarMaterial(baseMaterial, {
          presetName: config.presetName,
          override: materialOverrides[slotName],
        }),
      ];
    })
  );
}