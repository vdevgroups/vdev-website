import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from '../components/Navigation'
import { SEO } from '../components/SEO'
import { ArrowLeft, ArrowRight, Bot, Database, Network, Terminal, Mic, TestTube, X, Activity, Code2 } from 'lucide-react'
import Lenis from '@studio-freight/lenis'

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
}

const stagger: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const CURRENT_YEAR = new Date().getFullYear()

const labsData = [
  {
    id: '01',
    title: 'AI AGENTS',
    desc: 'Autonomous systems that reason, use tools and execute multi-step workflows.',
    icon: Bot,
    details: 'Currently engineering agentic architectures capable of autonomously executing complex code refactoring, interacting with enterprise APIs, and monitoring system health without human intervention.',
    tech: ['Agentic Reasoning Engines', 'Tool & API Use', 'Multi-Agent Orchestration']
  },
  {
    id: '02',
    title: 'RAG & KNOWLEDGE SYSTEMS',
    desc: 'Intelligent systems connecting private/business knowledge with search and LLM experiences.',
    icon: Database,
    details: 'Building high-performance semantic retrieval pipelines. We are testing systems that connect vast amounts of unstructured enterprise data (PDFs, Notion, Databases) to LLMs with sub-second latency.',
    tech: ['Vector Databases', 'Semantic Search', 'Embedding Models']
  },
  {
    id: '03',
    title: 'AI AUTOMATION',
    desc: 'Intelligent automation for repetitive business workflows and processes.',
    icon: Network,
    details: 'Automating high-friction business workflows. Prototyping autonomous email handling, dynamic AI reporting, and intelligent invoice processing workflows that operate continuously.',
    tech: ['Workflow Engines', 'Webhook Automation', 'Agentic Logic']
  },
  {
    id: '04',
    title: 'COMPUTER USE',
    desc: 'AI systems interacting with software, interfaces and digital workflows.',
    icon: Terminal,
    details: 'Exploring next-generation UI automation. We are researching models that interact directly with DOM elements and OS-level interfaces using vision and coordinates, bypassing traditional APIs.',
    tech: ['Vision-Language Models', 'DOM Manipulation', 'OS-Level Agents']
  },
  {
    id: '05',
    title: 'VOICE & MULTIMODAL AI',
    desc: 'Voice-driven and multimodal experiences for more natural human-computer interaction.',
    icon: Mic,
    details: 'Prototyping ultra-low latency voice agents capable of handling complex customer service workflows, real-time translations, and empathetic conversational AI.',
    tech: ['Real-time Audio Streaming', 'TTS Generation', 'Speech-to-Text']
  },
  {
    id: '06',
    title: 'EXPERIMENTAL PRODUCTS',
    desc: 'Rapid prototypes, emerging technologies and ideas being tested before becoming products.',
    icon: TestTube,
    details: 'Testing radical ideas before they reach production. Current experiments include localized small language models (SLMs), spatial computing interfaces, and heavily encrypted data structures.',
    tech: ['Small Language Models (SLMs)', 'Experimental UI/UX', 'Encrypted Networks']
  }
]

export default function Labs() {
  const [activeLab, setActiveLab] = useState<typeof labsData[0] | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    window.scrollTo(0, 0)
    return () => lenis.destroy()
  }, [])

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeLab) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [activeLab])

  return (
    <div className="relative w-full bg-[#020202] text-white min-h-screen selection:bg-vdev-gold selection:text-black font-sans overflow-hidden">
      <SEO 
        title="VDEV Labs — AI Agents, RAG & Emerging Technology"
        description="Where ideas become experiments. Explore emerging technology, AI agents, and working prototypes."
        url="https://vdev.ai/labs"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "VDEV Labs",
          "url": "https://vdev.ai/labs",
          "description": "Where ideas become experiments. Explore emerging technology, AI agents, and working prototypes by VDEV.",
          "publisher": {
            "@type": "Organization",
            "name": "VDEV",
            "url": "https://vdev.ai"
          }
        }}
      />
      <Navigation />

      {/* Abstract Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-vdev-gold/5 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite]"></div>
      </div>

      <main className="relative z-10 pt-32 md:pt-40 pb-24 px-6 md:px-16 max-w-[1400px] mx-auto">
        <motion.section initial="hidden" animate="visible" variants={stagger} className="mb-32">
          <motion.div variants={fadeUp} className="mb-8">
            <a href="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-gray-500 hover:text-vdev-gold transition-colors uppercase">
              <ArrowLeft className="w-3 h-3" /> Back to Main
            </a>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-16">
            <div>
              <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-6 text-[10px] tracking-[0.3em] flex items-center gap-4">
                <Activity className="w-4 h-4 animate-pulse" />
                VDEV LABS
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 leading-none uppercase">
                WHERE IDEAS <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600">BECOME <br/>EXPERIMENTS.</span>
              </motion.h1>
            </div>
            
            <motion.div variants={fadeUp} className="pb-2 flex flex-col items-start lg:items-end">
              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-lg lg:text-right border-l md:border-l-0 md:border-r border-vdev-gold/30 pl-6 md:pl-0 md:pr-6">
                “We explore emerging technology by building working prototypes, testing ideas and turning useful experiments into real products.”
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Labs Grid */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {labsData.map((lab) => (
            <motion.div 
              key={lab.id} 
              variants={fadeUp} 
              onClick={() => setActiveLab(lab)}
              className="bg-[#050505] border border-white/10 p-8 group hover:border-vdev-gold/30 cursor-pointer transition-all duration-500 relative flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-12">
                <lab.icon strokeWidth={1} className="w-10 h-10 text-white/50 group-hover:text-vdev-gold transition-colors duration-500" />
                <div className="font-mono text-[10px] tracking-[0.3em] text-gray-600 group-hover:text-vdev-gold/50 transition-colors uppercase">
                  LAB_{lab.id}
                </div>
              </div>
              
              <div className="mt-auto">
                <h3 className="text-xl font-medium mb-3 group-hover:text-white transition-colors">{lab.id} / {lab.title}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed mb-8">{lab.desc}</p>
                
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-vdev-gold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                  EXPLORE <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        <footer className="w-full flex flex-col md:flex-row justify-between items-center font-mono text-[10px] tracking-[0.2em] text-gray-500 border-t border-white/10 pt-8">
          <div>© {CURRENT_YEAR} VDEV LABS.</div>
        </footer>
      </main>

      {/* Interactive Cinematic Modal */}
      <AnimatePresence>
        {activeLab && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={() => setActiveLab(null)}></div>
            
            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl h-[85vh] md:h-[80vh] bg-[#050505] border border-white/10 overflow-hidden flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setActiveLab(null)} 
                className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Panel: Terminal / Code Aesthetic */}
              <div className="w-full md:w-5/12 bg-[#020202] border-r border-white/5 p-8 md:p-12 relative flex flex-col">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                
                <div className="relative z-10 flex-1">
                  <activeLab.icon strokeWidth={1} className="w-16 h-16 text-white/20 mb-12" />
                  
                  <div className="font-mono text-xs text-gray-600 mb-2">TARGET EXPERIMENT:</div>
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-8">{activeLab.id} / {activeLab.title}</h2>
                  
                  <div className="font-mono text-[10px] text-gray-500 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span>DATAPOINTS</span>
                      <span className="text-white">ENCRYPTED</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span>OBJECTIVE</span>
                      <span className="text-white">PROTOTYPE</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-12">
                   <div className="font-mono text-[10px] text-vdev-gold mb-3 flex items-center gap-2"><Code2 className="w-3 h-3"/> ACTIVE TECHNOLOGIES</div>
                   <div className="flex flex-wrap gap-2">
                     {activeLab.tech.map((t, i) => (
                       <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-400 font-mono text-[9px] uppercase tracking-widest">{t}</span>
                     ))}
                   </div>
                </div>
              </div>

              {/* Right Panel: Content */}
              <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center overflow-y-auto">
                <div className="font-mono text-[10px] tracking-[0.3em] text-vdev-gold mb-6">LAB REPORT 00{activeLab.id}</div>
                <h3 className="text-2xl font-medium text-white mb-6">
                  {activeLab.desc}
                </h3>
                <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-12">
                  {activeLab.details}
                </p>
                
                <div className="p-6 border border-white/5 bg-[#080808] relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-vdev-gold/30 group-hover:bg-vdev-gold transition-colors"></div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                      <div className="text-sm text-white mb-1">Want to implement this?</div>
                      <div className="text-xs font-light text-gray-500">Take this experiment into production.</div>
                    </div>
                    <a href="/contact" className="flex items-center gap-3 font-mono text-[10px] tracking-widest bg-white text-black px-6 py-3 hover:bg-vdev-gold transition-colors whitespace-nowrap">
                      INITIATE COMMS <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
