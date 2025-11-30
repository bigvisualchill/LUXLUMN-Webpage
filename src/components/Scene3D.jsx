import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'

function AnimatedModel({ scrollProgress }) {
  const groupRef = useRef()
  const { scene } = useGLTF('/LUX LUMN.glb')
  
  // Create glass material with wireframe edges
  const modelGroup = useMemo(() => {
    const group = new THREE.Group()
    
    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        // Glass fill - with stronger specular reflection
        const glassMesh = new THREE.Mesh(
          child.geometry.clone(),
          new THREE.MeshStandardMaterial({
            color: '#333333',
            metalness: 0.9,
            roughness: 0.05,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide,
          })
        )
        glassMesh.position.copy(child.position)
        glassMesh.rotation.copy(child.rotation)
        glassMesh.scale.copy(child.scale)
        group.add(glassMesh)
        
        // Wireframe edges - white lines
        const edgesGeometry = new THREE.EdgesGeometry(child.geometry, 15)
        const edgesMaterial = new THREE.LineBasicMaterial({
          color: '#ffffff',
          transparent: true,
          opacity: 0.9,
        })
        const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial)
        edges.position.copy(child.position)
        edges.rotation.copy(child.rotation)
        edges.scale.copy(child.scale)
        group.add(edges)
      }
    })
    
    return group
  }, [scene])
  
  // Create rotation based on scroll - keep upright, spin on Y axis
  useFrame((state) => {
    if (groupRef.current) {
      // Stand model upright (rotate 90 degrees on X), then spin on Y
      groupRef.current.rotation.x = Math.PI / 2
      groupRef.current.rotation.y = 0
      groupRef.current.rotation.z = scrollProgress * Math.PI * 2 + state.clock.elapsedTime * 0.1
      
      // Parallax position - centered, mid-page height
      // Subtle horizontal drift, stays mostly in frame
      groupRef.current.position.x = 0.8 - (scrollProgress * 1.2)
      
      // Lower position (mid-page) with floating based on scroll
      const floatY = Math.sin(scrollProgress * Math.PI * 4) * 0.4
      groupRef.current.position.y = -1.5 + floatY
      
      // Floating depth based on scroll (forward/back on Z)
      const floatZ = Math.sin(scrollProgress * Math.PI * 3) * 0.6
      groupRef.current.position.z = floatZ
      
      // Scale (base scale 10 = 500% of original)
      groupRef.current.scale.setScalar(10)
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={modelGroup} />
    </group>
  )
}

function RectLight() {
  const { scene } = useThree()
  
  useEffect(() => {
    // Initialize RectAreaLight uniforms
    RectAreaLightUniformsLib.init()
    
    // Pink rectangular light
    const pinkLight = new THREE.RectAreaLight('#ff69b4', 50, 5, 3)
    pinkLight.position.set(3, 3, 5)
    pinkLight.lookAt(0, 0, 0)
    scene.add(pinkLight)
    
    // Light blue rectangular light (more saturated)
    const blueLight = new THREE.RectAreaLight('#00bfff', 50, 5, 3)
    blueLight.position.set(-3, 2, 5)
    blueLight.lookAt(0, 0, 0)
    scene.add(blueLight)
    
    // Add a small ambient for subtle fill
    const ambient = new THREE.AmbientLight('#ffffff', 0.02)
    scene.add(ambient)
    
    return () => {
      scene.remove(pinkLight)
      scene.remove(blueLight)
      scene.remove(ambient)
    }
  }, [scene])
  
  return null
}

function Particles({ count = 100 }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [count])

  const pointsRef = useRef()

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene3D({ scrollProgress = 0 }) {
  return (
    <div className="scene-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0a0a0a']} />
        
        {/* Single rectangular light with hard edges */}
        <RectLight />
        
        {/* 3D Elements */}
        <AnimatedModel scrollProgress={scrollProgress} />
        <Particles count={150} />
      </Canvas>
    </div>
  )
}

// Preload the model
useGLTF.preload('/LUX LUMN.glb')
