import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function Sphere(props) {
  const meshRef = useRef<Mesh>(null);
  const pressedKey = useRef<null | string>(null);

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

  useFrame((_, delta) => {
    console.log("Sphere frame", pressedKey.current);
    console.log("Delta time:", delta);
    if (pressedKey.current === "ArrowUp") {
      meshRef.current.position.z -= 5 * delta;
    }
    if (pressedKey.current === "ArrowDown") {
      meshRef.current.position.z += 5 * delta;
    }
    if (pressedKey.current === "ArrowLeft") {
      meshRef.current.position.x -= 5 * delta;
    }
    if (pressedKey.current === "ArrowRight") {
      meshRef.current.position.x += 5 * delta;
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial color="#4f8ef7" metalness={0.3} roughness={0.2} />
    </mesh>
  );
}
