import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GalleryLightbox from './GalleryLightbox'
import { getEventsForSection, galleryData } from '../data/galleryData'

// Event Row Component
function EventRow({ event, onClick, index, isActive }) {
  return (
    <motion.div
      className="event-row"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
      transition={{ 
        duration: 0.5, 
        delay: isActive ? 0.8 + index * 0.1 : 0,
        ease: "easeOut"
      }}
      onClick={onClick}
    >
      <div className="event-row__thumbnail">
        {event.thumbnail ? (
          <img src={event.thumbnail} alt={event.title} loading="lazy" />
        ) : (
          <div className="event-row__thumbnail-placeholder" />
        )}
      </div>
      <div className="event-row__content">
        <h3 className="event-row__title">{event.title}</h3>
        <p className="event-row__description">{event.description}</p>
        <span className="event-row__count">{event.images.length} photos</span>
      </div>
      <div className="event-row__arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  )
}

// Event Detail Component (Photo Grid)
function EventDetail({ event, onBack, isActive }) {
  const [lightboxItem, setLightboxItem] = useState(null)

  const handleImageClick = (image) => {
    setLightboxItem({ type: 'image', src: image.src, caption: '' })
  }

  return (
    <div className="event-detail">
      {/* Back button */}
      <motion.button
        className="event-detail__back"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, delay: isActive ? 0.5 : 0 }}
        onClick={onBack}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Back to Events</span>
      </motion.button>

      {/* Event header */}
      <motion.div
        className="event-detail__header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
        transition={{ duration: 0.5, delay: isActive ? 0.3 : 0 }}
      >
        <h2 className="event-detail__title">{event.title}</h2>
        <p className="event-detail__description">{event.description}</p>
      </motion.div>

      {/* Photo grid */}
      <div className="event-detail__grid">
        {event.images.map((image, index) => (
          <motion.div
            key={image.id}
            className="event-detail__grid-item"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
            transition={{ 
              duration: 0.4, 
              delay: isActive ? 0.6 + index * 0.05 : 0,
              ease: "easeOut"
            }}
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.src}
              alt=""
              loading="lazy"
              onLoad={(e) => {
                // Add orientation class based on image aspect ratio
                const img = e.target
                if (img.naturalWidth > img.naturalHeight) {
                  img.parentElement.classList.add('landscape')
                } else if (img.naturalHeight > img.naturalWidth) {
                  img.parentElement.classList.add('portrait')
                } else {
                  img.parentElement.classList.add('square')
                }
              }}
            />
            <div className="event-detail__grid-overlay">
              <span>View</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <GalleryLightbox 
          item={lightboxItem} 
          onClose={() => setLightboxItem(null)} 
        />
      )}
    </div>
  )
}

export default function Gallery({ sectionId, isActive, onClose, onScroll }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const galleryRef = useRef(null)

  const data = sectionId ? galleryData[sectionId] : null
  const events = data?.events || []

  // Reset state when gallery opens/closes
  useEffect(() => {
    if (isActive && galleryRef.current) {
      galleryRef.current.scrollTop = 0
      onScroll?.(0)
      setSelectedEvent(null)
    }
  }, [isActive, sectionId, onScroll])

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

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    if (galleryRef.current) {
      galleryRef.current.scrollTop = 0
    }
  }

  const handleBackToEvents = () => {
    setSelectedEvent(null)
    if (galleryRef.current) {
      galleryRef.current.scrollTop = 0
    }
  }

  return (
    <>
      {/* Fixed header - shows section title */}
      {data && !selectedEvent && (
        <div className={`gallery__header ${isActive ? 'gallery__header--active' : ''}`}>
          <h2 className="gallery__title">{data.title}</h2>
          <span className="gallery__count">{events.length} events</span>
        </div>
      )}

      {/* Return button - only when viewing event list */}
      {data && !selectedEvent && (
        <button 
          className={`gallery__return ${isActive ? 'gallery__return--active' : ''}`}
          onClick={onClose}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Return</span>
        </button>
      )}

      {/* Gallery content */}
      <div 
        ref={galleryRef}
        className={`gallery ${isActive ? 'gallery--active' : ''}`}
      >
        {data && (
          <AnimatePresence mode="wait">
            {selectedEvent ? (
              <EventDetail 
                key="detail"
                event={selectedEvent} 
                onBack={handleBackToEvents}
                isActive={isActive}
              />
            ) : (
              <div key="list" className="event-list">
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <EventRow
                      key={event.id}
                      event={event}
                      index={index}
                      isActive={isActive}
                      onClick={() => handleEventClick(event)}
                    />
                  ))
                ) : (
                  <motion.div 
                    className="event-list__empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <p>No events yet</p>
                    <span>Check back soon for updates</span>
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </>
  )
}
