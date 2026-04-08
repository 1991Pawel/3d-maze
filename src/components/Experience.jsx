import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import Level from "./Level.jsx";
import { Physics } from "@react-three/rapier";

export default function Experience() {
  return (
    <>
      <Physics debug>
        <OrbitControls makeDefault />

        <Lights />

        <Level />
      </Physics>
    </>
  );
}
