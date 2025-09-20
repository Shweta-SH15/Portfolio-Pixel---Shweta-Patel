
import React from 'react';

const PixelFooter: React.FC = () => {
  return (
    <footer className="relative py-12 bg-[#0a1128] border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-300/5 via-transparent to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-2xl">
              <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">Shweta</span>
              <span className="text-white"> Patel</span>
            </span>
          </div>
          
          <p className="text-blue-200/80 mb-8">
            Software Developer & Data Analyst
          </p>
          
          <div className="text-sm text-blue-200/60">
            © {new Date().getFullYear()} Shweta Patel. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PixelFooter;
