"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const ModelViewer: React.FC = () => {
  return (
    <Canvas
      style={{ height: "90vh", width: "100%" }}
      camera={{ position: [2, 2, 5], fov: 50 }}
    >
      {/* Soft ambient light to keep original colors */}
      <ambientLight intensity={0.7} />

      {/* Directional light simulating sunlight */}
      <directionalLight position={[5, 5, 5]} intensity={1.5} />

      {/* Environment map for realistic reflections */}
      <Environment preset="city" />

      {/* Enable orbit controls for rotation and zoom */}
      <OrbitControls enableZoom={true} />

      <EthereumModel />
    </Canvas>
  );
};

export const EthereumModel: React.FC = () => {
  const myModel = useLoader(GLTFLoader, "/free_porsche_911_carrera_4s.glb");
  const modelRef = useRef<Mesh>(null);

  // Rotate the model smoothly
  useFrame((_state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={modelRef} scale={1}>
      <primitive object={myModel.scene} />
    </group>
  );
};
