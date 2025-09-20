import React from 'react';
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from '@/types/project';

interface ProjectGalleryViewProps {
  projects: Project[];
  currentProject: Project;
  onSelectProject: (project: Project) => void;
  setActiveView: (view: 'gallery' | 'details') => void;
}

const ProjectGalleryView: React.FC<ProjectGalleryViewProps> = ({ 
  projects, 
  currentProject, 
  onSelectProject, 
  setActiveView 
}) => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-medium text-blue-200 mb-4">Project Gallery</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div 
            key={proj.title}
            className={`bg-blue-900/20 rounded-lg overflow-hidden border transition-all ${proj.title === currentProject.title ? 'border-blue-400' : 'border-blue-800/30 hover:border-blue-600/50'}`}
          >
            <div className="aspect-video w-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f101a]/70 z-10"></div>
              <img 
                src={proj.image} 
                alt={proj.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="font-medium text-blue-100 mb-2">{proj.title.split('–')[0]}</h4>
              <p className="text-blue-200/70 text-sm line-clamp-2 mb-3">{proj.description}</p>
              <div className="flex justify-between items-center">
                <Badge
                  className="bg-blue-500/20 text-blue-200 border-blue-500/30"
                >
                  {proj.title.includes('–') ? proj.title.split('–')[1].trim() : 'Project'}
                </Badge>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (proj.title !== currentProject.title) {
                      onSelectProject(proj);
                    }
                    setActiveView('details');
                  }}
                  className="border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-200 text-xs py-1 h-auto"
                >
                  {proj.title === currentProject.title ? 'View Details' : 'Open Project'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGalleryView;
