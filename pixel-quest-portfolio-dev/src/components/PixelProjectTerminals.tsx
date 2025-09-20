import React from 'react';
import TerminalProjectConsole from './TerminalProjectConsole';
import { Copy, Code, FileCode, Award, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

const PixelProjectTerminals: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    toast({
      title: "Command copied!",
      description: `"${command}" copied to clipboard.`,
    });
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#33C3F0] mb-4">Interactive Project Explorer</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Type commands in the terminal below to discover my projects and earn badges!
            Try typing <span className="text-[#33C3F0] font-mono">help</span> to get started or <span className="text-[#33C3F0] font-mono">ls</span> to list all projects.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline" className="bg-blue-500/20 text-blue-200 border-blue-500/30 flex items-center gap-1.5">
              <Award size={12} />
              Hackathon
            </Badge>
            <Badge variant="outline" className="bg-green-500/20 text-green-200 border-green-500/30 flex items-center gap-1.5">
              <Code size={12} />
              AI
            </Badge>
            <Badge variant="outline" className="bg-yellow-500/20 text-yellow-200 border-yellow-500/30 flex items-center gap-1.5">
              <Star size={12} />
              Gamification
            </Badge>
            <Badge variant="outline" className="bg-purple-500/20 text-purple-200 border-purple-500/30 flex items-center gap-1.5">
              <FileCode size={12} />
              Full-Stack
            </Badge>
          </div>
          
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row justify-center'} gap-4 mt-6`}>
            <div className="bg-[#1a1633]/60 border border-[#33C3F0]/20 rounded-md px-4 py-2 text-sm font-mono text-[#33C3F0] relative group pixel-border">
              <code>ls</code>: List all projects
              <button 
                onClick={() => copyCommand('ls')} 
                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Copy command ls"
              >
                <Copy size={14} />
              </button>
            </div>
            <div className="bg-[#1a1633]/60 border border-[#33C3F0]/20 rounded-md px-4 py-2 text-sm font-mono text-[#33C3F0] relative group pixel-border">
              <code>open [id/name]</code>: View project details
              <button 
                onClick={() => copyCommand('open 1')} 
                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Copy command open 1"
              >
                <Copy size={14} />
              </button>
            </div>
            <div className="bg-[#1a1633]/60 border border-[#33C3F0]/20 rounded-md px-4 py-2 text-sm font-mono text-[#33C3F0] relative group pixel-border">
              <code>techstack [id]</code>: View project tech stack
              <button 
                onClick={() => copyCommand('techstack 1')} 
                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Copy command techstack 1"
              >
                <Copy size={14} />
              </button>
            </div>
            <div className="bg-[#1a1633]/60 border border-[#33C3F0]/20 rounded-md px-4 py-2 text-sm font-mono text-[#33C3F0] relative group pixel-border">
              <code>badges</code>: View earned badges
              <button 
                onClick={() => copyCommand('badges')} 
                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Copy command badges"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        </div>
        
        <TerminalProjectConsole />
      </div>
    </div>
  );
};

export default PixelProjectTerminals;
