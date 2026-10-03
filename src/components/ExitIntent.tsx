import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { openConsultation } from './ConsultationModal'

export function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if already shown in this session
    if (sessionStorage.getItem('exitIntentShown')) return
    
    // Disable on mobile/touch devices as mouseleave is not reliable
    if (window.matchMedia('(pointer: coarse)').matches) return

    let timeoutId: number;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if mouse moves up towards the browser chrome (exit intent)
      if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        // Debounce to prevent accidental triggers
        timeoutId = window.setTimeout(() => {
          setIsVisible(true)
          sessionStorage.setItem('exitIntentShown', 'true')
        }, 100)
      }
    }

    const handleMouseEnter = () => {
      clearTimeout(timeoutId)
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      clearTimeout(timeoutId)
    }
  }, [])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[9980] max-w-sm bg-[#080808] border border-vdev-gold/30 p-6 shadow-2xl flex flex-col items-start group"
      >
        <button 
          onClick={() => setIsVisible(false)} 
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
          data-cursor="pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="font-mono text-vdev-gold text-[10px] tracking-widest uppercase mb-2">BEFORE YOU GO.</div>
        <h3 className="text-xl font-medium tracking-tight mb-6">Have something you're trying to build?</h3>
        
        <button 
          onClick={() => {
            setIsVisible(false)
            openConsultation()
          }}
          data-cursor="cta"
          className="font-mono text-[10px] tracking-widest text-vdev-gold hover:text-white transition-colors uppercase flex items-center gap-2 border border-vdev-gold/20 bg-vdev-gold/5 px-4 py-2 hover:bg-vdev-gold hover:text-black"
        >
          FREE 20-MIN CONSULTATION <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
