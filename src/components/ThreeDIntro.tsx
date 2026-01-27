
import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Stars, MeshDistortMaterial, PerspectiveCamera, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { ArrowRight } from 'lucide-react';

interface ThreeDIntroProps {
    onEnter: () => void;
}

const LiquidChrome = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Slow, organic rotation
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} scale={2}>
                {/* Sphere with high subdivision for smooth liquid effect */}
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#aaaaaa" // Light silver/chrome base
                    attach="material"
                    distort={0.6} // High distortion for "liquid" look
                    speed={1.5}
                    roughness={0} // Perfectly smooth like chrome
                    metalness={1} // Fully metallic
                    bumpScale={0.005} // Subtle surface detail
                />
            </mesh>
        </Float>
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
                    <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                    <ambientLight intensity={0.2} />
                    {/* Dramatic rim lighting */}
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#C0B8A0" />
                    <group position={[0, 0, 0]}>
                        <LiquidChrome />
                    </group>
                    {/* Floating particles like in the screenshots */}
                    <Sparkles count={50} scale={10} size={2} speed={0.4} opacity={0.5} color="#C0B8A0" />
                    <Environment preset="studio" />
                </Canvas>
            </div>

            {/* Overlay Content - Mixed 3D/Text Layout inspired by 'BORN OF NATURE' */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none select-none">

                {/* Top Text Group */}
                <motion.div
                    initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute top-[35%] md:top-[30%] left-[10%] md:left-[20%] text-left"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl font-serif">
                        KEN
                    </h1>
                </motion.div>

                {/* Bottom Text Group */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    className="absolute bottom-[35%] md:bottom-[30%] right-[10%] md:right-[20%] text-right"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl font-serif z-20 relative">
                        ET
                    </h1>
                </motion.div>

                {/* Center/Connective Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 mix-blend-difference"
                >
                    <h2 className="text-xl md:text-2xl font-light tracking-[0.8em] text-[#C0B8A0] uppercase whitespace-nowrap">
                        TECHNOLOGIES
                    </h2>
                </motion.div>

                {/* Enter Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 pointer-events-auto"
                >
                    <button
                        onClick={handleEnter}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className="group relative px-8 py-3 bg-transparent text-white/80 rounded-none uppercase tracking-widest text-[10px] sm:text-xs font-medium transition-all duration-300 hover:text-white"
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
