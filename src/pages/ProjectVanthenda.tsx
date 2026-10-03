import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import { ArrowRight, ArrowLeft, Smartphone, Database, LayoutDashboard, Users, Workflow, Bot, MessageSquare } from 'lucide-react'
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

export default function ProjectVanthenda() {
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

    // Scroll to top on mount
    window.scrollTo(0, 0)

    return () => lenis.destroy()
  }, [])

  return (
    <div className="relative w-full bg-[#020202] text-white min-h-screen selection:bg-vdev-gold selection:text-black font-sans">
      <SEO 
        title="Vanthenda Paalkaran — Mobile App & Logistics | VDEV Projects"
        description="A digital platform connecting customers with milk suppliers, featuring subscriptions, real-time routing, and auto-debit payments."
        keywords="Vanthenda Paalkaran, milk delivery app, logistics software, subscription payments, AI routing, mobile app development, VDEV"
        url="https://vdev.ai/builds/vanthenda-paalkaran"
        image="/assets/images/vandendapaalkaran.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Vanthenda Paalkaran",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "iOS, Android, Web",
          "publisher": {
            "@type": "Organization",
            "name": "VDEV",
            "url": "https://vdev.ai"
          },
          "description": "Digitizing every drop. Empowering every delivery. A complete ecosystem for milk delivery management."
        }}
      />
      <Navigation />

      <main className="pt-32 md:pt-40 pb-24 px-6 md:px-16 max-w-[1400px] mx-auto">
        
        {/* HERO SECTION */}
        <motion.section initial="hidden" animate="visible" variants={stagger} className="mb-24">
          <motion.div variants={fadeUp} className="mb-8">
            <a href="/builds" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-gray-500 hover:text-vdev-gold transition-colors uppercase">
              <ArrowLeft className="w-3 h-3" /> Back to Builds
            </a>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-16">
            <div>
              <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-6 text-[10px] tracking-[0.3em]">BUILD 001</motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
                Vanthenda <br/>Paalkaran
              </motion.h1>
              <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl text-gray-400 font-medium tracking-wide mb-8">
                வந்தேன்டா பால்காரன்
              </motion.h2>
            </div>
            
            <motion.div variants={fadeUp} className="pb-2">
              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                A digital platform designed to digitize recurring local milk-delivery businesses while preserving the familiar milk-card experience.
              </p>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="w-full bg-[#050505] border border-white/10 relative overflow-hidden rounded-sm">
            <img src="/assets/images/vandendapaalkaran.png" alt="Vanthenda Paalkaran Project" className="w-full h-auto opacity-90 block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-80 pointer-events-none" />
          </motion.div>
        </motion.section>

        {/* OVERVIEW & STORY */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 border-t border-white/5 pt-16">
          <motion.div variants={fadeUp}>
            <div className="font-mono text-vdev-gold mb-4 text-[10px] tracking-[0.3em]">THE PROBLEM</div>
            <h3 className="text-3xl font-medium tracking-tight mb-6">Manual chaos.</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Traditional milk vendors often depend on manual delivery records, milk cards, billing, payment collection and customer tracking. This creates inefficiencies, disputes over bills, and makes it incredibly difficult to scale or optimize delivery routes.
            </p>
          </motion.div>
          
          <motion.div variants={fadeUp}>
            <div className="font-mono text-vdev-gold mb-4 text-[10px] tracking-[0.3em]">THE VISION</div>
            <h3 className="text-3xl font-medium tracking-tight mb-6">A recurring OS.</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              A recurring-delivery operating system beginning with milk and designed to eventually support other local recurring services like water, newspaper, laundry, grocery, and other subscription commerce. We digitize local vendors without disrupting their workflow, improving accuracy and trust.
            </p>
          </motion.div>
        </motion.section>

        {/* TECHNOLOGY STACK */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="mb-32">
          <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-8 text-[10px] tracking-[0.3em] text-center">TECHNOLOGY ARCHITECTURE</motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {['Flutter', 'Material 3', 'Riverpod', 'GoRouter', 'Supabase', 'PostgreSQL', 'Supabase Storage', 'Firebase Cloud Messaging', 'Razorpay', 'Google Maps', 'Hive', 'Supabase Auth / OTP', 'English + Tamil Localization'].map((tech) => (
              <span key={tech} className="border border-white/10 bg-[#080808] px-4 py-2 font-mono text-[10px] tracking-wider text-gray-300 hover:border-vdev-gold/50 transition-colors">
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.section>

        {/* PRODUCT FEATURES */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="mb-32 border-t border-white/5 pt-32">
          <div className="mb-16">
            <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-4 text-[10px] tracking-[0.3em]">ECOSYSTEM</motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-medium tracking-tight">Product Features</motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {/* Vendor */}
            <motion.div variants={fadeUp} className="bg-[#080808] p-8">
              <LayoutDashboard className="w-6 h-6 text-vdev-gold mb-8" strokeWidth={1} />
              <h3 className="text-xl font-medium mb-6">Vendor Platform</h3>
              <ul className="space-y-3 font-light text-sm text-gray-400">
                {['Customer Management', 'Milk Type Configuration', 'Delivery Tracking', 'Digital Milk Card', 'Billing & PDF Invoices', 'Payments & Reports', 'Analytics & Notifications', 'Business Profile & Settings'].map(f => (
                  <li key={f} className="flex items-start gap-2"><span className="text-vdev-gold mt-1">·</span> {f}</li>
                ))}
              </ul>
            </motion.div>

            {/* Customer */}
            <motion.div variants={fadeUp} className="bg-[#080808] p-8">
              <Smartphone className="w-6 h-6 text-vdev-gold mb-8" strokeWidth={1} />
              <h3 className="text-xl font-medium mb-6">Customer App</h3>
              <ul className="space-y-3 font-light text-sm text-gray-400">
                {['Today\'s Delivery Status', 'Digital Milk Card', 'Monthly Bills', 'Payment History', 'Vacation Requests', 'Extra Milk Requests', 'Notifications & Support', 'Profile Management'].map(f => (
                  <li key={f} className="flex items-start gap-2"><span className="text-vdev-gold mt-1">·</span> {f}</li>
                ))}
              </ul>
            </motion.div>

            {/* Staff */}
            <motion.div variants={fadeUp} className="bg-[#080808] p-8">
              <Users className="w-6 h-6 text-vdev-gold mb-8" strokeWidth={1} />
              <h3 className="text-xl font-medium mb-6">Staff Application</h3>
              <ul className="space-y-3 font-light text-sm text-gray-400">
                {['Today\'s Deliveries', 'Customer Navigation', 'Delivery Status Updates', 'Completion Tracking'].map(f => (
                  <li key={f} className="flex items-start gap-2"><span className="text-vdev-gold mt-1">·</span> {f}</li>
                ))}
              </ul>
            </motion.div>

            {/* Platform */}
            <motion.div variants={fadeUp} className="bg-[#080808] p-8">
              <Database className="w-6 h-6 text-vdev-gold mb-8" strokeWidth={1} />
              <h3 className="text-xl font-medium mb-6">Core Infrastructure</h3>
              <ul className="space-y-3 font-light text-sm text-gray-400">
                {['Authentication', 'Automated Billing', 'Payment Processing', 'Real-time Notifications', 'System Analytics', 'Offline Sync', 'Support Infrastructure'].map(f => (
                  <li key={f} className="flex items-start gap-2"><span className="text-vdev-gold mt-1">·</span> {f}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* USER JOURNEYS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="mb-32">
          <div className="mb-16">
            <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-4 text-[10px] tracking-[0.3em]">WORKFLOWS</motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-medium tracking-tight">User Journeys</motion.h2>
          </div>

          <div className="space-y-12">
            {[
              { role: 'VENDOR', steps: ['Login', 'Dashboard', 'Customer', 'Milk Type', 'Daily Delivery', 'Monthly Bill', 'Payment', 'Reports', 'Analytics'] },
              { role: 'CUSTOMER', steps: ['Phone Login', 'OTP', 'Dashboard', 'Milk Card', 'Bills', 'Payments', 'Vacation / Extra Milk', 'Notifications'] },
              { role: 'STAFF', steps: ['Login', 'Today\'s Route', 'Customer List', 'Delivery Entry', 'Completion'] },
            ].map((journey, i) => (
              <motion.div key={i} variants={fadeUp} className="border border-white/10 bg-[#050505] p-8">
                <div className="font-mono text-vdev-gold mb-6 text-xs tracking-[0.2em]">{journey.role}</div>
                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                  {journey.steps.map((step, j) => (
                    <div key={j} className="flex items-center gap-2 md:gap-4">
                      <div className="font-light text-sm text-gray-300">{step}</div>
                      {j < journey.steps.length - 1 && <ArrowRight className="w-3 h-3 text-white/20" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* AI & FUTURE */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="mb-32 border-y border-white/5 py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-[#080808] px-8 md:px-16 -mx-6 md:-mx-16">
          <motion.div variants={fadeUp}>
            <div className="font-mono text-vdev-gold mb-4 text-[10px] tracking-[0.3em]">ROADMAP</div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">The AI Evolution.</h2>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              AI is designed as an evolution of the product, not just a feature. Placed logically after the Vendor MVP, Customer Portal, Payments, and Notifications are solidified, the roadmap moves toward true intelligence.
            </p>
            <div className="flex flex-col gap-4 font-mono text-xs tracking-widest text-gray-300">
              <div className="flex items-center gap-4"><Workflow className="w-4 h-4 text-vdev-gold" /> AI-Powered Delivery & Business Assistance</div>
              <div className="flex items-center gap-4"><Workflow className="w-4 h-4 text-vdev-gold" /> System Automation</div>
              <div className="flex items-center gap-4"><Workflow className="w-4 h-4 text-vdev-gold" /> Enterprise Capabilities</div>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="aspect-square bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/assets/images/bg-earth.png')] bg-cover bg-center opacity-20 mix-blend-lighten" />
            <Bot className="w-24 h-24 text-vdev-gold opacity-50 relative z-10" strokeWidth={0.5} />
          </motion.div>
        </motion.section>

        {/* USER FEEDBACK */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="mb-32 text-center py-16">
          <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-4 text-[10px] tracking-[0.3em]">VALIDATION</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-medium tracking-tight mb-8">User Feedback</motion.h2>
          <motion.div variants={fadeUp} className="max-w-2xl mx-auto border border-white/10 bg-[#050505] p-12">
            <MessageSquare className="w-8 h-8 text-white/20 mx-auto mb-6" strokeWidth={1} />
            <p className="text-gray-500 font-light italic">
              User feedback will be added as the product is deployed and tested.
            </p>
          </motion.div>
        </motion.section>

      </main>

      {/* FINAL CTA */}
      <section className="py-24 px-6 md:px-16 pointer-events-auto bg-[#050505] border-t border-white/10 relative z-10 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-medium mb-12 tracking-tight">BUILDING THE NEXT<br/>EVERYDAY SYSTEM.</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
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
        </div>

        <footer className="w-full flex flex-col md:flex-row justify-between items-center font-mono text-[10px] tracking-[0.2em] text-gray-500 border-t border-white/10 pt-8">
          <div>© {CURRENT_YEAR} VDEV. ALL RIGHTS RESERVED.</div>
        </footer>
      </section>

    </div>
  )
}
