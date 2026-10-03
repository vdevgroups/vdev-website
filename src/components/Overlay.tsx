import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion'
import { ArrowRight, Globe2, Cpu, Database, Blocks, Layers, Bot, Terminal, TestTube, Workflow, MonitorPlay, Mail, Phone, Lock, X, Activity, Code2, Mic, Network } from 'lucide-react'
import { OfferBadge } from './OfferBadge'
import { openConsultation } from './ConsultationModal'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

function AnimatedCounter({ end, suffix = "" }: { end: number, suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const duration = 2500;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        setCount(Math.floor(ease * end));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isInView, end]);

  return <span ref={ ref }> { count }{ suffix } </span>
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

export default function Overlay() {
  const [activeLab, setActiveLab] = useState<typeof labsData[0] | null>(null)

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeLab) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [activeLab])

  return (
    <div className= "w-full pointer-events-none text-white" >

    {/* 01 — HERO */ }
    < section className = "min-h-[100svh] w-full flex flex-col justify-between pt-40 pb-12 px-6 md:px-16 pointer-events-auto" >
      <div className="max-w-4xl" >
        <motion.div initial="hidden" animate = "visible" variants = { stagger } className = "flex flex-col items-start" >
          <motion.div variants={ fadeUp } className = "mb-8 font-mono text-[10px] tracking-[0.3em] text-gray-400 uppercase" >
            REAL PROBLEMS.REAL BUILDS.REAL PEOPLE.
            </motion.div>

              < motion.h1 variants = { fadeUp } className = "text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.05]" >
                WE BUILD < br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500" > WHAT NEEDS < br /> TO EXIST.</span>
                    </motion.h1>

                    < motion.p variants = { fadeUp } className = "text-gray-400 text-lg md:text-xl font-light max-w-xl mb-12 leading-relaxed" >
                      A builder - driven technology community creating software, AI products and real - world solutions from India to the world.
            </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
                          <button 
                            onClick={openConsultation} 
                            data-cursor="cta"
                            className="group relative overflow-hidden bg-vdev-gold text-black px-8 py-4 font-mono text-xs tracking-wider transition-all hover:bg-white inline-block"
                          >
                            <span className="relative z-10 flex items-center gap-3 font-bold uppercase">
                              Book Free Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </button>
                          <a 
                            href="/contact" 
                            data-cursor="pointer"
                            className="group relative overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md px-8 py-4 font-mono text-xs tracking-wider transition-all hover:border-white/30 inline-block"
                          >
                            <span className="relative z-10 text-white uppercase">Start Build Signal</span>
                          </a>
                          <div className="mt-2 sm:mt-0 sm:ml-2">
                            <OfferBadge />
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>

  {/* Hero Metrics */ }
  <motion.div initial={ { opacity: 0 } } animate = {{ opacity: 1 }
} transition = {{ delay: 1, duration: 1 }} className = "mt-20 border-t border-white/10 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8" >
{
  [
  { label: 'Projects', end: 15, suffix: '+' },
  { label: 'Countries', end: 3, suffix: '+' },
  { label: 'Hackathons', end: 11, suffix: '+' },
  { label: 'Commitment', end: 100, suffix: '%' }
  ].map((stat, i) => (
    <div key= { i } >
    <div className="text-3xl font-medium mb-1" >
  <AnimatedCounter end={ stat.end } suffix = { stat.suffix } />
  </div>
  < div className = "font-mono text-[10px] text-gray-500 tracking-widest uppercase" > { stat.label } </div>
  </div>
  ))
}
  </motion.div>
  </section>

{/* 02 — ABOUT */ }
<section className="py-32 px-6 md:px-16 pointer-events-auto bg-vdev-black border-t border-white/5 relative z-10" >
  <motion.div initial="hidden" whileInView = "visible" viewport = {{ once: true, margin: "-10%" }} variants = { stagger } className = "grid grid-cols-1 lg:grid-cols-12 gap-16 items-start" >
    <div className="lg:col-span-4" >
      <motion.div variants={ fadeUp } className = "font-mono text-vdev-gold mb-4 text-[10px] tracking-[0.3em]" >01 / ABOUT </motion.div>
        < motion.h2 variants = { fadeUp } className = "text-3xl md:text-5xl font-medium tracking-tight mb-6" >
          A BUILDER - DRIVEN TECHNOLOGY COMMUNITY.
            </motion.h2>
            < motion.p variants = { fadeUp } className = "text-gray-400 font-light leading-relaxed mb-8" >
              VDEV is where real - world problems meet developers, ideas and modern technology.We build for clients, experiment with AI, create our own products and bring together a community of builders.
            </motion.p>
                < motion.a href = "/about" variants = { fadeUp } className = "inline-flex items-center gap-3 font-mono text-xs tracking-widest border border-white/20 px-6 py-3 hover:border-vdev-gold transition-colors" >
                  Learn More < ArrowRight className = "w-3 h-3" />
                    </motion.a>
                    </div>

                    < div className = "lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6" >
                    {
                      [
                      { title: 'BUILD', desc: 'Real client problems. Real products. Real systems.', icon: Blocks },
                      { title: 'EXPERIMENT', desc: 'AI, agentic systems and emerging technologies.', icon: TestTube },
                      { title: 'CONNECT', desc: 'Developers, students, designers — building together.', icon: Globe2 }
                      ].map((card, i) => (
                        <motion.a href= { i === 0 ? '/builds' : i === 1 ? '/labs' : '/network'} key = { i } variants = { fadeUp } className = "block border border-white/10 bg-[#0a0a0a] p-8 hover:border-vdev-gold/30 transition-colors group" >
                          <card.icon className="w-8 h-8 text-vdev-gold mb-16 opacity-80" strokeWidth = { 1} />
                            <h3 className="text-xl font-medium mb-3" > { card.title } </h3>
                              < p className = "text-gray-500 font-light text-sm" > { card.desc } </p>
                                < div className = "mt-8 flex justify-end" >
                                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-vdev-gold group-hover:translate-x-1 transition-all" >
                                    <ArrowRight className="w-3 h-3 text-vdev-gold" />
                                      </div>
                                      </div>
                                      </motion.a>
            ))}
</div>
  </motion.div>
  </section>

      {/* 03 — SERVICES */}
      <section className="py-32 px-6 md:px-16 pointer-events-auto bg-[#080808] border-t border-white/5 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div className="max-w-2xl">
              <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-4 text-[10px] tracking-[0.3em]">02 / WHAT WE BUILD</motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-medium tracking-tight mb-6 uppercase">
                REAL PROBLEMS.<br/> REAL PRODUCTS.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-400 font-light leading-relaxed">
                We work with businesses, founders and people who have something worth solving — then turn the problem into working technology.
              </motion.p>
            </div>
            <motion.a variants={fadeUp} href="/services" className="flex items-center gap-3 font-mono text-xs tracking-widest text-vdev-gold hover:text-white transition-colors mt-8 md:mt-0 uppercase">
              See What We’re Building <ArrowRight className="w-3 h-3" />
            </motion.a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5 border border-white/5">
            {[
              { title: 'AI THAT DOES THE WORK', desc: 'Agents, automation and intelligent workflows built around real tasks.', icon: Bot },
              { title: 'SYSTEMS THAT RUN THE BUSINESS', desc: 'Platforms, dashboards and software designed around how people actually work.', icon: MonitorPlay },
              { title: 'COMMERCE BUILT AROUND PEOPLE', desc: 'E-commerce experiences, payments and business workflows.', icon: Database },
              { title: 'WORKFLOWS WITHOUT THE FRICTION', desc: 'CRM, purchasing, operations and internal tools.', icon: Workflow },
              { title: 'IDEA → PRODUCT → REALITY', desc: 'From first concept to prototype, production and iteration.', icon: Layers }
            ].map((srv, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-[#080808] p-8 hover:bg-[#0c0c0c] transition-colors group">
                <srv.icon className="w-8 h-8 text-vdev-gold mb-12" strokeWidth={1} />
                <h3 className="text-lg font-medium mb-3 pr-4 leading-snug">{srv.title}</h3>
                <p className="text-gray-500 font-light text-xs leading-relaxed">{srv.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

{/* 04 — FEATURED BUILDS */ }
<section id="builds" className = "py-32 px-6 md:px-16 pointer-events-auto bg-vdev-black border-t border-white/5 relative z-10" >
  <motion.div initial="hidden" whileInView = "visible" viewport = {{ once: true, margin: "-10%" }} variants = { stagger } >
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16" >
      <div className="max-w-xl" >
        <motion.div variants={ fadeUp } className = "font-mono text-vdev-gold mb-4 text-[10px] tracking-[0.3em]" >03 / FEATURED BUILDS </motion.div>
          < motion.h2 variants = { fadeUp } className = "text-4xl md:text-5xl font-medium tracking-tight mb-6" >
            REAL PROJECTS.< br /> REAL IMPACT.
              </motion.h2>
              < motion.p variants = { fadeUp } className = "text-gray-400 font-light leading-relaxed" >
                From local businesses to global possibilities, we build solutions that create real value.
              </motion.p>
                  </div>
                  < motion.a href = "/builds" variants = { fadeUp } className = "inline-flex items-center gap-3 font-mono text-xs tracking-widest border border-white/20 px-6 py-3 hover:border-vdev-gold transition-colors mt-8 md:mt-0" >
                    View All Builds < ArrowRight className = "w-3 h-3" />
                      </motion.a>
                      </div>

                      < div className = "grid grid-cols-1 md:grid-cols-3 gap-6" >
                      {
                        [
                        { id: '001', slug: '/builds/vanthenda-paalkaran', title: 'Vanthenda Paalkaran', tags: ['Mobile App', 'Payments', 'Real World'], desc: 'A digital platform connecting customers with milk suppliers, with subscriptions and auto-debit options.', image: '/assets/images/vandendapaalkaran.png' },
                        { id: '002', slug: '/builds/vishrea-studio', title: 'Vishrea Studio', tags: ['E-commerce', 'AI', 'Fashion'], desc: 'An e-commerce experience combining fashion discovery, personalized recommendations and a foundation for AI-powered shopping.', image: '/assets/images/vishreastudio.png' },
                        { id: '003', slug: '#', title: 'CLASSIFIED BUILD', tags: ['Encrypted', 'In Development'], desc: 'A revolutionary digital product currently under active development. Details restricted until launch.', image: '/assets/images/vdevpost.png', locked: true }
                        ].map((build, i) => (
                          <motion.div key= { i } variants = { fadeUp } className = "group border border-white/10 bg-[#050505] overflow-hidden" >
                          <a href={ build.slug } className = {`block ${build.locked ? 'cursor-not-allowed opacity-80' : ''}`} onClick = {(e) => build.locked && e.preventDefault()}>
                            {/* Image Placeholder */ }
                            < div className = "h-64 bg-[#111] relative overflow-hidden border-b border-white/10" >
                              <div className={ `absolute inset-0 opacity-40 transition-opacity duration-700 bg-contain bg-no-repeat bg-center ${build.locked ? 'blur-sm grayscale opacity-20 group-hover:opacity-30' : 'group-hover:opacity-100 group-hover:scale-105'}` } style = {{ backgroundImage: `url('${build.image}')` }} />

{
  build.locked && (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]" >
      <Lock className="w-8 h-8 text-white/20" />
        </div>
                    )
}

<div className="absolute top-4 right-4 text-xs font-mono text-vdev-gold bg-black/60 px-2 py-1 rounded backdrop-blur-sm" > BUILD { build.id } </div>
  </div>

  < div className = "p-8" >
    <h3 className={ `text-2xl font-medium mb-4 transition-colors ${build.locked ? 'text-white/50' : 'text-white group-hover:text-vdev-gold'}` }> { build.title } </h3>
      < div className = "flex flex-wrap gap-2 mb-6" >
      {
        build.tags.map(tag => (
          <span key= { tag } className = "text-[10px] font-mono text-gray-400 border border-white/10 bg-white/5 px-2 py-1" > { tag } </span>
        ))
      }
        </div>
        < p className = {`font-light text-sm leading-relaxed mb-8 h-16 ${build.locked ? 'text-gray-600' : 'text-gray-500'}`}> { build.desc } </p>

{
  build.locked ? (
    <div className= "flex items-center gap-2 font-mono text-[10px] tracking-widest text-gray-600" >
    <Lock className="w-3 h-3" /> UNLOCKING SOON
      </div>
                    ) : (
    <div className= "flex items-center gap-2 font-mono text-[10px] tracking-widest text-vdev-gold" >
    VIEW PROJECT < ArrowRight className = "w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </div>
                    )
}
</div>
  </a>
  </motion.div>
            ))}
</div>
  </motion.div>
  </section>

{/* 04 — ENGINEERING */ }
<section className="py-32 px-6 md:px-16 pointer-events-auto bg-[#050505] border-t border-white/5 relative z-10 overflow-hidden" >
  {/* Engineering Grid Blueprint Background */ }
  < div className = "absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" > </div>

    < motion.div initial = "hidden" whileInView = "visible" viewport = {{ once: true, margin: "-10%" }} variants = { stagger } className = "max-w-6xl mx-auto relative z-10" >

      <div className="mb-24 text-center md:text-left" >
        <motion.div variants={ fadeUp } className = "font-mono text-vdev-gold mb-6 text-[10px] tracking-[0.3em] flex items-center justify-center md:justify-start gap-3" >
          <span className="w-8 h-px bg-vdev-gold" > </span> 04 / ENGINEERING
            </motion.div>
            < motion.h2 variants = { fadeUp } className = "text-4xl md:text-6xl font-medium tracking-tight mb-8 leading-tight" >
              FROM PROBLEM < br />
                <span className="text-gray-500" > TO PRODUCTION.</span>
                  </motion.h2>
                  < motion.p variants = { fadeUp } className = "text-gray-400 font-light leading-relaxed max-w-lg text-sm md:text-base border-l border-vdev-gold/30 pl-5" >
                    A forward - deployed engineering approach built around real problems, real systems and measurable outcomes.
            </motion.p>
                      </div>

                      < div className = "relative mt-24 md:mt-32" >
                        {/* The Cinematic Gold Path */ }
                        < div className = "absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" >
                          {/* Glowing Gold Signal */ }
                          < div className = "absolute top-1/4 bottom-1/4 left-0 w-full bg-vdev-gold/40 blur-[3px]" > </div>
                            < div className = "absolute top-[30%] bottom-[30%] left-0 w-full bg-vdev-gold blur-[1px]" > </div>
                              </div>

{
  [
    { step: '01', id: 'PROBLEM', title: 'DISCOVER', desc: 'Understand the business, users, constraints and actual problem.', icon: Workflow, visual: <div className="grid grid-cols-2 gap-2"><div className="h-1 w-12 bg-white/10 rounded-full"></div><div className="h-1 w-6 bg-vdev-gold/40 rounded-full"></div><div className="h-1 w-16 bg-white/20 rounded-full"></div><div className="h-1 w-8 bg-vdev-gold rounded-full"></div></div> },
    { step: '02', id: 'ARCHITECTURE', title: 'ARCHITECT', desc: 'Design the system, architecture, technology and execution strategy.', icon: Layers, visual: <div className="flex flex-col gap-2 w-full px-4"><div className="h-4 w-full border border-vdev-gold/40 bg-vdev-gold/5"></div><div className="h-4 w-3/4 border border-white/10 bg-white/5 mx-auto"></div><div className="h-4 w-1/2 border border-white/5 bg-black mx-auto"></div></div> },
    { step: '03', id: 'SYSTEM', title: 'ENGINEER', desc: 'Build, integrate, test and iterate with continuous feedback.', icon: Terminal, visual: <div className="font-mono text-[8px] text-gray-500 leading-relaxed text-left w-full px-4">const sys = new App();<br /> <span className="text-vdev-gold">sys.mount()</span><br /> sys.integrate()<br /> <span className="animate-pulse">_</span></div> },
    { step: '04', id: 'DEPLOYMENT', title: 'DEPLOY', desc: 'Ship to production, integrate with real infrastructure and validate.', icon: Globe2, visual: <div className="w-12 h-12 rounded-full border border-vdev-gold/20 flex items-center justify-center relative"><div className="absolute inset-0 rounded-full border border-vdev-gold/40 animate-ping opacity-50"></div><div className="w-4 h-4 bg-vdev-gold/80 rounded-full blur-[2px]"></div></div> },
    { step: '05', id: 'EVOLUTION', title: 'EVOLVE', desc: 'Monitor, improve, automate and scale as the business grows.', icon: Cpu, visual: <div className="flex items-end justify-center gap-1.5 h-10 w-full"><div className="w-1.5 bg-white/10 h-1/3"></div><div className="w-1.5 bg-white/20 h-1/2"></div><div className="w-1.5 bg-vdev-gold/30 h-3/4"></div><div className="w-1.5 bg-vdev-gold h-full"></div><div className="w-1.5 bg-vdev-gold/60 h-2/3"></div></div> }
  ].map((item, i) => (
      <motion.div key= { i } variants = { fadeUp } className = "relative flex flex-col md:flex-row items-center md:justify-center gap-8 md:gap-0 mb-32 last:mb-0" >

      {/* Center Node on the Line */ }
      < div className = "absolute left-6 md:left-1/2 w-4 h-4 bg-[#050505] border-2 border-vdev-gold rounded-full -translate-x-1/2 z-10 flex items-center justify-center" >
      <div className="w-1 h-1 bg-white rounded-full animate-pulse" > </div>
    < div className = "absolute inset-0 bg-vdev-gold/30 animate-ping rounded-full blur-[2px]" > </div>
    </div>

                {/* Left Side (Empty on Odd, Content on Even) */ }
      < div className = "hidden md:flex w-1/2 pr-20 justify-end text-right" >
        { i % 2 === 0 ? (
          <div className= "w-full max-w-[320px] group" >
      <div className="font-mono text-[9px] tracking-[0.4em] text-vdev-gold/60 mb-4" > { item.id } </div>
    < div className = "flex items-center justify-end gap-5 mb-4" >
    <h3 className="text-2xl font-medium tracking-wide text-white group-hover:text-vdev-gold transition-colors" > { item.title } </h3>
    < span className = "font-mono text-[10px] text-white/20 border border-white/10 px-2 py-1 rounded bg-white/5" > { item.step } </span>
    </div>
    < p className = "text-gray-500 font-light text-sm leading-relaxed" > { item.desc } </p>
    </div>
    ) : (
      <div className= "w-48 h-32 border border-white/5 bg-white/[0.01] flex items-center justify-center p-6 relative overflow-hidden group hover:border-vdev-gold/20 hover:bg-vdev-gold/[0.02] transition-all duration-500 ml-auto" >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" > </div>
        < div className = "absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" > </div>
          < item.icon className = "absolute top-3 right-3 w-3 h-3 text-white/5 group-hover:text-vdev-gold/30 transition-colors" />
            { item.visual }
            </div>
                  )
  }
  </div>

  {/* Right Side (Content on Odd, Visual on Even) */ }
  <div className="hidden md:flex w-1/2 pl-20 justify-start text-left" >
    { i % 2 !== 0 ? (
      <div className= "w-full max-w-[320px] group" >
  <div className="font-mono text-[9px] tracking-[0.4em] text-vdev-gold/60 mb-4" > { item.id } </div>
    < div className = "flex items-center justify-start gap-5 mb-4" >
      <span className="font-mono text-[10px] text-white/20 border border-white/10 px-2 py-1 rounded bg-white/5" > { item.step } </span>
        < h3 className = "text-2xl font-medium tracking-wide text-white group-hover:text-vdev-gold transition-colors" > { item.title } </h3>
          </div>
          < p className = "text-gray-500 font-light text-sm leading-relaxed" > { item.desc } </p>
            </div>
                  ) : (
    <div className= "w-48 h-32 border border-white/5 bg-white/[0.01] flex items-center justify-center p-6 relative overflow-hidden group hover:border-vdev-gold/20 hover:bg-vdev-gold/[0.02] transition-all duration-500 mr-auto" >
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" > </div>
      < div className = "absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" > </div>
        < item.icon className = "absolute top-3 right-3 w-3 h-3 text-white/5 group-hover:text-vdev-gold/30 transition-colors" />
          { item.visual }
          </div>
                  )
}
</div>

{/* Mobile View (Stacked, Line on the left) */ }
<div className="md:hidden w-full pl-16 flex flex-col gap-8" >
  <div className="w-full group" >
    <div className="font-mono text-[9px] tracking-[0.4em] text-vdev-gold/60 mb-3" > { item.id } </div>
      < div className = "flex items-center justify-start gap-4 mb-3" >
        <span className="font-mono text-[10px] text-white/20 border border-white/10 px-2 py-1 rounded bg-white/5" > { item.step } </span>
          < h3 className = "text-xl font-medium tracking-wide text-white" > { item.title } </h3>
            </div>
            < p className = "text-gray-500 font-light text-sm leading-relaxed" > { item.desc } </p>
              </div>
              < div className = "w-full h-32 border border-white/5 bg-white/[0.02] flex items-center justify-center relative overflow-hidden" >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" > </div>
                  < div className = "absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" > </div>
                    < item.icon className = "absolute top-3 right-3 w-3 h-3 text-white/5" />
                      { item.visual }
                      </div>
                      </div>

                      </motion.div>
            ))}
</div>
  </motion.div>
  </section>

      {/* 06 — VDEV LABS */}
      <section className="py-32 px-6 md:px-16 pointer-events-auto bg-vdev-black border-t border-white/5 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-6 text-[10px] tracking-[0.3em] flex items-center gap-4">
                <Activity className="w-4 h-4 animate-pulse" />
                VDEV LABS
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-none uppercase">
                WHERE IDEAS <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600">BECOME EXPERIMENTS.</span>
              </motion.h2>
            </div>
            
            <motion.div variants={fadeUp} className="max-w-md">
              <p className="text-gray-400 font-light leading-relaxed mb-6">
                “We explore emerging technology by building working prototypes, testing ideas and turning useful experiments into real products.”
              </p>
              <a href="/labs" className="inline-flex items-center gap-3 font-mono text-xs tracking-widest text-vdev-gold hover:text-white transition-colors group">
                ENTER FULL LABS <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {labsData.map((lab) => (
              <motion.div 
                key={lab.id} 
                variants={fadeUp} 
                onClick={() => setActiveLab(lab)}
                className="bg-[#050505] p-8 group hover:bg-[#0a0a0a] cursor-pointer transition-all duration-500 relative flex flex-col h-full overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-vdev-gold to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
                <div className="flex justify-between items-start mb-10">
                  <lab.icon strokeWidth={1} className="w-10 h-10 text-white/30 group-hover:text-vdev-gold group-hover:scale-110 transition-all duration-500" />
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
          </div>
        </motion.div>

        {/* Cinematic Modal for Labs Section */}
        <AnimatePresence>
          {activeLab && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 pointer-events-auto"
            >
              <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={() => setActiveLab(null)}></div>
              
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
      </section>

{/* 07 — GLOBAL VISION (transparent to show 3D Earth) */ }
<section className="h-[120vh] w-full flex items-center justify-center px-6 md:px-16 pointer-events-none text-center" >
  <motion.div initial="hidden" whileInView = "visible" viewport = {{ once: true, margin: "-20%" }} variants = { stagger } className = "max-w-4xl pointer-events-auto" >
    <motion.div variants={ fadeUp } className = "font-mono text-vdev-gold mb-6 text-[10px] tracking-[0.5em]" >09 / GLOBAL VISION </motion.div>
      < motion.h2 variants = { fadeUp } className = "text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8" >
        BUILT IN INDIA.< br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600" > SOLVING FOR THE WORLD.</span>
            </motion.h2>
            < motion.p variants = { fadeUp } className = "text-gray-400 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto" >
              We combine global standards with local innovation to create technology that makes a real difference — from India to everywhere.
          </motion.p>

                <motion.div variants={fadeUp} className="font-mono text-xs tracking-[0.3em] text-white flex flex-col sm:flex-row items-center justify-center gap-4">
                  <span>TAMIL NADU</span> <ArrowRight className="w-3 h-3 text-vdev-gold hidden sm:block" />
                  <span>INDIA</span> <ArrowRight className="w-3 h-3 text-vdev-gold hidden sm:block" />
                  <span>EVERYWHERE</span>
                </motion.div>
              </motion.div>
            </section>

{/* 07.5 — CURRENT OPPORTUNITIES */}
      <section className="py-24 px-6 md:px-16 pointer-events-auto bg-[#080808] border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger}>
            <motion.div variants={fadeUp} className="font-mono text-vdev-gold mb-8 text-[10px] tracking-[0.3em]">VDEV / OPEN BUILDS</motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
              <motion.div variants={fadeUp} className="bg-[#020202] p-8 md:p-12 hover:bg-[#050505] transition-colors relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-vdev-gold/30 group-hover:bg-vdev-gold transition-colors"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <div className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">STATUS: ACTIVE</div>
                </div>
                <h3 className="text-2xl font-medium tracking-tight mb-4">Free Build Consultation</h3>
                <p className="text-gray-400 font-light text-sm mb-8 leading-relaxed">
                  20-minute conversation about your product, software, AI or automation idea.
                </p>
                <button onClick={openConsultation} data-cursor="cta" className="font-mono text-[10px] tracking-widest text-vdev-gold hover:text-white transition-colors uppercase flex items-center gap-2">
                  Book Free Consultation <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-[#020202] p-8 md:p-12 hover:bg-[#050505] transition-colors relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10 group-hover:bg-white/30 transition-colors"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-vdev-gold/50"></div>
                  <div className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">STATUS: SELECTIVE</div>
                </div>
                <h3 className="text-2xl font-medium tracking-tight mb-4">Early Build Program</h3>
                <p className="text-gray-400 font-light text-sm mb-8 leading-relaxed">
                  For selected early-stage ideas and promising projects, VDEV may offer a reduced-cost prototype or collaborative build arrangement.
                </p>
                <a href="/contact" data-cursor="pointer" className="font-mono text-[10px] tracking-widest text-white/50 hover:text-white transition-colors uppercase flex items-center gap-2">
                  Discuss Your Idea <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

{/* FOOTER */ }
<section className="py-24 px-6 md:px-16 pointer-events-auto bg-[#050505] border-t border-white/10 relative z-10 flex flex-col items-center text-center" >
  <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 uppercase" > 
    HAVE A PROBLEM<br/>WORTH BUILDING AROUND?
  </h2>
  <p className="text-gray-400 font-light text-base md:text-lg mb-12">
    Tell us what's broken.<br/>We'll figure out what it could become.
  </p>

  <div className="flex flex-col sm:flex-row gap-4 mb-8">
    <a href="/contact" data-cursor="pointer" className="group relative overflow-hidden bg-white text-black px-10 py-4 font-mono text-xs tracking-wider transition-all hover:bg-vdev-gold inline-flex justify-center">
      <span className="relative z-10 flex items-center gap-3 font-bold uppercase">
        START BUILD SIGNAL <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </a>
    <button onClick={openConsultation} data-cursor="cta" className="group relative overflow-hidden border border-white/20 bg-transparent text-white px-10 py-4 font-mono text-xs tracking-wider transition-all hover:border-vdev-gold hover:text-vdev-gold inline-flex justify-center">
      <span className="relative z-10 flex items-center gap-3 uppercase">
        BOOK FREE CONSULTATION
      </span>
    </button>
  </div>

  <div className="font-mono text-[10px] tracking-[0.2em] text-vdev-gold/60 uppercase mb-16">
    20 min · No commitment · India → Everywhere
  </div>

          < div className = "flex flex-col md:flex-row gap-6 mb-16 font-mono text-[10px] tracking-widest text-gray-400 uppercase" >
            <a href="mailto:vdevgroups@gmail.com" className = "flex items-center gap-2 hover:text-vdev-gold transition-colors" >
              <Mail className="w-3 h-3" /> vdevgroups@gmail.com
</a>
  < span className = "hidden md:inline text-white/20" >| </span>
    < a href = "tel:+919345671593" className = "flex items-center gap-2 hover:text-vdev-gold transition-colors" >
      <Phone className="w-3 h-3" /> +91 93456 71593
        </a>
        </div>

        < footer className = "w-full flex flex-col md:flex-row justify-between items-center font-mono text-[10px] tracking-[0.2em] text-gray-500 border-t border-white/10 pt-8" >
          <div>© { CURRENT_YEAR } VDEV.ALL RIGHTS RESERVED.</div>
            < div className = "flex items-center gap-6 mt-4 md:mt-0" >
              <a href="/legal" className = "hover:text-vdev-gold transition-colors" > LEGAL </a>
                < a href = "https://www.instagram.com/vdev.ai?stkn=YnZkM2U1aGhia2x5" target = "_blank" rel = "noopener noreferrer" className = "flex items-center gap-2 hover:text-vdev-gold transition-colors" >
                  INSTAGRAM
                  </a>
                  </div>
                  </footer>
                  </section>

                  </div>
  )
}
