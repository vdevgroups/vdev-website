import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, MeshTransmissionMaterial, Edges } from '@react-three/drei'
import * as THREE from 'three'

export function Artifact() {
  const groupRef = useRef<THREE.Group>(null)
  const scroll = useScroll()

  useFrame((state) => {
    if (!groupRef.current) return
    const r1 = scroll.range(0, 1) // Global scroll progress
    
    // Smooth, cinematic floating
    const t = state.clock.elapsedTime
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.2
    
    // Scroll-based transformations: The artifact rotates and moves as we scroll deeper
    groupRef.current.rotation.y = t * 0.1 + r1 * Math.PI * 4
    groupRef.current.rotation.x = t * 0.05 + r1 * Math.PI * 2
    
    // Move it out of the way as we scroll down
    groupRef.current.position.z = THREE.MathUtils.lerp(0, 5, r1)
    groupRef.current.position.x = THREE.MathUtils.lerp(2, -5, r1)
  })

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      <mesh castShadow receiveShadow>
        {/* A sleek triangular prism artifact representing the VDEV symbol */}
        <cylinderGeometry args={[2, 2, 1, 3]} />
        <MeshTransmissionMaterial 
          backside
          backsideThickness={1}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropicBlur={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
          color="#111111"
        />
        <Edges scale={1.01} threshold={15} color="#cca560" />
      </mesh>
      
      {/* Inner glowing core */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 2, 3]} />
        <meshBasicMaterial color="#cca560" />
        <pointLight color="#cca560" intensity={2} distance={5} />
      </mesh>
    </group>
  )
}
