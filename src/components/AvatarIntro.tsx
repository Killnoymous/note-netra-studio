import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// --- 3D Components ---

const Laptop = ({ groupProps }: { groupProps?: JSX.IntrinsicElements['group'] }) => {
    return (
        <group {...groupProps}>
            {/* Base */}
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[3, 0.2, 2]} />
                <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Screen backing */}
            <mesh position={[0, 0.5, -1]} rotation={[0.2, 0, 0]}>
                <boxGeometry args={[3, 2, 0.1]} />
                <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Screen Display (Emissive) */}
            <mesh position={[0, 0.5, -0.94]} rotation={[0.2, 0, 0]}>
                <planeGeometry args={[2.8, 1.8]} />
                <meshStandardMaterial color="#5599ff" emissive="#0044aa" emissiveIntensity={2} toneMapped={false} />
            </mesh>
            {/* Screen Light Glow */}
            <pointLight position={[0, 0.5, -0.5]} color="#4488ff" intensity={3} distance={5} decay={2} />
        </group>
    );
};

const Character = () => {
    const headGroup = useRef<THREE.Group>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        if (!headGroup.current) return;

        // Mouse tracking logic
        const targetX = state.mouse.x * 0.5;
        const targetY = state.mouse.y * 0.5;

        // Smoothly rotate head
        headGroup.current.rotation.y = THREE.MathUtils.lerp(headGroup.current.rotation.y, targetX, 0.1);
        headGroup.current.rotation.x = THREE.MathUtils.lerp(headGroup.current.rotation.x, -targetY, 0.1);
    });

    // Hair color
    const hairMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2A1B15", roughness: 0.5 }), []);
    // Skin color
    const skinMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#F5D0B5", roughness: 0.3, metalness: 0.1 }), []);

    return (
        <group position={[0, -0.5, 0]}>
            {/* --- TORSO/BODY is static --- */}
            <mesh position={[0, -1.8, 0]}>
                <capsuleGeometry args={[0.7, 1.5, 4, 16]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            {/* Shoulders */}
            <mesh position={[0, -1.5, 0]} scale={[1.8, 0.5, 1]}>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* --- HEAD tracks the mouse --- */}
            <group ref={headGroup} position={[0, 0.2, 0]}>

                {/* Face Shape */}
                <mesh geometry={new THREE.SphereGeometry(1, 64, 64)} material={skinMaterial} />

                {/* --- EYES --- */}
                <group position={[0, 0.1, 0.85]}>
                    <Eye side="left" position={[-0.35, 0, 0]} />
                    <Eye side="right" position={[0.35, 0, 0]} />
                </group>

                {/* Nose - subtle */}
                <mesh position={[0, -0.1, 0.95]} scale={[0.1, 0.1, 0.1]}>
                    <sphereGeometry />
                    <meshStandardMaterial color="#E5C0A5" />
                </mesh>

                {/* Mouth - subtle smile */}
                <mesh position={[0, -0.35, 0.9]} rotation={[0, 0, 0]} scale={[0.2, 0.05, 0.05]}>
                    <capsuleGeometry args={[1, 1, 4]} />
                    <meshStandardMaterial color="#cc8888" />
                </mesh>

                {/* --- HAIR GENERATION --- */}
                {/* Back of hair */}
                <mesh position={[0, 0.1, -0.2]} scale={[1.1, 1.1, 1.1]} material={hairMaterial}>
                    <sphereGeometry args={[1, 32, 32]} />
                </mesh>
                {/* Bangs / Side Hair details */}
                <group position={[0, 0, 0]}>
                    <mesh position={[-0.9, 0, 0.2]} scale={[0.3, 1.2, 0.5]} material={hairMaterial}><sphereGeometry /></mesh>
                    <mesh position={[0.9, 0, 0.2]} scale={[0.3, 1.2, 0.5]} material={hairMaterial}><sphereGeometry /></mesh>
                    <mesh position={[0, 1, 0.2]} scale={[1.1, 0.4, 0.8]} material={hairMaterial}><sphereGeometry /></mesh>
                </group>

            </group>

            {/* Laptop in front */}
            <Laptop groupProps={{ position: [0, -1.2, 1.5], rotation: [-0.3, 0, 0], scale: 0.6 }} />
        </group>
    );
};

const Eye = ({ position, side }: { position: [number, number, number], side: 'left' | 'right' }) => {
    return (
        <group position={position}>
            {/* Eye White */}
            <mesh>
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {/* Iris/Pupil - slightly forward */}
            <mesh position={[0, 0, 0.22]} scale={[1, 1, 0.2]}>
                <sphereGeometry args={[0.12, 32, 32]} />
                <meshStandardMaterial color="#3a2410" />
            </mesh>
            {/* Pupil Highlight */}
            <mesh position={[0.05, 0.05, 0.25]}>
                <sphereGeometry args={[0.04]} />
                <meshBasicMaterial color="white" />
            </mesh>
        </group>
    )
}

// --- Main Component ---

interface AvatarIntroProps {
    onComplete: () => void;
}

const AvatarIntro = ({ onComplete }: AvatarIntroProps) => {
    const [exiting, setExiting] = useState(false);

    const handleContinue = () => {
        setExiting(true);
        setTimeout(onComplete, 800);
    };

    return (
        <div className={`fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center transition-opacity duration-800 ${exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 40 }} shadows>
                    {/* Lighting Environment */}
                    <ambientLight intensity={0.4} />
                    <spotLight position={[5, 10, 5]} intensity={1} angle={0.5} penumbra={1} castShadow />
                    <pointLight position={[-5, 5, 5]} intensity={0.5} color="#dcb" />

                    {/* Purple Rim Light for aesthetics */}
                    <pointLight position={[0, 0, -5]} intensity={2} color="#a020f0" distance={10} />

                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                        <Character />
                    </Float>

                    {/* Background Particles/Stars */}
                    <Stars />
                </Canvas>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative z-10 flex flex-col items-center justify-end h-full pb-20 pointer-events-none"
            >
                <div className="pointer-events-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-purple-200 tracking-tighter drop-shadow-2xl mb-4">
                        NETRA STUDIO
                    </h2>
                    <p className="text-blue-100/60 text-sm md:text-base mb-8 tracking-widest uppercase">
                        Digital Experience
                    </p>

                    <button
                        onClick={handleContinue}
                        className="px-8 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white transition-all duration-300 hover:scale-105"
                    >
                        Enter
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

// Simple background stars
const Stars = () => {
    const group = useRef<THREE.Group>(null);
    useFrame(() => {
        if (group.current) group.current.rotation.y += 0.0005;
    })
    return (
        <group ref={group}>
            {Array.from({ length: 50 }).map((_, i) => (
                <mesh key={i} position={[
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20 - 5
                ]}>
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshBasicMaterial color="white" />
                </mesh>
            ))}
        </group>
    )
}

export default AvatarIntro;
