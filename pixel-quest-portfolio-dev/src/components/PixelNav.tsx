
import React, { useState } from 'react';

const PixelNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#1e2b7a] text-white p-4 sticky top-0 z-50 border-b border-blue-400/20">
      <div className="container flex justify-between items-center">
        <div className="text-lg tracking-wider">
          {/* <span className="text-blue-400">&lt;</span> */}
          Shweta Patel
          {/* <span className="text-blue-400">/&gt;</span> */}
        </div>
        
        <button 
          className="md:hidden px-3 py-2 border border-blue-400/30 text-blue-200 hover:bg-[#2a367d] rounded transition-colors" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Menu
        </button>
        
        <div className="hidden md:flex space-x-8">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-blue-200 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#1e2b7a] border-t border-blue-400/20 md:hidden">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="block py-3 px-4 text-blue-200 hover:bg-[#2a367d] border-b border-blue-400/10"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default PixelNav;
