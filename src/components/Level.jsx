import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState, useMemo } from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obsracleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

export function BlockStart({ position = [0, 0, 0] }) {
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
export function BlockEnd({ position = [0, 0, 0] }) {
  const gltf = useGLTF("/models/hamburger.glb");
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
        material={floor1Material}
      ></mesh>
      <RigidBody type="fixed">
        <primitive scale={0.2} object={gltf.scene} />
      </RigidBody>
    </group>
  );
}

export function BlockSpinner({ position = [0, 0, 0] }) {
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

export function BlockLimbo({ position = [0, 0, 0] }) {
  const trapRef = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (trapRef.current) {
      const y = Math.sin(time + timeOffset) + 1.5;
      trapRef.current.setNextKinematicTranslation({
        x: position[0],
        y: position[1] + y,
        z: position[2],
      });
    }
  });
  return (
    <group position={position}>
      <RigidBody
        ref={trapRef}
        friction={0}
        restitution={0.2}
        position={[0, 0.3, 0]}
        type="kinematicPosition"
      >
        <mesh
          geometry={boxGeometry}
          scale={[3.5, 0.3, 0.3]}
          material={obsracleMaterial}
        ></mesh>
      </RigidBody>

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
export function SpinnerTrap({ position = [0, 0, 0], scale = [1, 1, 1] }) {
  const trapRef = useRef();
  const [speed] = useState(
    () => (Math.random() + 0.5) * (Math.random() < 0.5 ? -1 : 1),
  );
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (trapRef.current) {
      const rotation = new THREE.Quaternion();
      rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
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

export function LimboBlock({ position = [0, 0, 0], scale = [1, 1, 1] }) {
  const trapRef = useRef();
  const [speed] = useState(
    () => (Math.random() + 0.5) * (Math.random() < 0.5 ? -1 : 1),
  );
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (trapRef.current) {
      const rotation = new THREE.Quaternion();
      rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
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

export function BlockAxe({ position = [0, 0, 0] }) {
  const trapRef = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (trapRef.current) {
      const x = Math.sin(time + timeOffset) * 1.25;
      trapRef.current.setNextKinematicTranslation({
        x: position[0] + x,
        y: position[1] + 0.75,
        z: position[2],
      });
    }
  });
  return (
    <group position={position}>
      <RigidBody
        ref={trapRef}
        friction={0}
        restitution={0.2}
        position={[0, 0.3, 0]}
        type="kinematicPosition"
      >
        <mesh
          geometry={boxGeometry}
          scale={[1.5, 1.5, 0.3]}
          material={obsracleMaterial}
        ></mesh>
      </RigidBody>

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

export function Bounds({ length = 1 }) {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          castShadow
          scale={[0.3, 1.5, length * 4]}
          position={[2.15, 0.75, -length * 2 + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
        ></mesh>
        <mesh
          scale={[0.3, 1.5, length * 4]}
          position={[-2.15, 0.75, -length * 2 + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          receiveShadow
        ></mesh>
        <mesh
          position={[0, 0.75, -length * 4 + 2.15]}
          scale={[4, 1.5, 0.3]}
          geometry={boxGeometry}
          material={wallMaterial}
          receiveShadow
        ></mesh>
        <CuboidCollider
          restitution={0.2}
          position={[0, -0.1, -length * 2 + 2]}
          args={[2, 0.1, 2 * length]}
          friction={1}
        />
      </RigidBody>
    </>
  );
}
export function Level({
  types = [BlockAxe, BlockAxe, BlockLimbo, BlockSpinner],
  count = 5,
}) {
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length) | 0];
      blocks.push(type);
    }
    return blocks;
  }, [count, types]);
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, i) => (
        <Block key={i} position={[0, 0, -(i + 1) * 4]} />
      ))}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
      <Bounds length={count + 2} />
    </>
  );
}
