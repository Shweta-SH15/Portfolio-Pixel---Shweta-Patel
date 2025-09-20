export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const badges: Badge[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Discovered the project list',
    icon: 'code'
  },
  {
    id: 'helper',
    name: 'Command Master',
    description: 'Found the help command',
    icon: 'terminal'
  },
  {
    id: 'opener',
    name: 'Project Opener',
    description: 'Opened your first project',
    icon: 'file-code'
  },
  {
    id: 'ai_master',
    name: 'AI Enthusiast',
    description: 'Explored an AI project',
    icon: 'file-search'
  },
  {
    id: 'career_explorer',
    name: 'Career Pioneer',
    description: 'Explored the career simulator',
    icon: 'badge'
  },
  {
    id: 'collector',
    name: 'Badge Collector',
    description: 'Checked your badge collection',
    icon: 'award'
  },
  {
    id: 'discoverer',
    name: 'Secret Finder',
    description: 'Discovered a hidden command',
    icon: 'star'
  },
  {
    id: 'tech_guru',
    name: 'Tech Stack Guru',
    description: 'Explored project technologies',
    icon: 'file-code'
  }
];
