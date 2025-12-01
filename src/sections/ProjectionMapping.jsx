import { motion } from 'framer-motion'
import Section from '../components/Section'
import { AnimatedTitle, AnimatedLines } from '../components/AnimatedText'
import GalleryButton from '../components/GalleryButton'

export default function ProjectionMapping({ isActive, onOpenGallery }) {
  return (
    <Section id="projection-mapping" isActive={isActive} className="portfolio-section">
      <div className="portfolio-section__header">
        <div className="portfolio-section__number">
          <span>01</span>
        </div>
        
        <AnimatedTitle isVisible={isActive}>
          <h2 className="portfolio-section__title">
            PROJECTION
          </h2>
        </AnimatedTitle>
        <AnimatedTitle isVisible={isActive}>
          <h2 className="portfolio-section__title portfolio-section__title--outline">
            MAPPING
          </h2>
        </AnimatedTitle>
        
        <GalleryButton onClick={onOpenGallery} />
      </div>

      <div className="portfolio-section__content">
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
      </div>

      <div className="portfolio-section__accent" />
    </Section>
  )
}
