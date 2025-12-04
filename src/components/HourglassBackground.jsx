import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color } from 'three';

// Shader based hourglass/fill effect for smoother performance and look
// Defined inside component or as a function to allow custom speed injection via uniforms
const createShaderMaterial = (speed) => ({
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color("#7042f8") },
        uSpeed: { value: speed }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uSpeed;
        varying vec2 vUv;
        
        // Simplex 2D noise
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        
        float snoise(vec2 v){
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod(i, 289.0);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }

        void main() {
            // Fill from TOP to BOTTOM (sweeping down)
            // vUv.y 1.0 is Top, 0.0 is Bottom
            
            // Progress from 0 to >1
            // Clamp so it stops once full
            float progress = min(uTime * uSpeed, 1.4); 
            
            // The "line" moves from 1.0 down to -0.2 (to ensure full clear)
            float threshold = 1.0 - progress;
            
            // Distortion for "dripping" effect
            // We want drips pointing DOWN
            // Use noise scaled by x and time
            float drip = snoise(vec2(vUv.x * 5.0, uTime * 0.5)) * 0.05;
            
            // Add some "long" drips
            float longDrip = snoise(vec2(vUv.x * 10.0, uTime * 0.2));
            // Make them spikey downwards
            if (longDrip < 0.0) longDrip = 0.0;
            drip -= longDrip * 0.15;
            
            // Calculate fill mask
            // We want pixels ABOVE the threshold (since we fill top down) to be colored?
            // "sweeping down... until it fills up the card"
            // Means: Color starts at top, expands downwards.
            // So if vUv.y > threshold + distortion, it is filled.
            
            float edge = threshold + drip;
            float fill = smoothstep(edge, edge + 0.02, vUv.y);
            
            // Color
            vec3 finalColor = uColor * fill;
            float alpha = fill * 0.15; // Low opacity background
            
            gl_FragColor = vec4(finalColor, alpha);
        }
    `
});

const ShaderFill = ({ speed = 0.3 }) => {
    const meshRef = useRef();
    
    // Create material only once or when speed changes
    const shaderMaterial = useMemo(() => createShaderMaterial(speed), [speed]);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[10, 10]} />
            <shaderMaterial
                args={[shaderMaterial]}
                transparent
            />
        </mesh>
    );
};

export default function HourglassBackground({ speed = 0.3 }) {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ShaderFill speed={speed} />
            </Canvas>
        </div>
    );
}
