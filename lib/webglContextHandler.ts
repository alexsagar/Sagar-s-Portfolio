import * as THREE from "three";

export interface WebGLContextHandlerConfig {
  /**
   * The WebGL renderer instance
   */
  renderer: THREE.WebGLRenderer;
  
  /**
   * The scene to restore
   */
  scene: THREE.Scene;
  
  /**
   * Optional camera reference
   */
  camera?: THREE.Camera;
  
  /**
   * Callback invoked when context is lost
   */
  onContextLost?: () => void;
  
  /**
   * Callback invoked when context is restored
   */
  onContextRestored?: () => void;
  
  /**
   * Custom restoration logic
   */
  customRestoration?: (renderer: THREE.WebGLRenderer, scene: THREE.Scene) => void;
  
  /**
   * Enable console logging (default: true)
   */
  enableLogging?: boolean;
}

/**
 * Handles WebGL context loss and restoration for vanilla Three.js setups
 * 
 * @param config - Configuration object
 * @returns Cleanup function to remove event listeners
 * 
 * @example
 * ```typescript
 * const renderer = new THREE.WebGLRenderer({ canvas });
 * const scene = new THREE.Scene();
 * const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
 * 
 * // Setup context handler
 * const cleanup = setupWebGLContextHandler({
 *   renderer,
 *   scene,
 *   camera,
 *   onContextLost: () => console.log("Context lost!"),
 *   onContextRestored: () => console.log("Context restored!"),
 * });
 * 
 * // Later, when cleaning up:
 * cleanup();
 * ```
 */
export function setupWebGLContextHandler(config: WebGLContextHandlerConfig): () => void {
  const {
    renderer,
    scene,
    camera,
    onContextLost,
    onContextRestored,
    customRestoration,
    enableLogging = true,
  } = config;

  const canvas = renderer.domElement;

  const restoreScene = () => {
    try {
      // Reinitialize renderer settings
      const size = renderer.getSize(new THREE.Vector2());
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(size.width, size.height);

      // Traverse scene and mark all materials/geometries for recompilation
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          // Mark materials for update
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => {
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
        if (object instanceof THREE.Mesh && object.material) {
          const materials = Array.isArray(object.material) 
            ? object.material 
            : [object.material];
            
          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial || 
                mat instanceof THREE.MeshPhongMaterial ||
                mat instanceof THREE.MeshBasicMaterial) {
              if (mat.map) mat.map.needsUpdate = true;
              if ('normalMap' in mat && mat.normalMap) mat.normalMap.needsUpdate = true;
              if ('roughnessMap' in mat && mat.roughnessMap) mat.roughnessMap.needsUpdate = true;
              if ('metalnessMap' in mat && mat.metalnessMap) mat.metalnessMap.needsUpdate = true;
              if ('emissiveMap' in mat && mat.emissiveMap) mat.emissiveMap.needsUpdate = true;
            }
          });
        }
      });

      // Run custom restoration logic if provided
      if (customRestoration) {
        customRestoration(renderer, scene);
      }

      // Force a render to restore the scene
      if (camera) {
        renderer.render(scene, camera);
      }
      
      if (enableLogging) {
        console.info("[WebGL] Scene successfully restored after context recovery");
      }
      
      return true;
    } catch (error) {
      if (enableLogging) {
        console.error("[WebGL] Error during context restoration:", error);
      }
      return false;
    }
  };

  const handleContextLost = (event: Event) => {
    event.preventDefault();
    
    if (enableLogging) {
      console.warn("[WebGL] Context lost - preventing default and awaiting restoration");
    }
    
    onContextLost?.();
  };

  const handleContextRestored = () => {
    if (enableLogging) {
      console.info("[WebGL] Context restored - reinitializing renderer");
    }

    const success = restoreScene();
    
    if (success) {
      onContextRestored?.();
    }
  };

  // Add event listeners
  canvas.addEventListener("webglcontextlost", handleContextLost, false);
  canvas.addEventListener("webglcontextrestored", handleContextRestored, false);

  // Return cleanup function
  return () => {
    canvas.removeEventListener("webglcontextlost", handleContextLost, false);
    canvas.removeEventListener("webglcontextrestored", handleContextRestored, false);
  };
}

/**
 * Class-based WebGL context handler for object-oriented codebases
 */
export class WebGLContextHandler {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.Camera;
  private cleanup?: () => void;
  private contextLost = false;
  private restorationAttempts = 0;
  
  public onContextLost?: () => void;
  public onContextRestored?: () => void;
  public customRestoration?: (renderer: THREE.WebGLRenderer, scene: THREE.Scene) => void;
  public enableLogging: boolean;

  constructor(config: WebGLContextHandlerConfig) {
    this.renderer = config.renderer;
    this.scene = config.scene;
    this.camera = config.camera;
    this.onContextLost = config.onContextLost;
    this.onContextRestored = config.onContextRestored;
    this.customRestoration = config.customRestoration;
    this.enableLogging = config.enableLogging ?? true;
    
    this.initialize();
  }

  private initialize() {
    this.cleanup = setupWebGLContextHandler({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
      onContextLost: () => {
        this.contextLost = true;
        this.onContextLost?.();
      },
      onContextRestored: () => {
        this.contextLost = false;
        this.restorationAttempts++;
        this.onContextRestored?.();
      },
      customRestoration: this.customRestoration,
      enableLogging: this.enableLogging,
    });
  }

  public isContextLost(): boolean {
    return this.contextLost;
  }

  public getRestorationAttempts(): number {
    return this.restorationAttempts;
  }

  public dispose() {
    this.cleanup?.();
  }
}
