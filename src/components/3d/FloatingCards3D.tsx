import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

const IDCard3D = ({ position, color, label, delay = 0 }: { position: [number, number, number]; color: string; label: string; delay?: number }) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime + delay;
    group.current.rotation.y = Math.sin(t * 0.4) * 0.4;
    group.current.rotation.x = Math.cos(t * 0.3) * 0.1;
    group.current.position.y = position[1] + Math.sin(t * 0.6) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={group} position={position}>
        <RoundedBox args={[2.2, 1.4, 0.06]} radius={0.08} smoothness={4}>
          <meshPhysicalMaterial
            color={color}
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </RoundedBox>
        {/* Photo placeholder */}
        <mesh position={[-0.6, 0.1, 0.04]}>
          <planeGeometry args={[0.6, 0.7]} />
          <meshStandardMaterial color="#ffffff" opacity={0.15} transparent />
        </mesh>
        {/* Text lines */}
        {[0.15, 0, -0.15, -0.3].map((y, i) => (
          <mesh key={i} position={[0.3, y, 0.04]}>
            <planeGeometry args={[0.9 - i * 0.1, 0.06]} />
            <meshStandardMaterial color="#ffffff" opacity={0.12 - i * 0.02} transparent />
          </mesh>
        ))}
        {/* Glow edge */}
        <mesh position={[0, 0, -0.04]}>
          <planeGeometry args={[2.4, 1.6]} />
          <meshBasicMaterial color={color} transparent opacity={0.08} />
        </mesh>
      </group>
    </Float>
  );
};

const FloatingCards3D = () => (
  <div className="w-full h-[400px]">
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1} color="#a78bfa" />
      <pointLight position={[-3, -2, 2]} intensity={0.6} color="#06b6d4" />

      <IDCard3D position={[-2, 0.3, 0]} color="#8b5cf6" label="University" delay={0} />
      <IDCard3D position={[0, -0.2, -1]} color="#06b6d4" label="School" delay={1.5} />
      <IDCard3D position={[2, 0.4, 0.5]} color="#ec4899" label="Employee" delay={3} />
    </Canvas>
  </div>
);

export default FloatingCards3D;
