import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function Sphere(props) {
  const meshRef = useRef<Mesh>(null);
  const pressedKey = useRef<null | string>(null);
  const ballSpeed = 5;

  const handlePressKey = (event: KeyboardEvent) => {
    if (event.key) {
      pressedKey.current = event.key;
    }
  };

  const handleReleaseKey = (event: KeyboardEvent) => {
    if (event.key) {
      pressedKey.current = null;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handlePressKey);
    window.addEventListener("keyup", handleReleaseKey);
    return () => {
      window.removeEventListener("keydown", handlePressKey);
      window.removeEventListener("keyup", handleReleaseKey);
    };
  }, []);

  useFrame((_, delta) => {
    console.log("Sphere frame", pressedKey.current);
    console.log("Delta time:", delta);
    if (pressedKey.current === "ArrowUp") {
      meshRef.current.position.z -= ballSpeed * delta;
    }
    if (pressedKey.current === "ArrowDown") {
      meshRef.current.position.z += ballSpeed * delta;
    }
    if (pressedKey.current === "ArrowLeft") {
      meshRef.current.position.x -= ballSpeed * delta;
    }
    if (pressedKey.current === "ArrowRight") {
      meshRef.current.position.x += ballSpeed * delta;
    }
    if (pressedKey.current === null) {
      meshRef.current.position.y = 0;
      // alert("No key is pressed");
    }
    // if (pressedKey.current === " ") {
    //   meshRef.current.position.y += ballSpeed * delta;
    // }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial color="#4f8ef7" metalness={0.3} roughness={0.2} />
    </mesh>
  );
}
