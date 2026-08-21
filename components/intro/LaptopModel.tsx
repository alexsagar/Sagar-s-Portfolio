"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";

export interface LaptopModelRef {
  lidPivot: THREE.Group | null;
  screenMesh: THREE.Mesh | null;
  screenGlow: THREE.PointLight | null;
  getScreenWorldPosition: () => THREE.Vector3;
}

export const LaptopModel = forwardRef<LaptopModelRef, { lidAngle?: number }>(
  function LaptopModel(props, ref) {
    const lidPivotRef = useRef<THREE.Group>(null);
    const screenMeshRef = useRef<THREE.Mesh>(null);
    const screenGlowRef = useRef<THREE.PointLight>(null);

    useImperativeHandle(ref, () => ({
      lidPivot: lidPivotRef.current,
      screenMesh: screenMeshRef.current,
      screenGlow: screenGlowRef.current,
      getScreenWorldPosition: () => {
        const target = new THREE.Vector3();
        if (screenMeshRef.current) {
          screenMeshRef.current.getWorldPosition(target);
        } else {
          target.set(0, 1.2, -1.6);
        }
        return target;
      },
    }));

    return (
      <group position={[0, -0.6, 0]}>
        {/* Laptop Base Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[5.2, 0.2, 3.6]} />
          <meshStandardMaterial color="#121418" metalness={0.8} roughness={0.25} />
        </mesh>

        {/* Keyboard Surface Recess */}
        <mesh position={[0, 0.11, -0.1]}>
          <boxGeometry args={[4.6, 0.02, 2.0]} />
          <meshStandardMaterial color="#08090C" roughness={0.85} />
        </mesh>

        {/* Trackpad Accent */}
        <mesh position={[0, 0.11, 1.1]}>
          <boxGeometry args={[1.6, 0.02, 1.0]} />
          <meshStandardMaterial color="#1B1E24" roughness={0.4} />
        </mesh>

        {/* Screen Glow Light reflected onto Keyboard */}
        <pointLight
          ref={screenGlowRef}
          position={[0, 0.5, -0.2]}
          intensity={0.0}
          color="#67E8F9"
          distance={4.0}
        />

        {/* 
          LID PIVOT HINGE (Positioned EXACTLY on physical back hinge at Z = -1.8)
          When rotation.x = Math.PI / 2 (~1.57rad), lid stands upright (90°).
          When rotation.x = 1.95rad (~112°), lid leans back naturally.
          When rotation.x = 0.0rad (0°), lid is flat closed on top of keyboard.
        */}
        <group ref={lidPivotRef} position={[0, 0.1, -1.8]} rotation={[0, 0, 0]}>
          {/* Lid Mesh: Extends forward along +Z from hinge by half length 1.8 when closed */}
          <group position={[0, 0.06, 1.8]}>
            {/* Outer Lid Shell */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[5.2, 0.1, 3.6]} />
              <meshStandardMaterial color="#121418" metalness={0.85} roughness={0.2} />
            </mesh>

            {/* Display Bezel */}
            <mesh position={[0, -0.055, 0]}>
              <boxGeometry args={[5.0, 0.01, 3.4]} />
              <meshStandardMaterial color="#050607" roughness={0.9} />
            </mesh>

            {/* 3D Display Canvas Mesh */}
            <mesh ref={screenMeshRef} position={[0, -0.065, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <planeGeometry args={[4.7, 3.1]} />
              <meshStandardMaterial
                color="#050607"
                emissive="#67E8F9"
                emissiveIntensity={0.05}
                roughness={0.1}
              />

              {/* Drei Html Transform - Terminal UI inside 3D Display */}
              <Html
                transform
                position={[0, 0, 0.01]}
                rotation={[-Math.PI / 2, 0, 0]}
                distanceFactor={2.4}
                className="w-[780px] h-[480px] bg-[#050607] border border-[#1F2228] p-6 font-mono text-xs text-[#F4F4F0] selection:bg-[#67E8F9] selection:text-[#050607] pointer-events-none rounded shadow-2xl overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1F2228] pb-3 text-[#8B9098]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                      <span className="ml-2 font-bold text-[#F4F4F0]">sagar@portfolio:~$</span>
                    </div>
                    <div>SAGAR.DEV // OS v2.0</div>
                  </div>

                  <div className="space-y-2 text-[#8B9098]">
                    <div className="text-[#F4F4F0] font-bold">SAGAR NEPALI - FULL-STACK SOFTWARE ENGINEER</div>
                    <div>Booting workspace environment...</div>
                    <div className="text-[#67E8F9]">Status: System Online &bull; Ready</div>
                  </div>

                  <div className="pt-2 text-xs space-y-1">
                    <div className="text-[#67E8F9] font-bold">Try typing commands:</div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {["about", "projects", "experience", "skills", "contact", "help"].map((cmd) => (
                        <span
                          key={cmd}
                          className="px-2 py-1 rounded bg-[#15171B] border border-[#1F2228] text-[#67E8F9]"
                        >
                          [ {cmd} ]
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#67E8F9] font-bold pt-4 border-t border-[#1F2228]">
                  <span>sagar@portfolio:~$</span>
                  <span className="w-2 h-4 bg-[#67E8F9] animate-pulse inline-block" />
                </div>
              </Html>
            </mesh>
          </group>
        </group>
      </group>
    );
  }
);
