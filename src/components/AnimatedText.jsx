import { motion } from 'framer-motion'

const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    rotateX: -90
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
}

const wordVariants = {
  hidden: { 
    opacity: 0,
    y: 100
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
}

const lineVariants = {
  hidden: { 
    opacity: 0,
    y: 60,
    skewY: 3
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
}

export function AnimatedLetters({ text, isVisible, className = '', delay = 0 }) {
  const letters = text.split('')
  
  return (
    <span className={`animated-text ${className}`} style={{ display: 'inline-block' }}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          custom={i + delay}
          variants={letterVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          style={{ 
            display: 'inline-block',
            whiteSpace: letter === ' ' ? 'pre' : 'normal'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  )
}

export function AnimatedWords({ text, isVisible, className = '', delay = 0 }) {
  const words = text.split(' ')
  
  return (
    <span className={`animated-text ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i + delay}
          variants={wordVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          style={{ 
            display: 'inline-block',
            marginRight: '0.3em'
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export function AnimatedLines({ lines, isVisible, className = '' }) {
  return (
    <div className={`animated-lines ${className}`}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: 'hidden' }}>
          <motion.div
            custom={i}
            variants={lineVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export function AnimatedTitle({ children, isVisible, className = '', delay = 0 }) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default AnimatedLetters

