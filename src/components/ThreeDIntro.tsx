
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Stars, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { ArrowRight } from 'lucide-react';

interface ThreeDIntroProps {
    onEnter: () => void;
}

const FloatingGeometry = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            < mesh ref={meshRef} scale={1.8} >
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                <MeshDistortMaterial
                    color="#222"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={1}
                />
            </mesh >
        </Float >
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
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#C0B8A0" />
                    <group position={[0, 0, 0]}>
                        <FloatingGeometry />
                    </group>
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Environment preset="city" />
                </Canvas>
            </div>

            {/* Overlay Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mb-12"
                >
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-[#EEE8DD] mix-blend-difference opacity-90 drop-shadow-2xl font-sans" style={{ letterSpacing: '-0.05em' }}>
                        KENET
                    </h1>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C0B8A0] to-transparent my-6 opacity-30" />
                    <h2 className="text-xl md:text-2xl font-light tracking-[0.8em] text-[#C0B8A0] uppercase pl-2">
                        TECHNOLOGIES
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="pointer-events-auto mt-8 touch-manipulation"
                >
                    <button
                        onClick={handleEnter}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className="group relative px-10 py-4 bg-transparent border border-[#C0B8A0]/20 text-[#EEE8DD] rounded-full uppercase tracking-widest text-xs font-semibold overflow-hidden transition-all duration-500 hover:border-[#C0B8A0]/60 hover:shadow-[0_0_30px_rgba(192,184,160,0.15)]"
                    >
                        <span className="relative z-10 flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-1">
                            Enter the Void
                            <ArrowRight className={`w-4 h-4 transition-all duration-300 ${hovered ? 'translate-x-1 opacity-100' : 'opacity-70'}`} />
                        </span>
                        <div className={`absolute inset-0 bg-[#C0B8A0] transform origin-left transition-transform duration-500 ease-out ${hovered ? 'scale-x-100 opacity-10' : 'scale-x-0 opacity-0'}`} />
                    </button>
                </motion.div>
            </div>

            {/* Footer / Status */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-between px-8 text-[10px] text-[#C0B8A0]/40 uppercase tracking-widest font-mono">
                <span>Systems Online</span>
                <span>Est. 2026</span>
                <span>Secure Connection</span>
            </div>
        </div>
    );
};

export default ThreeDIntro;
