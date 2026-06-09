import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

const FloatingCard = ({ position, rotation, color, speed = 1 }: { position: [number, number, number]; rotation?: [number, number, number]; color: string; speed?: number }) => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3;
    mesh.current.rotation.x = Math.cos(state.clock.elapsedTime * speed * 0.2) * 0.1;
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={mesh} position={position} rotation={rotation || [0, 0, 0]}>
        <boxGeometry args={[1.8, 1.1, 0.05]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.15}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
};

const GlowingSphere = ({ position, color, size = 0.5 }: { position: [number, number, number]; color: string; size?: number }) => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.scale.setScalar(size + Math.sin(state.clock.elapsedTime * 2) * 0.05);
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.2}
        metalness={0.8}
        distort={0.3}
        speed={2}
      />
    </mesh>
  );
};

const ParticleRing = () => {
  const points = useRef<THREE.Points>(null);
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + Math.random() * 1.5;
      pos[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.05;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#a78bfa" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const WobbleTorus = () => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.15;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -2]}>
      <torusGeometry args={[2.5, 0.08, 16, 100]} />
      <MeshWobbleMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={0.3}
        factor={0.4}
        speed={1.5}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};

const SceneContent = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#a78bfa" />
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#06b6d4" />
      <pointLight position={[0, 3, -5]} intensity={0.4} color="#ec4899" />
      <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.5} penumbra={1} color="#8b5cf6" />

      <Stars radius={50} depth={50} count={1500} factor={3} saturation={0.5} fade speed={1} />

      <FloatingCard position={[-2.5, 0.5, -1]} rotation={[0.1, 0.5, -0.05]} color="#8b5cf6" speed={0.8} />
      <FloatingCard position={[2.2, -0.3, -0.5]} rotation={[-0.05, -0.3, 0.1]} color="#06b6d4" speed={1.2} />
      <FloatingCard position={[0, 1.2, -2]} rotation={[0.2, 0.1, 0.05]} color="#ec4899" speed={0.6} />

      <GlowingSphere position={[-3.5, 2, -3]} color="#8b5cf6" size={0.3} />
      <GlowingSphere position={[3.5, -1.5, -2]} color="#06b6d4" size={0.25} />
      <GlowingSphere position={[1, 2.5, -4]} color="#f59e0b" size={0.2} />

      <ParticleRing />
      <WobbleTorus />
    </>
  );
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default HeroScene;
