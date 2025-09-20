import React from 'react';
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from '@/types/project';
import { ProjectBasic } from '@/types/project';

interface ProjectDetailsViewProps {
  project: Project;
  additionalData?: ProjectBasic;
  showMoreDetails: boolean;
  onToggleDetails: () => void;
  showSecret: boolean;
  onToggleSecret: () => void;
}

const ProjectDetailsView: React.FC<ProjectDetailsViewProps> = ({
  project,
  additionalData,
  showMoreDetails,
  onToggleDetails,
  showSecret,
  onToggleSecret
}) => {
  // Extract project name without the subtitle
  const projectName = project.title.split('–')[0].trim();

  return (
    <div className="grid md:grid-cols-2 gap-0">
      {/* Left column (details) */}
      <div className="p-6 space-y-6">
        {additionalData && (
          <>
            <div>
              <h3 className="text-blue-300 font-medium mb-2">Problem</h3>
              <div className="bg-[#1e214a]/40 rounded-md p-4 border border-blue-900/30">
                <p className="text-blue-100/90">{additionalData.problem}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-blue-300 font-medium mb-2">My Approach</h3>
              <div className="bg-[#1e214a]/40 rounded-md p-4 border border-blue-900/30">
                <p className="text-blue-100/90">{additionalData.approach}</p>
              </div>
            </div>
            
            {showMoreDetails && (
              <div className="animate-fade-in">
                <h3 className="text-blue-300 font-medium mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {additionalData.technologiesUsed.map((tech: string, i: number) => (
                    <Badge key={i} variant="outline" className="bg-blue-500/20 text-blue-200 border-blue-500/30">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {showMoreDetails && (
              <div className="animate-fade-in">
                <h3 className="text-blue-300 font-medium mb-2">Achievements</h3>
                <div className="space-y-2">
                  {additionalData.achievements.map((achievement: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/20 text-green-200 border-green-500/30 whitespace-nowrap">
                        Achievement {i+1}
                      </Badge>
                      <span className="text-blue-100/90 text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        
        {/* Show More button */}
        <div className="pt-4 flex justify-center">
          <Button
            onClick={onToggleDetails}
            variant="outline"
            className="border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-200"
          >
            {showMoreDetails ? "Show Less" : "Show More"}
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${showMoreDetails ? 'rotate-90' : ''}`} />
          </Button>
        </div>
        
        {/* Easter egg - secret content */}
        {!showSecret && (
          <div className="text-center mt-4">
            <button 
              className="text-blue-400/40 text-xs hover:text-blue-400/60 cursor-pointer transition-colors"
              onClick={onToggleSecret}
            >
              click for secret content
            </button>
          </div>
        )}
        
        {showSecret && (
          <div className="bg-[#1e2a4a]/60 rounded-md p-4 border border-blue-500/20 mt-4 animate-fade-in">
            <div className="text-center mb-2">
              <span className="text-blue-200">🎉 You found a secret! 🎉</span>
            </div>
            <p className="text-blue-300/90 text-sm">
              The {projectName} platform was actually inspired by a dream where I was teaching robots how to have job interviews!
            </p>
            <div className="flex justify-center mt-4">
              <Badge className="bg-purple-500/40 border-purple-500/60 text-purple-100">
                Secret Explorer Badge Earned
              </Badge>
            </div>
          </div>
        )}
      </div>
      
      {/* Right column (image) */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-indigo-900/80 z-10"></div>
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full p-6 z-20">
          <div className="bg-[#141439]/80 backdrop-blur-lg p-4 rounded-lg border border-blue-500/20">
            <div className="text-sm text-blue-200/90 leading-relaxed">
              <p>{project.description}</p>
            </div>
            
            {/* Status indicator */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-green-400">Online</span>
              </div>
              <span className="text-blue-400/40 text-xs">•</span>
              <span className="text-xs text-blue-400/80">Launching project viewer...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsView;
