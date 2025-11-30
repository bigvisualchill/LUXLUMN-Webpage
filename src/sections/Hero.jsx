import { motion } from 'framer-motion'
import Section from '../components/Section'
import { AnimatedLetters, AnimatedTitle } from '../components/AnimatedText'

const sections = [
  { index: 1, label: 'Projection Mapping' },
  { index: 2, label: 'Performance Visuals' },
  { index: 3, label: 'Installations' },
  { index: 4, label: 'Logo Animation' },
]

export default function Hero({ isActive, onNavigate }) {
  return (
    <Section id="hero" isActive={isActive} className="hero">
      <div className="hero__content">
        <div className="hero__title-wrapper">
          <AnimatedTitle isVisible={isActive} delay={0.2}>
            <h1 className="hero__title">
              <span className="hero__title-line">LUX</span>
            </h1>
          </AnimatedTitle>
          <AnimatedTitle isVisible={isActive} delay={0.4}>
            <h1 className="hero__title">
              <span className="hero__title-line hero__title-line--accent">LUMN</span>
            </h1>
          </AnimatedTitle>
        </div>
        
        <motion.div 
          className="hero__tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <span className="hero__tagline-sub">LIGHT IS THE NEW ART</span>
        </motion.div>

        <motion.div 
          className="hero__nav-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {sections.map((section, i) => (
            <motion.button
              key={section.index}
              className="hero__nav-button"
              onClick={() => onNavigate(section.index)}
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1 + (i * 0.1), duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.div
            className="hero__scroll-line"
            animate={{ 
              scaleY: [0, 1, 0],
              originY: [0, 0, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span>Scroll</span>
        </motion.div>
      </div>
    </Section>
  )
}

