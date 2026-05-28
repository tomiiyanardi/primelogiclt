import { motion } from "framer-motion";

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export const TypewriterText = ({ text, className }) => {
  const letters = text.split("");
  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} className={`inline-flex flex-wrap ${className}`}>
      {letters.map((char, index) => (
        <motion.span key={index} variants={fadeUp} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};