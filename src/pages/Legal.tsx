import { Navigation } from '../components/Navigation'

export default function Legal() {
  return (
    <div className="relative w-full bg-vdev-black min-h-screen text-gray-300 font-sans selection:bg-vdev-gold selection:text-vdev-black pt-32 pb-24">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-8">
        <header className="mb-16">
          <span className="font-mono text-vdev-gold tracking-[0.5em] text-xs mb-4 block">LEGAL FRAMEWORK</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Privacy & Terms
          </h1>
          <p className="text-gray-400 font-light text-lg">
            Built for enterprise compliance and global transparency.
          </p>
        </header>

        <section className="space-y-12 text-sm md:text-base leading-relaxed font-light">
          <div>
            <h2 className="text-xl font-medium text-white mb-4">1. Data Architecture & Privacy</h2>
            <p className="mb-4">
              VDEV operates strictly within modern privacy frameworks. We don't harvest unnecessary telemetry, 
              and any data passed through our systems is secured with enterprise-grade encryption.
            </p>
            <p>
              By accessing this network, you agree to our standard session tracking necessary for 
              performance monitoring and security validation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-white mb-4">2. Terms of Operation</h2>
            <p className="mb-4">
              The engineering architectures, models, and systems designed by VDEV remain the intellectual property 
              of VDEV until project handover and deployment contracts are fulfilled.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-white mb-4">3. International Compliance</h2>
            <p>
              As a global firm operating across India, UAE, and Malaysia, our systems adhere to regional 
              data protection guidelines, ensuring safe cross-border data management for all client environments.
            </p>
          </div>
        </section>

        <div className="mt-24 pt-8 border-t border-white/10 font-mono text-xs text-gray-500 tracking-wider">
          LAST UPDATED: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
      </div>
    </div>
  )
}
