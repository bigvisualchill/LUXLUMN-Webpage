import { motion } from 'framer-motion'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'projection-mapping', label: 'Projection' },
  { id: 'performance-visuals', label: 'Performance' },
  { id: 'installations', label: 'Installations' },
  { id: 'logo-animation', label: 'Logo' }
]

export default function Navigation({ activeSection, onNavigate }) {
  return (
    <nav className="navigation">
      <div className="navigation__dots">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`navigation__dot ${activeSection === index ? 'navigation__dot--active' : ''}`}
            onClick={() => onNavigate(index)}
            aria-label={section.label}
          >
            <motion.span
              className="navigation__dot-inner"
              animate={{
                scale: activeSection === index ? 1 : 0.5,
                opacity: activeSection === index ? 1 : 0.4
              }}
              transition={{ duration: 0.3 }}
            />
            <span className="navigation__label">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

