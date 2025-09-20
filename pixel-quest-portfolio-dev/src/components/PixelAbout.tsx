
import React from 'react';

const PixelAbout: React.FC = () => {
  return (
    <section id="about" className="relative py-20 bg-gradient-to-b from-[#283593] to-[#1e3a8a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300/10 via-transparent to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl hover:translate-y-[-4px] transition-all duration-300 border border-white/10">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="text-xl text-blue-200 mb-4">Software Developer</h3>
              <p className="text-blue-100/80">
                Passionate about creating elegant solutions through clean, efficient code and modern technologies.
              </p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl hover:translate-y-[-4px] transition-all duration-300 border border-white/10">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl text-blue-200 mb-4">Data Analyst</h3>
              <p className="text-blue-100/80">
                Transforming complex data into actionable insights through advanced analytics and visualization.
              </p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl hover:translate-y-[-4px] transition-all duration-300 border border-white/10">
              <div className="text-3xl mb-4">🌱</div>
              <h3 className="text-xl text-blue-200 mb-4">Continuous Learner</h3>
              <p className="text-blue-100/80">
                Always exploring new technologies and methodologies to stay at the forefront of innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PixelAbout;
