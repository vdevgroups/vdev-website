import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from '../components/Navigation'
import { SEO } from '../components/SEO'
import { ArrowLeft, ArrowRight, Plus, Minus, Terminal } from 'lucide-react'
import Lenis from '@studio-freight/lenis'

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
}

const stagger: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const capabilities = [
  {
    id: '01',
    title: 'AI & AGENT ENGINEERING',
    items: ['AI Agents', 'AI-powered applications', 'RAG & LLM systems', 'Conversational AI', 'AI chatbots', 'Voice AI', 'AI workflow integration', 'Intelligent document processing']
  },
  {
    id: '02',
    title: 'AUTOMATION & WORKFLOW ENGINEERING',
    items: ['Business process automation', 'Workflow automation', 'AI-powered automation', 'Internal tools', 'Approval workflows', 'Email / notification automation', 'Repetitive task automation', 'System-to-system automation']
  },
  {
    id: '03',
    title: 'WEB & SOFTWARE ENGINEERING',
    items: ['React applications', 'Next.js applications', 'Full-stack platforms', 'SaaS products', 'Business portals', 'Customer portals', 'Internal enterprise systems', 'Custom software']
  },
  {
    id: '04',
    title: 'MOBILE APPLICATIONS',
    items: ['Android applications', 'iOS applications', 'Cross-platform applications', 'Flutter applications', 'Mobile-first product experiences', 'API-integrated mobile systems']
  },
  {
    id: '05',
    title: 'E-COMMERCE & DIGITAL COMMERCE',
    items: ['E-commerce platforms', 'Product catalog systems', 'Shopping experiences', 'Cart & checkout', 'Order management', 'Inventory systems', 'Customer management', 'Personalized shopping experiences']
  },
  {
    id: '06',
    title: 'PAYMENT & SUBSCRIPTION SYSTEMS',
    items: ['Payment gateway integration', 'Razorpay integration', 'Online payment flows', 'Subscription systems', 'Recurring payment workflows', 'Payment status handling', 'Webhook-driven payment automation']
  },
  {
    id: '07',
    title: 'BUSINESS SYSTEMS',
    items: ['CRM systems', 'Purchasing systems', 'HR systems', 'Business dashboards', 'Admin platforms', 'Inventory management', 'Workflow management', 'Reporting & analytics']
  },
  {
    id: '08',
    title: 'CLOUD & DEPLOYMENT',
    items: ['Cloud architecture', 'Production deployment', 'API infrastructure', 'Database integration', 'Storage', 'CDN', 'Monitoring', 'Scalable deployment architecture']
  },
  {
    id: '09',
    title: 'PRODUCT ENGINEERING',
    items: ['MVP development', 'Rapid prototyping', 'Product architecture', 'UI/UX implementation', 'Feature development', 'System integration', 'Testing & iteration', 'Production launch']
  },
  {
    id: '10',
    title: 'EXPERIMENTAL TECHNOLOGY',
    items: ['Computer-use workflows', 'Emerging AI technologies', 'Experimental products', 'Research prototypes', 'AI-assisted developer tools', 'New technology exploration']
  }
]

const whatWeBuild = [
  'AI Agents', 'E-commerce Platforms', 'Mobile Applications', 'Business Systems', 'CRM', 'Automation Platforms', 'Payment Systems', 'Internal Tools', 'SaaS Products', 'Experimental Products'
]

const process = [
  { step: '01', title: 'DISCOVER', desc: 'Understand the business, users, constraints and actual problem.' },
  { step: '02', title: 'ARCHITECT', desc: 'Design the system, architecture, technology and execution strategy.' },
  { step: '03', title: 'ENGINEER', desc: 'Build, integrate, test and iterate with continuous feedback.' },
  { step: '04', title: 'DEPLOY', desc: 'Ship to production, integrate with real infrastructure and validate.' },
  { step: '05', title: 'EVOLVE', desc: 'Monitor, improve, automate and scale as the business grows.' }
]

const CURRENT_YEAR = new Date().getFullYear()

export default function Services() {
  const [activeCap, setActiveCap] = useState<string | null>(null)

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

  return (
    <div className="relative w-full bg-[#020202] text-white min-h-screen selection:bg-vdev-gold selection:text-black font-sans overflow-hidden">
      <SEO 
        title="AI, Software & Product Development | VDEV" 
        description="From ideas and complex business problems to production-ready digital systems." 
        url="https://vdev.ai/services"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Software Engineering & AI Development",
          "provider": {
            "@type": "Organization",
            "name": "VDEV",
            "url": "https://vdev.ai"
          },
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Engineering Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI & Agent Engineering"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Web & Software Engineering"
                }
              }
            ]
          }
        }}
      />
      <Navigation />

      {/* Dynamic Background */}
      <div className="fixed top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-vdev-gold/5 to-transparent pointer-events-none opacity-50 z-0"></div>

      <main className="relative z-10 pt-32 md:pt-40 pb-24 px-6 md:px-16 max-w-[1400px] mx-auto">
        
        {/* HERO */}
        <motion.section initial="hidden" animate="visible" variants={stagger} className="mb-32">
          <motion.div variants={fadeUp} className="mb-8">
            <a href="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-gray-500 hover:text-vdev-gold transition-colors uppercase"><ArrowLeft className="w-3 h-3" /> Back to Main</a>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-16">
            <div>
              <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-6 text-[10px] tracking-[0.3em] flex items-center gap-3">
                <Terminal className="w-4 h-4" /> CAPABILITIES
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 leading-[1.1]">
                ENGINEERING <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600">SERVICES</span>
              </motion.h1>
            </div>
            <motion.div variants={fadeUp} className="pb-2 flex flex-col items-start lg:items-end">
              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-lg lg:text-right border-l md:border-l-0 md:border-r border-vdev-gold/30 pl-6 md:pl-0 md:pr-6">
                “From ideas and complex business problems to production-ready digital systems.”
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* INTERACTIVE CAPABILITIES LIST */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="mb-40">
          <div className="border-t border-white/10">
            {capabilities.map((cap) => (
              <motion.div key={cap.id} variants={fadeUp} className="border-b border-white/10">
                <button 
                  onClick={() => setActiveCap(activeCap === cap.id ? null : cap.id)}
                  className="w-full py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 group text-left"
                >
                  <div className="flex items-start md:items-center gap-8 md:gap-16">
                    <span className="font-mono text-sm text-gray-500 tracking-widest">{cap.id}</span>
                    <h3 className="text-2xl md:text-4xl font-medium tracking-tight group-hover:text-vdev-gold transition-colors">{cap.title}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-vdev-gold/50 group-hover:bg-vdev-gold/5 transition-all text-gray-500 group-hover:text-vdev-gold ml-12 md:ml-0">
                    {activeCap === cap.id ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeCap === cap.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-12 md:pl-24 pr-6 pb-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 mb-10">
                          {cap.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 font-light text-gray-400">
                              <span className="w-1 h-1 bg-vdev-gold rounded-full"></span>
                              {item}
                            </div>
                          ))}
                        </div>
                        <a href="/contact" className="inline-flex items-center gap-3 font-mono text-xs tracking-widest text-vdev-gold hover:text-white transition-colors group">
                          Explore Capability <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* WHAT WE ACTUALLY BUILD */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="mb-40">
          <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-12 text-[10px] tracking-[0.3em]">WHAT WE ACTUALLY BUILD</motion.div>
          <div className="flex flex-wrap gap-4">
            {whatWeBuild.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="px-6 py-4 border border-white/10 bg-[#050505] text-sm md:text-base font-light text-gray-300 hover:border-vdev-gold/30 hover:bg-[#0a0a0a] transition-colors">
                {item}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* HOW WE WORK - ENGINEERING LIFECYCLE */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="mb-40 bg-vdev-black border border-white/5 p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
          
          <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-16 text-[10px] tracking-[0.3em] relative z-10">HOW WE WORK</motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 relative z-10">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-6 left-0 w-full h-[1px] bg-white/10"></div>
            
            {process.map((p, i) => (
              <motion.div key={i} variants={fadeUp} className="relative pt-0 md:pt-16 pr-8">
                <div className="hidden md:block absolute top-[23px] left-0 w-2 h-2 rounded-full bg-vdev-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                <div className="font-mono text-[10px] text-gray-500 mb-4">{p.step} — {p.title}</div>
                <div className="text-sm font-light text-gray-400 leading-relaxed">{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FINAL CTA */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="mb-24 flex flex-col items-center justify-center text-center py-24 border-t border-b border-white/10 bg-[#030303]">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-medium tracking-tight mb-6 uppercase">
            HAVE A PROBLEM<br/>WORTH SOLVING?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 font-light mb-12 max-w-md">
            Tell us what you're trying to build. VDEV can take your real business problem and engineer the technology required to solve it.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" data-cursor="pointer" className="group relative overflow-hidden bg-white text-black px-10 py-4 font-mono text-xs tracking-wider transition-all hover:bg-vdev-gold inline-flex justify-center">
              <span className="relative z-10 flex items-center gap-3 font-bold uppercase">
                START BUILD SIGNAL <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-consultation'))} data-cursor="cta" className="group relative overflow-hidden border border-white/20 bg-transparent text-white px-10 py-4 font-mono text-xs tracking-wider transition-all hover:border-vdev-gold hover:text-vdev-gold inline-flex justify-center">
              <span className="relative z-10 flex items-center gap-3 uppercase">
                BOOK FREE CONSULTATION
              </span>
            </button>
          </motion.div>
        </motion.section>

        <footer className="w-full flex flex-col md:flex-row justify-between items-center font-mono text-[10px] tracking-[0.2em] text-gray-500 pt-8">
          <div>© {CURRENT_YEAR} VDEV. ALL RIGHTS RESERVED.</div>
        </footer>
      </main>
    </div>
  )
}
