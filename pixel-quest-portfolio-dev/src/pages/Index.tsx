import React, { useEffect } from 'react';
import PixelNav from '@/components/PixelNav';
import PixelHero from '@/components/PixelHero';
import PixelAbout from '@/components/PixelAbout';
import PixelSkills from '@/components/PixelSkills';
import PixelContact from '@/components/PixelContact';
import PixelFooter from '@/components/PixelFooter';
import ScanlineEffect from '@/components/ScanlineEffect';
import PixelProjectTerminals from '@/components/PixelProjectTerminals';
import { Analytics } from "@vercel/analytics/react";
const Index: React.FC = () => {
  // Optional: Add pixel cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.getElementById('custom-cursor');
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      const cursor = document.getElementById('custom-cursor');
      if (cursor) {
        cursor.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1128] via-[#1e3a8a] to-[#283593] text-white overflow-x-hidden">
      {/* Custom pixel cursor */}
      <div
        id="custom-cursor"
        className="fixed w-4 h-4 bg-pixel-accent z-50 pointer-events-none opacity-0 pixelated"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <Analytics />
      <PixelNav />
      <PixelHero />    {/* Hero section (uses unified gradient internally) */}
      <PixelAbout />   {/* About section (uses unified gradient internally) */}
      <PixelSkills />  {/* Skills section (uses unified gradient internally) */}

      {/* Projects/Terminal section with unified background */}
      <section id="projects" className="relative py-20 bg-gradient-to-b from-[#1e3a8a] to-[#283593]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <PixelProjectTerminals />
        </div>
      </section>

      <PixelContact />  {/* Contact section (uses unified gradient internally) */}
      <PixelFooter />

      {/* Background grid and CRT effect overlays */}
      <div className="fixed inset-0 bg-grid opacity-5 pointer-events-none z-0"></div>
      <ScanlineEffect />
    </div>
  );
};

export default Index;
