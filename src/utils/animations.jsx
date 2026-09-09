import { motion } from "framer-motion";

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export const RevealGroup = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: 0.12, delayChildren: delay } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const revealItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const RevealText = ({ children, className = "", delay = 0 }) => {
  const words = children.split(" ");

  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.7 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.045, delayChildren: delay } }
      }}
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
    >
      {words.map((word, index) => (
        <motion.span key={`${word}-${index}`} variants={revealItem} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const TypewriterText = ({ text, className }) => {
  const letters = text.split("");
  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className={`inline-flex flex-wrap ${className}`}>
      {letters.map((char, index) => (
        <motion.span key={index} variants={fadeUp} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};