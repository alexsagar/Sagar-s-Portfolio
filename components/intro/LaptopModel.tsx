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
        {/* White / Light Silver Laptop Base Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[5.2, 0.2, 3.6]} />
          <meshStandardMaterial color="#F4F4F0" metalness={0.4} roughness={0.2} />
        </mesh>

        {/* Dark Keyboard Surface Recess */}
        <mesh position={[0, 0.11, -0.1]}>
          <boxGeometry args={[4.6, 0.02, 2.0]} />
          <meshStandardMaterial color="#1E293B" roughness={0.7} />
        </mesh>

        {/* White Trackpad Accent */}
        <mesh position={[0, 0.11, 1.1]}>
          <boxGeometry args={[1.6, 0.02, 1.0]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.3} />
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
          WHITE LAPTOP HINGE PIVOT (Positioned at rear hinge: Z = -1.8)
          When lidPivotRef.rotation.x = 0, lid lies flat forward along +Z over keyboard.
          When lidPivotRef.rotation.x = -1.90 rads (~108°), lid opens UP along +Y and leans back.
        */}
        <group ref={lidPivotRef} position={[0, 0.1, -1.8]}>
          {/* Lid Group: Extends UP along +Y when open (position Y=1.6, Z=0) */}
          <group position={[0, 1.6, 0]}>
            {/* White Outer Lid Shell */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[5.2, 3.2, 0.12]} />
              <meshStandardMaterial color="#F4F4F0" metalness={0.4} roughness={0.2} />
            </mesh>

            {/* Dark Display Bezel */}
            <mesh position={[0, 0, 0.065]}>
              <boxGeometry args={[5.0, 3.0, 0.01]} />
              <meshStandardMaterial color="#0F172A" roughness={0.8} />
            </mesh>

            {/* Display Canvas Plane Facing Forward (+Z) */}
            <mesh ref={screenMeshRef} position={[0, 0, 0.075]}>
              <planeGeometry args={[4.7, 2.7]} />
              <meshStandardMaterial
                color="#050607"
                emissive="#67E8F9"
                emissiveIntensity={0.05}
                roughness={0.1}
              />

              {/* Drei Html Terminal UI inside 3D Screen */}
              <Html
                transform
                position={[0, 0, 0.01]}
                distanceFactor={2.4}
                className="w-[780px] h-[450px] bg-[#050607] border border-[#1F2228] p-6 font-mono text-xs text-[#F4F4F0] selection:bg-[#67E8F9] selection:text-[#050607] pointer-events-none rounded shadow-2xl overflow-hidden flex flex-col justify-between"
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
