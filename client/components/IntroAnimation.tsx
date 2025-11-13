'use client'

import { motion } from 'framer-motion'

export default function IntroAnimation() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bloc-intro fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: '#000' }}
    >
      <div className="intro-anim-surwrapper w-full max-w-4xl px-8">
        <div className="intro-anim-wrapper w-full flex items-center justify-center">
          {/* Simplified logo display */}
          <div className="text-white text-center">
            <h1 className="text-6xl md:text-8xl font-monument tracking-wider">POSTER</h1>
          </div>
        </div>
      </div>
      
      <div className="intro-timeline absolute bottom-8 left-1/2 w-64 h-1 bg-gray-800" style={{ transform: 'translateX(-50%)' }}>
        <motion.div
          className="inner bg-white h-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: 'linear' }}
        />
      </div>
    </motion.div>
  )
}
