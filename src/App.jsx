import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Scene3D from './components/Scene3D'
import Navigation from './components/Navigation'
import useSmoothScroll from './hooks/useSmoothScroll'
import Hero from './sections/Hero'
import ProjectionMapping from './sections/ProjectionMapping'
import PerformanceVisuals from './sections/PerformanceVisuals'
import Installations from './sections/Installations'
import LogoAnimation from './sections/LogoAnimation'
import './styles/global.css'

const SECTION_DEPTH = 1000 // Distance between sections in z-space

function App() {
  const { scrollProgress, activeSection, scrollToSection } = useSmoothScroll(5)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Trigger initial animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Toggle color scheme with 'x' key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'x' || e.key === 'X') {
      setIsDarkMode(prev => !prev)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Calculate z-position based on scroll progress
  // As we scroll DOWN, camera moves forward (into the scene)
  const cameraZ = scrollProgress * SECTION_DEPTH * 4

  const getSectionStyle = (index) => {
    const sectionZ = index * SECTION_DEPTH
    // How far the section is from camera position
    // Positive = section ahead, Negative = section behind (passed)
    const distanceFromCamera = sectionZ - cameraZ
    
    // Scale: full size when at camera, smaller when far ahead or behind
    const scale = Math.max(0.4, 1 - Math.abs(distanceFromCamera) / 2000)
    
    // Opacity - sections fade in as they approach, fade out as they pass
    let opacity = 1
    if (distanceFromCamera > 300) {
      // Section is ahead - fade it based on distance (fully hidden when far)
      opacity = Math.max(0, 1 - (distanceFromCamera - 300) / 400)
    } else if (distanceFromCamera < -200) {
      // Section has passed behind - fade it out quickly
      opacity = Math.max(0, 1 + (distanceFromCamera + 200) / 300)
    }
    
    // Depth of field blur - sharp when in focus (near camera), blurry when far or close
    let blur = 0
    if (distanceFromCamera > 200) {
      // Section is ahead - blur increases with distance
      blur = Math.min(12, (distanceFromCamera - 200) / 60)
    } else if (distanceFromCamera < -100) {
      // Section is very close/passing - blur increases as it gets closer
      blur = Math.min(20, Math.abs(distanceFromCamera + 100) / 25)
    }
    
    // Chromatic aberration - color separation increases with distance from focus
    let chromaOffset = 0
    if (Math.abs(distanceFromCamera) > 50) {
      chromaOffset = Math.min(12, Math.abs(distanceFromCamera) / 40)
    }
    
    // NEGATE the distance for translateZ so sections move TOWARD viewer as camera advances
    // Use translateZ for visual stacking, no z-index conflicts
    return {
      transform: `translateZ(${-distanceFromCamera}px) scale(${scale})`,
      opacity: opacity,
      filter: `blur(${blur}px)`,
      '--chroma-offset': `${chromaOffset}px`,
      pointerEvents: 'auto',
    }
  }

  return (
    <div className={`app ${isLoaded ? 'app--loaded' : ''} ${isDarkMode ? 'app--dark' : 'app--light'}`}>
      {/* Fixed 3D Background */}
      <Scene3D scrollProgress={scrollProgress} isDarkMode={isDarkMode} />
      
      {/* Navigation Dots */}
      <Navigation 
        activeSection={activeSection} 
        onNavigate={scrollToSection}
      />

      {/* Depth-based Content */}
      <main className="main">
        <motion.div className="section-wrapper" style={getSectionStyle(0)}>
          <Hero isActive={activeSection === 0} onNavigate={scrollToSection} />
        </motion.div>
        <motion.div className="section-wrapper" style={getSectionStyle(1)}>
          <ProjectionMapping isActive={activeSection === 1} />
        </motion.div>
        <motion.div className="section-wrapper" style={getSectionStyle(2)}>
          <PerformanceVisuals isActive={activeSection === 2} />
        </motion.div>
        <motion.div className="section-wrapper" style={getSectionStyle(3)}>
          <Installations isActive={activeSection === 3} />
        </motion.div>
        <motion.div className="section-wrapper" style={getSectionStyle(4)}>
          <LogoAnimation isActive={activeSection === 4} />
        </motion.div>
      </main>

      {/* Scroll Track - invisible element that creates scrollable height */}
      <div className="scroll-track" style={{ height: '500vh' }} />

      {/* Brand Mark */}
      <div className="brand-mark">
        <span>LUX LUMN</span>
      </div>
    </div>
  )
}

export default App
