import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Lenis from '@studio-freight/lenis'
import Scene from '../components/Scene'
import Overlay from '../components/Overlay'
import { Navigation } from '../components/Navigation'
import { SEO } from '../components/SEO'

export default function Home() {
  const [bgOpacity, setBgOpacity] = useState(0.8)

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

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const r1 = maxScroll > 0 ? window.scrollY / maxScroll : 0
      
      // Fade out the static background right as the user hits the Global Vision section (~70% scroll)
      // This leaves a pure black background for the 3D CinematicEarth to emerge into.
      const opacity = r1 > 0.75 ? 0 : r1 > 0.65 ? 0.8 * (1 - (r1 - 0.65) / 0.1) : 0.8
      setBgOpacity(opacity)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      lenis.destroy()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="relative w-full bg-[#020202] min-h-screen selection:bg-vdev-gold selection:text-black">
      <SEO 
        title="VDEV — AI, Software & Digital Products from India"
        description="VDEV is a builder-driven technology community from India creating AI, software and digital products for real-world problems and businesses worldwide."
        keywords="VDEV, software development India, AI development India, AI product development India, custom software development India, custom software development UAE, software development Malaysia"
        url="https://vdev.ai"
        image="/vdevpost.png"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://vdev.ai/#website",
              "url": "https://vdev.ai/",
              "name": "VDEV",
              "description": "Premium software engineering, AI solutions, and digital products.",
              "publisher": {
                "@id": "https://vdev.ai/#organization"
              },
              "inLanguage": "en-US"
            },
            {
              "@type": "Organization",
              "@id": "https://vdev.ai/#organization",
              "name": "VDEV",
              "url": "https://vdev.ai/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://vdev.ai/vdevfav.png",
                "width": 512,
                "height": 512
              },
              "sameAs": [
                "https://www.instagram.com/vdev.ai"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-93456-71593",
                "contactType": "customer service",
                "email": "vdevgroups@gmail.com",
                "areaServed": "IN, Worldwide",
                "availableLanguage": ["English", "Tamil"]
              },
              "description": "VDEV is an elite software engineering and AI development agency built in India, solving complex problems for the world."
            },
            {
              "@type": "ProfessionalService",
              "@id": "https://vdev.ai/#service",
              "name": "VDEV Engineering",
              "url": "https://vdev.ai/",
              "image": "https://vdev.ai/vdevpost.png",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "IN"
              },
              "priceRange": "$$$"
            }
          ]
        }}
      />
      {/* Cinematic Image Background - Fades out dynamically to reveal the 3D globe below */}
      <div 
        className="fixed inset-0 z-0 bg-[url('/bg-earth.png')] bg-cover bg-center bg-no-repeat pointer-events-none transition-opacity duration-150" 
        style={{ opacity: bgOpacity }} 
      />
      {/* Gradient to smoothly transition into the dark content sections below */}
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-[#020202] pointer-events-none transition-opacity duration-150" 
        style={{ opacity: bgOpacity }}
      />
      
      <Navigation />
      
      {/* 3D Effects Layer (Sparkles/Light/Globe) */}
      <div className="fixed inset-0 z-1 pointer-events-none">
        <Canvas shadows gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 10], fov: 35 }}>
          <Scene />
        </Canvas>
      </div>

      {/* HTML Content Overlay */}
      <div className="relative z-10">
        <Overlay />
      </div>
    </div>
  )
}
