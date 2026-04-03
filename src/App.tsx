import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Sphere from "./Sphere";
import MazeModel from "./components/MazeModel";
import { Physics, RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef } from "react";

function GravityController() {
  console.log("App rendered");
  const mousePosition = useRef({ x: 0, y: 0 });
  const { world } = useRapier();

  const handleMouseMove = (event: MouseEvent) => {
    mousePosition.current = { x: event.clientX, y: event.clientY };
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    // console.log(world, "w");
    const xMousePosition =
      (mousePosition.current.x / window.innerWidth) * 2 - 1;
    const yMousePosition =
      (mousePosition.current.y / window.innerHeight) * 2 - 1;
    world.gravity = {
      x: xMousePosition * 15,
      y: -9.81,
      z: yMousePosition * 15,
    };
    console.log("y:", yMousePosition, "gravity z:", -yMousePosition * 15);
  });

  return null;
}

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111" }}>
      <Canvas
        camera={{
          position: [0, 100, 25],
          fov: 35,
        }}
      >
        <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
        <Physics>
          <GravityController />
          <RigidBody type="fixed" colliders="trimesh">
            <MazeModel
              rotation={[0, Math.PI / 2, 0]}
              scale={25}
              position={[0, -1, 0]}
            />
          </RigidBody>
          <ambientLight intensity={3} />

          <Sphere scale={0.4} position={[4.3, 1, 17]} />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
