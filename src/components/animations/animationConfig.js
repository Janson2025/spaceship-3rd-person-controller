import { AVATAR_ANIMATION } from "./animationNames";

export const avatarAnimationConfig = {
  [AVATAR_ANIMATION.IDLE]: {
    loop: true,
    fade: 0.24,
  },

  [AVATAR_ANIMATION.WALK]: {
    loop: true,
    fade: 0.18,
  },

  [AVATAR_ANIMATION.RUN]: {
    loop: true,
    fade: 0.16,
  },

  [AVATAR_ANIMATION.JUMP]: {
    loop: false,
    fade: 0.12,
    returnTo: AVATAR_ANIMATION.FALLING_IDLE,
  },

  [AVATAR_ANIMATION.FALLING_IDLE]: {
    loop: true,
    fade: 0.12,
  },

  [AVATAR_ANIMATION.LANDING]: {
    loop: false,
    fade: 0.12,
    returnTo: AVATAR_ANIMATION.IDLE,
  },

  [AVATAR_ANIMATION.LOOKING]: {
    loop: false,
    fade: 0.2,
    returnTo: AVATAR_ANIMATION.IDLE,
  },

  [AVATAR_ANIMATION.HONKING_HORN]: {
    loop: false,
    fade: 0.15,
    returnTo: AVATAR_ANIMATION.IDLE,
  },

  [AVATAR_ANIMATION.RUNNING_UP_STAIRS]: {
    loop: true,
    fade: 0.18,
  },

  [AVATAR_ANIMATION.SITTING]: {
    loop: false,
    fade: 0.2,
    returnTo: AVATAR_ANIMATION.SEATED_IDLE,
  },

  [AVATAR_ANIMATION.SEATED_IDLE]: {
    loop: true,
    fade: 0.24,
  },

  [AVATAR_ANIMATION.STAND_TO_SIT]: {
    loop: false,
    fade: 0.2,
    returnTo: AVATAR_ANIMATION.SEATED_IDLE,
  },

  [AVATAR_ANIMATION.SIT_TO_STAND]: {
    loop: false,
    fade: 0.2,
    returnTo: AVATAR_ANIMATION.IDLE,
  },

  [AVATAR_ANIMATION.SIT_TO_TYPE]: {
    loop: false,
    fade: 0.2,
    returnTo: AVATAR_ANIMATION.TYPING,
  },

  [AVATAR_ANIMATION.TYPING]: {
    loop: true,
    fade: 0.2,
  },
};