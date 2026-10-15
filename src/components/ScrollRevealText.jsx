import { motion } from 'framer-motion';

/**
 * Editorial Kinetic Word-by-Word Scroll Reveal
 * Splits text into words, masks each word in an overflow-hidden wrapper,
 * and animates them upwards with spring physics and deblurring when scrolled into view.
 * Fully accessible for screen readers via sr-only clean text + aria-hidden spans.
 */
export function ScrollRevealWords({
  children,
  className = '',
  delay = 0,
  stagger = 0.035,
  once = false,
  amount = 0.15,
  as: Component = 'span'
}) {
  if (typeof children !== 'string') {
    return <Component className={className}>{children}</Component>;
  }

  const words = children.trim().split(/\s+/);

  const containerVariants = {
    hidden: { opacity: 0 },
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
      y: '75%',
      rotateZ: 1.5,
      filter: 'blur(5px)',
      transition: { duration: 0.25, ease: 'easeOut' }
    },
    visible: {
      opacity: 1,
      y: '0%',
      rotateZ: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 95
      }
    }
  };

  return (
    <Component className={`relative ${className}`}>
      {/* Screen reader clean single string */}
      <span className="sr-only">{children}</span>

      {/* Visual kinetic staggered reveal */}
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
 * Smooth Paragraph Reveal with Slide-Up and Deblur
 */
export function ScrollRevealParagraph({
  children,
  className = '',
  delay = 0,
  once = false,
  amount = 0.15
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Elevated Card Scroll Reveal Container with Spring Physics
 */
export function ScrollRevealCard({
  children,
  className = '',
  delay = 0,
  once = false,
  amount = 0.15,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{
        type: 'spring',
        damping: 22,
        stiffness: 110,
        delay,
        mass: 0.9
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Kinetic Shuffle Card Scroll Reveal
 * Recreates the physical feeling of dealing or shuffling cards onto the screen:
 * Card enters with tilt rotation, upward slide, deblurring, and settles with tactile spring physics.
 */
export function ScrollShuffleCard({
  children,
  className = '',
  delay = 0,
  rotate = 0,
  once = false,
  amount = 0.15,
  ...props
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 44,
        rotateZ: rotate || -1.8,
        scale: 0.94,
        filter: 'blur(5px)'
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateZ: 0,
        scale: 1,
        filter: 'blur(0px)'
      }}
      viewport={{ once, amount }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 115,
        delay,
        mass: 0.85
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
