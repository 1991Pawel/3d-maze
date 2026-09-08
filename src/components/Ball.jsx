import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

export default function Ball({ position, scale = 1 }) {
  const ballRef = useRef();
  const radius = 1.5;

  useFrame((state, delta) => {
    const strength = 0.1;

    ballRef.current?.applyImpulse(
      {
        x: state.pointer.x * strength * delta,
        y: 0,
        z: -state.pointer.y * strength * delta,
      },
      true,
    );
  });

  return (
    <RigidBody ref={ballRef} colliders="ball" linearDamping={1}>
      <group position={position} scale={scale}>
        <mesh position={[0, radius, 0]}>
          <sphereGeometry args={[radius, 64, 64]} />
          <meshStandardMaterial color="#4f8ef7" />
        </mesh>
      </group>
    </RigidBody>
  );
}
