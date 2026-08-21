"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";

interface LaptopSceneProps {
  onComplete: () => void;
}

function ProceduralLaptop({ onComplete }: { onComplete: () => void }) {
  const lidGroupRef = useRef<THREE.Group>(null);
  const screenMeshRef = useRef<THREE.Mesh>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    // GSAP Timeline for Laptop opening & Camera zoom into screen
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 400);
      },
    });

    // 1. Open Lid (pivot angle 0 to 1.9 radians)
    if (lidGroupRef.current) {
      tl.to(lidGroupRef.current.rotation, {
        x: -1.9,
        duration: 1.8,
        ease: "power2.inOut",
        delay: 0.5,
      });
    }

    // 2. Power on Screen emissive intensity
    if (screenMeshRef.current) {
      const mat = screenMeshRef.current.material as THREE.MeshStandardMaterial;
      tl.to(
        mat,
        {
          emissiveIntensity: 1.5,
          duration: 0.6,
          ease: "power1.in",
        },
        "-=0.6"
      );
    }
  }, [onComplete]);

  return (
    <group position={[0, -1, 0]}>
      {/* Laptop Base (Body) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 0.25, 4.2]} />
        <meshStandardMaterial color="#15171B" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Keyboard Surface Accent */}
      <mesh position={[0, 0.13, 0.2]}>
        <boxGeometry args={[5.2, 0.02, 2.4]} />
        <meshStandardMaterial color="#0B0D10" roughness={0.8} />
      </mesh>

      {/* Trackpad Accent */}
      <mesh position={[0, 0.13, 1.4]}>
        <boxGeometry args={[1.8, 0.02, 1.1]} />
        <meshStandardMaterial color="#1F2228" roughness={0.4} />
      </mesh>

      {/* Laptop Lid Pivot Group (Hinge at Z = -2.1) */}
      <group ref={lidGroupRef} position={[0, 0.12, -2.1]}>
        {/* Lid Shell */}
        <mesh position={[0, 1.9, 0]}>
          <boxGeometry args={[6, 3.8, 0.15]} />
          <meshStandardMaterial color="#15171B" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Display Bezel */}
        <mesh position={[0, 1.9, 0.08]}>
          <boxGeometry args={[5.7, 3.5, 0.02]} />
          <meshStandardMaterial color="#050607" roughness={0.9} />
        </mesh>

        {/* Display Screen Canvas */}
        <mesh ref={screenMeshRef} position={[0, 1.9, 0.1]}>
          <planeGeometry args={[5.4, 3.2]} />
          <meshStandardMaterial
            color="#070809"
            emissive="#67E8F9"
            emissiveIntensity={0.0}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

function CameraController({ onComplete }: { onComplete: () => void }) {
  useFrame(({ camera }) => {
    // Subtle camera float
    camera.lookAt(0, 0.5, 0);
  });

  useEffect(() => {
    // Zoom camera toward screen
  }, []);

  return null;
}

export function LaptopScene({ onComplete }: LaptopSceneProps) {
  return (
    <div className="fixed inset-0 z-40 bg-[#050607]">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        className="w-full h-full"
      >
        <color attach="background" args={["#050607"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#F4F4F0" />
        <pointLight position={[-4, 3, 2]} intensity={0.8} color="#67E8F9" />

        <ProceduralLaptop onComplete={onComplete} />
        <CameraController onComplete={onComplete} />
      </Canvas>

      {/* Overlay status note */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-[#8B9098] tracking-widest uppercase pointer-events-none">
        BOOTING WORKSPACE ENVIRONMENT...
      </div>
    </div>
  );
}
