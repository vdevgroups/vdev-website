import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, Lightformer, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function CinematicEarth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const networkRef = useRef<THREE.Group>(null)
  const scrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    window.addEventListener('scroll', handleScroll)
    // Init once
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linePositions = useMemo(() => {
    const points = []
    const radius = 10.1
    for (let i = 0; i < 200; i++) {
      const lat = (Math.random() - 0.5) * Math.PI
      const lon = (Math.random() - 0.5) * Math.PI * 2
      const x1 = radius * Math.cos(lat) * Math.cos(lon)
      const y1 = radius * Math.sin(lat)
      const z1 = radius * Math.cos(lat) * Math.sin(lon)
      
      const lat2 = lat + (Math.random() - 0.5) * 0.5
      const lon2 = lon + (Math.random() - 0.5) * 0.5
      const x2 = radius * Math.cos(lat2) * Math.cos(lon2)
      const y2 = radius * Math.sin(lat2)
      const z2 = radius * Math.cos(lat2) * Math.sin(lon2)

      points.push(x1, y1, z1, x2, y2, z2)
    }
    return new Float32Array(points)
  }, [])

  useFrame((state) => {
    if (!earthRef.current || !networkRef.current) return
    const r1 = scrollRef.current
    
    earthRef.current.rotation.y = state.clock.elapsedTime * 0.015
    networkRef.current.rotation.y = state.clock.elapsedTime * 0.015

    // Only bring it up at the very end of the scroll (Section 09)
    // Map the scroll so the Earth begins rising exactly as the user enters the Global Vision section (around 70% scroll)
    // and reaches its final position before they hit the very bottom.
    const curve = THREE.MathUtils.smoothstep(r1, 0.7, 0.95)
    const targetY = THREE.MathUtils.lerp(-30, -2, curve)
    
    earthRef.current.position.y = THREE.MathUtils.lerp(earthRef.current.position.y, targetY, 0.1)
    networkRef.current.position.y = earthRef.current.position.y
    
    earthRef.current.rotation.x = curve * Math.PI * 0.2
    networkRef.current.rotation.x = curve * Math.PI * 0.2
  })

  return (
    <group>
      <mesh ref={earthRef} position={[0, -30, 0]}>
        <sphereGeometry args={[10, 64, 64]} />
        <meshStandardMaterial color="#020202" roughness={0.4} metalness={1} emissive="#000000" />
        <mesh>
          <sphereGeometry args={[10.4, 64, 64]} />
          <meshBasicMaterial color="#cca560" transparent opacity={0.08} side={THREE.BackSide} />
        </mesh>
      </mesh>
      
      <group ref={networkRef} position={[0, -30, 0]}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#cca560" transparent opacity={0.3} />
        </lineSegments>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.08} color="#cca560" transparent opacity={0.8} />
        </points>
      </group>
    </group>
  )
}

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, -5]} intensity={1.5} color="#cca560" />
      <spotLight position={[0, 5, 5]} intensity={4} angle={0.8} penumbra={1} color="#cca560" distance={30} />
      
      <Environment preset="city">
        <Lightformer form="circle" intensity={3} color="#cca560" position={[0, -5, -5]} scale={[10, 10, 1]} />
      </Environment>

      <CinematicEarth />

      <Sparkles count={800} scale={30} size={1.5} speed={0.15} opacity={0.3} color="#cca560" />
    </>
  )
}
