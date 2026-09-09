import React from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-1 origin-left bg-brand-blue"
      style={{ scaleX: scrollYProgress, width: '100%' }}
    />
  );
};

export default ScrollProgress;