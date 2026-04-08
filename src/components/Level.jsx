import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import { RigidBody } from "@react-three/rapier";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obsracleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });
function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
        material={floor1Material}
      ></mesh>
    </group>
  );
}

function BlockSpinner({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <SpinnerTrap position={[0, 0.3, 0]} scale={[3.5, 0.3, 0.3]} />
      <mesh
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
        material={floor2Material}
      ></mesh>
    </group>
  );
}
function SpinnerTrap({ position = [0, 0, 0], scale = [1, 1, 1] }) {
  const trapRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (trapRef.current) {
      const rotation = new THREE.Quaternion();
      rotation.setFromEuler(new THREE.Euler(0, time, 0));
      trapRef.current.setNextKinematicRotation(rotation);
    }
  });
  return (
    <RigidBody
      ref={trapRef}
      friction={0}
      restitution={0.2}
      position={position}
      type="kinematicPosition"
    >
      <mesh
        geometry={boxGeometry}
        scale={scale}
        material={obsracleMaterial}
      ></mesh>
    </RigidBody>
  );
}

export default function Level() {
  return (
    <>
      <BlockStart position={[0, 0, 4]} />
      <BlockSpinner position={[0, 0, 0]} />
    </>
  );
}
