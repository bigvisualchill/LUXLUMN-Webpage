import { motion } from 'framer-motion'
import Section from '../components/Section'
import { AnimatedTitle } from '../components/AnimatedText'

export default function LogoAnimation({ isActive }) {
  return (
    <Section id="logo-animation" isActive={isActive} className="portfolio-section portfolio-section--alt portfolio-section--final">
      <div className="portfolio-section__header portfolio-section__header--right">
        <div className="portfolio-section__number">
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={isActive ? { opacity: 0.3, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            04
          </motion.span>
        </div>
        
        <AnimatedTitle isVisible={isActive} delay={0.1}>
          <h2 className="portfolio-section__title">
            LOGO
          </h2>
        </AnimatedTitle>
        <AnimatedTitle isVisible={isActive} delay={0.25}>
          <h2 className="portfolio-section__title portfolio-section__title--outline">
            ANIMATION
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
          Bringing brand identities to life through motion. We craft logo 
          animations that capture essence and create lasting impressions 
          across all digital touchpoints.
        </p>
        
        <div className="portfolio-section__tags">
          <span className="tag">Brand Identity</span>
          <span className="tag">Motion Graphics</span>
          <span className="tag">Intros</span>
          <span className="tag">Social Media</span>
        </div>
      </motion.div>

      <motion.div 
        className="portfolio-section__cta"
        initial={{ opacity: 0, y: 30 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <a href="mailto:hello@luxlumn.com" className="cta-button">
          <span>Get in Touch</span>
          <motion.span 
            className="cta-button__arrow"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </a>
      </motion.div>

      <motion.div 
        className="portfolio-section__accent portfolio-section__accent--right"
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 0.7, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      />

      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span>© 2025 LUX LUMN</span>
        <span className="footer__divider">|</span>
        <span>Light in Motion</span>
      </motion.footer>
    </Section>
  )
}

