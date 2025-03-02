"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef, useState } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const ModelViewer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-[90vh]">
      {/* Show Loader when Model is Loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      <Canvas
        camera={{ position: [2, 2, 5], fov: 50 }}
        onCreated={() => setIsLoading(false)} // Hide loader when model is loaded
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Environment preset="city" />
        <OrbitControls enableZoom={true} />
        <EthereumModel />
      </Canvas>
    </div>
  );
};

export const EthereumModel: React.FC = () => {
  const myModel = useLoader(GLTFLoader, "/free_porsche_911_carrera_4s.glb", () => {
    console.log("Model Loaded");
  });

  const modelRef = useRef<Mesh>(null);

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
