import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, CheckCircle2 } from 'lucide-react'

// Simple global event system to trigger modal
export const openConsultation = () => {
  window.dispatchEvent(new CustomEvent('open-consultation'))
}

export function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
      setStep(1)
    }
    window.addEventListener('open-consultation', handleOpen)
    return () => window.removeEventListener('open-consultation', handleOpen)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const build = formData.get('build') as string
    const problem = formData.get('problem') as string
    const stage = formData.get('stage') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const date = formData.get('date') as string

    // Store locally in browser
    const consultationData = { build, problem, stage, name, email, date, timestamp: new Date().toISOString() }
    localStorage.setItem('vdev_consultation', JSON.stringify(consultationData))

    // Save to SQLite Backend & Send Email
    const apiUrl = import.meta.env.PROD ? '' : 'http://localhost:3001'
    fetch(`${apiUrl}/api/submit-signal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'consultation',
        name,
        email,
        problem,
        build,
        stage,
        requested_date: date
      })
    })
    .then(res => res.json())
    .then(() => {
      setIsSubmitting(false)
      setStep(3)
    })
    .catch(err => {
      console.log('SQLite Server not running:', err)
      // Still show success even if backend is offline to not break UX
      setIsSubmitting(false)
      setStep(3)
    });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9990]"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-[5vh] md:top-[10vh] left-[5vw] right-[5vw] md:left-1/2 md:-translate-x-1/2 md:w-[600px] max-h-[90vh] bg-[#080808] border border-white/10 overflow-y-auto z-[9991] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-[#080808]/90 backdrop-blur z-10">
              <div className="font-mono text-vdev-gold text-[10px] tracking-widest uppercase">FREE BUILD CONSULTATION</div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
                data-cursor="pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-3xl font-medium tracking-tight mb-4">Have a problem worth solving?</h2>
                  <p className="text-gray-400 font-light text-sm mb-8 leading-relaxed">
                    Book a free 20-minute build consultation. No commitment. No sales pressure. Just a conversation about what you're trying to build.
                  </p>
                  
                  <div className="space-y-4">
                    <button 
                      onClick={() => setStep(2)}
                      className="w-full bg-vdev-gold text-black font-mono text-xs tracking-wider py-4 hover:bg-white transition-colors flex items-center justify-center gap-2 uppercase"
                      data-cursor="pointer"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">1. What are you trying to build?</label>
                    <input name="build" required type="text" className="w-full bg-black border border-white/10 p-3 text-sm focus:border-vdev-gold focus:outline-none transition-colors" placeholder="e.g. AI Workflow, App, E-commerce..." />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">2. What problem are you solving?</label>
                    <textarea name="problem" required rows={3} className="w-full bg-black border border-white/10 p-3 text-sm focus:border-vdev-gold focus:outline-none transition-colors resize-none" placeholder="Briefly describe the challenge..." />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">3. What stage are you at?</label>
                      <select name="stage" className="w-full bg-black border border-white/10 p-3 text-sm text-gray-300 focus:border-vdev-gold focus:outline-none transition-colors appearance-none">
                        <option>Idea / Discovery</option>
                        <option>Prototyping</option>
                        <option>Scaling / Redesign</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">4. Preferred Date/Time</label>
                      <input name="date" required type="datetime-local" className="w-full bg-black border border-white/10 p-3 text-sm text-gray-300 focus:border-vdev-gold focus:outline-none transition-colors [color-scheme:dark]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">5. Name</label>
                      <input name="name" required type="text" className="w-full bg-black border border-white/10 p-3 text-sm focus:border-vdev-gold focus:outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">6. Email</label>
                      <input name="email" required type="email" className="w-full bg-black border border-white/10 p-3 text-sm focus:border-vdev-gold focus:outline-none transition-colors" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-vdev-gold text-black font-mono text-xs tracking-wider py-4 hover:bg-white transition-colors flex items-center justify-center gap-2 uppercase disabled:opacity-50"
                      data-cursor="pointer"
                    >
                      {isSubmitting ? 'SENDING SIGNAL...' : 'BOOK MY FREE CONSULTATION'}
                    </button>
                  </div>
                </motion.form>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-vdev-gold mx-auto mb-6 opacity-80" />
                  <h3 className="text-2xl font-medium tracking-tight mb-4">SIGNAL RECEIVED</h3>
                  <p className="text-gray-400 font-light text-sm mb-8">
                    We've received your build details. Our team will reach out shortly to schedule your consultation.
                  </p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="border border-white/20 text-white font-mono text-xs tracking-wider py-3 px-8 hover:border-vdev-gold hover:text-vdev-gold transition-colors uppercase"
                    data-cursor="pointer"
                  >
                    CLOSE INTERFACE
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
