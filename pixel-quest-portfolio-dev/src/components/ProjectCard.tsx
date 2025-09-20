import React from 'react';
import { ArrowRight, Code, Award, Star, FileCode } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types/project';
import { projects } from '@/components/data/projects';

interface ProjectCardProps {
  project?: Project;
  projectId?: number;
  onSelectProject?: (project: Project) => void;
  isExploding?: boolean;
  closeProject?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  projectId,
  onSelectProject,
  isExploding,
  closeProject,
}) => {
  const terminalProject = projectId
    ? projects.find((p) => p.id === projectId)
    : null;

  // Terminal-style modal card
  if (projectId !== undefined && terminalProject && isExploding !== undefined && closeProject) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center z-50 pointer-events-auto transition-opacity duration-300 ${
          isExploding ? 'opacity-100' : 'opacity-0'
        }`}>
        <div className="absolute inset-0 bg-black/70" onClick={closeProject}></div>
        <div
          className="
            bg-[#0f172a] border-2 border-[#33C3F0] rounded-lg p-6
            w-[700px] h-[700px]               
            max-w-[90vw] max-h-[90vh]         
            overflow-auto                     
            relative z-10 transition-all duration-500
          "
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={closeProject}
            aria-label="Close modal"
          >
            ×
          </button>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#33C3F0]">
                {terminalProject.name}
              </h3>
              {terminalProject.date && (
                <span className="text-white/60 text-sm">
                  {terminalProject.date}
                </span>
              )}
            </div>
            <p className="text-white/80">{terminalProject.description}</p>

            {/* Badges */}
            {terminalProject.badges?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {terminalProject.badges.map((badge, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="bg-blue-500/20 text-blue-200 border-blue-500/30 flex items-center gap-1.5"
                  >
                    {badge === 'AI' && <Code size={12} />}
                    {badge === 'Hackathon' && <Award size={12} />}
                    {badge === 'Gamification' && <Star size={12} />}
                    {badge === 'Full-Stack' && <FileCode size={12} />}
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            {/* Details section */}
            {terminalProject.fullDescription && (
              <div className="bg-[#1a1a2e] border border-[#33C3F0]/20 rounded-md p-4">
                <h4 className="text-[#33C3F0] font-medium mb-2">Details</h4>
                <ul className="space-y-2">
                  {terminalProject.fullDescription.map((desc, idx) => (
                    <li key={idx} className="text-white/80 flex items-start gap-2">
                      <span className="text-[#33C3F0] mt-0.5">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Problem & Approach */}
            <div className="bg-[#1a1a2e] border border-[#33C3F0]/20 rounded-md p-4">
              <h4 className="text-[#33C3F0] font-medium mb-2">Problem</h4>
              <p className="text-white/80">{terminalProject.problem}</p>
            </div>
            <div className="bg-[#1a1a2e] border border-[#33C3F0]/20 rounded-md p-4">
              <h4 className="text-[#33C3F0] font-medium mb-2">Approach</h4>
              <p className="text-white/80">{terminalProject.approach}</p>
            </div>

            {/* Technologies & Achievements */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-[#33C3F0] font-medium mb-2">Technologies</h4>
                <ul className="list-disc pl-5 text-white/80">
                  {terminalProject.technologiesUsed.map((tech, idx) => (
                    <li key={idx}>{tech}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[#33C3F0] font-medium mb-2">Achievements</h4>
                <ul className="list-disc pl-5 text-white/80">
                  {terminalProject.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Close button */}
            <div className="flex justify-center mt-4">
              <button
                className="bg-[#33C3F0] text-white px-6 py-2 rounded-md hover:bg-[#33C3F0]/80"
                onClick={closeProject}
              >
                Close Project
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular project card
  if (!project) return null;

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20 relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          {project.title}
        </h3>
        <p className="text-blue-100/90 mb-8 line-clamp-3">{project.description}</p>
        <button
          onClick={() => onSelectProject && onSelectProject(project)}
          className={`bg-gradient-to-r ${project.buttonGradient} text-white px-6 py-3 rounded-full flex items-center gap-2 text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group-hover:gap-3`}
        >
          {project.buttonText}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Decorative */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 blur-[100px] rounded-full bg-blue-500/30 z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 blur-[100px] rounded-full bg-cyan-500/30 z-0"></div>
    </div>
  );
};

export default ProjectCard;
