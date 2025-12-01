import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'

export default function useSmoothScroll(sectionCount = 5, paused = false) {
  const lenisRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const isAnimatingRef = useRef(false)
  const currentSectionRef = useRef(0)
  const pausedRef = useRef(paused)
  const touchStartYRef = useRef(null)

  // Keep pausedRef in sync
  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  // Stop/start Lenis when paused changes
  useEffect(() => {
    if (lenisRef.current) {
      if (paused) {
        lenisRef.current.stop()
      } else {
        lenisRef.current.start()
      }
    }
  }, [paused])

  // Animate to a specific section
  const animateToSection = useCallback((targetSection) => {
    if (!lenisRef.current || pausedRef.current) return
    
    // Clamp to valid range
    const clampedSection = Math.max(0, Math.min(sectionCount - 1, targetSection))
    
    // Already at target section
    if (clampedSection === currentSectionRef.current) return
    
    isAnimatingRef.current = true
    currentSectionRef.current = clampedSection
    const targetScroll = clampedSection * window.innerHeight
    
    lenisRef.current.scrollTo(targetScroll, { 
      duration: 1.0, // Slowed down by 25% (was 0.8)
      easing: (t) => 1 - Math.pow(1 - t, 4),
      onComplete: () => {
        isAnimatingRef.current = false
      }
    })
  }, [sectionCount])

  // Handle scroll direction input (from wheel or touch)
  const handleScrollDirection = useCallback((direction) => {
    if (pausedRef.current || isAnimatingRef.current) return
    
    // Animate to next/previous section
    const targetSection = currentSectionRef.current + direction
    animateToSection(targetSection)
  }, [animateToSection])

  // Public method for navigation dots - direct jump
  const scrollToSection = useCallback((index) => {
    if (pausedRef.current) return
    animateToSection(index)
  }, [animateToSection])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true, // Keep enabled for scrollTo animations
      wheelMultiplier: 0, // But ignore wheel input - we handle it manually
      touchMultiplier: 0, // Ignore touch input - we handle it manually
      infinite: false,
    })

    lenisRef.current = lenis

    // Handle wheel events for section-locked scrolling
    const handleWheel = (e) => {
      if (pausedRef.current) return
      
      e.preventDefault()
      
      // Determine scroll direction: positive deltaY = scroll down = next section
      const direction = e.deltaY > 0 ? 1 : -1
      handleScrollDirection(direction)
    }

    // Handle touch events for mobile
    const handleTouchStart = (e) => {
      if (pausedRef.current) return
      touchStartYRef.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (pausedRef.current || touchStartYRef.current === null) return
      
      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartYRef.current - touchEndY
      
      // Require minimum swipe distance (50px threshold)
      if (Math.abs(deltaY) > 50) {
        // Swipe up (positive deltaY) = next section, swipe down = previous
        const direction = deltaY > 0 ? 1 : -1
        handleScrollDirection(direction)
      }
      
      touchStartYRef.current = null
    }

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (pausedRef.current) return
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        handleScrollDirection(1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        handleScrollDirection(-1)
      }
    }

    // Handle scroll events (for progress tracking only)
    lenis.on('scroll', ({ scroll, limit }) => {
      // Calculate overall progress (0-1)
      const progress = scroll / limit
      setScrollProgress(progress)
      
      // Calculate active section
      const sectionHeight = window.innerHeight
      const currentSection = Math.round(scroll / sectionHeight)
      setActiveSection(Math.min(currentSection, sectionCount - 1))
    })

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    // Animation loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [sectionCount, handleScrollDirection])

  return { 
    scrollProgress, 
    activeSection, 
    scrollToSection,
    lenis: lenisRef.current
  }
}

