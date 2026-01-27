import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D Components (Identical to previous AvatarIntro implementation) ---

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

    useFrame((state) => {
        if (!headGroup.current) return;

        // Mouse tracking logic (less intense for background)
        const targetX = state.mouse.x * 0.3;
        const targetY = state.mouse.y * 0.3;

        // Smoothly rotate head
        headGroup.current.rotation.y = THREE.MathUtils.lerp(headGroup.current.rotation.y, targetX, 0.1);
        headGroup.current.rotation.x = THREE.MathUtils.lerp(headGroup.current.rotation.x, -targetY, 0.1);
    });

    const hairMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2A1B15", roughness: 0.5 }), []);
    const skinMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#F5D0B5", roughness: 0.3, metalness: 0.1 }), []);

    return (
        <group position={[0, -0.5, 0]}>
            {/* --- TORSO/BODY --- */}
            <mesh position={[0, -1.8, 0]}>
                <capsuleGeometry args={[0.7, 1.5, 4, 16]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            {/* Shoulders */}
            <mesh position={[0, -1.5, 0]} scale={[1.8, 0.5, 1]}>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* --- HEAD --- */}
            <group ref={headGroup} position={[0, 0.2, 0]}>
                {/* Face Shape */}
                <mesh geometry={new THREE.SphereGeometry(1, 64, 64)} material={skinMaterial} />

                {/* --- EYES --- */}
                <group position={[0, 0.1, 0.85]}>
                    <Eye side="left" position={[-0.35, 0, 0]} />
                    <Eye side="right" position={[0.35, 0, 0]} />
                </group>

                {/* Nose */}
                <mesh position={[0, -0.1, 0.95]} scale={[0.1, 0.1, 0.1]}>
                    <sphereGeometry />
                    <meshStandardMaterial color="#E5C0A5" />
                </mesh>

                {/* Mouth */}
                <mesh position={[0, -0.35, 0.9]} rotation={[0, 0, 0]} scale={[0.2, 0.05, 0.05]}>
                    <capsuleGeometry args={[1, 1, 4]} />
                    <meshStandardMaterial color="#cc8888" />
                </mesh>

                {/* Hair */}
                <mesh position={[0, 0.1, -0.2]} scale={[1.1, 1.1, 1.1]} material={hairMaterial}>
                    <sphereGeometry args={[1, 32, 32]} />
                </mesh>
                <group position={[0, 0, 0]}>
                    <mesh position={[-0.9, 0, 0.2]} scale={[0.3, 1.2, 0.5]} material={hairMaterial}><sphereGeometry /></mesh>
                    <mesh position={[0.9, 0, 0.2]} scale={[0.3, 1.2, 0.5]} material={hairMaterial}><sphereGeometry /></mesh>
                    <mesh position={[0, 1, 0.2]} scale={[1.1, 0.4, 0.8]} material={hairMaterial}><sphereGeometry /></mesh>
                </group>
            </group>

            {/* Laptop */}
            <Laptop groupProps={{ position: [0, -1.2, 1.5], rotation: [-0.3, 0, 0], scale: 0.6 }} />
        </group>
    );
};

const Eye = ({ position }: { position: [number, number, number], side: 'left' | 'right' }) => {
    return (
        <group position={position}>
            <mesh>
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[0, 0, 0.22]} scale={[1, 1, 0.2]}>
                <sphereGeometry args={[0.12, 32, 32]} />
                <meshStandardMaterial color="#3a2410" />
            </mesh>
            <mesh position={[0.05, 0.05, 0.25]}>
                <sphereGeometry args={[0.04]} />
                <meshBasicMaterial color="white" />
            </mesh>
        </group>
    )
}

const BackgroundCharacter3D = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 6], fov: 40 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.4} />
                <spotLight position={[5, 10, 5]} intensity={0.8} angle={0.5} penumbra={1} />
                <pointLight position={[-5, 5, 5]} intensity={0.5} color="#dcb" />
                <pointLight position={[0, 0, -5]} intensity={1.5} color="#a020f0" distance={10} />

                {/* Positioned slightly lower and potentially to the side if needed, currently centered but subtle */}
                <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
                    {/* Scale down slightly for background usage */}
                    <group position={[0, -1, 0]} scale={0.9}>
                        <Character />
                    </group>
                </Float>
            </Canvas>
        </div>
    );
};

export default BackgroundCharacter3D;
