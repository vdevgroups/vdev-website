import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-16 py-6 md:py-8 transition-all duration-700 ${
          scrolled || isMobileMenuOpen ? 'bg-[#020202]/90 backdrop-blur-xl md:py-6' : 'bg-transparent'
        }`}
      >
        <a href="/" className="flex items-center gap-4 cursor-pointer group" onClick={() => setIsMobileMenuOpen(false)}>
          <img src="/vdevicon.png" alt="VDEV Logo" className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-500" />
          <span className="font-mono text-xs md:text-sm tracking-[0.3em] font-bold text-white uppercase">VDEV</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 font-mono text-[10px] tracking-[0.2em] text-gray-400">
          <a href="/services" data-cursor="pointer" className="hover:text-white transition-colors duration-300">WHAT WE BUILD</a>
          <a href="/builds" data-cursor="pointer" className="hover:text-white transition-colors duration-300">BUILDS</a>
          <a href="/labs" data-cursor="pointer" className="hover:text-white transition-colors duration-300">LABS</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="/contact" className="hidden sm:flex relative group overflow-hidden border border-white/10 px-6 py-2.5 font-mono text-[10px] tracking-widest transition-all hover:border-vdev-gold bg-black/50 backdrop-blur-md">
            <span className="relative z-10 flex items-center gap-2 group-hover:text-vdev-black transition-colors duration-500 font-bold">
              INITIATE <ArrowRight className="w-3 h-3" />
            </span>
            <div className="absolute inset-0 bg-vdev-gold transform scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500 ease-[0.16,1,0.3,1]"></div>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#020202]/95 backdrop-blur-2xl flex flex-col items-center justify-center px-6"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm mt-10">
              <a href="/services" onClick={() => setIsMobileMenuOpen(false)} data-cursor="pointer" className="w-full text-center border-b border-white/10 pb-6 font-mono text-xs tracking-[0.3em] text-white/70 hover:text-vdev-gold transition-colors">WHAT WE BUILD</a>
              <a href="/builds" onClick={() => setIsMobileMenuOpen(false)} data-cursor="pointer" className="w-full text-center border-b border-white/10 pb-6 font-mono text-xs tracking-[0.3em] text-white/70 hover:text-vdev-gold transition-colors">BUILDS</a>
              <a href="/labs" onClick={() => setIsMobileMenuOpen(false)} data-cursor="pointer" className="w-full text-center border-b border-white/10 pb-6 font-mono text-xs tracking-[0.3em] text-white/70 hover:text-vdev-gold transition-colors">LABS</a>
              
              <a href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full relative group overflow-hidden border border-vdev-gold/30 px-6 py-4 font-mono text-xs tracking-widest transition-all text-center text-vdev-gold mt-8">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  INITIATE COMMS <ArrowRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-vdev-gold/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
