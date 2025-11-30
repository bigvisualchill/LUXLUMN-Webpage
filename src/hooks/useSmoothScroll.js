import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'

export default function useSmoothScroll(sectionCount = 5) {
  const lenisRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef(null)

  const scrollToSection = useCallback((index) => {
    if (lenisRef.current) {
      // Reset scrolling flag to ensure navigation always works
      isScrollingRef.current = false
      const targetScroll = index * window.innerHeight
      lenisRef.current.scrollTo(targetScroll, { 
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 4) // easeOutQuart
      })
    }
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: -0.8, // Negative to invert scroll direction
      touchMultiplier: -1.5, // Negative to invert touch direction
      infinite: false,
    })

    lenisRef.current = lenis

    // Handle scroll events
    lenis.on('scroll', ({ scroll, limit }) => {
      // Calculate overall progress (0-1)
      const progress = scroll / limit
      setScrollProgress(progress)
      
      // Calculate active section
      const sectionHeight = window.innerHeight
      const currentSection = Math.round(scroll / sectionHeight)
      setActiveSection(Math.min(currentSection, sectionCount - 1))
    })

    // Snap to sections after scroll ends
    const handleWheel = (e) => {
      if (isScrollingRef.current) return
      
      clearTimeout(scrollTimeoutRef.current)
      
      scrollTimeoutRef.current = setTimeout(() => {
        const scroll = lenis.scroll
        const sectionHeight = window.innerHeight
        const currentSection = Math.round(scroll / sectionHeight)
        const targetScroll = currentSection * sectionHeight
        
        // Only snap if we're not already at a section boundary
        if (Math.abs(scroll - targetScroll) > 10) {
          isScrollingRef.current = true
          lenis.scrollTo(targetScroll, {
            duration: 0.8,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            onComplete: () => {
              isScrollingRef.current = false
            }
          })
          // Safety timeout to ensure flag is reset
          setTimeout(() => {
            isScrollingRef.current = false
          }, 1000)
        }
      }, 150)
    }

    window.addEventListener('wheel', handleWheel, { passive: true })

    // Animation loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      window.removeEventListener('wheel', handleWheel)
      clearTimeout(scrollTimeoutRef.current)
    }
  }, [sectionCount])

  return { 
    scrollProgress, 
    activeSection, 
    scrollToSection,
    lenis: lenisRef.current
  }
}

