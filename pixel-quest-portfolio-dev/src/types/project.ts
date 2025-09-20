
export interface ProjectBasic {
    id: number;
    name: string;
    description: string;
    problem: string;
    approach: string;
    achievements: string[];
    technologiesUsed: string[];
  }
  
  export interface Project {
    id: number;
    title: string;
    description: string;
    details: string;
    bgGradient: string;
    buttonGradient: string;
    buttonText: string;
    image?: string;
  }
  