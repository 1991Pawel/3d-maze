import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useRef } from "react";
import { useEffect } from "react";
export default function Player() {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const body = useRef();

  useEffect(() => {
    subscribeKeys(
      (state) => state.jump,
      (jump) => {
        if (jump) {
          body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
        }
      },
    );
  }, []);

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward, space } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      console.log("forward");
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      console.log("backward");
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (leftward) {
      console.log("leftward");
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }
    if (rightward) {
      console.log("rightward");
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);
  });
  return (
    <RigidBody
      ref={body}
      canSleep={false}
      colliders="ball"
      restitution={0.2}
      friction={1}
      position={[0, 1, 0]}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="mediumpurple" flatShading />
      </mesh>
    </RigidBody>
  );
}
