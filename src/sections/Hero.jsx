import { motion } from 'framer-motion'
import Section from '../components/Section'
import { AnimatedTitle } from '../components/AnimatedText'

export default function Hero({ isActive }) {
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
