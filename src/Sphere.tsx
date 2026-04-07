import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody, vec3 } from "@react-three/rapier";
import { useThree } from "@react-three/fiber";

type SphereProps = {
  rigidBodyRef?: React.RefObject<RapierRigidBody | null>;
  [key: string]: unknown;
};

export default function Sphere({ rigidBodyRef: externalRef, ...props }: SphereProps) {
  const internalRef = useRef<RapierRigidBody | null>(null);
  const rigidBodyRef = externalRef ?? internalRef;
  const pressedKey = useRef<null | string>(null);
  const ballSpeed = 0.1;
  const { camera } = useThree();

  const handlePressKey = (event: KeyboardEvent) => {
    if (event.key) {
      pressedKey.current = event.key;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handlePressKey);
    return () => {
      window.removeEventListener("keydown", handlePressKey);
    };
  }, []);

  useFrame(() => {
    if (!rigidBodyRef.current) return;

    const ballPosition = vec3(rigidBodyRef.current.translation());
    camera.position.set(
      ballPosition.x,
      ballPosition.y + 100,
      ballPosition.z + 25,
    );
  });

  return (
    <RigidBody
      type="dynamic"
      linearDamping={0.5}
      angularDamping={0.5}
      ref={rigidBodyRef}
      restitution={1}
      friction={0.5}
      canSleep={false}
    >
      <mesh {...props}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial color="#4f8ef7" metalness={0.3} roughness={0.2} />
      </mesh>
    </RigidBody>
  );
}
