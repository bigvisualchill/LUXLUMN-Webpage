import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import GalleryLightbox from './GalleryLightbox'
import { galleryData } from '../data/galleryData'

export default function Gallery({ sectionId, isActive, onClose, onScroll }) {
  const [lightboxItem, setLightboxItem] = useState(null)
  const galleryRef = useRef(null)
  const contentRef = useRef(null)

  const data = sectionId ? galleryData[sectionId] : null
  const items = data?.items || []

  // Reset window scroll position when gallery opens
  useEffect(() => {
    if (isActive) {
      window.scrollTo(0, 0)
      onScroll?.(0)
    }
  }, [isActive, onScroll])

  // Track window scroll and report to parent
  const handleWindowScroll = useCallback(() => {
    if (!onScroll) return
    
    const docHeight = document.documentElement.scrollHeight
    const windowHeight = window.innerHeight
    const maxScroll = docHeight - windowHeight
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0
    onScroll(Math.min(1, Math.max(0, progress)))
  }, [onScroll])

  // Smooth scroll state
  const targetScrollRef = useRef(0)
  const currentScrollRef = useRef(0)
  const animationRef = useRef(null)

  // Smooth scroll animation
  const animateScroll = useCallback(() => {
    const diff = targetScrollRef.current - currentScrollRef.current
    
    if (Math.abs(diff) > 0.5) {
      currentScrollRef.current += diff * 0.1 // Easing factor
      window.scrollTo(0, currentScrollRef.current)
      animationRef.current = requestAnimationFrame(animateScroll)
    } else {
      currentScrollRef.current = targetScrollRef.current
      window.scrollTo(0, currentScrollRef.current)
      animationRef.current = null
    }
  }, [])

  // Use window scroll for gallery with smooth easing
  useEffect(() => {
    if (!isActive) return

    // Initialize scroll position
    currentScrollRef.current = window.scrollY
    targetScrollRef.current = window.scrollY

    const handleWheel = (e) => {
      e.preventDefault()
      e.stopImmediatePropagation()
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      
      // Update target scroll
      targetScrollRef.current += e.deltaY
      targetScrollRef.current = Math.max(0, Math.min(targetScrollRef.current, maxScroll))
      
      // Start animation if not running
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animateScroll)
      }
    }

    const blockLenis = (e) => {
      e.stopImmediatePropagation()
    }

    // Capture wheel for smooth scrolling
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    window.addEventListener('touchmove', blockLenis, { capture: true })
    
    // Listen for scroll to report progress
    window.addEventListener('scroll', handleWindowScroll, { passive: true })
    
    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true })
      window.removeEventListener('touchmove', blockLenis, { capture: true })
      window.removeEventListener('scroll', handleWindowScroll)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [isActive, handleWindowScroll, animateScroll])

  const handleItemClick = (item) => {
    setLightboxItem(item)
  }

  const handleLightboxClose = () => {
    setLightboxItem(null)
  }

  return (
    <div 
      ref={galleryRef}
      className={`gallery ${isActive ? 'gallery--active' : ''}`}
    >
      {data && (
        <>
          {/* Gallery header */}
          <div className="gallery__header">
            <h2 className="gallery__title">{data.title}</h2>
            <span className="gallery__count">{items.length} images</span>
          </div>

          {/* Photo grid */}
          <div ref={contentRef} className="gallery__grid">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className="gallery__grid-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.4, delay: isActive ? 0.2 + index * 0.03 : 0 }}
                onClick={() => handleItemClick(item)}
              >
                {item.type === 'video' ? (
                  <video
                    className="gallery__grid-media"
                    src={item.src}
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    className="gallery__grid-media"
                    src={item.src}
                    alt={item.caption || ''}
                    loading="lazy"
                  />
                )}
                <div className="gallery__grid-overlay">
                  <span>View</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Return button */}
          <button 
            className="gallery__return"
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Return</span>
          </button>

          {/* Lightbox */}
          {lightboxItem && (
            <GalleryLightbox 
              item={lightboxItem} 
              onClose={handleLightboxClose} 
            />
          )}
        </>
      )}
    </div>
  )
}
