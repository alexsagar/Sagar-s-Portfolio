# WebGL Context Loss Handling Guide

This guide explains how to handle WebGL context loss in your Three.js applications, both with React Three Fiber and vanilla Three.js.

## Table of Contents

1. [What is WebGL Context Loss?](#what-is-webgl-context-loss)
2. [React Three Fiber Usage](#react-three-fiber-usage)
3. [Vanilla Three.js Usage](#vanilla-threejs-usage)
4. [Testing Context Loss](#testing-context-loss)
5. [Best Practices](#best-practices)

---

## What is WebGL Context Loss?

WebGL context loss occurs when the browser loses access to the GPU, causing your canvas to go blank. This can happen due to:

- **GPU driver crashes or resets**
- **Browser tab switching** (especially on mobile)
- **Too many WebGL contexts** (browsers limit concurrent contexts)
- **GPU memory exhaustion**
- **System sleep/wake cycles**

When context is lost, all GPU resources (textures, buffers, shaders) are destroyed and must be recreated.

---

## React Three Fiber Usage

### Using the Hook (Recommended)

The `useWebGLContextHandler` hook provides automatic context restoration for React Three Fiber applications.

#### Basic Usage

```tsx
import { useWebGLContextHandler } from "@/lib/useWebGLContextHandler";

function MyScene() {
  const { contextLost, restorationAttempts } = useWebGLContextHandler({
    onContextLost: () => {
      console.log("Context lost! Pausing animations...");
    },
    onContextRestored: () => {
      console.log("Context restored! Resuming...");
    },
  });

  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={contextLost ? "red" : "blue"} />
    </mesh>
  );
}
```

#### Advanced Usage with Custom Restoration

```tsx
import { useWebGLContextHandler } from "@/lib/useWebGLContextHandler";
import { useRef, useEffect } from "react";

function AdvancedScene() {
  const animationStateRef = useRef({ time: 0, paused: false });

  const { contextLost, forceRestore } = useWebGLContextHandler({
    onContextLost: () => {
      // Save animation state
      animationStateRef.current.paused = true;
    },
    onContextRestored: () => {
      // Resume from saved state
      animationStateRef.current.paused = false;
    },
    customRestoration: (renderer, scene) => {
      // Custom logic to restore specific scene elements
      scene.traverse((object) => {
        if (object.userData.customTexture) {
          // Reload custom textures
          object.userData.customTexture.needsUpdate = true;
        }
      });
    },
    enableLogging: true,
  });

  useFrame((state, delta) => {
    if (!animationStateRef.current.paused) {
      animationStateRef.current.time += delta;
      // Your animation logic here
    }
  });

  return (
    <>
      {contextLost && (
        <Html center>
          <div style={{ color: "white", background: "rgba(0,0,0,0.8)", padding: "10px" }}>
            Restoring WebGL context...
          </div>
        </Html>
      )}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
}
```

#### Full Example with Canvas

```tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useWebGLContextHandler } from "@/lib/useWebGLContextHandler";

function Scene() {
  useWebGLContextHandler({
    onContextLost: () => console.warn("WebGL context lost"),
    onContextRestored: () => console.info("WebGL context restored"),
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <OrbitControls />
    </>
  );
}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
}
```

---

## Vanilla Three.js Usage

### Function-Based Approach

```typescript
import * as THREE from "three";
import { setupWebGLContextHandler } from "@/lib/webglContextHandler";

// Create renderer, scene, and camera
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Setup geometry and materials
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
const cleanup = setupWebGLContextHandler({
  renderer,
  scene,
  camera,
  onContextLost: () => {
    console.warn("WebGL context lost - animation paused");
    // Optionally pause your animation loop here
  },
  onContextRestored: () => {
    console.info("WebGL context restored - resuming animation");
    // Resume animation loop if needed
  },
  enableLogging: true,
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}

animate();

// Cleanup when done
// cleanup();
```

### Class-Based Approach

```typescript
import * as THREE from "three";
import { WebGLContextHandler } from "@/lib/webglContextHandler";

class ThreeJSApp {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private contextHandler: WebGLContextHandler;
  private cube: THREE.Mesh;
  private animationId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    // Initialize Three.js
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Create scene objects
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    this.scene.add(light);

    // Setup context handler
    this.contextHandler = new WebGLContextHandler({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
      onContextLost: () => this.handleContextLost(),
      onContextRestored: () => this.handleContextRestored(),
      customRestoration: (renderer, scene) => {
        // Custom restoration logic
        console.log("Running custom restoration");
      },
      enableLogging: true,
    });

    // Handle window resize
    window.addEventListener("resize", () => this.onWindowResize());
    
    // Start animation
    this.animate();
  }

  private handleContextLost() {
    console.warn("Context lost - pausing animation");
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private handleContextRestored() {
    console.info("Context restored - resuming animation");
    if (this.animationId === null) {
      this.animate();
    }
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    
    this.renderer.render(this.scene, this.camera);
  };

  public dispose() {
    this.contextHandler.dispose();
    this.renderer.dispose();
    this.scene.clear();
    window.removeEventListener("resize", () => this.onWindowResize());
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Usage
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const app = new ThreeJSApp(canvas);

// Later, when cleaning up:
// app.dispose();
```

---

## Testing Context Loss

You can simulate context loss for testing purposes:

### In Browser Console

```javascript
// Get the WebGL context
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl") || canvas.getContext("webgl2");

// Force context loss
const ext = gl.getExtension("WEBGL_lose_context");
if (ext) {
  ext.loseContext();
  
  // Restore after 2 seconds
  setTimeout(() => {
    ext.restoreContext();
  }, 2000);
}
```

### Programmatic Testing

```typescript
// Add this to your component for testing
function TestContextLoss() {
  const { gl } = useThree();
  
  const simulateContextLoss = () => {
    const renderer = gl as any;
    const context = renderer.getContext();
    const ext = context.getExtension("WEBGL_lose_context");
    
    if (ext) {
      console.log("Simulating context loss...");
      ext.loseContext();
      
      // Restore after 2 seconds
      setTimeout(() => {
        console.log("Restoring context...");
        ext.restoreContext();
      }, 2000);
    }
  };
  
  return (
    <Html>
      <button onClick={simulateContextLoss}>
        Test Context Loss
      </button>
    </Html>
  );
}
```

---

## Best Practices

### 1. Always Prevent Default Behavior

```typescript
canvas.addEventListener("webglcontextlost", (event) => {
  event.preventDefault(); // CRITICAL: Prevents browser from giving up on restoration
}, false);
```

### 2. Mark Resources for Update

After context restoration, mark all GPU resources for recompilation:

```typescript
scene.traverse((object) => {
  if (object.isMesh) {
    // Materials
    if (object.material) {
      object.material.needsUpdate = true;
    }
    
    // Geometry attributes
    if (object.geometry) {
      object.geometry.attributes.position.needsUpdate = true;
      object.geometry.attributes.normal.needsUpdate = true;
    }
  }
});
```

### 3. Handle Textures

```typescript
scene.traverse((object) => {
  if (object.material) {
    const materials = Array.isArray(object.material) 
      ? object.material 
      : [object.material];
      
    materials.forEach((mat) => {
      if (mat.map) mat.map.needsUpdate = true;
      if (mat.normalMap) mat.normalMap.needsUpdate = true;
      // ... other texture maps
    });
  }
});
```

### 4. Pause Animations During Context Loss

```typescript
let animationPaused = false;

canvas.addEventListener("webglcontextlost", () => {
  animationPaused = true;
});

canvas.addEventListener("webglcontextrestored", () => {
  animationPaused = false;
});

function animate() {
  requestAnimationFrame(animate);
  
  if (!animationPaused) {
    // Your animation code
    renderer.render(scene, camera);
  }
}
```

### 5. Provide User Feedback

```tsx
function Scene() {
  const { contextLost } = useWebGLContextHandler();
  
  return (
    <>
      {contextLost && (
        <Html center>
          <div className="context-lost-message">
            Restoring graphics...
          </div>
        </Html>
      )}
      {/* Your scene content */}
    </>
  );
}
```

### 6. Limit WebGL Contexts

Browsers typically limit the number of concurrent WebGL contexts (usually 8-16). If you have multiple canvases:

```typescript
// Dispose unused renderers
renderer.dispose();
renderer.forceContextLoss();
```

### 7. Monitor Context Loss Events

```typescript
let contextLossCount = 0;

canvas.addEventListener("webglcontextlost", () => {
  contextLossCount++;
  
  if (contextLossCount > 3) {
    console.error("Too many context losses - possible GPU issue");
    // Show error message to user
  }
});
```

---

## API Reference

### `useWebGLContextHandler` Hook

**Parameters:**
- `onContextLost?: () => void` - Callback when context is lost
- `onContextRestored?: () => void` - Callback when context is restored
- `enableLogging?: boolean` - Enable console logging (default: true in development)
- `customRestoration?: (renderer, scene) => void` - Custom restoration logic

**Returns:**
- `contextLost: boolean` - Current context state
- `restorationAttempts: number` - Number of times context has been restored
- `forceRestore: () => boolean` - Manually trigger restoration

### `setupWebGLContextHandler` Function

**Parameters:**
- `renderer: THREE.WebGLRenderer` - The renderer instance
- `scene: THREE.Scene` - The scene to restore
- `camera?: THREE.Camera` - Optional camera reference
- `onContextLost?: () => void` - Context lost callback
- `onContextRestored?: () => void` - Context restored callback
- `customRestoration?: (renderer, scene) => void` - Custom restoration logic
- `enableLogging?: boolean` - Enable logging

**Returns:**
- `() => void` - Cleanup function to remove event listeners

### `WebGLContextHandler` Class

**Constructor Parameters:** Same as `setupWebGLContextHandler`

**Methods:**
- `isContextLost(): boolean` - Check if context is currently lost
- `getRestorationAttempts(): number` - Get restoration attempt count
- `dispose(): void` - Clean up event listeners

---

## Troubleshooting

### Context Not Restoring

1. Ensure you're calling `event.preventDefault()` in the context lost handler
2. Check browser console for errors
3. Verify GPU drivers are up to date
4. Try reducing scene complexity

### Performance Issues After Restoration

1. Check if all resources are being properly marked for update
2. Verify textures are being reloaded correctly
3. Monitor GPU memory usage

### Multiple Context Losses

1. Reduce the number of concurrent WebGL contexts
2. Dispose unused renderers properly
3. Check for GPU driver issues
4. Monitor system resources

---

## Additional Resources

- [WebGL Context Loss Specification](https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14.13)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
