import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 2000 }) {
    const mesh = useRef();
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Track mouse position globally since canvas has pointerEvents: none
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            // Normalize to -1 to 1
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Generate random initial positions and velocities
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = (Math.random() - 0.5) * 20; // Spread across width
            const y = (Math.random() - 0.5) * 20; // Spread across height
            const z = (Math.random() - 0.5) * 10; // Depth
            const mx = 0;
            const my = 0;
            temp.push({ t, factor, speed, x, y, z, mx, my });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, x, y, z } = particle;

            // Update time
            t = particle.t += speed / 2;

            // Basic floating movement (Lissajous curve for organic feel)
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            // Mouse interaction
            const mouseX = (mouse.current.x * viewport.width) / 2;
            const mouseY = (mouse.current.y * viewport.height) / 2;

            // Current actual position (base orbit)
            const curX = x + a;
            const curY = y + b;

            const dx = mouseX - curX;
            const dy = mouseY - curY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 4;

            // Smooth repulsion (Reverse Magnetic / Gravity-like push)
            let dX = 0;
            let dY = 0;

            if (dist < maxDist) {
                // Calculate force: stronger when closer, smooth falloff
                const force = Math.pow((maxDist - dist) / maxDist, 2) * 3;
                const angle = Math.atan2(dy, dx);

                // Push away
                dX = -Math.cos(angle) * force;
                dY = -Math.sin(angle) * force;
            }

            // Update dummy object for InstancedMesh
            dummy.position.set(
                curX + dX,
                curY + dY,
                z
            );

            // Scale based on depth/randomness for twinkling effect
            const scale = (Math.cos(t) + 2) * 0.03;
            dummy.scale.set(scale, scale, scale);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshPhongMaterial color="#7042f8" emissive="#7042f8" emissiveIntensity={0.5} />
        </instancedMesh>
    );
}

export default function VoltageField() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -5,
            opacity: 0.6,
            pointerEvents: 'none', // Let clicks pass through to content
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', // Feathering effect
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' // Webkit support
        }}>
            <Canvas 
                camera={{ position: [0, 0, 10], fov: 75 }} 
                dpr={[1, 2]}
                events={null}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} color="#7042f8" intensity={1} />
                <pointLight position={[-10, -10, -10]} color="#00ffff" intensity={1} />
                <Particles />
            </Canvas>
        </div>
    );
}
