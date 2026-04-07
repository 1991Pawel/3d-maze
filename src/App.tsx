import { Canvas, useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import Sphere from "./Sphere";
import MazeModel from "./components/MazeModel";
import { Physics, RigidBody, useRapier, RapierRigidBody } from "@react-three/rapier";
import { useEffect, useRef, RefObject } from "react";
import * as THREE from "three";


function GravityController({ ballRef }: { ballRef: RefObject<RapierRigidBody | null> }) {
  const mousePosition = useRef({ x: 0, y: 0 });
  const { world } = useRapier();
  const { camera } = useThree();
  const ballNDC = useRef(new THREE.Vector3());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!ballRef.current) return;

    const { x, y, z } = ballRef.current.translation();
    ballNDC.current.set(x, y, z).project(camera);

    // mysz w NDC (-1 do 1), Y odwrócone
    const mouseX = (mousePosition.current.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mousePosition.current.y / window.innerHeight) * 2 + 1;

    // kierunek od kulki do kursora na ekranie
    const dx = mouseX - ballNDC.current.x;
    const dy = mouseY - ballNDC.current.y;

    world.gravity = {
      x: dx * 15,
      y: -9.81,
      z: -dy * 15,
    };
  });

  return null;
}

function App() {
  const ballRef = useRef<RapierRigidBody | null>(null);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111" }}>
      <Canvas camera={{ position: [0, 100, 25], fov: 35 }}>
        <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
        <Physics>
          <GravityController ballRef={ballRef} />
          <RigidBody type="fixed" colliders="trimesh">
            <MazeModel
              rotation={[0, Math.PI / 2, 0]}
              scale={25}
              position={[0, -1, 0]}
            />
          </RigidBody>
          <ambientLight intensity={3} />
          <Sphere scale={0.4} position={[4.3, 1, 17]} rigidBodyRef={ballRef} />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
