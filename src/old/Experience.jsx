import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import { Level, BlockAxe, BlockSpinner, BlockLimbo } from "./Level.jsx";
import { Physics } from "@react-three/rapier";
import Player from "./Player.jsx";

export default function Experience() {
  return (
    <>
      <Physics debug>
        <OrbitControls makeDefault />
        <Lights />
        <Level />
        <Player />
      </Physics>
    </>
  );
}
