import React, { useState } from 'react';
import { projects as projectsData } from './data/projects'
import { projectsDisplay } from './data/projectsDisplay'
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './projectDetailModal';
import { Project } from './../types/project';

const PixelProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [activeView, setActiveView] = useState<'gallery' | 'details'>('gallery');
  
  // Function to get additional project data from our data file
  const getProjectDetails = (title: string) => {
    return projectsData.find(p => 
      p.name === title.split('–')[0].trim() || 
      p.description === title.split('–')[1]?.trim()
    );
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setShowMoreDetails(false); // Reset this whenever opening a new project
    setShowSecret(false); // Reset this too
    setActiveView('gallery'); // Set initial view to gallery
  };

  return (
    <section id="projects" className="relative py-20 bg-gradient-to-b from-[#283593] to-[#1e3a8a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-300/10 via-transparent to-transparent"></div>
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-blue-200/80 max-w-2xl mx-auto">
            Exploring innovation through code and creativity
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {projectsDisplay.map((project) => (
            <ProjectCard 
              key={project.title}
              project={project}
              onSelectProject={handleSelectProject}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          isOpen={!!selectedProject} 
          onClose={() => setSelectedProject(null)} 
          showMoreDetails={showMoreDetails}
          onToggleDetails={() => setShowMoreDetails(!showMoreDetails)}
          showSecret={showSecret}
          onToggleSecret={() => setShowSecret(true)}
          additionalData={getProjectDetails(selectedProject.title)}
          activeView={activeView}
          setActiveView={setActiveView}
          allProjects={projectsDisplay}
          onSelectProject={(project) => {
            setSelectedProject(project);
            setShowMoreDetails(false);
            setShowSecret(false);
          }}
        />
      )}
    </section>
  );
};

export default PixelProjects;
