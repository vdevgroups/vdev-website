import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import { ArrowRight, ArrowLeft, ShoppingBag, Sparkles, MessageSquare, Shirt, LayoutDashboard, CreditCard, RefreshCcw, Mic, BrainCircuit, ExternalLink, Database } from 'lucide-react'
import { Navigation } from '../components/Navigation'
import { SEO } from '../components/SEO'

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
}

const stagger: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const CURRENT_YEAR = new Date().getFullYear()

export default function ProjectVishrea() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    window.scrollTo(0, 0)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="relative w-full bg-[#020202] text-white min-h-screen selection:bg-vdev-gold selection:text-black font-sans">
      <SEO 
        title="Vishrea Studio — E-commerce & AI Shopping | VDEV Projects"
        description="A scalable fashion e-commerce experience combining personalized recommendations and a foundation for AI-powered shopping."
        keywords="Vishrea Studio, fashion e-commerce, AI shopping, VDEV, generative e-commerce, AI storefront, Razorpay integration"
        url="https://vdev.ai/builds/vishrea-studio"
        image="/vishreastudio.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Vishrea Studio Platform",
          "applicationCategory": "ECommerceApplication",
          "operatingSystem": "Web",
          "publisher": {
            "@type": "Organization",
            "name": "VDEV",
            "url": "https://vdev.ai"
          },
          "description": "A digital platform providing personalized fashion e-commerce through AI intent-driven discovery."
        }}
      />
      <Navigation />

      <main className="pt-32 md:pt-40 pb-24 px-6 md:px-16 max-w-[1400px] mx-auto">
        
        {/* 01 — HERO */}
        <motion.section initial="hidden" animate="visible" variants={stagger} className="mb-24">
          <motion.div variants={fadeUp} className="mb-8">
            <a href="/builds" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-gray-500 hover:text-vdev-gold transition-colors uppercase">
              <ArrowLeft className="w-3 h-3" /> Back to Builds
            </a>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-16">
            <div>
              <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-6 text-[10px] tracking-[0.3em]">BUILD 002 / KARNATAKA</motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
                Vishrea <br/>Studio
              </motion.h1>
              <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl text-gray-400 font-medium tracking-wide mb-8">
                “Fashion Made Personal.”
              </motion.h2>
            </div>
            
            <motion.div variants={fadeUp} className="pb-2 flex flex-col items-start lg:items-end">
              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-8 lg:text-right">
                An e-commerce experience combining fashion discovery, personalized recommendations and a foundation for AI-powered shopping.
              </p>
              <a href="https://vishreastudio.in/" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden bg-vdev-gold text-black px-8 py-4 font-mono text-xs tracking-wider transition-all hover:bg-white flex items-center gap-3">
                <span className="relative z-10 flex items-center gap-3 font-bold">
                  VISIT WEBSITE <ExternalLink className="w-4 h-4" />
                </span>
              </a>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="w-full bg-[#050505] border border-white/10 relative overflow-hidden rounded-sm">
            <img src="/vishreastudio.png" alt="Vishrea Studio Project" className="w-full h-auto opacity-90 block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-80 pointer-events-none" />
          </motion.div>
        </motion.section>

        {/* 02 — THE IDEA */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 border-t border-white/5 pt-16">
          <motion.div variants={fadeUp}>
            <div className="font-mono text-vdev-gold mb-4 text-[10px] tracking-[0.3em]">THE PROBLEM</div>
            <h3 className="text-3xl font-medium tracking-tight mb-6">Static catalogs.</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Traditional fashion e-commerce mainly presents products through rigid categories and endless static catalogs. It lacks the personalization and contextual understanding of an in-store stylist.
            </p>
          </motion.div>
          
          <motion.div variants={fadeUp}>
            <div className="font-mono text-vdev-gold mb-4 text-[10px] tracking-[0.3em]">THE APPROACH</div>
            <h3 className="text-3xl font-medium tracking-tight mb-6">Intent-driven discovery.</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Vishrea explores a more personalized approach. Customers can either browse normally through traditional categories or describe exactly what they want to receive highly relevant, AI-curated product recommendations.
            </p>
          </motion.div>
        </motion.section>

        {/* 03 — SHOPPING EXPERIENCE */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="mb-32 bg-[#050505] border border-white/5 p-8 md:p-16">
          <div className="mb-16 text-center">
            <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-4 text-[10px] tracking-[0.3em]">USER JOURNEYS</motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-medium tracking-tight">Two Ways to Shop</motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div variants={fadeUp} className="border-t border-white/10 pt-8">
              <h3 className="text-2xl font-medium mb-8 text-white/90 flex items-center gap-3"><ShoppingBag className="w-5 h-5 text-vdev-gold" /> BROWSE MYSELF</h3>
              <div className="flex flex-col gap-4 font-mono text-[11px] tracking-[0.2em] text-gray-400">
                {['Categories', 'Products', 'Product Details', 'Cart', 'Checkout', 'Payment'].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white/50">{i + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="border-t border-vdev-gold/30 pt-8">
              <h3 className="text-2xl font-medium mb-8 text-vdev-gold flex items-center gap-3"><Sparkles className="w-5 h-5" /> SMART SHOPPING</h3>
              <div className="flex flex-col gap-4 font-mono text-[11px] tracking-[0.2em] text-gray-300">
                {['Customer Intent', 'AI Understanding', 'Product Discovery', 'Personalized Recommendations', 'Purchase'].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-6 h-6 rounded-full border border-vdev-gold/50 flex items-center justify-center text-vdev-gold bg-vdev-gold/10">{i + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 04 & 06 — PRODUCT EXPERIENCE & BUSINESS SYSTEM */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="mb-32">
          <div className="mb-16">
            <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-4 text-[10px] tracking-[0.3em]">PLATFORM CAPABILITIES</motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-medium tracking-tight">The Business System</motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {[
              { title: 'Storefront', desc: 'Homepage, Categories, Product Listings, Product Details.', icon: LayoutDashboard },
              { title: 'Commerce', desc: 'Cart management, secure Checkout, Customer Orders.', icon: ShoppingBag },
              { title: 'Inventory', desc: 'Stock tracking, Product management, SKUs.', icon: Shirt },
              { title: 'Admin', desc: 'Platform oversight, Order processing, Recommendations.', icon: Database }
            ].map((sys, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-[#080808] p-6 hover:bg-[#0c0c0c] transition-colors">
                <sys.icon className="w-6 h-6 text-vdev-gold mb-8 opacity-80" strokeWidth={1} />
                <h3 className="text-lg font-medium mb-3">{sys.title}</h3>
                <p className="text-gray-500 font-light text-xs leading-relaxed">{sys.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 05 — AI SHOPPING EXPERIENCE */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="mb-32 border border-white/5 bg-gradient-to-b from-[#080808] to-[#020202] overflow-hidden">
          <div className="p-8 md:p-16 pb-0">
            <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-4 text-[10px] tracking-[0.3em]">EXPERIMENTAL LABS</motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-medium tracking-tight mb-8">AI Shopping Assistant</motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeUp} className="space-y-6 max-w-md">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-xs">C</div>
                  <div className="bg-[#111] p-4 rounded-r-xl rounded-bl-xl border border-white/5 font-light text-sm text-gray-300">
                    "I need a casual outfit for a college event."
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-vdev-gold/20 text-vdev-gold flex items-center justify-center shrink-0"><Sparkles className="w-4 h-4" /></div>
                  <div className="bg-vdev-gold/5 p-4 rounded-r-xl rounded-bl-xl border border-vdev-gold/20 font-light text-sm text-vdev-gold">
                    "Here are styles selected based on your preferences and the casual event setting."
                  </div>
                </div>
                <div className="pl-12 grid grid-cols-2 gap-4 mt-4">
                  <div className="aspect-[3/4] bg-[#111] border border-white/10 rounded overflow-hidden relative group">
                    <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity bg-[url('/vishrea-style-01.png')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 text-[10px] font-mono z-10 font-bold">STYLE 01</div>
                  </div>
                  <div className="aspect-[3/4] bg-[#111] border border-white/10 rounded overflow-hidden relative group">
                    <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity bg-[url('/vishrea-style-02.png')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 text-[10px] font-mono z-10 font-bold">STYLE 02</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="border-l border-white/5 pl-8 lg:pl-16">
                <h3 className="text-lg font-medium mb-6 text-white/80">Future Capabilities (In Development)</h3>
                <ul className="space-y-6">
                  {[
                    { title: 'Voice Shopping', icon: Mic, desc: 'Search and navigate entirely via voice.' },
                    { title: 'Personal Style Memory', icon: BrainCircuit, desc: 'The system remembers past purchases and aesthetic preferences.' },
                    { title: 'Preference-Based Discovery', icon: Sparkles, desc: 'Feed ranks products based on individual taste profiles.' },
                    { title: 'Conversational Search', icon: MessageSquare, desc: 'Chat naturally with the store instead of using rigid filters.' }
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <feat.icon className="w-5 h-5 text-gray-500 mt-1" />
                      <div>
                        <div className="font-medium text-sm mb-1">{feat.title}</div>
                        <div className="text-xs font-light text-gray-500">{feat.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 07 & 08 — PAYMENT & SUBSCRIPTION */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          <motion.div variants={fadeUp} className="bg-[#080808] p-12">
            <CreditCard className="w-8 h-8 text-vdev-gold mb-8" strokeWidth={1} />
            <h3 className="text-2xl font-medium mb-6">Payment Integration</h3>
            <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
              Seamless and secure transactions powered by Razorpay.
            </p>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-gray-500">
              PRODUCT <ArrowRight className="w-3 h-3 text-white/20" /> CART <ArrowRight className="w-3 h-3 text-white/20" /> CHECKOUT <ArrowRight className="w-3 h-3 text-white/20" /> <span className="text-white">RAZORPAY</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[#080808] p-12 relative overflow-hidden">
            <div className="absolute top-6 right-6 border border-vdev-gold/30 text-vdev-gold font-mono text-[8px] tracking-[0.2em] px-2 py-1 rounded bg-vdev-gold/10">PROPOSED FEATURE</div>
            <RefreshCcw className="w-8 h-8 text-gray-600 mb-8" strokeWidth={1} />
            <h3 className="text-2xl font-medium mb-6 text-gray-300">Membership / Subscription</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed mb-8">
              A proposed model for recurring fashion deliveries and VIP membership benefits.
            </p>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-widest text-gray-600">
              SELECT <ArrowRight className="w-3 h-3 text-white/10" /> AUTHORIZE <ArrowRight className="w-3 h-3 text-white/10" /> ACTIVE <ArrowRight className="w-3 h-3 text-white/10" /> BILLING
            </div>
          </motion.div>
        </motion.section>

        {/* 09 — FUTURE VISION */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="mb-32 text-center py-16">
          <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-8 text-[10px] tracking-[0.3em]">THE EVOLUTION OF VISHREA</motion.div>
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 font-mono text-xs md:text-sm tracking-widest text-gray-400 flex-wrap">
            <span className="text-white">E-COMMERCE</span> 
            <ArrowRight className="w-4 h-4 text-vdev-gold hidden md:block" />
            <span className="text-white/80">PERSONALIZATION</span>
            <ArrowRight className="w-4 h-4 text-vdev-gold hidden md:block" />
            <span className="text-vdev-gold">AI SHOPPING</span>
            <ArrowRight className="w-4 h-4 text-vdev-gold hidden md:block" />
            <span className="text-white/40">VOICE & MEMORY</span>
          </motion.div>
        </motion.section>

      </main>

      {/* 10 — FINAL CTA */}
      <section className="py-24 px-6 md:px-16 pointer-events-auto bg-[#050505] border-t border-white/10 relative z-10 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-medium mb-12 tracking-tight">DISCOVER VISHREA STUDIO.</h2>
        
        <div className="flex flex-col sm:flex-row gap-6 mb-16">
          <a href="https://vishreastudio.in/" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden bg-vdev-gold text-black px-10 py-4 font-mono text-xs tracking-wider transition-all hover:bg-white">
            <span className="relative z-10 flex items-center justify-center gap-3 font-bold">
              VISIT VISHREASTUDIO.IN <ExternalLink className="w-4 h-4" />
            </span>
          </a>
          
          <a href="/#builds" className="group relative overflow-hidden border border-white/20 text-white px-10 py-4 font-mono text-xs tracking-wider transition-all hover:border-white/50">
            <span className="relative z-10 flex items-center justify-center gap-3">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK TO BUILDS
            </span>
          </a>
        </div>

        <footer className="w-full flex flex-col md:flex-row justify-between items-center font-mono text-[10px] tracking-[0.2em] text-gray-500 border-t border-white/10 pt-8">
          <div>© {CURRENT_YEAR} VDEV. ALL RIGHTS RESERVED.</div>
        </footer>
      </section>

    </div>
  )
}
