import * as THREE from "three";

export const AVATAR_MATERIAL_PRESETS = {
  default: {
    color: "#ffffff",
    roughness: 0.55,
    metalness: 0.0,
  },

  softCloth: {
    color: "#d8c3a5",
    roughness: 0.9,
    metalness: 0.0,
  },

  shinyRed: {
    color: "#b83232",
    roughness: 0.25,
    metalness: 0.15,
  },
};

export function createAvatarMaterial(baseMaterial, presetName = "default") {
  if (!baseMaterial) return null;

  const preset =
    AVATAR_MATERIAL_PRESETS[presetName] ?? AVATAR_MATERIAL_PRESETS.default;

  const material = baseMaterial.clone();

  if (material.color && preset.color) {
    material.color = new THREE.Color(preset.color);
  }

  if ("roughness" in material && preset.roughness !== undefined) {
    material.roughness = preset.roughness;
  }

  if ("metalness" in material && preset.metalness !== undefined) {
    material.metalness = preset.metalness;
  }

  material.needsUpdate = true;

  return material;
}