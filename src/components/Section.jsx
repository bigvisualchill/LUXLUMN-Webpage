import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const Section = forwardRef(({ 
  children, 
  className = '', 
  id,
  isActive = false
}, ref) => {
  return (
    <section 
      ref={ref}
      id={id}
      className={`section ${className} ${isActive ? 'section--active' : ''}`}
    >
      <motion.div 
        className="section__content"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  )
})

Section.displayName = 'Section'

export default Section

