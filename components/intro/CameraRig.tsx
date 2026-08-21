"use client";

import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface CameraRigRef {
  position: THREE.Vector3;
  target: THREE.Vector3;
  updateCameraNear: (near: number) => void;
}

export const CameraRig = forwardRef<CameraRigRef>(function CameraRig(props, ref) {
  const { camera } = useThree();
  const targetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.5, 0));

  useImperativeHandle(ref, () => ({
    position: camera.position,
    target: targetRef.current,
    updateCameraNear: (near: number) => {
      camera.near = near;
      camera.updateProjectionMatrix();
    },
  }));

  useFrame(() => {
    camera.lookAt(targetRef.current);
  });

  return null;
});
