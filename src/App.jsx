import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import Scene3D from './components/Scene3D'
import Navigation from './components/Navigation'
import Gallery from './components/Gallery'
import useSmoothScroll from './hooks/useSmoothScroll'
import Hero from './sections/Hero'
import ProjectionMapping from './sections/ProjectionMapping'
import PerformanceVisuals from './sections/PerformanceVisuals'
import Installations from './sections/Installations'
import LogoAnimation from './sections/LogoAnimation'
import './styles/global.css'
import './styles/gallery.css'

const SECTION_DEPTH = 1000 // Distance between sections in z-space

// Map gallery IDs to section indices
const GALLERY_SECTION_MAP = {
  'projection-mapping': 1,
  'performance-visuals': 2,
  'installations': 3,
  'logo-animation': 4
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeGallery, setActiveGallery] = useState(null)
  const [galleryScroll, setGalleryScroll] = useState(0)
  const galleryTransitionRef = useRef(0)
  
  const isGalleryOpen = activeGallery !== null
  const { scrollProgress, activeSection, scrollToSection } = useSmoothScroll(5, isGalleryOpen)
  
  // Animate gallery transition value for smooth 3D object response
  useEffect(() => {
    const targetValue = isGalleryOpen ? 1 : 0
    let animationFrame
    
    const animate = () => {
      const current = galleryTransitionRef.current
      const diff = targetValue - current
      
      if (Math.abs(diff) > 0.001) {
        galleryTransitionRef.current += diff * 0.08 // Smooth interpolation
        animationFrame = requestAnimationFrame(animate)
      } else {
        galleryTransitionRef.current = targetValue
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isGalleryOpen])

  useEffect(() => {
    // Trigger initial animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Open gallery handler
  const handleOpenGallery = useCallback((sectionId) => {
    setActiveGallery(sectionId)
  }, [])

  // Close gallery handler - return to the section that opened it
  const handleCloseGallery = useCallback(() => {
    const sectionIndex = GALLERY_SECTION_MAP[activeGallery]
    
    // Set scroll position IMMEDIATELY before closing gallery
    // This ensures the correct section is visible as the gallery slides away
    if (sectionIndex !== undefined) {
      const targetScroll = sectionIndex * window.innerHeight
      window.scrollTo(0, targetScroll)
    }
    
    setActiveGallery(null)
  }, [activeGallery])

  // Toggle color scheme with 'x' key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'x' || e.key === 'X') {
      setIsDarkMode(prev => !prev)
    }
    // Close gallery with Escape
    if (e.key === 'Escape' && activeGallery) {
      handleCloseGallery()
    }
  }, [activeGallery, handleCloseGallery])

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
    <div className={`app ${isLoaded ? 'app--loaded' : ''} ${isDarkMode ? 'app--dark' : 'app--light'} ${isGalleryOpen ? 'app--gallery-open' : ''}`}>
      {/* Horizontal sliding wrapper */}
      <div className="app__content-wrapper">
        {/* Main View */}
        <div className="app__main-view">
          {/* Fixed 3D Background */}
          <Scene3D 
            scrollProgress={scrollProgress} 
            isDarkMode={isDarkMode}
            isGalleryOpen={isGalleryOpen}
            galleryScroll={galleryScroll}
            galleryTransitionRef={galleryTransitionRef}
          />
          
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
              <ProjectionMapping 
                isActive={activeSection === 1} 
                onOpenGallery={() => handleOpenGallery('projection-mapping')}
              />
            </motion.div>
            <motion.div className="section-wrapper" style={getSectionStyle(2)}>
              <PerformanceVisuals 
                isActive={activeSection === 2}
                onOpenGallery={() => handleOpenGallery('performance-visuals')}
              />
            </motion.div>
            <motion.div className="section-wrapper" style={getSectionStyle(3)}>
              <Installations 
                isActive={activeSection === 3}
                onOpenGallery={() => handleOpenGallery('installations')}
              />
            </motion.div>
            <motion.div className="section-wrapper" style={getSectionStyle(4)}>
              <LogoAnimation 
                isActive={activeSection === 4}
                onOpenGallery={() => handleOpenGallery('logo-animation')}
              />
            </motion.div>
          </main>

          {/* Scroll Track - invisible element that creates scrollable height */}
          <div className="scroll-track" style={{ height: '500vh' }} />

          {/* Gallery - in document flow for native browser scrolling */}
          <Gallery 
            sectionId={activeGallery}
            isActive={isGalleryOpen}
            onClose={handleCloseGallery}
            onScroll={setGalleryScroll}
          />

          {/* Brand Mark */}
          <div className="brand-mark">
            <span>LUX LUMN</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
