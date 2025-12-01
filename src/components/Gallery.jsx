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

  // Reset gallery scroll position when gallery opens
  useEffect(() => {
    if (isActive && galleryRef.current) {
      galleryRef.current.scrollTop = 0
      onScroll?.(0)
    }
  }, [isActive, onScroll])

  // Track gallery scroll and report to parent
  useEffect(() => {
    if (!isActive || !galleryRef.current) return
    
    const gallery = galleryRef.current
    
    const handleGalleryScroll = () => {
      if (!onScroll) return
      const maxScroll = gallery.scrollHeight - gallery.clientHeight
      const progress = maxScroll > 0 ? gallery.scrollTop / maxScroll : 0
      onScroll(Math.min(1, Math.max(0, progress)))
    }
    
    gallery.addEventListener('scroll', handleGalleryScroll, { passive: true })
    
    return () => {
      gallery.removeEventListener('scroll', handleGalleryScroll)
    }
  }, [isActive, onScroll])

  const handleItemClick = (item) => {
    setLightboxItem(item)
  }

  const handleLightboxClose = () => {
    setLightboxItem(null)
  }

  return (
    <>
      {/* Fixed UI elements - outside transformed gallery for proper fixed positioning */}
      {data && (
        <>
          <div className={`gallery__header ${isActive ? 'gallery__header--active' : ''}`}>
            <h2 className="gallery__title">{data.title}</h2>
            <span className="gallery__count">{items.length} images</span>
          </div>

          <button 
            className={`gallery__return ${isActive ? 'gallery__return--active' : ''}`}
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Return</span>
          </button>
        </>
      )}

      {/* Gallery content - this gets transformed */}
      <div 
        ref={galleryRef}
        className={`gallery ${isActive ? 'gallery--active' : ''}`}
      >
        {data && (
          <>
            {/* Photo grid */}
            <div ref={contentRef} className="gallery__grid">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="gallery__grid-item"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: isActive ? 1.0 + index * 0.1 : 0,
                    ease: "easeOut"
                  }}
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
    </>
  )
}
