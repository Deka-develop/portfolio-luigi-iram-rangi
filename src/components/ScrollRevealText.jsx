import { motion } from 'framer-motion';

/**
 * Editorial Kinetic Word-by-Word Scroll Reveal
 * Splits text into words, masks each word in an overflow-hidden wrapper,
 * and animates them upwards with spring physics when scrolled into view.
 * Fully accessible for screen readers via sr-only clean text + aria-hidden spans.
 * Defaults to once: true and amount: 0.05 for robust, zero-glitch mobile scrolling.
 */
export function ScrollRevealWords({
  children,
  className = '',
  delay = 0,
  stagger = 0.035,
  once = true,
  amount = 0.05,
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
      y: '35%',
      rotateZ: 0.8,
      transition: { duration: 0.25, ease: 'easeOut' }
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
 * Smooth Paragraph Reveal with Slide-Up
 */
export function ScrollRevealParagraph({
  children,
  className = '',
  delay = 0,
  once = true,
  amount = 0.05
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.55,
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
  once = true,
  amount = 0.05,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{
        type: 'spring',
        damping: 22,
        stiffness: 120,
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
 * Recreates the physical feeling of dealing cards onto the screen with tactile spring physics.
 */
export function ScrollShuffleCard({
  children,
  className = '',
  delay = 0,
  rotate = 0,
  once = true,
  amount = 0.05,
  ...props
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
        rotateZ: rotate || -1.2,
        scale: 0.98
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateZ: 0,
        scale: 1
      }}
      viewport={{ once, amount }}
      transition={{
        type: 'spring',
        damping: 22,
        stiffness: 120,
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
