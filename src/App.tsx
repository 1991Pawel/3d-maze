import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Sphere from './Sphere'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a0c4ff" />
        <Sphere />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App
