import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from '../components/Navigation'
import { SEO } from '../components/SEO'
import { ArrowLeft, ArrowRight, Terminal } from 'lucide-react'
import Lenis from '@studio-freight/lenis'
import { openConsultation } from '../components/ConsultationModal'

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
}

const stagger: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, orientation: 'vertical', smoothWheel: true })
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    window.scrollTo(0, 0)
    return () => lenis.destroy()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const problem = formData.get('problem') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    // Store locally in browser
    const signalData = { problem, name, email, timestamp: new Date().toISOString() }
    localStorage.setItem('vdev_signal', JSON.stringify(signalData))

    // Save to SQLite Backend & Send Email
    const apiUrl = import.meta.env.PROD ? '' : 'http://localhost:3001'
    fetch(`${apiUrl}/api/submit-signal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'build_signal',
        name,
        email,
        problem,
        build: 'N/A',
        stage: 'N/A',
        requested_date: 'N/A'
      })
    })
    .then(res => res.json())
    .then(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    })
    .catch(err => {
      console.log('SQLite Server not running:', err)
      // Still show success even if backend is offline to not break UX
      setIsSubmitting(false)
      setIsSuccess(true)
    });
  }

  return (
    <div className="relative w-full bg-[#020202] text-white min-h-screen selection:bg-vdev-gold selection:text-black font-sans">
      <SEO 
        title="Work With VDEV — Build Something Real" 
        description="Initiate secure comms with VDEV." 
        url="https://vdev.ai/contact" 
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Contact VDEV",
          "url": "https://vdev.ai/contact",
          "description": "Initiate secure comms with VDEV.",
          "publisher": {
            "@type": "Organization",
            "name": "VDEV",
            "url": "https://vdev.ai"
          }
        }}
      />
      <Navigation />

      <main className="relative z-10 pt-32 md:pt-40 pb-24 px-6 md:px-16 max-w-3xl mx-auto min-h-[90vh] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.section key="form" initial="hidden" animate="visible" exit={{ opacity: 0, y: -20 }} variants={stagger}>
              <motion.div variants={fadeUp} className="mb-12">
                <a href="/" data-cursor="pointer" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-gray-500 hover:text-vdev-gold transition-colors uppercase"><ArrowLeft className="w-3 h-3" /> Back to Main</a>
              </motion.div>
              
              <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-6 text-[10px] tracking-[0.3em] flex items-center gap-3">
                <Terminal className="w-4 h-4" /> SECURE COMMS CHANNEL
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight uppercase">
                WHAT ARE YOU <br/>TRYING TO SOLVE?
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-gray-400 font-light leading-relaxed max-w-xl mb-12">
                Send a Build Signal. We'll analyze your requirements and map out the architecture needed to make it a reality.
              </motion.p>

              <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Problem Statement</label>
                  <textarea name="problem" required rows={4} className="w-full bg-[#080808] border border-white/10 p-4 text-sm focus:border-vdev-gold focus:outline-none transition-colors resize-none" placeholder="What is broken? What needs to exist?..." />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Your Name</label>
                    <input name="name" required type="text" className="w-full bg-[#080808] border border-white/10 p-4 text-sm focus:border-vdev-gold focus:outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Email Identity</label>
                    <input name="email" required type="email" className="w-full bg-[#080808] border border-white/10 p-4 text-sm focus:border-vdev-gold focus:outline-none transition-colors" />
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    data-cursor="cta"
                    className="w-full sm:w-auto bg-vdev-gold text-black font-mono text-xs tracking-wider px-10 py-5 hover:bg-white transition-colors flex items-center justify-center gap-3 uppercase disabled:opacity-50"
                  >
                    {isSubmitting ? 'ANALYZING...' : 'SEND SIGNAL'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            </motion.section>
          ) : (
            <motion.section key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center py-12 border border-vdev-gold/20 bg-vdev-gold/5 p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-vdev-gold" />
              
              <div className="font-mono text-vdev-gold text-[10px] tracking-[0.3em] mb-8">BUILD SIGNAL GENERATED [ 047 ]</div>
              
              <div className="space-y-4 font-mono text-sm tracking-widest mb-16 text-left max-w-xs mx-auto border-l-2 border-vdev-gold/30 pl-6">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-[10px]">MISSION STATUS</span>
                  <span className="text-white">IDENTIFIED</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-[10px]">BUILD PATH</span>
                  <span className="text-white">MAPPED</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-[10px]">NEXT STEP</span>
                  <span className="text-vdev-gold">READY</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={openConsultation} 
                  data-cursor="cta"
                  className="w-full sm:w-auto bg-vdev-gold text-black font-mono text-[10px] tracking-wider px-8 py-4 hover:bg-white transition-colors uppercase"
                >
                  BOOK FREE CONSULTATION
                </button>
                <a 
                  href="/builds" 
                  data-cursor="pointer"
                  className="w-full sm:w-auto border border-white/20 text-white font-mono text-[10px] tracking-wider px-8 py-4 hover:border-vdev-gold hover:text-vdev-gold transition-colors uppercase"
                >
                  EXPLORE VDEV BUILDS
                </a>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
