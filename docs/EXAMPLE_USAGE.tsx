/**
 * Complete Example: Three.js Scene with WebGL Context Loss Handling
 * 
 * This example demonstrates a complete Three.js setup with proper
 * WebGL context loss handling using React Three Fiber.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import { useWebGLContextHandler } from "@/lib/useWebGLContextHandler";
import * as THREE from "three";

/**
 * Animated cube component with context loss handling
 */
function AnimatedCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Handle WebGL context loss
  const { contextLost, restorationAttempts } = useWebGLContextHandler({
    onContextLost: () => {
      console.warn("Context lost - pausing animation");
      setIsPaused(true);
    },
    onContextRestored: () => {
      console.info("Context restored - resuming animation");
      setIsPaused(false);
    },
    customRestoration: (renderer, scene) => {
      // Custom restoration logic if needed
      console.log("Running custom restoration for cube");
    },
    enableLogging: true,
  });

  // Animation loop
  useFrame((state, delta) => {
    if (!meshRef.current || isPaused) return;
    
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <>
      {/* Show context lost indicator */}
      {contextLost && (
        <Html center>
          <div style={{
            background: "rgba(255, 0, 0, 0.8)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontFamily: "Arial, sans-serif",
          }}>
            ⚠️ Restoring WebGL Context...
            {restorationAttempts > 0 && ` (Attempt ${restorationAttempts})`}
          </div>
        </Html>
      )}

      {/* The actual mesh */}
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color={contextLost ? "#ff0000" : "#00ff00"} 
          wireframe={contextLost}
        />
      </mesh>
    </>
  );
}

/**
 * Scene with multiple objects
 */
function Scene() {
  const sphereRef = useRef<THREE.Mesh>(null);

  // Context handler for the entire scene
  useWebGLContextHandler({
    onContextLost: () => {
      console.warn("Scene context lost");
    },
    onContextRestored: () => {
      console.info("Scene context restored");
    },
  });

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime) * 2;
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Animated cube */}
      <AnimatedCube />

      {/* Floating sphere */}
      <mesh ref={sphereRef} position={[3, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>

      {/* Camera controls */}
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={20}
      />
    </>
  );
}

/**
 * Test button to simulate context loss
 */
function ContextLossTestButton() {
  const simulateContextLoss = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return;

    const ext = gl.getExtension("WEBGL_lose_context");
    if (ext) {
      console.log("🔴 Simulating context loss...");
      ext.loseContext();

      // Restore after 2 seconds
      setTimeout(() => {
        console.log("🟢 Restoring context...");
        ext.restoreContext();
      }, 2000);
    } else {
      console.warn("WEBGL_lose_context extension not available");
    }
  };

  return (
    <button
      onClick={simulateContextLoss}
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        padding: "10px 20px",
        background: "#ff4757",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
        zIndex: 1000,
      }}
    >
      Test Context Loss
    </button>
  );
}

/**
 * Main App Component
 */
export default function WebGLContextExample() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas
        camera={{ position: [5, 5, 5], fov: 75 }}
        style={{ background: "#1a1a2e" }}
      >
        <Scene />
      </Canvas>
      
      <ContextLossTestButton />
      
      {/* Instructions */}
      <div style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        background: "rgba(0, 0, 0, 0.7)",
        color: "white",
        padding: "15px",
        borderRadius: "5px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "300px",
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>WebGL Context Loss Demo</h3>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li>Click "Test Context Loss" to simulate</li>
          <li>Watch the console for logs</li>
          <li>Scene will restore automatically</li>
          <li>Animations pause during restoration</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * VANILLA THREE.JS EXAMPLE (Non-React)
 * 
 * If you're not using React Three Fiber, use this approach:
 */

/*
import * as THREE from "three";
import { setupWebGLContextHandler } from "@/lib/webglContextHandler";

// Create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

camera.position.z = 5;

// Setup context handler
let animationPaused = false;

const cleanup = setupWebGLContextHandler({
  renderer,
  scene,
  camera,
  onContextLost: () => {
    console.warn("Context lost - pausing animation");
    animationPaused = true;
  },
  onContextRestored: () => {
    console.info("Context restored - resuming");
    animationPaused = false;
  },
  enableLogging: true,
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  if (!animationPaused) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
}

animate();

// Cleanup when done
// cleanup();
*/
