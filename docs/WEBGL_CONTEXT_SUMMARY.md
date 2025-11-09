# WebGL Context Loss Handling - Implementation Summary

## Overview

Your Three.js project now has comprehensive WebGL context loss handling that gracefully recovers from GPU context loss without breaking animations or controls.

## What Was Implemented

### 1. **React Three Fiber Hook** (`lib/useWebGLContextHandler.ts`)
A reusable hook for React Three Fiber applications that:
- ✅ Automatically detects context loss
- ✅ Prevents default browser behavior
- ✅ Restores renderer settings
- ✅ Recompiles all materials and geometries
- ✅ Updates textures and attributes
- ✅ Tracks restoration attempts
- ✅ Provides callbacks for custom logic
- ✅ Maintains animation state

### 2. **Vanilla Three.js Utilities** (`lib/webglContextHandler.ts`)
Two approaches for non-React applications:
- **Function-based**: `setupWebGLContextHandler()` - Simple setup with cleanup
- **Class-based**: `WebGLContextHandler` - OOP approach with state tracking

### 3. **Enhanced Components**

#### Globe.tsx
```tsx
// Enhanced WebGLRendererConfig with full restoration
export function WebGLRendererConfig() {
  const { gl, size, scene, camera, invalidate } = useThree();
  const [contextLost, setContextLost] = useState(false);
  
  // Handles context loss with scene traversal and material updates
  // Shows visual indicator during context loss (in development)
}
```

#### CanvasRevealEffect.tsx
```tsx
// Added context handler to ShaderMaterial
useWebGLContextHandler({
  onContextLost: () => {
    // Animation pauses automatically
  },
  onContextRestored: () => {
    lastFrameTime = 0; // Reset frame time
  },
});
```

## Quick Start

### For React Three Fiber Projects

```tsx
import { useWebGLContextHandler } from "@/lib/useWebGLContextHandler";

function MyScene() {
  useWebGLContextHandler({
    onContextLost: () => console.log("Context lost!"),
    onContextRestored: () => console.log("Context restored!"),
  });

  return <mesh>...</mesh>;
}
```

### For Vanilla Three.js Projects

```typescript
import { setupWebGLContextHandler } from "@/lib/webglContextHandler";

const cleanup = setupWebGLContextHandler({
  renderer,
  scene,
  camera,
  onContextLost: () => console.log("Context lost!"),
  onContextRestored: () => console.log("Context restored!"),
});
```

## Key Features

### 🛡️ Automatic Recovery
- Prevents canvas from going permanently blank
- Restores all GPU resources automatically
- Maintains scene state and animations

### 🔄 Material & Geometry Updates
- Marks all materials for recompilation
- Updates geometry attributes (position, normal, UV)
- Refreshes all texture maps

### 📊 State Tracking
- Monitors context loss state
- Counts restoration attempts
- Provides manual restoration trigger

### 🎨 Custom Restoration Logic
```tsx
useWebGLContextHandler({
  customRestoration: (renderer, scene) => {
    // Your custom logic here
    scene.traverse((object) => {
      if (object.userData.customTexture) {
        object.userData.customTexture.needsUpdate = true;
      }
    });
  },
});
```

### 🐛 Development Logging
- Automatic logging in development mode
- Can be disabled with `enableLogging: false`
- Tracks context loss and restoration events

## Testing

### Simulate Context Loss in Browser Console

```javascript
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
const ext = gl.getExtension("WEBGL_lose_context");

// Lose context
ext.loseContext();

// Restore after 2 seconds
setTimeout(() => ext.restoreContext(), 2000);
```

### Test Button Component

```tsx
function TestButton() {
  const simulateContextLoss = () => {
    const canvas = document.querySelector("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    const ext = gl.getExtension("WEBGL_lose_context");
    if (ext) {
      ext.loseContext();
      setTimeout(() => ext.restoreContext(), 2000);
    }
  };

  return <button onClick={simulateContextLoss}>Test Context Loss</button>;
}
```

## Files Created/Modified

### Created Files
- ✅ `lib/useWebGLContextHandler.ts` - React hook for context handling
- ✅ `lib/webglContextHandler.ts` - Vanilla Three.js utilities
- ✅ `docs/WEBGL_CONTEXT_HANDLING.md` - Complete documentation
- ✅ `docs/EXAMPLE_USAGE.tsx` - Full working examples
- ✅ `docs/WEBGL_CONTEXT_SUMMARY.md` - This summary

### Modified Files
- ✅ `components/ui/Globe.tsx` - Enhanced WebGLRendererConfig
- ✅ `components/ui/CanvasRevealEffect.tsx` - Added context handler

## API Reference

### useWebGLContextHandler Hook

```typescript
interface WebGLContextHandlerOptions {
  onContextLost?: () => void;
  onContextRestored?: () => void;
  enableLogging?: boolean;
  customRestoration?: (renderer: THREE.WebGLRenderer, scene: THREE.Scene) => void;
}

function useWebGLContextHandler(options?: WebGLContextHandlerOptions): {
  contextLost: boolean;
  restorationAttempts: number;
  forceRestore: () => boolean;
}
```

### setupWebGLContextHandler Function

```typescript
interface WebGLContextHandlerConfig {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera?: THREE.Camera;
  onContextLost?: () => void;
  onContextRestored?: () => void;
  customRestoration?: (renderer: THREE.WebGLRenderer, scene: THREE.Scene) => void;
  enableLogging?: boolean;
}

function setupWebGLContextHandler(config: WebGLContextHandlerConfig): () => void;
```

### WebGLContextHandler Class

```typescript
class WebGLContextHandler {
  constructor(config: WebGLContextHandlerConfig);
  isContextLost(): boolean;
  getRestorationAttempts(): number;
  dispose(): void;
}
```

## Best Practices

### ✅ DO:
- Always call `event.preventDefault()` on context lost (handled automatically)
- Mark materials and geometries for update after restoration
- Pause animations during context loss
- Provide user feedback when context is lost
- Dispose unused renderers to free up context slots

### ❌ DON'T:
- Don't ignore context loss events
- Don't assume context will never be lost
- Don't create too many concurrent WebGL contexts
- Don't forget to clean up event listeners

## Common Causes of Context Loss

1. **GPU Driver Crashes** - Hardware/driver issues
2. **Tab Switching** - Browser suspends WebGL contexts
3. **Too Many Contexts** - Browser limits (typically 8-16)
4. **GPU Memory Exhaustion** - Too many textures/geometries
5. **System Sleep/Wake** - Power management

## Troubleshooting

### Context Not Restoring?
1. Check if `event.preventDefault()` is being called
2. Verify GPU drivers are up to date
3. Check browser console for errors
4. Try reducing scene complexity

### Performance Issues After Restoration?
1. Verify all resources are marked for update
2. Check texture reloading
3. Monitor GPU memory usage

### Multiple Context Losses?
1. Reduce concurrent WebGL contexts
2. Dispose unused renderers
3. Check GPU driver issues
4. Monitor system resources

## Browser Support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

All modern browsers support the `webglcontextlost` and `webglcontextrestored` events.

## Performance Impact

- **Minimal overhead** during normal operation
- **Event listeners** are lightweight
- **Restoration** only runs when context is lost
- **No impact** on frame rate during normal rendering

## Next Steps

1. **Test the implementation** using the test button
2. **Monitor logs** in development mode
3. **Customize callbacks** for your specific needs
4. **Add user feedback** for production (optional)
5. **Review documentation** for advanced usage

## Resources

- 📖 Full Documentation: `docs/WEBGL_CONTEXT_HANDLING.md`
- 💻 Example Code: `docs/EXAMPLE_USAGE.tsx`
- 🔧 Hook Implementation: `lib/useWebGLContextHandler.ts`
- 🛠️ Vanilla Utils: `lib/webglContextHandler.ts`

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review the documentation
3. Test with the provided examples
4. Verify GPU drivers are up to date

---

**Your Three.js project is now resilient to WebGL context loss! 🎉**
