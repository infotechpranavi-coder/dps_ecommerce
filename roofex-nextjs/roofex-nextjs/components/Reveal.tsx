'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 1, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
