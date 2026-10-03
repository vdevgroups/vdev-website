import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Text } from '@react-three/drei'
import * as THREE from 'three'

interface NodeData {
  name: string
  subtitle: string
  z: number
  x: number
}

const NODES: NodeData[] = [
  { name: 'TAMIL NADU', subtitle: 'ORIGIN / CULTURE', x: -4, z: -15 },
  { name: 'CHENNAI', subtitle: 'COASTAL GRIT / TECH', x: 5, z: -30 },
  { name: 'BENGALURU', subtitle: 'INFRASTRUCTURE / AI', x: -6, z: -45 },
  { name: 'INDIA', subtitle: 'FOUNDATION', x: 4, z: -60 },
  { name: 'UAE', subtitle: 'ENTERPRISE / AMBITION', x: -5, z: -75 },
  { name: 'MALAYSIA', subtitle: 'COLLABORATION', x: 6, z: -90 },
  { name: 'EVERYWHERE', subtitle: '01 → ∞', x: 0, z: -110 },
]

export function DigitalInfrastructure() {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const scroll = useScroll()

  // Generate architectural pillars and network lines
  const { linePositions } = useMemo(() => {
    const lines = []
    
    // Create a deep grid/tunnel effect
    for (let z = 0; z > -120; z -= 5) {
      // Horizontal lines
      lines.push(-20, -5, z, 20, -5, z)
      lines.push(-20, 10, z, 20, 10, z)
      
      // Vertical pillars
      if (Math.abs(z) % 10 === 0) {
        lines.push(-10, -10, z, -10, 15, z)
        lines.push(10, -10, z, 10, 15, z)
      }
    }

    // Connect nodes
    for (let i = 0; i < NODES.length - 1; i++) {
      lines.push(NODES[i].x, -4, NODES[i].z)
      lines.push(NODES[i+1].x, -4, NODES[i+1].z)
    }

    return {
      linePositions: new Float32Array(lines)
    }
  }, [])

  useFrame(() => {
    if(!groupRef.current) return
    // As user scrolls, move the entire infrastructure forward towards the camera
    const scrollZ = scroll.offset * 115 
    groupRef.current.position.z = scrollZ
  })

  return (
    <group ref={groupRef}>
      {/* Network Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#cca560" transparent opacity={0.15} />
      </lineSegments>

      {/* Nodes / Territories in 3D Space */}
      {NODES.map((node, i) => (
        <group key={i} position={[node.x, 0, node.z]}>
          {/* Vertical light beam for the node */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 20, 8]} />
            <meshBasicMaterial color="#cca560" transparent opacity={0.3} />
          </mesh>
          
          <Text
            position={[0, 2, 0]}
            fontSize={2}
            color="#ffffff"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
            letterSpacing={0.1}
            anchorX="center"
            anchorY="middle"
          >
            {node.name}
          </Text>
          <Text
            position={[0, -1, 0]}
            fontSize={0.5}
            color="#cca560"
            font="https://fonts.gstatic.com/s/spacemono/v12/i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2"
            letterSpacing={0.3}
            anchorX="center"
            anchorY="middle"
          >
            {node.subtitle}
          </Text>
        </group>
      ))}
      
      {/* Dust particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            args={[new Float32Array(Array.from({length: 3000}, () => (Math.random() - 0.5) * 100)), 3]} 
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#cca560" transparent opacity={0.4} sizeAttenuation />
      </points>
    </group>
  )
}
