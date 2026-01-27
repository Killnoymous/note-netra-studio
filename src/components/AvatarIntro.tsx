
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sphere, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// A placeholder "Bot" avatar built with primitives that tracks the cursor
// This ensures functionality even without an external GLB file.
const TrackingHead = ({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) => {
    const headRef = useRef<THREE.Group>(null);
    const leftEyeRef = useRef<THREE.Mesh>(null);
    const rightEyeRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (headRef.current) {
            // Smoothly interpolate looking direction
            const targetX = mouse.current.x * 0.5;
            const targetY = mouse.current.y * 0.5;

            // Head rotation
            headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.1);
            headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY, 0.1);
        }
    });

    return (
        <group ref={headRef}>
            {/* Head Shape */}
            <Sphere args={[1, 32, 32]} scale={[1, 1.2, 1]}>
                <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.8} />
            </Sphere>

            {/* Face/Visor Area */}
            <Sphere args={[0.8, 32, 32]} position={[0, 0, 0.3]} scale={[0.9, 0.9, 0.9]}>
                <meshStandardMaterial color="#000" roughness={0.2} metalness={0.9} />
            </Sphere>

            {/* Glowing Eyes */}
            <group position={[0, 0.1, 0.85]}>
                {/* Left Eye */}
                <mesh ref={leftEyeRef} position={[-0.3, 0, 0]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshBasicMaterial color="#00ffcc" />
                    <pointLight intensity={1} distance={2} color="#00ffcc" />
                </mesh>
                {/* Right Eye */}
                <mesh ref={rightEyeRef} position={[0.3, 0, 0]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshBasicMaterial color="#00ffcc" />
                    <pointLight intensity={1} distance={2} color="#00ffcc" />
                </mesh>
            </group>

            {/* Neck */}
            <mesh position={[0, -1.2, 0]}>
                <cylinderGeometry args={[0.3, 0.4, 0.8, 32]} />
                <meshStandardMaterial color="#444" metalness={0.8} />
            </mesh>
        </group>
    );
};

interface AvatarIntroProps {
    onComplete: () => void;
}

const AvatarIntro = ({ onComplete }: AvatarIntroProps) => {
    const mouse = useRef(new THREE.Vector2(0, 0));
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Normalize mouse position to -1 to 1
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleContinue = () => {
        setExiting(true);
        setTimeout(onComplete, 800);
    };

    return (
        <div className={`fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-800 ${exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -5, 5]} color="#00ffcc" intensity={0.5} />

                    <group position={[0, 0, 0]}>
                        <TrackingHead mouse={mouse} />
                    </group>

                    <Environment preset="city" />
                </Canvas>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative z-10 flex flex-col items-center gap-6 mt-[40vh]"
            >
                <h2 className="text-2xl md:text-4xl font-light text-white tracking-widest uppercase">
                    Interactive Experience
                </h2>
                <p className="text-white/60 text-sm max-w-md text-center">
                    Move your cursor to interact. We build systems that respond to you.
                </p>

                <button
                    onClick={handleContinue}
                    className="px-8 py-3 mt-8 border border-white/20 text-white hover:bg-white/10 transition-colors uppercase tracking-widest text-xs"
                >
                    Enter Main Site
                </button>
            </motion.div>
        </div>
    );
};

export default AvatarIntro;
