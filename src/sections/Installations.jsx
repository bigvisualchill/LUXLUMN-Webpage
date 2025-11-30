import { motion } from 'framer-motion'
import Section from '../components/Section'
import { AnimatedTitle } from '../components/AnimatedText'

export default function Installations({ isActive }) {
  return (
    <Section id="installations" isActive={isActive} className="portfolio-section">
      <div className="portfolio-section__header">
        <div className="portfolio-section__number">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 0.3, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            03
          </motion.span>
        </div>
        
        <AnimatedTitle isVisible={isActive} delay={0.1}>
          <h2 className="portfolio-section__title portfolio-section__title--outline">
            INTERACTIVE
          </h2>
        </AnimatedTitle>
        <AnimatedTitle isVisible={isActive} delay={0.25}>
          <h2 className="portfolio-section__title">
            INSTALLATIONS
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
          Sculptural light experiences that respond to presence and touch. 
          Our installations invite participation, turning viewers into 
          co-creators of ephemeral art.
        </p>
        
        <div className="portfolio-section__tags">
          <span className="tag">Museums</span>
          <span className="tag">Galleries</span>
          <span className="tag">Public Spaces</span>
          <span className="tag">Brand Activations</span>
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

