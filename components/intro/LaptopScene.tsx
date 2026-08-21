"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { LaptopModel, LaptopModelRef } from "./LaptopModel";
import { CameraRig, CameraRigRef } from "./CameraRig";

interface LaptopSceneProps {
  onComplete: () => void;
  onScreenFill?: () => void;
}

// Lid rotation angles around hinge:
// CLOSED_ANGLE: +1.52 rads (lid lies flat forward over keyboard)
// OPEN_ANGLE: -0.15 rads (lid stands upright leaning back ~100 degrees)
const CLOSED_ANGLE = 1.52;
const OPEN_ANGLE = -0.15;

export function LaptopScene({ onComplete, onScreenFill }: LaptopSceneProps) {
  const laptopRef = useRef<LaptopModelRef>(null);
  const rigRef = useRef<CameraRigRef>(null);
  const completedRef = useRef(false);

  const triggerComplete = useRef(onComplete);
  triggerComplete.current = onComplete;

  const triggerScreenFill = useRef(onScreenFill);
  triggerScreenFill.current = onScreenFill;

  // Debug metrics state
  const [showDebug, setShowDebug] = useState(false);
  const [debugData, setDebugData] = useState({
    camPos: "0.00, 1.80, 6.00",
    targetPos: "0.00, 0.40, 0.00",
    lidAngle: "0.00°",
    progress: "0%",
  });

  useEffect(() => {
    // Safety fallback timer (max 5.5s)
    const fallbackTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        if (triggerScreenFill.current) triggerScreenFill.current();
        triggerComplete.current();
      }
    }, 5500);

    const timer = setTimeout(() => {
      if (!laptopRef.current || !rigRef.current) return;

      const laptop = laptopRef.current;
      const rig = rigRef.current;

      const screenPos = laptop.getScreenWorldPosition();

      // Master GSAP Timeline for Natural Cinematic Opening
      const tl = gsap.timeline({
        onUpdate: () => {
          if (laptop.lidPivot && rig.position && rig.target) {
            const rad = laptop.lidPivot.rotation.x;
            const deg = (rad * (180 / Math.PI)).toFixed(1);
            setDebugData({
              camPos: `${rig.position.x.toFixed(2)}, ${rig.position.y.toFixed(2)}, ${rig.position.z.toFixed(2)}`,
              targetPos: `${rig.target.x.toFixed(2)}, ${rig.target.y.toFixed(2)}, ${rig.target.z.toFixed(2)}`,
              lidAngle: `${deg}° (${rad.toFixed(2)}rad)`,
              progress: `${Math.round(tl.progress() * 100)}%`,
            });
          }
        },
        onComplete: () => {
          if (!completedRef.current) {
            completedRef.current = true;
            if (triggerScreenFill.current) triggerScreenFill.current();
            setTimeout(() => triggerComplete.current(), 300);
          }
        },
      });

      // Step 1: Open Lid smoothly around rear hinge (from flat CLOSED_ANGLE to OPEN_ANGLE)
      if (laptop.lidPivot) {
        laptop.lidPivot.rotation.x = CLOSED_ANGLE;

        tl.to(laptop.lidPivot.rotation, {
          x: OPEN_ANGLE,
          duration: 2.2,
          ease: "power3.inOut",
        });
      }

      // Step 2: Power on Screen Emissive Light & Reflection as lid reaches open state
      if (laptop.screenMesh && laptop.screenGlow) {
        const mat = laptop.screenMesh.material as THREE.MeshStandardMaterial;

        tl.to(
          mat,
          {
            emissiveIntensity: 1.5,
            duration: 0.6,
            ease: "power1.in",
          },
          "-=0.6"
        );

        tl.to(
          laptop.screenGlow,
          {
            intensity: 2.5,
            duration: 0.6,
            ease: "power1.in",
          },
          "-=0.6"
        );
      }

      // Step 3: Animate Camera Position & Target Vector directly into Screen Center
      rig.updateCameraNear(0.01);

      tl.to(
        rig.position,
        {
          x: 0.0,
          y: 1.1,
          z: 2.2,
          duration: 1.8,
          ease: "power2.inOut",
        },
        "+=0.1"
      );

      tl.to(
        rig.target,
        {
          x: screenPos.x,
          y: screenPos.y,
          z: screenPos.z,
          duration: 1.8,
          ease: "power2.inOut",
        },
        "<"
      );

      // Final Push into Display Surface (Screen Fills Viewport)
      tl.to(
        rig.position,
        {
          x: screenPos.x,
          y: screenPos.y,
          z: screenPos.z + 0.35,
          duration: 1.0,
          ease: "power3.in",
        },
        "-=0.3"
      );
    }, 200);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete, onScreenFill]);

  return (
    <div className="fixed inset-0 z-40 bg-[#050607]">
      <Canvas
        camera={{ position: [0, 1.8, 6.0], fov: 45, near: 0.1 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <color attach="background" args={["#050607"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 7, 4]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-3, 2, 2]} intensity={0.8} color="#67E8F9" />

        <LaptopModel ref={laptopRef} />
        <CameraRig ref={rigRef} />
      </Canvas>

      {/* Debug UI Toggle & Dashboard (Dev mode) */}
      <div className="absolute bottom-4 left-4 z-50 font-mono text-[10px] text-[#8B9098]">
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="px-2 py-1 bg-[#101215] border border-[#1F2228] hover:text-[#67E8F9] rounded"
        >
          [ {showDebug ? "Hide Debug" : "Show Debug"} ]
        </button>

        {showDebug && (
          <div className="mt-2 bg-[#0B0D10]/90 border border-[#1F2228] p-3 rounded space-y-1 text-[#F4F4F0] backdrop-blur-sm">
            <div>CAM POS : {debugData.camPos}</div>
            <div>TARGET  : {debugData.targetPos}</div>
            <div>LID ANGLE: {debugData.lidAngle}</div>
            <div>PROGRESS : {debugData.progress}</div>
          </div>
        )}
      </div>

      {/* Overlay Status Note */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-[#8B9098] tracking-widest uppercase pointer-events-none">
        BOOTING WORKSPACE ENVIRONMENT...
      </div>
    </div>
  );
}
