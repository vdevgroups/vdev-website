import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorText, setCursorText] = useState('')
  const [cursorType, setCursorType] = useState('default')
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  // Track trail elements
  const [trails, setTrails] = useState<{id: number, x: number, y: number}[]>([])
  const trailCount = useRef(0)

  useEffect(() => {
    // Disable on mobile/touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    setIsVisible(true)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Add trail
      if (Math.random() > 0.5) { // Throttle trail creation
        const id = trailCount.current++
        setTrails(prev => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }])
        setTimeout(() => {
          setTrails(prev => prev.filter(t => t.id !== id))
        }, 300)
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const clickable = target.closest('a, button, [role="button"], input, select, textarea')
      const cursorTarget = target.closest('[data-cursor]') as HTMLElement

      if (cursorTarget) {
        setCursorType(cursorTarget.dataset.cursor || 'default')
        setCursorText(cursorTarget.dataset.cursorText || '')
      } else if (clickable) {
        setCursorType('link')
        setCursorText('')
      } else {
        setCursorType('default')
        setCursorText('')
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  if (!isVisible) return null

  const variants = {
    default: {
      width: 24,
      height: 24,
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      rotate: 0,
    },
    link: {
      width: 48,
      height: 48,
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      rotate: 45,
    },
    cta: {
      width: 64,
      height: 64,
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      rotate: 90,
    },
    text: {
      width: 100,
      height: 100,
      x: mousePosition.x - 50,
      y: mousePosition.y - 50,
      rotate: 0,
    }
  }

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body {
            cursor: none;
          }
          a, button, [role="button"], input, select, textarea, [data-cursor] {
            cursor: none;
          }
        }
      `}</style>
      
      {/* Trails */}
      {trails.map(trail => (
        <motion.div
          key={trail.id}
          initial={{ opacity: 0.5, scale: 0.5 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 w-1 h-1 bg-vdev-gold rounded-full pointer-events-none z-[9998]"
          style={{ x: trail.x - 2, y: trail.y - 2 }}
        />
      ))}

      {/* Click Effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            initial={{ width: 10, height: 10, opacity: 1, x: mousePosition.x - 5, y: mousePosition.y - 5 }}
            animate={{ width: 60, height: 60, opacity: 0, x: mousePosition.x - 30, y: mousePosition.y - 30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 border border-vdev-gold pointer-events-none z-[9999] rotate-45"
          />
        )}
      </AnimatePresence>

      {/* Main Cursor (HUD Style) */}
      <motion.div
        animate={cursorType === 'default' ? 'default' : cursorType === 'text' ? 'text' : cursorType === 'cta' ? 'cta' : 'link'}
        variants={variants}
        transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.1 }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 border border-vdev-gold/40 transition-all duration-300" 
             style={{ 
               borderRadius: cursorType === 'default' ? '0' : '50%',
               scale: cursorType === 'default' ? 0.3 : 1
             }} 
        />
        
        {cursorType !== 'default' && (
          <>
            <div className="absolute top-0 w-[2px] h-2 bg-vdev-gold" />
            <div className="absolute bottom-0 w-[2px] h-2 bg-vdev-gold" />
            <div className="absolute left-0 h-[2px] w-2 bg-vdev-gold" />
            <div className="absolute right-0 h-[2px] w-2 bg-vdev-gold" />
          </>
        )}

        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[8px] font-mono text-vdev-gold tracking-widest uppercase text-center leading-tight whitespace-pre-line absolute -bottom-6"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Small dot always in center */}
      <motion.div
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
          scale: isClicking ? 0 : 1
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-1 h-1 bg-vdev-gold rounded-full pointer-events-none z-[10000] shadow-[0_0_5px_#c88a3d]"
      />
    </>
  )
}
