import React, { useState, useEffect, useRef } from 'react';
import { projects } from './data/projects';
import { commands } from './data/commands';
import ProjectCard from '@/components/ProjectCard';
import ProjectGalleryModal from './projectGalleryModal';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Award, Code, Terminal, Star, FileCode, FileSearch, Check } from 'lucide-react';

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

const TerminalProjectConsole: React.FC = () => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'help',
      output: (
        <div className="text-[#33C3F0] animate-fade-in">
          <p className="mb-2">Available commands:</p>
          <ul className="pl-4 space-y-1">
            <li><span className="text-pink-400">help</span> - Show available commands</li>
            <li><span className="text-pink-400">ls</span> - List all projects</li>
            <li><span className="text-pink-400">open [id]</span> - View details of a specific project</li>
            <li><span className="text-pink-400">projects --gallery</span> - View project gallery</li>
            <li><span className="text-pink-400">projects --view [id]</span> - View specific project</li>
            <li><span className="text-pink-400">techstack [id]</span> - View technologies used in a project</li>
            <li><span className="text-pink-400">badges</span> - Show earned badges</li>
            <li><span className="text-pink-400">clear</span> - Clear terminal output</li>
          </ul>
        </div>
      )
    }
  ]);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [isExplodingProject, setIsExplodingProject] = useState(false);
  const [showProjectGallery, setShowProjectGallery] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Focus the input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // useEffect(() => {
  //   // 1) Scroll the whole “projects” section into view
  //   const section = document.getElementById('projects');
  //   if (section) {
  //     section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }

  //   // 2) Then scroll inside the terminal to show latest output
  //   if (consoleEndRef.current) {
  //     consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }

  //   // 3) Refocus the input so user can type immediately
  //   inputRef.current?.focus({ preventScroll: true });
  // }, [commandHistory]);

  useEffect(() => {
    const isModalOpen = activeProjectId !== null || showProjectGallery;
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeProjectId, showProjectGallery]);

  // Typewriter effect function
  const typeCommand = async (cmd: string) => {
    setIsTyping(true);
    setInput('');

    // Type each character with a delay
    for (let i = 0; i <= cmd.length; i++) {
      setInput(cmd.substring(0, i));
      // Random delay between 30-70ms for natural typing feel
      await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 40));
    }

    // Short pause after typing is complete before executing
    await new Promise(resolve => setTimeout(resolve, 200));

    setIsTyping(false);
    handleCommand(cmd);
  };

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isTyping) return;

    const command = input.trim();
    handleCommand(command);
  };

  const checkAndAwardBadge = (badgeId: string) => {
    if (!earnedBadges.includes(badgeId)) {
      const newBadges = [...earnedBadges, badgeId];
      setEarnedBadges(newBadges);

      const badge = commands.find(cmd => cmd.badgeId === badgeId)?.badge;
      if (badge) {
        toast({
          title: `🏆 Badge Earned: ${badge.name}`,
          description: badge.description,
        });
      }
    }
  };

  const handleCommand = (command: string) => {
    const args = command.split(' ');
    const cmd = args[0].toLowerCase();
    let output: React.ReactNode;

    // Process commands
    if (cmd === 'clear') {
      setCommandHistory([]);
      setInput('');
      return;
    } else if (cmd === 'help') {
      checkAndAwardBadge('helper');
      output = (
        <div className="text-[#33C3F0] animate-fade-in">
          <p className="mb-2">Available commands:</p>
          <ul className="pl-4 space-y-1">
            <li><span className="text-pink-400">help</span> - Show available commands</li>
            <li><span className="text-pink-400">ls</span> - List all projects</li>
            <li><span className="text-pink-400">open [id]</span> - View details of a specific project</li>
            <li><span className="text-pink-400">projects --gallery</span> - View project gallery</li>
            <li><span className="text-pink-400">projects --view [id]</span> - View specific project</li>
            <li><span className="text-pink-400">techstack [id]</span> - View technologies used in a project</li>
            <li><span className="text-pink-400">badges</span> - Show earned badges</li>
            <li><span className="text-pink-400">clear</span> - Clear terminal output</li>
          </ul>
        </div>
      );
    } else if (cmd === 'ls') {
      checkAndAwardBadge('explorer');
      output = (
        <div className="space-y-2 animate-fade-in">
          <p className="text-[#33C3F0]">Available projects:</p>
          <div className="border border-[#33C3F0]/30 rounded-md overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#33C3F0]/20">
                <tr>
                  <th className="p-2 border-b border-[#33C3F0]/30">ID</th>
                  <th className="p-2 border-b border-[#33C3F0]/30">Name</th>
                  <th className="p-2 border-b border-[#33C3F0]/30">Description</th>
                  <th className="p-2 border-b border-[#33C3F0]/30">Date</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id} className="border-b border-[#33C3F0]/20 last:border-0">
                    <td className="p-2 text-yellow-400">{project.id}</td>
                    <td className="p-2 text-green-400">{project.name}</td>
                    <td className="p-2 text-white/80">{project.description}</td>
                    <td className="p-2 text-white/60">{project.date || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/60 text-sm">Use <span className="text-pink-400">open [id]</span> to view project details</p>
        </div>
      );
    } else if (cmd === 'open') {
      const idOrName = args[1]?.trim();
      if (!idOrName) {
        output = (
          <div className="text-red-400 animate-fade-in">
            Error: Please specify a project ID or name. Use <span className="text-pink-400">ls</span> to see available projects.
          </div>
        );
      } else {
        const projectId = parseInt(idOrName);

        // Try to find by ID or by name
        const project = Number.isNaN(projectId)
          ? projects.find(p => p.name.toLowerCase() === idOrName.toLowerCase())
          : projects.find(p => p.id === projectId);

        if (project) {
          setActiveProjectId(project.id);
          setIsExplodingProject(true);
          checkAndAwardBadge('opener');

          // Check for special badges based on project type
          if (project.badges?.includes('AI')) {
            checkAndAwardBadge('ai_master');
          }
          if (project.name === '1DayIntern') {
            checkAndAwardBadge('career_explorer');
          }

          output = (
            <div className="text-green-400 animate-fade-in">
              Opening project: {project.name}...
              {project.badges && project.badges.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.badges.map((badge, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-blue-500/20 text-blue-200 border-blue-500/30"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          );
        } else {
          output = (
            <div className="text-red-400 animate-fade-in">
              Error: Project not found. Use <span className="text-pink-400">ls</span> to see available projects.
            </div>
          );
        }
      }
    } else if (cmd === 'techstack') {
      checkAndAwardBadge('tech_guru');
      const projectId = parseInt(args[1]);

      if (!args[1]) {
        output = (
          <div className="text-red-400 animate-fade-in">
            Error: Please specify a project ID. Example: <span className="text-pink-400">techstack 1</span>
          </div>
        );
      } else if (isNaN(projectId)) {
        output = (
          <div className="text-red-400 animate-fade-in">
            Error: Invalid project ID. Please provide a valid number.
          </div>
        );
      } else {
        const project = projects.find(p => p.id === projectId);

        if (project) {
          output = (
            <div className="animate-fade-in">
              <h3 className="text-[#33C3F0] text-lg mb-2">Tech Stack for {project.name}:</h3>
              <div className="bg-[#1a1a2e] border border-[#33C3F0]/20 p-4 rounded-md">
                <ul className="space-y-2">
                  {project.technologiesUsed.map((tech, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-white/90">
                      <FileCode size={16} className="text-[#33C3F0]" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        } else {
          output = (
            <div className="text-red-400 animate-fade-in">
              Error: Project with ID {projectId} not found. Use <span className="text-pink-400">ls</span> to see available projects.
            </div>
          );
        }
      }
    } else if (cmd === 'badges') {
      checkAndAwardBadge('collector');

      if (earnedBadges.length === 0) {
        output = (
          <div className="text-yellow-400 animate-fade-in">
            You haven't earned any badges yet. Keep exploring the projects and trying different commands!
          </div>
        );
      } else {
        const earnedBadgeObjects = commands
          .filter(cmd => cmd.badgeId && earnedBadges.includes(cmd.badgeId))
          .map(cmd => cmd.badge)
          .filter(Boolean);

        output = (
          <div className="animate-fade-in">
            <h3 className="text-[#33C3F0] text-lg mb-2">Your Earned Badges:</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {earnedBadgeObjects.map((badge, idx) => (
                <div key={idx} className="bg-[#1a1a2e] border border-[#33C3F0]/20 p-3 rounded-md flex items-center gap-3">
                  {badge?.icon === 'code' && <Code className="text-yellow-400" size={18} />}
                  {badge?.icon === 'terminal' && <Terminal className="text-green-400" size={18} />}
                  {badge?.icon === 'file-code' && <FileCode className="text-blue-400" size={18} />}
                  {badge?.icon === 'file-search' && <FileSearch className="text-purple-400" size={18} />}
                  {badge?.icon === 'badge' && <Award className="text-pink-400" size={18} />}
                  {badge?.icon === 'award' && <Award className="text-yellow-400" size={18} />}
                  {badge?.icon === 'star' && <Star className="text-yellow-400" size={18} />}
                  <div>
                    <div className="font-medium text-white">{badge?.name}</div>
                    <div className="text-xs text-white/70">{badge?.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    } else if (cmd === 'projects') {
      const flag = args[1]?.toLowerCase();

      if (!flag) {
        output = (
          <div className="text-white animate-fade-in">
            Usage: <span className="text-pink-400">projects --gallery</span> | <span className="text-pink-400">projects --view &lt;project-id&gt;</span>
          </div>
        );
      } else if (flag === '--gallery') {
        setShowProjectGallery(true);
        output = (
          <div className="text-green-400 animate-fade-in">
            Opening project gallery view...
          </div>
        );
      } else if (flag === '--view') {
        const projectId = parseInt(args[2]);

        if (!args[2]) {
          output = (
            <div className="text-red-400 animate-fade-in">
              Error: Please specify a project ID. Example: <span className="text-pink-400">projects --view 1</span>
            </div>
          );
        } else if (isNaN(projectId)) {
          output = (
            <div className="text-red-400 animate-fade-in">
              Error: Invalid project ID. Please provide a valid number.
            </div>
          );
        } else {
          const project = projects.find(p => p.id === projectId);

          if (project) {
            setActiveProjectId(project.id);
            setIsExplodingProject(true);
            checkAndAwardBadge('opener');

            // Check for special badges based on project type
            if (project.badges?.includes('AI')) {
              checkAndAwardBadge('ai_master');
            }
            if (project.name === '1DayIntern') {
              checkAndAwardBadge('career_explorer');
            }

            output = (
              <div className="text-green-400 animate-fade-in">
                Opening project: {project.name}...
                {project.badges && project.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.badges.map((badge, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="bg-blue-500/20 text-blue-200 border-blue-500/30"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            );
          } else {
            output = (
              <div className="text-red-400 animate-fade-in">
                Error: Project with ID {projectId} not found. Use <span className="text-pink-400">ls</span> to see available projects.
              </div>
            );
          }
        }
      } else {
        output = (
          <div className="text-red-400 animate-fade-in">
            Error: Unknown flag "{flag}". Available flags: --gallery, --view &lt;project-id&gt;
          </div>
        );
      }
    } else if (cmd === 'secret') {
      checkAndAwardBadge('discoverer');
      output = (
        <div className="bg-[#1a1a2e] border border-[#33C3F0]/20 p-4 rounded-md animate-fade-in">
          <div className="text-center mb-2">
            <span className="text-[#33C3F0] text-lg">🎉 You found a secret! 🎉</span>
          </div>
          <p className="text-white/80 mb-3">
            Congratulations on discovering the secret command! As a reward, here's a special message:
          </p>
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3 rounded-md">
            <p className="text-center text-white font-medium">
              "The best developers are the ones who never stop exploring."
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <div className="bg-purple-500/40 border border-purple-500/60 text-purple-100 px-3 py-1 rounded-full text-sm">
              Secret Explorer Badge Earned
            </div>
          </div>
        </div>
      );
    } else {
      output = (
        <div className="text-red-400 animate-fade-in">
          Command not recognized: "{command}". Type <span className="text-pink-400">help</span> for available commands.
        </div>
      );
    }

    setCommandHistory([...commandHistory, { command, output }]);
    setInput('');
  };

  const closeProject = () => {
    setActiveProjectId(null);
    setIsExplodingProject(false);
  };

  // Demo commands to demonstrate typewriter effect
  const runDemoCommand = (command: string) => {
    if (!isTyping) {
      typeCommand(command);
    }
  };

  return (
    <div className="relative">
      {/* Terminal UI */}
      <div className="bg-[#0c0c16] border border-[#33C3F0]/20 rounded-lg overflow-hidden shadow-xl shadow-blue-500/5">
        {/* Terminal Header */}
        <div className="flex items-center gap-1.5 px-4 py-3 bg-[#151528] border-b border-[#33C3F0]/20">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="flex-1 text-center">
            <span className="text-[#33C3F0]/70 text-xs font-mono">projects@terminal ~ </span>
          </div>
        </div>


        {/* Terminal Content */}
        <div className="h-[400px] overflow-y-auto p-4 font-mono text-sm">
          {/* Command history */}
          {commandHistory.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center text-[#33C3F0] mb-1">
                <span className="mr-2">❯</span>
                <span>{item.command}</span>
              </div>
              <div className="pl-4 text-white/80">
                {item.output}
              </div>
            </div>
          ))}

          {/* Current command input */}
          <form onSubmit={handleSubmit} className="flex items-center text-[#33C3F0]">
            <span className="mr-2">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#33C3F0]"
              autoFocus
              spellCheck="false"
              aria-label="Terminal input"
              disabled={isTyping}
            />
            {isTyping && <span className="animate-pulse">|</span>}
          </form>

          {/* This element helps us auto-scroll to the bottom */}
          <div ref={consoleEndRef}></div>
        </div>
      </div>

      {/* Quick command buttons */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        <button
          onClick={() => runDemoCommand('ls')}
          className="bg-[#1a1633]/60 border border-[#33C3F0]/20 rounded-md px-3 py-1.5 text-xs font-mono text-[#33C3F0] hover:bg-[#33C3F0]/10 transition-colors"
          disabled={isTyping}
        >
          Try: ls
        </button>
        <button
          onClick={() => runDemoCommand('projects --gallery')}
          className="bg-[#1a1633]/60 border border-[#33C3F0]/20 rounded-md px-3 py-1.5 text-xs font-mono text-[#33C3F0] hover:bg-[#33C3F0]/10 transition-colors"
          disabled={isTyping}
        >
          Try: projects --gallery
        </button>
        <button
          onClick={() => runDemoCommand('badges')}
          className="bg-[#1a1633]/60 border border-[#33C3F0]/20 rounded-md px-3 py-1.5 text-xs font-mono text-[#33C3F0] hover:bg-[#33C3F0]/10 transition-colors"
          disabled={isTyping}
        >
          Try: badges
        </button>
        <button
          onClick={() => runDemoCommand('help')}
          className="bg-[#1a1633]/60 border border-[#33C3F0]/20 rounded-md px-3 py-1.5 text-xs font-mono text-[#33C3F0] hover:bg-[#33C3F0]/10 transition-colors"
          disabled={isTyping}
        >
          Try: help
        </button>
      </div>

      {/* Project Card Modal (conditionally rendered) */}
      {activeProjectId && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={closeProject}
    >
      <div
        className="pointer-events-auto"
        onClick={e => e.stopPropagation()}
      >
        <ProjectCard
          projectId={activeProjectId}
          isExploding={isExplodingProject}
          closeProject={closeProject}
        />
      </div>
    </div>
  )}

      {/* Project Gallery Modal */}
      {showProjectGallery && (
        <ProjectGalleryModal
          isOpen={showProjectGallery}
          onClose={() => setShowProjectGallery(false)}
          onSelectProject={(projectId) => {
            setActiveProjectId(projectId);
            setIsExplodingProject(true);
          }}
        />
      )}
    </div>
  );
};

export default TerminalProjectConsole;
