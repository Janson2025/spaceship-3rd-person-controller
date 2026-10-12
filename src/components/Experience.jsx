import {
  Environment,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { useRef } from "react";
import { Map } from "./Map";
import { AvatarController } from "./Avatar/controller/AvatarController";
import { useAvatarControlLevaControls } from "./Avatar/controller/useAvatarControlLevaControls";
import { ElevatorRig } from "./Elevator/ElevatorRig";

const maps = {
  castle_on_hills: {
    scale: 3,
    position: [-6, -7, 0],
  },
  animal_crossing_map: {
    scale: 20,
    position: [-15, -1, 10],
  },
  city_scene_tokyo: {
    scale: 0.72,
    position: [0, -1, -3.5],
  },
  de_dust_2_with_real_light: {
    scale: 0.3,
    position: [-5, -3, 13],
  },
  medieval_fantasy_book: {
    scale: 0.4,
    position: [-4, 0, -6],
  },

  townMap: {
    scale: 10,
    position: [-6, -7, 0],
  },

  spaceShip: {
    scale: 0.75,
    position: [-6, -7, 0],
    elevator: {
      position: [0, 0, 0],
      floors: [0, 3, 6, 9, 12],
      speed: 1.5,
      waitTime: 1.25,
    },
  },

  spaceShip3: {
    scale: 0.8,
    position: [-6, -7, 0],
    elevator: {
      position: [-5.955, -5.5, 0.15],
      floors: [-2.5, 2.15, 5.25, 8.175, 10.5],
      // floors: [0.0, 2.5, 5.25, 8.175, 10.5],
      speed: 1.5,
      waitTime: 1.5,
    },
  },

  spaceShip4: {
    scale: 1.0,
    position: [-15, -20, -10],
    elevator: {
      position: [-5.955, -5.5, 0.15],
      floors: [-2.5, 2.15, 5.25, 8.175, 10.5],
      // floors: [0.0, 2.5, 5.25, 8.175, 10.5],
      speed: 1.5,
      waitTime: 1.5,
    },
  },

  testscape: {
    scale: 1.2,
    position: [-10, -20, -10],
  }
};

export const Experience = () => {
  const shadowCameraRef = useRef();

  const { SHOW_COLLIDERS } = useAvatarControlLevaControls();

  const { map } = useControls("Map", {
    map: {
      value: "testscape",
      options: Object.keys(maps),
    },
  });

  const selectedMap = maps[map];

  return (
    <>
      {/* <OrbitControls /> */}
      <Environment preset="sunset" />

      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach="shadow-camera"
        />
      </directionalLight>

      <Physics debug={SHOW_COLLIDERS}>
        <Map
          scale={selectedMap.scale}
          position={selectedMap.position}
          model={`models/${map}.glb`}
        />

        {selectedMap.elevator && <ElevatorRig {...selectedMap.elevator} />}

        <AvatarController />
      </Physics>
    </>
  );
};