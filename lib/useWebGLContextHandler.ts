import { useEffect, useState, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface WebGLContextHandlerOptions {
  /**
   * Callback invoked when WebGL context is lost
   */
  onContextLost?: () => void;
  
  /**
   * Callback invoked when WebGL context is restored
   */
  onContextRestored?: () => void;
  
  /**
   * Whether to log context events to console (default: true in development)
   */
  enableLogging?: boolean;
  
  /**
   * Custom restoration logic to run after context is restored
   */
  customRestoration?: (renderer: THREE.WebGLRenderer, scene: THREE.Scene) => void;
}

/**
 * Custom hook for handling WebGL context loss and restoration in React Three Fiber
 * 
 * @param options - Configuration options for context handling
 * @returns Object containing context state and manual restoration function
 * 
 * @example
 * ```tsx
 * function MyScene() {
 *   const { contextLost, forceRestore } = useWebGLContextHandler({
 *     onContextLost: () => console.log("Context lost!"),
 *     onContextRestored: () => console.log("Context restored!"),
 *   });
 * 
 *   return <mesh>...</mesh>;
 * }
 * ```
 */
export function useWebGLContextHandler(options: WebGLContextHandlerOptions = {}) {
  const { gl, size, scene, camera, invalidate } = useThree();
  const [contextLost, setContextLost] = useState(false);
  const [restorationAttempts, setRestorationAttempts] = useState(0);
  
  const {
    onContextLost,
    onContextRestored,
    enableLogging = process.env.NODE_ENV !== "production",
    customRestoration,
  } = options;

  const restoreScene = useCallback(() => {
    const renderer = gl as unknown as THREE.WebGLRenderer;
    
    try {
      // Reinitialize renderer settings
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(size.width, size.height);

      // Traverse scene and mark all materials/geometries for recompilation
      scene.traverse((object: any) => {
        if (object.isMesh) {
          // Mark materials for update
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat: THREE.Material) => {
                mat.needsUpdate = true;
              });
            } else {
              object.material.needsUpdate = true;
            }
          }
          
          // Mark geometry attributes for update
          if (object.geometry) {
            const attributes = object.geometry.attributes;
            if (attributes.position) attributes.position.needsUpdate = true;
            if (attributes.normal) attributes.normal.needsUpdate = true;
            if (attributes.uv) attributes.uv.needsUpdate = true;
            if (attributes.color) attributes.color.needsUpdate = true;
          }
        }
        
        // Handle textures
        if (object.material) {
          const materials = Array.isArray(object.material) 
            ? object.material 
            : [object.material];
            
          materials.forEach((mat: any) => {
            if (mat.map) mat.map.needsUpdate = true;
            if (mat.normalMap) mat.normalMap.needsUpdate = true;
            if (mat.roughnessMap) mat.roughnessMap.needsUpdate = true;
            if (mat.metalnessMap) mat.metalnessMap.needsUpdate = true;
            if (mat.emissiveMap) mat.emissiveMap.needsUpdate = true;
          });
        }
      });

      // Run custom restoration logic if provided
      if (customRestoration) {
        customRestoration(renderer, scene);
      }

      // Force a render to restore the scene
      invalidate();
      
      if (enableLogging) {
        // eslint-disable-next-line no-console
        console.info("[WebGL] Scene successfully restored after context recovery");
      }
      
      return true;
    } catch (error) {
      if (enableLogging) {
        // eslint-disable-next-line no-console
        console.error("[WebGL] Error during context restoration:", error);
      }
      return false;
    }
  }, [gl, size, scene, invalidate, customRestoration, enableLogging]);

  useEffect(() => {
    const renderer = gl as unknown as THREE.WebGLRenderer;
    const canvas = renderer.domElement as HTMLCanvasElement;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setContextLost(true);
      
      if (enableLogging) {
        // eslint-disable-next-line no-console
        console.warn("[WebGL] Context lost - preventing default and awaiting restoration");
      }
      
      onContextLost?.();
    };

    const handleContextRestored = () => {
      setContextLost(false);
      setRestorationAttempts((prev) => prev + 1);
      
      if (enableLogging) {
        // eslint-disable-next-line no-console
        console.info("[WebGL] Context restored - reinitializing renderer");
      }

      const success = restoreScene();
      
      if (success) {
        onContextRestored?.();
      }
    };

    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    canvas.addEventListener("webglcontextrestored", handleContextRestored, false);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost, false);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored, false);
    };
  }, [gl, restoreScene, onContextLost, onContextRestored, enableLogging]);

  return {
    contextLost,
    restorationAttempts,
    forceRestore: restoreScene,
  };
}
