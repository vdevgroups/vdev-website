import { useEffect } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Navigation } from '../components/Navigation'
import { SEO } from '../components/SEO'
import { ArrowLeft } from 'lucide-react'
import Lenis from '@studio-freight/lenis'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

export default function About() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, orientation: 'vertical', smoothWheel: true })
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    window.scrollTo(0, 0)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="relative w-full bg-[#020202] text-white min-h-screen selection:bg-vdev-gold selection:text-black font-sans">
      <SEO 
        title="About VDEV — Builder-Driven Technology Community" 
        description="The story behind VDEV." 
        url="https://vdev.ai/about" 
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About VDEV",
          "url": "https://vdev.ai/about",
          "description": "The story behind VDEV.",
          "publisher": {
            "@type": "Organization",
            "name": "VDEV",
            "url": "https://vdev.ai"
          }
        }}
      />
      <Navigation />

      <main className="relative z-10 pt-32 md:pt-40 pb-24 px-6 md:px-16 max-w-[1400px] mx-auto">
        <motion.section initial="hidden" animate="visible" variants={stagger} className="mb-32">
          <motion.div variants={fadeUp} className="mb-8">
            <a href="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-gray-500 hover:text-vdev-gold transition-colors uppercase"><ArrowLeft className="w-3 h-3" /> Back to Main</a>
          </motion.div>
          
          <div className="max-w-4xl">
            <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-6 text-[10px] tracking-[0.3em]">ORIGIN</motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-16">
              MADE OF CODE.<br/>DRIVEN BY CURIOSITY.
            </motion.h1>
            
            <motion.div variants={fadeUp} className="prose prose-invert prose-lg text-gray-400 font-light max-w-2xl leading-relaxed">
              <p>VDEV was born from a simple realization: the world has too many ideas and not enough executors.</p>
              <p className="mt-6">We are a builder-driven community of engineers, designers, and systems architects. We don't just write code; we engineer realities. From India to the world, our mission is to deploy technology that solves actual problems.</p>
              <p className="mt-6 border-l border-vdev-gold/30 pl-6 text-white text-xl">"Build what needs to exist."</p>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
