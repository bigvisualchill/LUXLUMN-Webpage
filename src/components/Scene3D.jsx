import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'

function AnimatedModel({ scrollProgress, isDarkMode, isGalleryOpen, galleryScroll, galleryTransitionRef }) {
  const groupRef = useRef()
  const meshRefs = useRef([])
  const edgeRefs = useRef([])
  const prevGalleryScrollRef = useRef(0)
  const galleryVelocityRef = useRef(0)
  const { scene } = useGLTF('/LUX LUMN.glb')
  
  // Create model group
  const modelGroup = useMemo(() => {
    const group = new THREE.Group()
    meshRefs.current = []
    edgeRefs.current = []
    
    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        // Main mesh - material will be updated based on mode
        const mesh = new THREE.Mesh(
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
        mesh.position.copy(child.position)
        mesh.rotation.copy(child.rotation)
        mesh.scale.copy(child.scale)
        group.add(mesh)
        meshRefs.current.push(mesh)
        
        // Wireframe edges
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
        edgeRefs.current.push(edges)
      }
    })
    
    return group
  }, [scene])
  
  // Update materials when mode changes
  useEffect(() => {
    meshRefs.current.forEach((mesh) => {
      if (isDarkMode) {
        // Glass mode - transparent with specular
        mesh.material.color.setHex(0x333333)
        mesh.material.metalness = 0.9
        mesh.material.roughness = 0.05
        mesh.material.transparent = true
        mesh.material.opacity = 0.4
      } else {
        // Glossy black solid mode - fully opaque
        mesh.material.color.setHex(0x080808)
        mesh.material.metalness = 0.98
        mesh.material.roughness = 0.08
        mesh.material.transparent = false
        mesh.material.opacity = 1.0
        mesh.material.depthWrite = true
      }
      mesh.material.needsUpdate = true
    })
    
    edgeRefs.current.forEach((edge) => {
      // Edges: white in dark mode, black in light mode
      edge.material.color.setHex(isDarkMode ? 0xffffff : 0x000000)
      edge.material.needsUpdate = true
    })
  }, [isDarkMode])
  
  // Create rotation based on scroll - keep upright, spin on Y axis
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Get gallery transition progress (0 = closed, 1 = open)
      const galleryTransition = galleryTransitionRef?.current || 0
      
      // Calculate gallery scroll velocity for acceleration effect
      const scrollDelta = galleryScroll - prevGalleryScrollRef.current
      prevGalleryScrollRef.current = galleryScroll
      
      // Smooth the velocity
      galleryVelocityRef.current += (scrollDelta * 15 - galleryVelocityRef.current) * 0.1
      const galleryVelocity = galleryVelocityRef.current
      
      // Slow down animation by 50% when in gallery mode
      const speedMultiplier = 1 - (galleryTransition * 0.5)
      
      // Base rotation from section scroll
      const baseRotation = scrollProgress * Math.PI * 2 + state.clock.elapsedTime * 0.1 * speedMultiplier
      
      // Add rotation acceleration from gallery transition and scroll (also slowed)
      const transitionBoost = galleryTransition * Math.PI * 0.5
      const galleryScrollRotation = galleryScroll * Math.PI * speedMultiplier // Slowed gallery scroll rotation
      const velocityBoost = galleryVelocity * 0.25 * speedMultiplier // Reduced velocity effect
      
      // Stand model upright (rotate 90 degrees on X), then spin on Z
      groupRef.current.rotation.x = Math.PI / 2
      groupRef.current.rotation.y = 0
      groupRef.current.rotation.z = baseRotation + transitionBoost + galleryScrollRotation + velocityBoost
      
      // Position - center when gallery is open
      const baseX = 0.8 - (scrollProgress * 1.2)
      const centeredX = 0 // Center position
      const targetX = baseX + (centeredX - baseX) * galleryTransition // Interpolate to center
      groupRef.current.position.x = targetX
      
      // Lower position (mid-page) with floating based on scroll
      const floatY = Math.sin(scrollProgress * Math.PI * 4) * 0.4
      const galleryFloatY = Math.sin(galleryScroll * Math.PI * 3) * 0.15 * speedMultiplier // Gentler float
      const centeredY = -1.2 // Slightly higher when centered
      const baseY = -1.5 + floatY
      groupRef.current.position.y = baseY + (centeredY - baseY) * galleryTransition + galleryFloatY
      
      // Floating depth based on scroll (forward/back on Z)
      const floatZ = Math.sin(scrollProgress * Math.PI * 3) * 0.6
      const galleryFloatZ = Math.sin(galleryScroll * Math.PI * 2) * 0.2 * speedMultiplier // Gentler depth
      groupRef.current.position.z = floatZ * (1 - galleryTransition) + galleryFloatZ
      
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

function Particles({ count = 100, isDarkMode }) {
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
        color={isDarkMode ? "#ffffff" : "#000000"}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene3D({ 
  scrollProgress = 0, 
  isDarkMode = true, 
  isGalleryOpen = false,
  galleryScroll = 0,
  galleryTransitionRef
}) {
  return (
    <div className="scene-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={[isDarkMode ? '#0a0a0a' : '#f5f5f5']} />
        
        {/* Single rectangular light with hard edges */}
        <RectLight />
        
        {/* 3D Elements */}
        <AnimatedModel 
          scrollProgress={scrollProgress} 
          isDarkMode={isDarkMode}
          isGalleryOpen={isGalleryOpen}
          galleryScroll={galleryScroll}
          galleryTransitionRef={galleryTransitionRef}
        />
        <Particles count={150} isDarkMode={isDarkMode} />
      </Canvas>
    </div>
  )
}

// Preload the model
useGLTF.preload('/LUX LUMN.glb')
