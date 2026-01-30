import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingOrb({ position, color, speed, distort, scale }) {
  const meshRef = useRef();
  
  // Create a unique random starting point for each orb's floating path
  const randomOffset = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // 1. Subtle 'Returning to Center' logic
    // We move the mesh slightly toward (0,0,0) if it wanders too far
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0], 0.02);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1], 0.02);
    
    // 2. Interactive Distortion based on time
    meshRef.current.rotation.x = time * 0.1 + randomOffset;
    meshRef.current.rotation.y = time * 0.15;
  });

  return (
    <Float 
      speed={speed} 
      rotationIntensity={2} 
      floatIntensity={2}
      // This creates the "bounce" effect when they move near each other
      floatingRange={[-0.5, 0.5]}
    >
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          speed={speed * 2}
          distort={distort}
          radius={1}
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export default function Scene3D() {
  // Config for 4 Royal Orbs: [Position, Color, Speed, Distort, Scale]
  const orbs = [
    { pos: [-2.5, 1.5, -1], color: "#3b82f6", speed: 1.2, distort: 0.3, scale: 1.8 }, // Royal Blue
    { pos: [2.5, -1, -2], color: "#fbbf24", speed: 1.5, distort: 0.4, scale: 2.2 },  // Golden
    { pos: [-1, -2, 0], color: "#10b981", speed: 1.0, distort: 0.2, scale: 1.5 },   // Emerald
    { pos: [2, 2, -3], color: "#8b5cf6", speed: 1.8, distort: 0.5, scale: 1.2 },    // Royal Purple
  ];

  return (
    <div className="fixed inset-0 z-[-1] bg-[#020617]">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        
        {/* Cinematic multi-color lighting to hit the glass edges */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
        <pointLight position={[-10, 5, 5]} color="#fbbf24" intensity={1.5} />
        <pointLight position={[5, -10, 5]} color="#3b82f6" intensity={1.5} />

        {orbs.map((orb, i) => (
          <FloatingOrb 
            key={i}
            position={orb.pos} 
            color={orb.color} 
            speed={orb.speed} 
            distort={orb.distort} 
            scale={orb.scale}
          />
        ))}

        {/* Adds a slight grain/noise for that premium filmic look */}
        <fog attach="fog" args={["#020617", 5, 20]} />
      </Canvas>
    </div>
  );
}