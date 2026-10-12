import { useEffect, useRef } from "react";

export function useAvatarClickInput() {
  const isClicking = useRef(false);

  useEffect(() => {
    const onPointerDown = () => {
      isClicking.current = true;
    };

    const onPointerUp = () => {
      isClicking.current = false;
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onPointerUp);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return isClicking;
}