import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// --- Global Mouse Tracker (Fixes "Bottom of page" issue) ---
const mouse = new THREE.Vector2(0, 0);
if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
        // Normalize: -1 to +1
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
}

// --- 3D Components ---

const Laptop = ({ groupProps }: { groupProps?: JSX.IntrinsicElements['group'] }) => {
    return (
        <group {...groupProps}>
            {/* Base (Chamfered) - Sleeker */}
            <RoundedBox args={[3.2, 0.15, 2.2]} radius={0.05} smoothness={4} position={[0, -0.5, 0]}>
                <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </RoundedBox>

            {/* Lid Group */}
            <group position={[0, -0.42, -1]} rotation={[0.15, 0, 0]}>
                {/* Back of Lid */}
                <RoundedBox args={[3.2, 2.0, 0.08]} radius={0.05} smoothness={4} position={[0, 1, 0]}>
                    <meshStandardMaterial color="#252525" metalness={0.8} roughness={0.2} />
                </RoundedBox>
                {/* Screen (Glowing) */}
                <mesh position={[0, 1, 0.05]}>
                    <planeGeometry args={[3, 1.8]} />
                    <meshStandardMaterial
                        color="#000"
                        emissive="#4f46e5" // Indigo/Purple tint
                        emissiveIntensity={0.6}
                        toneMapped={false}
                    />
                </mesh>
                {/* Logo */}
                <mesh position={[0, 1, -0.05]} rotation={[0, Math.PI, 0]}>
                    <circleGeometry args={[0.15]} />
                    <meshStandardMaterial color="#666" metalness={1} roughness={0.2} />
                </mesh>
            </group>

            {/* Keyboard Area Light - Subtle upward glow on face */}
            <pointLight position={[0, 0.5, 0]} color="#6366f1" intensity={2} distance={3} />

            {/* Floating Code Particles - More dispersed */}
            <Sparkles count={15} scale={[3, 2, 2]} size={3} speed={0.4} opacity={0.4} position={[0, 1.5, 0]} color="#a5b4fc" />
        </group>
    );
};

const Headphones = () => {
    return (
        <group position={[0, 0.05, 0]}>
            {/* Band */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.65, 0]}>
                <torusGeometry args={[0.65, 0.06, 16, 32, Math.PI]} />
                <meshStandardMaterial color="#111" roughness={0.3} />
            </mesh>
            {/* Ear Cups */}
            <mesh position={[-0.68, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.2, 0.2, 0.15, 32]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[0.68, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.2, 0.2, 0.15, 32]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* Glowing Ring */}
            <mesh position={[-0.69, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <ringGeometry args={[0.1, 0.13, 32]} />
                <meshStandardMaterial color="#d8b4fe" emissive="#d8b4fe" emissiveIntensity={2} toneMapped={false} />
            </mesh>
            <mesh position={[0.69, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <ringGeometry args={[0.1, 0.13, 32]} />
                <meshStandardMaterial color="#d8b4fe" emissive="#d8b4fe" emissiveIntensity={2} toneMapped={false} />
            </mesh>
        </group>
    )
}

const Character = () => {
    const headGroup = useRef<THREE.Group>(null);
    const bodyGroup = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (headGroup.current) {
            // Updated Tracking Logic uses global 'mouse' variable
            // Dampen the movement for smooth, natural feel
            // Look slightly up/forward by default
            const targetX = mouse.x * 0.5;
            const targetY = mouse.y * 0.4;

            headGroup.current.rotation.y = THREE.MathUtils.lerp(headGroup.current.rotation.y, targetX, 0.05);
            headGroup.current.rotation.x = THREE.MathUtils.lerp(headGroup.current.rotation.x, -targetY, 0.05);
        }
    });

    const skinMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#ffdac1",
        roughness: 0.5,
        metalness: 0.1
    }), []);

    const hoodieMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#27272a",
        roughness: 0.8
    }), []);

    const hairMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#4a3b52", // Desaturated Purple
        roughness: 0.6
    }), []);

    return (
        <group position={[0, -0.6, 0]}>
            {/* --- BODY --- */}
            <group ref={bodyGroup} position={[0, -1.3, 0]}>
                {/* Torso - Wider, relaxed */}
                <RoundedBox args={[1.3, 1.4, 0.7]} radius={0.3} position={[0, 0, 0]}>
                    <primitive object={hoodieMat} />
                </RoundedBox>
            </group>

            {/* --- HEAD GROUP --- */}
            <group ref={headGroup} position={[0, 0.2, 0]}>

                {/* Head Shape - More proportionate */}
                <mesh material={skinMat}>
                    <sphereGeometry args={[0.55, 32, 32]} />
                </mesh>

                {/* --- FACE DETAILS --- */}
                <group position={[0, 0, 0.48]}>
                    <Eye position={[-0.18, 0.02, 0]} />
                    <Eye position={[0.18, 0.02, 0]} />
                </group>

                {/* Blush */}
                <mesh position={[-0.25, -0.08, 0.45]} rotation={[0, -0.2, 0]}>
                    <circleGeometry args={[0.08]} />
                    <meshBasicMaterial color="#ffaaaa" transparent opacity={0.2} />
                </mesh>
                <mesh position={[0.25, -0.08, 0.45]} rotation={[0, 0.2, 0]}>
                    <circleGeometry args={[0.08]} />
                    <meshBasicMaterial color="#ffaaaa" transparent opacity={0.2} />
                </mesh>

                {/* Hair System */}
                {/* Main */}
                <mesh position={[0, 0.05, -0.05]} material={hairMat}>
                    <sphereGeometry args={[0.6, 32, 32]} />
                </mesh>
                {/* Bangs */}
                <RoundedBox args={[0.25, 0.4, 0.1]} radius={0.05} position={[-0.4, 0.2, 0.45]} rotation={[0, 0, 0.3]} material={hairMat} />
                <RoundedBox args={[0.25, 0.4, 0.1]} radius={0.05} position={[0.4, 0.2, 0.45]} rotation={[0, 0, -0.3]} material={hairMat} />
                <RoundedBox args={[0.6, 0.3, 0.2]} radius={0.1} position={[0, 0.45, 0.35]} rotation={[0.2, 0, 0]} material={hairMat} />

                <Headphones />
            </group>

            {/* Laptop in front - Lowered and Scaled Down */}
            <Laptop groupProps={{ position: [0, -1.1, 1.2], scale: 0.7, rotation: [-0.1, 0, 0] }} />
        </group>
    );
};

const Eye = ({ position }: { position: [number, number, number] }) => {
    return (
        <group position={position}>
            {/* Sclera */}
            <mesh scale={[1, 0.8, 0.5]}>
                <sphereGeometry args={[0.14, 32, 32]} />
                <meshStandardMaterial color="#fff" />
            </mesh>
            {/* Iris */}
            <mesh position={[0, 0, 0.08]} scale={[1, 1, 0.1]}>
                <circleGeometry args={[0.09, 32]} />
                <meshBasicMaterial color="#3b0764" /> {/* Dark purple iris */}
            </mesh>
            {/* Pupil */}
            <mesh position={[0, 0, 0.09]} scale={[1, 1, 0.1]}>
                <circleGeometry args={[0.045, 32]} />
                <meshBasicMaterial color="black" />
            </mesh>
            {/* Highlight */}
            <mesh position={[0.04, 0.04, 0.1]}>
                <circleGeometry args={[0.025, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>
        </group>
    )
}

const BackgroundCharacter3D = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-100 mix-blend-normal">
            <Canvas camera={{ position: [0, 0.2, 5], fov: 35 }} gl={{ alpha: true }}>
                {/* --- CINEMATIC LIGHTING --- */}
                <ambientLight intensity={0.5} />

                {/* Warm Face Light */}
                <spotLight position={[2, 2, 4]} intensity={1.5} color="#ffd4a8" angle={0.6} penumbra={1} />

                {/* Cool Rim Light (Left) */}
                <spotLight position={[-4, 1, 2]} intensity={4} color="#a855f7" distance={8} />

                {/* Blue Fill (Right) */}
                <spotLight position={[4, 0, 2]} intensity={3} color="#3b82f6" distance={8} />

                {/* Ground Shadows for grounding */}
                <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#000" />

                {/* Floating Animation Wrapper */}
                <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2} floatingRange={[-0.1, 0.1]}>
                    <group position={[0, -0.4, 0]}>
                        <Character />
                    </group>
                </Float>
            </Canvas>
        </div>
    );
};

export default BackgroundCharacter3D;
