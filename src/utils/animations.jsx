import { fadeUp, staggerContainer } from './motionVariants';
import { motion as Motion, useReducedMotion } from "framer-motion";





export const RevealGroup = ({ children, className = "", delay = 0 }) => (
  <Motion.div
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
  </Motion.div>
);



export const RevealText = ({ children, className = "", delay = 0 }) => {
  const reduced = useReducedMotion();
  return <Motion.span initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0 : 0.5, delay }} className={`inline-block ${className}`}>{children}</Motion.span>;
};
export const TypewriterText = ({ text, className }) => {
  const letters = text.split("");
  return (
    <Motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className={`inline-flex flex-wrap ${className}`}>
      {letters.map((char, index) => (
        <Motion.span key={index} variants={fadeUp} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </Motion.span>
      ))}
    </Motion.div>
  );
};

