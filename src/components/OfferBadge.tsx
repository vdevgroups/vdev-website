import { openConsultation } from './ConsultationModal'

export function OfferBadge() {
  return (
    <button 
      onClick={openConsultation}
      data-cursor="pointer"
      className="inline-flex items-center gap-2 border border-vdev-gold/30 bg-vdev-gold/5 px-3 py-1.5 rounded-sm hover:bg-vdev-gold/10 transition-colors group"
    >
      <span className="w-1.5 h-1.5 bg-vdev-gold rounded-full animate-pulse shadow-[0_0_5px_rgba(200,138,61,0.5)]"></span>
      <span className="font-mono text-[9px] tracking-[0.2em] text-vdev-gold/80 group-hover:text-vdev-gold uppercase">20 MIN · NO COMMITMENT</span>
    </button>
  )
}
