import { motion } from 'framer-motion';

/**
 * Editorial Kinetic Word-by-Word Scroll Reveal (Bidirectional)
 * Splits text into words, masks each word in an overflow-hidden wrapper.
 * When scrolling down: words reveal sequentially with spring physics (word 1 -> word N).
 * When scrolling up: words fold away in reverse order (word N -> word 1) with staggerDirection: -1.
 * Fully accessible for screen readers via sr-only clean text + aria-hidden spans.
 */
export function ScrollRevealWords({
  children,
  className = '',
  delay = 0,
  stagger = 0.035,
  once = false,
  amount = 'some',
  as: Component = 'span'
}) {
  if (typeof children !== 'string') {
    return <Component className={className}>{children}</Component>;
  }

  const words = children.trim().split(/\s+/);

  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1
      }
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: '35%',
      rotateZ: 0.8,
      transition: {
        duration: 0.18,
        ease: 'easeIn'
      }
    },
    visible: {
      opacity: 1,
      y: '0%',
      rotateZ: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 120
      }
    }
  };

  return (
    <Component className={`relative ${className}`}>
      {/* Screen reader clean single string */}
      <span className="sr-only">{children}</span>

      {/* Visual kinetic staggered reveal (reversible on scroll up) */}
      <motion.span
        aria-hidden="true"
        className="inline-block"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden mr-[0.28em] align-top pb-[0.08em]"
          >
            <motion.span
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}

/**
 * Smooth Paragraph Reveal with Slide-Up (Bidirectional)
 * Slides up into view on scroll down; slides back down smoothly on scroll up.
 */
export function ScrollRevealParagraph({
  children,
  className = '',
  delay = 0,
  once = false,
  amount = 'some'
}) {
  const paragraphVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      transition: {
        duration: 0.22,
        ease: 'easeIn'
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div
      variants={paragraphVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Elevated Card Scroll Reveal Container with Spring Physics (Bidirectional)
 */
export function ScrollRevealCard({
  children,
  className = '',
  delay = 0,
  once = false,
  amount = 'some',
  ...props
}) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 26,
      scale: 0.98,
      transition: {
        duration: 0.24,
        ease: 'easeIn'
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 22,
        stiffness: 120,
        delay,
        mass: 0.9
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Kinetic Shuffle Card Scroll Reveal (Bidirectional)
 * When scrolling down: deals cards onto the screen in order with spring settling.
 * When scrolling up: cards tuck away in reverse order (card N -> card 1) with reverse delays.
 */
export function ScrollShuffleCard({
  children,
  className = '',
  delay = 0,
  rotate = 0,
  index = 0,
  total = 1,
  once = false,
  amount = 'some',
  ...props
}) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 28,
      rotateZ: rotate || -1.2,
      scale: 0.97,
      transition: {
        duration: 0.22,
        delay: total > 1 ? (total - 1 - index) * 0.05 : 0,
        ease: 'easeIn'
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 22,
        stiffness: 120,
        delay: delay || (index ? index * 0.08 : 0),
        mass: 0.85
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
