import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '../components/Navigation'
import { SEO } from '../components/SEO'
import { ArrowLeft, Globe2, MapPin } from 'lucide-react'
import Lenis from '@studio-freight/lenis'

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
}

const stagger: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

export default function Network() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, orientation: 'vertical', smoothWheel: true })
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    window.scrollTo(0, 0)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="relative w-full bg-[#020202] text-white min-h-screen selection:bg-vdev-gold selection:text-black font-sans overflow-hidden">
      <SEO 
        title="VDEV Community — Developers, Students & Builders" 
        description="VDEV Global Network" 
        url="https://vdev.ai/network" 
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "VDEV Community",
          "url": "https://vdev.ai/network",
          "description": "VDEV Global Network",
          "publisher": {
            "@type": "Organization",
            "name": "VDEV",
            "url": "https://vdev.ai"
          }
        }}
      />
      <Navigation />

      {/* Global Network Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-vdev-gold/5 rounded-full blur-[100px] pointer-events-none opacity-30"></div>

      <main className="relative z-10 pt-32 md:pt-40 pb-24 px-6 md:px-16 max-w-[1400px] mx-auto">
        <motion.section initial="hidden" animate="visible" variants={stagger} className="mb-32">
          <motion.div variants={fadeUp} className="mb-8">
            <a href="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-gray-500 hover:text-vdev-gold transition-colors uppercase"><ArrowLeft className="w-3 h-3" /> Back to Main</a>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-6 text-[10px] tracking-[0.3em] flex items-center gap-4">
                <Globe2 className="w-4 h-4" /> GLOBAL PRESENCE
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
                THE VDEV <br/>NETWORK
              </motion.h1>
            </div>
            <motion.div variants={fadeUp} className="pb-2">
              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-lg lg:text-right ml-auto">
                A distributed engineering community operating across borders, connecting builders, resources, and real-world opportunities.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-32 border border-white/10 bg-white/10">
          {[
            { location: 'INDIA', desc: 'Engineering & Development HQ' },
            { location: 'UAE', desc: 'Strategic Partnerships & Scale' },
            { location: 'MALAYSIA', desc: 'APAC Region Operations' }
          ].map((node, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-[#050505] p-12 hover:bg-[#0a0a0a] transition-all relative overflow-hidden group">
              <MapPin className="w-8 h-8 text-white/20 group-hover:text-vdev-gold transition-colors mb-6" />
              <h3 className="text-2xl font-mono tracking-widest text-white mb-2">{node.location}</h3>
              <p className="text-gray-500 font-light">{node.desc}</p>
              
              {/* Radar sweep effect */}
              <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] border border-vdev-gold/20 rounded-full -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-1000 opacity-0 group-hover:opacity-100"></div>
            </motion.div>
          ))}
        </motion.section>
      </main>
    </div>
  )
}
