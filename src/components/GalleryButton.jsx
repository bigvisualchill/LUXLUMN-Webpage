import { motion } from 'framer-motion'

export default function GalleryButton({ onClick }) {
  return (
    <motion.button
      className="gallery-button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="gallery-button__text">Gallery</span>
      <svg 
        className="gallery-button__arrow" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </motion.button>
  )
}
