import Section from '../components/Section'
import { AnimatedTitle } from '../components/AnimatedText'

export default function LogoAnimation({ isActive }) {
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
      </div>

      <div className="portfolio-section__content portfolio-section__content--right">
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
      </div>

      <div className="portfolio-section__cta">
        <a href="mailto:hello@luxlumn.com" className="cta-button">
          <span>Get in Touch</span>
          <span className="cta-button__arrow">→</span>
        </a>
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
