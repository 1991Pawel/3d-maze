import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Sphere from "./Sphere";
import MazeModel from "./components/MazeModel";

function App() {
  console.log("App rendered");

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111" }}>
      <Canvas
        camera={{
          position: [0, 25, 25],
          fov: 75,
        }}
      >
        <ambientLight intensity={3} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
        <MazeModel
          rotation={[0, Math.PI / 2, 0]}
          scale={15}
          position={[0, -1, 0]}
        />

        <Sphere scale={0.5} position={[4.5, 0, 10]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
