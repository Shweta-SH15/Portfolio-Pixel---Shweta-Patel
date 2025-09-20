import React from 'react';
import { ArrowRight } from 'lucide-react';

const PixelHero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[#0a1128]">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/816eab2a-dee0-4043-84d3-c2afad314f02.png')] opacity-50 bg-cover bg-center mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128] via-[#1e3a8a]/90 to-[#283593]/80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Software Developer & <br />
            <span className="text-blue-400">Data Analyst</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-200 mb-12 max-w-2xl">
            Turning complex problems into elegant solutions through code and data analysis.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <a 
              href="#projects" 
              className="group flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white px-8 py-4 rounded-full transition-all"
            >
              View Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#contact" 
              className="flex items-center gap-2 bg-[#2a367d] hover:bg-[#2e3d8d] text-blue-200 hover:text-white px-8 py-4 rounded-full transition-all"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PixelHero;
