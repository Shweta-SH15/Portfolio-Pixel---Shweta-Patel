import React from 'react';
import { X, Grid2X2, Info } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Project } from '@/types/project';
import { ProjectBasic } from '@/types/project';
import ProjectGalleryView from './projectGalleryView';
import ProjectDetailsView from './projectDetailsView';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  showMoreDetails: boolean;
  onToggleDetails: () => void;
  showSecret: boolean;
  onToggleSecret: () => void;
  additionalData?: ProjectBasic;
  activeView: 'gallery' | 'details';
  setActiveView: (view: 'gallery' | 'details') => void;
  allProjects: Project[];
  onSelectProject: (project: Project) => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  showMoreDetails,
  onToggleDetails,
  showSecret,
  onToggleSecret,
  additionalData,
  activeView,
  setActiveView,
  allProjects,
  onSelectProject,
}) => {
  if (!project) return null;

  const projectName = project.title.split('–')[0].trim();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          bg-[#141439] border-blue-600/20 text-white
          w-[700px] h-[700px] max-w-[90vw] max-h-[90vh]
          overflow-auto p-0
        "
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 p-2 rounded-full z-20 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-white/80" />
          </button>

          <div className="flex flex-col">
            <div className="p-6 border-b border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <div className="w-8 h-8 flex items-center justify-center">🚀</div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-blue-100">{projectName}</h2>
                  <p className="text-blue-300 text-sm">
                    {project.title.includes('–')
                      ? project.title.split('–')[1].trim()
                      : 'Project'}
                  </p>
                </div>
                <div className="flex bg-blue-900/30 rounded-lg p-1">
                  <button
                    onClick={() => setActiveView('gallery')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all ${
                      activeView === 'gallery'
                        ? 'bg-blue-500 text-white'
                        : 'text-blue-300 hover:bg-blue-800/30'
                    }`}
                  >
                    <Grid2X2 className="w-4 h-4" /> Gallery
                  </button>
                  <button
                    onClick={() => setActiveView('details')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all ${
                      activeView === 'details'
                        ? 'bg-blue-500 text-white'
                        : 'text-blue-300 hover:bg-blue-800/30'
                    }`}
                  >
                    <Info className="w-4 h-4" /> Details
                  </button>
                </div>
              </div>
            </div>

            <div className="min-h-[500px]">
              {activeView === 'gallery' ? (
                <ProjectGalleryView
                  projects={allProjects}
                  currentProject={project}
                  onSelectProject={onSelectProject}
                  setActiveView={setActiveView}
                />
              ) : (
                <ProjectDetailsView
                  project={project}
                  additionalData={additionalData}
                  showMoreDetails={showMoreDetails}
                  onToggleDetails={onToggleDetails}
                  showSecret={showSecret}
                  onToggleSecret={onToggleSecret}
                />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
