
import React, { useState } from 'react';

interface Skill {
  name: string;
  category: 'languages' | 'web' | 'database' | 'devops';
  level: number;
  icon: string;
}

const PixelSkills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'languages' | 'web' | 'database' | 'devops'>('languages');
  
  const skills: Record<string, Skill[]> = {
    languages: [
      { name: 'Python', category: 'languages', level: 90, icon: '🐍' },
      { name: 'Java', category: 'languages', level: 85, icon: '☕' },
      { name: 'C#', category: 'languages', level: 80, icon: '🎯' },
      { name: 'C', category: 'languages', level: 75, icon: '⚙️' },
      { name: 'JavaScript', category: 'languages', level: 85, icon: '📜' },
      { name: 'TypeScript', category: 'languages', level: 80, icon: '🔷' },
      { name: 'SQL', category: 'languages', level: 85, icon: '🗃️' },
    ],
    web: [
      { name: 'HTML5', category: 'web', level: 90, icon: '🌐' },
      { name: 'CSS3', category: 'web', level: 85, icon: '🎨' },
      { name: 'React', category: 'web', level: 85, icon: '⚛️' },
      { name: 'Angular', category: 'web', level: 80, icon: '🅰️' },
      { name: 'Ionic', category: 'web', level: 75, icon: '📱' },
      { name: 'Node.js', category: 'web', level: 80, icon: '🟢' },
      { name: 'Express.js', category: 'web', level: 75, icon: '🚂' },
      { name: 'RESTful APIs', category: 'web', level: 85, icon: '🔌' },
      { name: 'Vite', category: 'web', level: 70, icon: '⚡' },
    ],
    database: [
      { name: 'MySQL', category: 'database', level: 85, icon: '🐬' },
      { name: 'Oracle', category: 'database', level: 80, icon: '☁️' },
      { name: 'SQLite', category: 'database', level: 75, icon: '📊' },
      { name: 'MongoDB', category: 'database', level: 80, icon: '🍃' },
      { name: 'PostgreSQL', category: 'database', level: 80, icon: '🐘' },
      { name: 'Supabase', category: 'database', level: 75, icon: '⚡' },
    ],
    devops: [
      { name: 'Git', category: 'devops', level: 85, icon: '🔄' },
      { name: 'GitHub', category: 'devops', level: 85, icon: '🐙' },
      { name: 'JIRA', category: 'devops', level: 80, icon: '📋' },
      { name: 'NetBeans', category: 'devops', level: 75, icon: '🧰' },
      { name: 'Vercel', category: 'devops', level: 75, icon: '▲' },
      { name: 'ngrok', category: 'devops', level: 70, icon: '🔗' },
      { name: 'Okta', category: 'devops', level: 70, icon: '🔒' },
      { name: 'Kubernetes', category: 'devops', level: 75, icon: '🚢' },
      { name: 'AWS', category: 'devops', level: 80, icon: '☁️' },
      { name: 'Google Cloud', category: 'devops', level: 75, icon: '☁️' },
      { name: 'Azure', category: 'devops', level: 75, icon: '☁️' },
      { name: 'Firebase', category: 'devops', level: 75, icon: '🔥' },
    ],
  };

  return (
    <section id="skills" className="relative py-20 bg-gradient-to-b from-[#1e3a8a] to-[#283593]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300/10 via-transparent to-transparent"></div>
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 bg-clip-text text-transparent">Skill Tree</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.keys(skills).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg backdrop-blur-xl transition-colors ${
                activeCategory === category 
                ? 'bg-white/20 text-white border border-white/20' 
                : 'bg-white/5 text-blue-200 border border-white/10 hover:bg-white/10'
              }`}
              onClick={() => setActiveCategory(category as any)}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills[activeCategory].map((skill) => (
            <div key={skill.name} className="backdrop-blur-xl bg-white/5 p-6 rounded-xl transition-transform hover:translate-y-[-4px] border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{skill.icon}</span>
                <h3 className="text-xl text-blue-200">{skill.name}</h3>
              </div>
              
              <div className="h-2 bg-[#1e2b7a] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-400 transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <div className="text-right mt-1 text-sm text-blue-300">LVL {skill.level}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PixelSkills;
