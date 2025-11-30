import { motion } from 'framer-motion'
import Section from '../components/Section'
import { AnimatedTitle } from '../components/AnimatedText'

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
          <AnimatedTitle isVisible={isActive}>
            <h1 className="hero__title">
              <span className="hero__title-line">LUX</span>
            </h1>
          </AnimatedTitle>
          <AnimatedTitle isVisible={isActive}>
            <h1 className="hero__title">
              <span className="hero__title-line hero__title-line--accent">LUMN</span>
            </h1>
          </AnimatedTitle>
        </div>
        
        <div className="hero__tagline">
          <span className="hero__tagline-sub">LIGHT IS THE NEW ART</span>
        </div>

        <div className="hero__nav-buttons">
          {sections.map((section) => (
            <motion.button
              key={section.index}
              className="hero__nav-button"
              onClick={() => onNavigate(section.index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.label}
            </motion.button>
          ))}
        </div>

        <div className="hero__scroll-indicator">
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
        </div>
      </div>
    </Section>
  )
}
