import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export function NetworkNodes() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const scroll = useScroll()

  // Generate nodes representing the journey
  const { positions, linePositions } = useMemo(() => {
    const nodes = [
      new THREE.Vector3(0, -10, -5),   // Tamil Nadu
      new THREE.Vector3(2, -15, -10),  // Chennai
      new THREE.Vector3(-2, -20, -15), // Bengaluru
      new THREE.Vector3(0, -25, -20),  // India
      new THREE.Vector3(5, -30, -25),  // UAE
      new THREE.Vector3(-5, -35, -30), // Malaysia
      new THREE.Vector3(0, -45, -40),  // World
    ]
    
    // Add noise nodes for atmosphere
    for(let i = 0; i < 100; i++) {
      nodes.push(new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 50 - 25,
        (Math.random() - 0.5) * 30 - 20
      ))
    }

    const posArray = new Float32Array(nodes.length * 3)
    nodes.forEach((n, i) => {
      posArray[i * 3] = n.x
      posArray[i * 3 + 1] = n.y
      posArray[i * 3 + 2] = n.z
    })

    const lineArray = []
    // Connect some nodes
    for(let i = 0; i < nodes.length; i++) {
      for(let j = i + 1; j < nodes.length; j++) {
        if(nodes[i].distanceTo(nodes[j]) < 8) {
          lineArray.push(nodes[i].x, nodes[i].y, nodes[i].z)
          lineArray.push(nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }

    return { 
      positions: posArray,
      linePositions: new Float32Array(lineArray)
    }
  }, [])

  useFrame(() => {
    if(!pointsRef.current || !linesRef.current) return
    
    // Move the entire network up as we scroll
    const scrollY = scroll.offset
    pointsRef.current.position.y = scrollY * 45
    linesRef.current.position.y = scrollY * 45
    
    // Slow rotation
    pointsRef.current.rotation.y += 0.0005
    linesRef.current.rotation.y += 0.0005
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#cca560" transparent opacity={0.6} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#cca560" transparent opacity={0.1} />
      </lineSegments>
    </group>
  )
}
