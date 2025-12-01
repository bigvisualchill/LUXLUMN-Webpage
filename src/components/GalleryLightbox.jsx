import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GalleryLightbox({ item, onClose }) {
  // Close on escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden'
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  // Handle click on backdrop (outside media)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="gallery-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
        >
          {/* Close button */}
          <button 
            className="gallery-lightbox__close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Media container */}
          <motion.div
            className="gallery-lightbox__content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="gallery-lightbox__media-wrapper">
              {item.type === 'video' ? (
                <video
                  className="gallery-lightbox__media"
                  src={item.src}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  className="gallery-lightbox__media"
                  src={item.src}
                  alt={item.caption || ''}
                />
              )}
            </div>
            
            {/* Caption */}
            {item.caption && (
              <motion.p
                className="gallery-lightbox__caption"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {item.caption}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
