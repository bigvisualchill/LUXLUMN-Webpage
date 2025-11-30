import { useState, useEffect } from 'react'
import Scene3D from './components/Scene3D'
import Navigation from './components/Navigation'
import useSmoothScroll from './hooks/useSmoothScroll'
import Hero from './sections/Hero'
import ProjectionMapping from './sections/ProjectionMapping'
import PerformanceVisuals from './sections/PerformanceVisuals'
import Installations from './sections/Installations'
import LogoAnimation from './sections/LogoAnimation'
import './styles/global.css'

function App() {
  const { scrollProgress, activeSection, scrollToSection } = useSmoothScroll(5)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger initial animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`app ${isLoaded ? 'app--loaded' : ''}`}>
      {/* Fixed 3D Background */}
      <Scene3D scrollProgress={scrollProgress} />
      
      {/* Navigation Dots */}
      <Navigation 
        activeSection={activeSection} 
        onNavigate={scrollToSection}
      />

      {/* Scrollable Content */}
      <main className="main">
        <Hero isActive={activeSection === 0} onNavigate={scrollToSection} />
        <ProjectionMapping isActive={activeSection === 1} />
        <PerformanceVisuals isActive={activeSection === 2} />
        <Installations isActive={activeSection === 3} />
        <LogoAnimation isActive={activeSection === 4} />
      </main>

      {/* Brand Mark */}
      <div className="brand-mark">
        <span>LUX LUMN</span>
      </div>
    </div>
  )
}

export default App
