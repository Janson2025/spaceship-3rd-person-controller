export const AVATAR_MATERIAL_PRESETS = {
  default: {
    tint: "#ffffff",
    roughness: 0.55,
    metalness: 0.0,
  },

  skin: {
    tint: "#ffffff",
    roughness: 0.65,
    metalness: 0.0,
  },

  hair: {
    tint: "#ffffff",
    roughness: 0.75,
    metalness: 0.0,
  },

  cloth: {
    tint: "#ffffff",
    roughness: 0.9,
    metalness: 0.0,
  },

  leather: {
    tint: "#ffffff",
    roughness: 0.7,
    metalness: 0.0,
  },

  metal: {
    tint: "#ffffff",
    roughness: 0.28,
    metalness: 0.35,
  },
};

export const AVATAR_MATERIAL_CONFIG = {
  skin: {
    sourceMaterialName: "Skin",
    presetName: "skin",
  },

  mouth: {
    sourceMaterialName: "mouth",
    presetName: "skin",
  },

  hair: {
    sourceMaterialName: "Hair",
    presetName: "hair",
  },

  pants: {
    sourceMaterialName: "pants",
    presetName: "cloth",
  },

  underShirt: {
    sourceMaterialName: "Under_shirt",
    presetName: "cloth",
  },

  shirtButtons: {
    sourceMaterialName: "shirt_buttons",
    presetName: "default",
  },

  beltLeather: {
    sourceMaterialName: "belt_lether",
    presetName: "leather",
  },

  beltBuckle: {
    sourceMaterialName: "belt_buckel",
    presetName: "metal",
  },

  socks: {
    sourceMaterialName: "Socks",
    presetName: "cloth",
  },

  shoeLaces: {
    sourceMaterialName: "shoe_laces",
    presetName: "cloth",
  },
};