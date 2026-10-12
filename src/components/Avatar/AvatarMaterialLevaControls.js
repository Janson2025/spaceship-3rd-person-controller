import { useControls, folder } from "leva";

export function useAvatarMaterialLevaControls() {
  const values = useControls("Avatar Materials", {
    Skin: folder({
      skinTint: "#c98f67",
      skinRoughness: { value: 0.65, min: 0, max: 1, step: 0.01 },
      skinMetalness: { value: 0, min: 0, max: 1, step: 0.01 },
    }),

    Hair: folder({
      hairTint: "#2b1a12",
      hairRoughness: { value: 0.75, min: 0, max: 1, step: 0.01 },
      hairMetalness: { value: 0, min: 0, max: 1, step: 0.01 },
    }),

    Shirt: folder({
      underShirtTint: "#3d5a80",
      underShirtRoughness: { value: 0.9, min: 0, max: 1, step: 0.01 },
      underShirtMetalness: { value: 0, min: 0, max: 1, step: 0.01 },

      shirtButtonsTint: "#ffffff",
      shirtButtonsRoughness: { value: 0.55, min: 0, max: 1, step: 0.01 },
      shirtButtonsMetalness: { value: 0, min: 0, max: 1, step: 0.01 },
    }),

    Pants: folder({
      pantsTint: "#1f2937",
      pantsRoughness: { value: 0.9, min: 0, max: 1, step: 0.01 },
      pantsMetalness: { value: 0, min: 0, max: 1, step: 0.01 },
    }),

    Belt: folder({
      beltLeatherTint: "#3b2416",
      beltLeatherRoughness: { value: 0.7, min: 0, max: 1, step: 0.01 },
      beltLeatherMetalness: { value: 0, min: 0, max: 1, step: 0.01 },

      beltBuckleTint: "#c0a060",
      beltBuckleRoughness: { value: 0.28, min: 0, max: 1, step: 0.01 },
      beltBuckleMetalness: { value: 0.35, min: 0, max: 1, step: 0.01 },
    }),

    Shoes: folder({
      socksTint: "#ffffff",
      socksRoughness: { value: 0.9, min: 0, max: 1, step: 0.01 },
      socksMetalness: { value: 0, min: 0, max: 1, step: 0.01 },

      shoeLacesTint: "#ffffff",
      shoeLacesRoughness: { value: 0.9, min: 0, max: 1, step: 0.01 },
      shoeLacesMetalness: { value: 0, min: 0, max: 1, step: 0.01 },
    }),
  });

  return {
    skin: {
      tint: values.skinTint,
      roughness: values.skinRoughness,
      metalness: values.skinMetalness,
    },

    hair: {
      tint: values.hairTint,
      roughness: values.hairRoughness,
      metalness: values.hairMetalness,
    },

    underShirt: {
      tint: values.underShirtTint,
      roughness: values.underShirtRoughness,
      metalness: values.underShirtMetalness,
    },

    shirtButtons: {
      tint: values.shirtButtonsTint,
      roughness: values.shirtButtonsRoughness,
      metalness: values.shirtButtonsMetalness,
    },

    pants: {
      tint: values.pantsTint,
      roughness: values.pantsRoughness,
      metalness: values.pantsMetalness,
    },

    beltLeather: {
      tint: values.beltLeatherTint,
      roughness: values.beltLeatherRoughness,
      metalness: values.beltLeatherMetalness,
    },

    beltBuckle: {
      tint: values.beltBuckleTint,
      roughness: values.beltBuckleRoughness,
      metalness: values.beltBuckleMetalness,
    },

    socks: {
      tint: values.socksTint,
      roughness: values.socksRoughness,
      metalness: values.socksMetalness,
    },

    shoeLaces: {
      tint: values.shoeLacesTint,
      roughness: values.shoeLacesRoughness,
      metalness: values.shoeLacesMetalness,
    },
  };
}