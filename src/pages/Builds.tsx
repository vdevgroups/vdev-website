import { useEffect } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Navigation } from '../components/Navigation'
import { SEO } from '../components/SEO'
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react'
import Lenis from '@studio-freight/lenis'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

export default function Builds() {
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
        title="VDEV Builds — Real Products & Technology Projects" 
        description="Showcase of VDEV engineering builds." 
        url="https://vdev.ai/builds" 
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "VDEV Builds",
          "url": "https://vdev.ai/builds",
          "description": "Showcase of VDEV engineering builds.",
          "publisher": {
            "@type": "Organization",
            "name": "VDEV",
            "url": "https://vdev.ai"
          }
        }}
      />
      <Navigation />

      <main className="relative z-10 pt-32 md:pt-40 pb-24 px-6 md:px-16 max-w-[1400px] mx-auto">
        <motion.section initial="hidden" animate="visible" variants={stagger} className="mb-24">
          <motion.div variants={fadeUp} className="mb-8">
            <a href="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-gray-500 hover:text-vdev-gold transition-colors uppercase"><ArrowLeft className="w-3 h-3" /> Back to Main</a>
          </motion.div>
          
          <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-6 text-[10px] tracking-[0.3em]">SHOWCASE</motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
            SYSTEMS <br/>DEPLOYED
          </motion.h1>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {[
            { id: '001', slug: '/builds/vanthenda-paalkaran', title: 'Vanthenda Paalkaran', tags: ['Mobile App', 'Payments'], desc: 'Digital platform connecting customers with milk suppliers.', image: '/assets/images/vandendapaalkaran.png' },
            { id: '002', slug: '/builds/vishrea-studio', title: 'Vishrea Studio', tags: ['E-commerce', 'AI'], desc: 'AI-powered fashion discovery platform.', image: '/assets/images/vishreastudio.png' },
            { id: '003', slug: '#', title: 'CLASSIFIED BUILD', tags: ['Encrypted'], desc: 'Details restricted until launch.', image: '/assets/images/vdevpost.png', locked: true }
          ].map((build, i) => (
            <motion.div key={i} variants={fadeUp} className="group border border-white/10 bg-[#050505] overflow-hidden">
              <a href={build.slug} className={`block ${build.locked ? 'cursor-not-allowed opacity-80' : ''}`} onClick={(e) => build.locked && e.preventDefault()}>
                <div className="h-80 bg-[#111] relative overflow-hidden border-b border-white/10">
                  <div className={`absolute inset-0 opacity-40 transition-opacity duration-700 bg-cover bg-center ${build.locked ? 'blur-sm grayscale opacity-20' : 'group-hover:opacity-100 group-hover:scale-105'}`} style={{ backgroundImage: `url('${build.image}')` }} />
                  {build.locked && <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"><Lock className="w-8 h-8 text-white/20" /></div>}
                  <div className="absolute top-4 right-4 text-xs font-mono text-vdev-gold bg-black/60 px-2 py-1 rounded backdrop-blur-sm">BUILD {build.id}</div>
                </div>
                <div className="p-8">
                  <h3 className={`text-2xl font-medium mb-4 transition-colors ${build.locked ? 'text-white/50' : 'text-white group-hover:text-vdev-gold'}`}>{build.title}</h3>
                  <p className={`font-light text-sm leading-relaxed mb-8 ${build.locked ? 'text-gray-600' : 'text-gray-500'}`}>{build.desc}</p>
                  {build.locked ? (
                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-gray-600"><Lock className="w-3 h-3" /> UNLOCKING SOON</div>
                  ) : (
                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-vdev-gold">VIEW PROJECT <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></div>
                  )}
                </div>
              </a>
            </motion.div>
          ))}
        </motion.section>
      </main>
    </div>
  )
}
