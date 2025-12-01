import { motion } from 'framer-motion'
import Section from '../components/Section'
import { AnimatedTitle } from '../components/AnimatedText'
import GalleryButton from '../components/GalleryButton'

export default function Installations({ isActive, onOpenGallery }) {
  return (
    <Section id="installations" isActive={isActive} className="portfolio-section">
      <div className="portfolio-section__header">
        <div className="portfolio-section__number">
          <span>03</span>
        </div>
        
        <AnimatedTitle isVisible={isActive}>
          <h2 className="portfolio-section__title portfolio-section__title--outline">
            INTERACTIVE
          </h2>
        </AnimatedTitle>
        <AnimatedTitle isVisible={isActive}>
          <h2 className="portfolio-section__title">
            INSTALLATIONS
          </h2>
        </AnimatedTitle>
        
        <p className="portfolio-section__description">
          Sculptural light experiences that respond to presence and touch. 
          Our installations invite participation, turning viewers into 
          co-creators of ephemeral art.
        </p>
      </div>

      <div className="portfolio-section__content">
        <GalleryButton onClick={onOpenGallery} />
      </div>

      <div className="portfolio-section__accent" />
    </Section>
  )
}
