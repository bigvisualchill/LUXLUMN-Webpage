import Section from '../components/Section'
import { AnimatedTitle } from '../components/AnimatedText'
import GalleryButton from '../components/GalleryButton'

export default function LogoAnimation({ isActive, onOpenGallery }) {
  return (
    <Section id="logo-animation" isActive={isActive} className="portfolio-section portfolio-section--alt portfolio-section--final">
      <div className="portfolio-section__header portfolio-section__header--right">
        <div className="portfolio-section__number">
          <span>04</span>
        </div>
        
        <AnimatedTitle isVisible={isActive}>
          <h2 className="portfolio-section__title">
            LOGO
          </h2>
        </AnimatedTitle>
        <AnimatedTitle isVisible={isActive}>
          <h2 className="portfolio-section__title portfolio-section__title--outline">
            ANIMATION
          </h2>
        </AnimatedTitle>
        
        <p className="portfolio-section__description">
          Bringing brand identities to life through motion. We craft logo 
          animations that capture essence and create lasting impressions 
          across all digital touchpoints.
        </p>
      </div>

      <div className="portfolio-section__content portfolio-section__content--right">
        <GalleryButton onClick={onOpenGallery} />
      </div>

      <div className="portfolio-section__accent portfolio-section__accent--right" />

      <footer className="footer">
        <span>© 2025 LUX LUMN</span>
        <span className="footer__divider">|</span>
        <span>Light in Motion</span>
      </footer>
    </Section>
  )
}
