import { motion } from 'framer-motion'
import Section from '../components/Section'
import { AnimatedTitle, AnimatedLines } from '../components/AnimatedText'

export default function ProjectionMapping({ isActive }) {
  return (
    <Section id="projection-mapping" isActive={isActive} className="portfolio-section">
      <div className="portfolio-section__header">
        <div className="portfolio-section__number">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 0.3, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            01
          </motion.span>
        </div>
        
        <AnimatedTitle isVisible={isActive} delay={0.1}>
          <h2 className="portfolio-section__title">
            PROJECTION
          </h2>
        </AnimatedTitle>
        <AnimatedTitle isVisible={isActive} delay={0.25}>
          <h2 className="portfolio-section__title portfolio-section__title--outline">
            MAPPING
          </h2>
        </AnimatedTitle>
      </div>

      <motion.div 
        className="portfolio-section__content"
        initial={{ opacity: 0, y: 40 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <p className="portfolio-section__description">
          Transforming architecture into living canvases. We create immersive 
          projection experiences that blur the line between physical space and 
          digital artistry.
        </p>
        
        <div className="portfolio-section__tags">
          <span className="tag">Buildings</span>
          <span className="tag">Facades</span>
          <span className="tag">Monuments</span>
          <span className="tag">Events</span>
        </div>
      </motion.div>

      <motion.div 
        className="portfolio-section__accent"
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 0.7, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      />
    </Section>
  )
}

