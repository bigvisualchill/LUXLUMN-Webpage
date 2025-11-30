import { motion } from 'framer-motion'
import Section from '../components/Section'
import { AnimatedTitle } from '../components/AnimatedText'

export default function PerformanceVisuals({ isActive }) {
  return (
    <Section id="performance-visuals" isActive={isActive} className="portfolio-section portfolio-section--alt">
      <div className="portfolio-section__header portfolio-section__header--right">
        <div className="portfolio-section__number">
          <span>02</span>
        </div>
        
        <AnimatedTitle isVisible={isActive}>
          <h2 className="portfolio-section__title">
            PERFORMANCE
          </h2>
        </AnimatedTitle>
        <AnimatedTitle isVisible={isActive}>
          <h2 className="portfolio-section__title portfolio-section__title--outline">
            VISUALS
          </h2>
        </AnimatedTitle>
      </div>

      <div className="portfolio-section__content portfolio-section__content--right">
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
      </div>

      <div className="portfolio-section__accent portfolio-section__accent--right" />
    </Section>
  )
}

