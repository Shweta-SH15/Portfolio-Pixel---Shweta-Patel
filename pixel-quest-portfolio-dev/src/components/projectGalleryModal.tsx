import React from 'react';
import { X, Code, Award, Star, FileCode } from "lucide-react";
import { projects } from '../components/data/projects';
import { useToast } from '@/hooks/use-toast';

interface ProjectGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: number) => void;
}

const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({ 
  isOpen, 
  onClose,
  onSelectProject
}) => {
  const { toast } = useToast();
  
  if (!isOpen) return null;

  const handleSelectProject = (projectId: number) => {
    if (onSelectProject) {
      onSelectProject(projectId);
      toast({
        title: "Project Selected",
        description: `Opening project ${projectId}...`,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      <div className="bg-[#0f172a] border-2 border-[#33C3F0] rounded-lg p-6 w-full max-w-4xl mx-4 relative z-10 card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#33C3F0]">Project Gallery</h2>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-[#1a1a2e] border border-[#33C3F0]/20 rounded-lg p-4 cursor-pointer hover:border-[#33C3F0]/60 transition-colors animate-fade-in"
              onClick={() => handleSelectProject(project.id)}
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-[#33C3F0]/20 flex items-center justify-center text-xl">
                  {project.id}
                </div>
                <div className="ml-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white">{project.name}</h3>
                    {project.date && (
                      <span className="text-white/50 text-xs">{project.date}</span>
                    )}
                  </div>
                  <p className="text-[#33C3F0]/80 text-sm">{project.description}</p>
                </div>
              </div>
              
              {project.badges && project.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.badges.map((badge, idx) => (
                    <div 
                      key={idx}
                      className="px-2 py-1 bg-[#33C3F0]/10 text-[#33C3F0]/90 text-xs rounded flex items-center gap-1"
                    >
                      {badge === 'AI' && <Code size={10} />}
                      {badge === 'Hackathon' && <Award size={10} />}
                      {badge === 'Gamification' && <Star size={10} />}
                      {badge === 'Full-Stack' && <FileCode size={10} />}
                      {badge === 'FAQ System' && <Code size={10} />}
                      {badge === 'Auth' && <FileCode size={10} />}
                      {badge === 'Machine Learning' && <Code size={10} />}
                      {badge === 'Web App' && <FileCode size={10} />}
                      {badge}
                    </div>
                  ))}
                </div>
              )}
              
              <p className="text-white/70 text-sm mb-3 line-clamp-2">{project.problem}</p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologiesUsed.slice(0, 2).map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-1 bg-[#33C3F0]/10 text-[#33C3F0]/90 text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologiesUsed.length > 2 && (
                  <span className="px-2 py-1 bg-[#33C3F0]/10 text-[#33C3F0]/90 text-xs rounded">
                    +{project.technologiesUsed.length - 2} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGalleryModal;