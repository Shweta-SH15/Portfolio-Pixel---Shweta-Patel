import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Zap, Gift } from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProjectGalleryModal from './projectGalleryModal';
import { commands } from './data/commands';
import { projects } from './data/projects';
import { Badge as BadgeType } from './data/badges';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Welcome to the interactive project explorer', 'Type "help" to see available commands']);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isExploding, setIsExploding] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<BadgeType[]>([]);
  const [showBadgeAnimation, setShowBadgeAnimation] = useState<BadgeType | null>(null);
  const [showProjectGallery, setShowProjectGallery] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const typeCommand = async (command: string) => {
    setIsTyping(true);
    for (let i = 0; i <= command.length; i++) {
      setInput(command.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    setIsTyping(false);
    handleCommand(command);
  };

  const handleCommand = (cmd: string) => {
    let newOutput = [...output, `\n> ${cmd}`];
    
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();
    
    if (command === 'ls') {
      newOutput = [...newOutput, ...projects.map(p => `${p.id}. ${p.name} - ${p.description}`)];
      checkAndAwardBadge('explorer');
    } else if (command === 'open' && args.length > 1) {
      const projectQuery = args.slice(1).join(' ').toLowerCase().trim();
      
      let project = projects.find(p => p.name.toLowerCase() === projectQuery);
      
      if (!project) {
        project = projects.find(p => p.name.toLowerCase().includes(projectQuery));
      }
      
      if (!project && !isNaN(Number(projectQuery))) {
        project = projects.find(p => p.id === Number(projectQuery));
      }
      
      if (project) {
        setSelectedProject(project.id);
        setIsExploding(true);
        newOutput = [...newOutput, `Opening ${project.name}...`];
        
        if (project.name.toLowerCase().includes('ai')) {
          checkAndAwardBadge('ai_master');
        } else if (project.name.toLowerCase().includes('intern')) {
          checkAndAwardBadge('career_explorer');
        }
        
        toast({
          title: `🎉 Opening ${project.name}`,
          description: "Launching project viewer...",
        });
      } else {
        newOutput = [...newOutput, `Error: Project "${projectQuery}" not found. Try 'ls' to see available projects.`];
        toast({
          title: "❌ Project Not Found",
          description: "Use 'ls' to see available projects.",
          variant: "destructive",
        });
      }
    } else if (command === 'clear') {
      newOutput = [];
    } else if (command === 'help') {
      newOutput = [...newOutput, ...commands.map(c => `${c.command}: ${c.description}`)];
      checkAndAwardBadge('helper');
    } else if (command === 'badges') {
      if (earnedBadges.length === 0) {
        newOutput = [...newOutput, "You haven't earned any badges yet. Keep exploring!"];
      } else {
        newOutput = [...newOutput, "Earned Badges:", ...earnedBadges.map(badge => `- ${badge.name}: ${badge.description}`)];
      }
      checkAndAwardBadge('collector');
    } else if (command === 'secret') {
      newOutput = [...newOutput, "🎉 You found a secret command! You're a true explorer."];
      checkAndAwardBadge('discoverer');
    } else if (command === 'projects') {
      // Handle projects command with flags
      if (args.length > 1) {
        const flag = args[1].toLowerCase();
        
        if (flag === '--gallery') {
          newOutput = [...newOutput, "Opening project gallery view..."];
          setShowProjectGallery(true);
        } else if (flag === '--view' && args.length > 2) {
          const projectId = parseInt(args[2]);
          
          if (!isNaN(projectId)) {
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
              newOutput = [...newOutput, `Opening detailed view for project: ${project.name}...`];
              setSelectedProject(projectId);
              setIsExploding(true);
              
              toast({
                title: `🎉 Opening ${project.name}`,
                description: "Launching project viewer...",
              });
            } else {
              newOutput = [...newOutput, `Error: Project with ID ${projectId} not found. Try 'ls' to see available projects.`];
              
              toast({
                title: "❌ Project Not Found",
                description: "Use 'ls' to see available projects.",
                variant: "destructive",
              });
            }
          } else {
            newOutput = [...newOutput, `Error: Invalid project ID. Try 'projects --view 1' to view project with ID 1.`];
            
            toast({
              title: "❌ Invalid Project ID",
              description: "Please provide a valid project ID.",
              variant: "destructive",
            });
          }
        } else {
          newOutput = [...newOutput, `Error: Unknown flag "${flag}". Available flags: --gallery, --view <project-id>`];
        }
      } else {
        newOutput = [...newOutput, "Usage: projects --gallery | projects --view <project-id>"];
      }
    } else if (cmd.trim() !== '') {
      newOutput = [...newOutput, `Command not recognized: ${command}. Type 'help' for available commands.`];
    }
    
    setOutput(newOutput);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      handleCommand(input);
    }
  };
  
  const closeProject = () => {
    setSelectedProject(null);
    setIsExploding(false);
    setOutput([...output, '\nReturned to terminal']);
  };

  const checkAndAwardBadge = (badgeId: string) => {
    const badge = commands.find(c => c.badgeId === badgeId)?.badge;
    
    if (badge && !earnedBadges.some(b => b.id === badge.id)) {
      const newBadges = [...earnedBadges, badge];
      setEarnedBadges(newBadges);
      setShowBadgeAnimation(badge);
      
      toast({
        title: `🏆 Badge Unlocked: ${badge.name}`,
        description: badge.description,
      });
      
      setTimeout(() => {
        setShowBadgeAnimation(null);
      }, 3000);
    }
  };

  useEffect(() => {
    if (!isExploding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExploding, output]);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`min-h-[500px] w-full max-w-3xl mx-auto bg-[#1a1633]/90 rounded-lg p-4 font-mono text-[#33C3F0] shadow-2xl border border-[#33C3F0]/20 ${isExploding ? 'hidden' : 'block'}`}
        ref={terminalRef}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-xs text-[#33C3F0]/60">
            project-explorer ~ {earnedBadges.length > 0 && `${earnedBadges.length} badges earned`}
          </div>
        </div>
        
        <div className="h-[400px] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-[#33C3F0]/20">
          {output.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="whitespace-pre-wrap"
            >
              {line}
            </motion.div>
          ))}
          
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-[#33C3F0]">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#33C3F0]"
              disabled={isTyping}
              autoFocus
            />
          </form>
        </div>

        <div className="mt-4 text-sm text-[#33C3F0]/60 grid grid-cols-2 gap-2">
          <div>
            <p className="font-bold mb-1">Available commands:</p>
            <p className="flex items-center gap-1"><span className="text-[#33C3F0]">•</span> ls: List all projects</p>
            <p className="flex items-center gap-1"><span className="text-[#33C3F0]">•</span> open [name/id]: View project</p>
            <p className="flex items-center gap-1"><span className="text-[#33C3F0]">•</span> projects --gallery: View project gallery</p>
          </div>
          <div>
            <p className="font-bold mb-1">More commands:</p>
            <p className="flex items-center gap-1"><span className="text-[#33C3F0]">•</span> projects --view [id]: View specific project</p>
            <p className="flex items-center gap-1"><span className="text-[#33C3F0]">•</span> badges: View earned badges</p>
            <p className="flex items-center gap-1 text-[#33C3F0]/40"><span className="text-[#33C3F0]/40">•</span> help: Show all commands</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {earnedBadges.map(badge => (
            <Badge 
              key={badge.id}
              variant="outline"
              className="bg-[#33C3F0]/10 text-[#33C3F0] border-[#33C3F0]/30 flex items-center gap-1.5 px-3 py-1.5 hover:bg-[#33C3F0]/20 cursor-help transition-all glow"
            >
              {badge.icon === 'Award' && <Award className="h-3.5 w-3.5" />}
              {badge.icon === 'Zap' && <Zap className="h-3.5 w-3.5" />}
              {badge.icon === 'Gift' && <Gift className="h-3.5 w-3.5" />}
              {badge.name}
            </Badge>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {showBadgeAnimation && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="fixed bottom-6 right-6 bg-green-500/90 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
          >
            {showBadgeAnimation.icon === 'Award' && <Award className="h-5 w-5" />}
            {showBadgeAnimation.icon === 'Zap' && <Zap className="h-5 w-5" />}
            {showBadgeAnimation.icon === 'Gift' && <Gift className="h-5 w-5" />}
            <div>
              <div className="font-semibold">Badge Unlocked: {showBadgeAnimation.name}</div>
              <div className="text-xs">{showBadgeAnimation.description}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject !== null && (
          <ProjectCard 
            projectId={selectedProject} 
            isExploding={isExploding} 
            closeProject={closeProject} 
          />
        )}
      </AnimatePresence>

      {/* Project Gallery Modal */}
      {showProjectGallery && (
        <ProjectGalleryModal 
          isOpen={showProjectGallery} 
          onClose={() => setShowProjectGallery(false)}
          onSelectProject={(projectId) => {
            setSelectedProject(projectId);
            setIsExploding(true);
          }}
        />
      )}
    </>
  );
};

export default Terminal;
