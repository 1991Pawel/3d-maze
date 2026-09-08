import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import Maze from "./components/Maze";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Ball from "./components/Ball";

function Plane({ position, rotation, scale = 1 }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[6, 6]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 5, 5] }}>
      <Physics>
        <OrbitControls />
        <ambientLight intensity={5} />
        <RigidBody type="fixed" colliders="trimesh">
          <Maze rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]} />
        </RigidBody>
        <RigidBody type="fixed" colliders="trimesh">
          <Plane position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        </RigidBody>
        <gridHelper args={[10, 10]} />
        <axesHelper args={[5]} />

        <Ball position={[0, 0, 2.5]} scale={0.08} />
      </Physics>
    </Canvas>
  );
}
