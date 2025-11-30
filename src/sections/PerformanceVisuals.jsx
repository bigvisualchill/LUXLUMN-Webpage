import { motion } from 'framer-motion'
import Section from '../components/Section'
import { AnimatedTitle } from '../components/AnimatedText'

export default function PerformanceVisuals({ isActive }) {
  return (
    <Section id="performance-visuals" isActive={isActive} className="portfolio-section portfolio-section--alt">
      <div className="portfolio-section__header portfolio-section__header--right">
        <div className="portfolio-section__number">
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={isActive ? { opacity: 0.3, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            02
          </motion.span>
        </div>
        
        <AnimatedTitle isVisible={isActive} delay={0.1}>
          <h2 className="portfolio-section__title">
            PERFORMANCE
          </h2>
        </AnimatedTitle>
        <AnimatedTitle isVisible={isActive} delay={0.25}>
          <h2 className="portfolio-section__title portfolio-section__title--outline">
            VISUALS
          </h2>
        </AnimatedTitle>
      </div>

      <motion.div 
        className="portfolio-section__content portfolio-section__content--right"
        initial={{ opacity: 0, y: 40 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <p className="portfolio-section__description">
          Real-time visual synthesis for live performances. We design reactive 
          visuals that breathe with the music, creating unforgettable moments 
          on stage.
        </p>
        
        <div className="portfolio-section__tags">
          <span className="tag">Concerts</span>
          <span className="tag">DJ Sets</span>
          <span className="tag">Theater</span>
          <span className="tag">Live Events</span>
        </div>
      </motion.div>

      <motion.div 
        className="portfolio-section__accent portfolio-section__accent--right"
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 0.7, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      />
    </Section>
  )
}

