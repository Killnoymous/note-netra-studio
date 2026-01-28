import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Stars, MeshDistortMaterial, PerspectiveCamera, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { ArrowRight } from 'lucide-react';

// --- Global Mouse Tracker ---
const mouse = new THREE.Vector2(0, 0);
const targetMouse = new THREE.Vector2(0, 0);

if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
        // Normalize: -1 to +1
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        targetMouse.set(x, y);
    });
}

interface ThreeDIntroProps {
    onEnter: () => void;
}

const LiquidChrome = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);

    // For calculating mouse velocity/distortion intensity
    const lastMouse = useRef(new THREE.Vector2(0, 0));
    const currentDistort = useRef(0.4);

    useFrame((state, delta) => {
        // Smooth global mouse lerping
        mouse.lerp(targetMouse, 0.1);

        if (meshRef.current) {
            // 1. ROTATION: Make the bubble face the mouse functionality
            // This makes the liquid pattern "swirl" towards your cursor
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouse.y * 1.5, 0.1);
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 1.5, 0.1);

            // 2. DISTORTION REACTION: React to mouse movement speed
            // Calculate velocity (how fast mouse is moving)
            const velocity = mouse.distanceTo(lastMouse.current) / delta;

            // Target distortion bumps up when moving fast
            const targetDistort = 0.4 + Math.min(velocity * 2, 0.8);

            // Lerp the actual distortion value for smoothness
            currentDistort.current = THREE.MathUtils.lerp(currentDistort.current, targetDistort, 0.1);

            if (materialRef.current) {
                materialRef.current.distort = currentDistort.current;
            }

            // Update last mouse position
            lastMouse.current.copy(mouse);
        }
    });

    return (
        <group>
            {/* Interactive Lights that follow the mouse to create moving reflections */}
            <group rotation-x={mouse.y} rotation-y={mouse.x}>
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#C0B8A0" />
            </group>

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.05, 0.05]}>
                <mesh ref={meshRef} scale={2.2}>
                    <sphereGeometry args={[1, 128, 128]} />
                    <MeshDistortMaterial
                        ref={materialRef}
                        color="#aaaaaa"
                        attach="material"
                        distort={0.4} // Base distortion
                        speed={2}
                        roughness={0}
                        metalness={1}
                        bumpScale={0.005}
                    />
                </mesh>
            </Float>
        </group>
    );
};

const ThreeDIntro = ({ onEnter }: ThreeDIntroProps) => {
    const [hovered, setHovered] = useState(false);
    const [exiting, setExiting] = useState(false);

    const handleEnter = () => {
        setExiting(true);
        setTimeout(() => {
            onEnter();
        }, 1000);
    };

    return (
        <div className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ${exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 7]} />
                    <ambientLight intensity={0.2} />

                    {/* Scene Content */}
                    <group position={[0, 0, 0]}>
                        <LiquidChrome />
                    </group>

                    {/* Floating particles background */}
                    <Sparkles count={40} scale={12} size={2} speed={0.4} opacity={0.3} color="#C0B8A0" />
                    <Environment preset="studio" />
                </Canvas>
            </div>

            {/* Overlay Content - Mixed 3D/Text Layout */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none select-none">

                {/* Central Typographic Lockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center z-20 mix-blend-exclusion"
                >
                    <h1 className="text-7xl md:text-9xl lg:text-[12rem] leading-none font-bold tracking-tighter text-[#EEE8DD] font-serif text-center drop-shadow-2xl">
                        KENET
                    </h1>
                    <div className="h-px w-24 md:w-48 bg-[#EEE8DD]/50 my-6" />
                    <h2 className="text-xl md:text-3xl font-light tracking-[0.8em] text-[#EEE8DD] uppercase whitespace-nowrap pl-2">
                        TECHNOLOGIES
                    </h2>
                </motion.div>

                {/* Enter Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-12 pointer-events-auto"
                >
                    <button
                        onClick={handleEnter}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className="group relative px-8 py-3 bg-transparent text-white/80 rounded-none uppercase tracking-widest text-[10px] sm:text-xs font-medium transition-all duration-300 hover:text-white hover:tracking-[0.3em]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Enter Experience
                            <span className={`h-px w-8 bg-white/50 transition-all duration-300 ${hovered ? 'w-12 bg-white' : ''}`} />
                        </span>
                    </button>
                </motion.div>
            </div>

            {/* Corners decorative text */}
            <div className="absolute top-8 left-8 text-[10px] text-white/30 uppercase tracking-widest font-mono hidden md:block">
                EST. 2026
            </div>
            <div className="absolute top-8 right-8 text-[10px] text-white/30 uppercase tracking-widest font-mono hidden md:block">
                /001
            </div>
        </div>
    );
};

export default ThreeDIntro;
