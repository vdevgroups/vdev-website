import { Navigation } from '../components/Navigation'

export default function NotFound() {
  return (
    <div className="relative w-full bg-vdev-black min-h-screen selection:bg-vdev-gold selection:text-vdev-black flex flex-col items-center justify-center text-center">
      <Navigation />
      
      <div className="z-10 px-8 flex flex-col items-center">
        <span className="font-mono text-vdev-gold tracking-[0.5em] text-xs mb-4">ERROR 404</span>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          TERRITORY UNKNOWN
        </h1>
        <p className="text-gray-400 font-mono text-sm tracking-widest max-w-md mb-8 leading-relaxed">
          The node you are looking for does not exist within the VDEV network. It may have been relocated or destroyed.
        </p>
        
        <a href="/" className="relative group overflow-hidden border border-white/20 px-8 py-3 font-mono text-xs tracking-wider transition-all hover:border-vdev-gold">
          <span className="relative z-10 group-hover:text-vdev-black transition-colors duration-300">RETURN TO ORIGIN</span>
          <div className="absolute inset-0 bg-vdev-gold transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
        </a>
      </div>
      
      {/* Dark glitchy background effect */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('/assets/images/vdevpost.png')] bg-cover bg-center mix-blend-overlay"></div>
    </div>
  )
}
