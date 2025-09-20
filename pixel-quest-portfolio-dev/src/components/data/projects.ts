export interface Project {
  id: number;
  name: string;
  description: string;
  problem: string;
  approach: string;
  achievements: string[];
  technologiesUsed: string[];
  date?: string;
  badges?: string[];
  fullDescription?: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    name: "StudentSphere",
    description: "Campus Companion Platform",
    problem: "International and local students often struggle to find friends, roommates, housing, and trusted recommendations when adjusting to campus life.",
    approach: "Develop a social platform where students can connect through swiping, manage favorites, and discover accommodations and restaurants with a seamless, community-driven experience.",
    achievements: ["Launched full-stack app with live MongoDB Atlas integration", "Built swiping + favorites system for students", "Deployed on Render with real-time signup support"],
    technologiesUsed: ["Node.js", "Express", "MongoDB Atlas", "React", "Firebase Auth", "Tailwind CSS", "Render"],
    date: "01/2025 – Present",
    badges: ["Full-Stack", "Social Platform", "Student Life"],
    fullDescription: [
      "Built StudentSphere, a campus-focused platform where students can swipe to connect with friends and roommates, and discover accommodations and restaurants.",
      "Implemented a favorites system so users can like/unlike profiles and listings, with all data stored in MongoDB Atlas for persistence.",
      "Integrated Firebase authentication and middleware to secure routes and personalize experiences.",
      "Designed a responsive frontend with React.js and Tailwind CSS, and deployed the backend on Render with MongoDB Atlas as the cloud database."
    ]
  },
  {
    id: 2,
    name: "Astronomy FAQ",
    description: "Space Knowledge Base",
    problem: "Lack of accessible, comprehensive astronomical information.",
    approach: "Create an interactive app that answers complex astronomical queries.",
    achievements: ["NASA Space Apps Challenge Finalist", "10,000+ Questions Answered"],
    technologiesUsed: ["Ionic (Angular)", "Node.js/Express", "MongoDB"],
    date: "1/04/2025 – 9/4/2025",
    badges: ["Full-Stack", "FAQ System"],
    fullDescription: [
      "Built a full-stack FAQ app using Ionic (Angular) for frontend, Node.js/Express for backend, and MongoDB for data storage.",
      "Designed a 3-page sidemenu interface (Main, Listing, Update) with CRUD operations using Ionic services and Mongoose.",
      "Enabled dynamic database/collection creation, batch loading from file, and in-app item updates/deletion with confirmation dialogs.",
      "Implemented clean UI/UX using Ionic components, Action Sheets, and Alert dialogs for interactive user experience."
    ]
  },
  {
    id: 3,
    name: "Campus Buddy",
    description: "AI-Powered Student Companion",
    problem: "Students often struggle to manage academics, events, and resources effectively without a centralized system.",
    approach: "Develop an integrated AI-driven platform that combines study assistance, task management, and campus connectivity in one place.",
    achievements: ["Deployed AI-powered study tools", "Integrated voice assistant for real-time support"],
    technologiesUsed: ["React (Frontend)", "Node.js/Express (Backend)", "Python (AI Services)", "MongoDB/PostgreSQL"],
    date: "1/02/2025 – 9/06/2025",
    badges: ["Full-Stack", "AI Integration", "Student Productivity"],
    fullDescription: [
      "Built a full-stack web application with React frontend, Express backend, and Python microservices for AI features such as summarization, OCR, recommendations, and speech-to-text.",
      "Designed multiple student-focused pages including Profile, Events, Study Groups, Resources, Tasks, Progress Tracking, and Notifications.",
      "Integrated authentication, protected routes, and JWT-based security for personalized student experiences.",
      "Developed AI-driven study assistance tools (note summarization, sentiment analysis, resource recommendations) alongside a voice assistant for hands-free interaction.",
      "Implemented a clean, responsive UI with real-time feedback and dynamic content rendering for enhanced user engagement."
    ]
  },
  {
    id: 4,
    name: "NLP Sentiment Analysis",
    description: "Natural Language Processing Tool",
    problem: "Businesses need to understand customer sentiment at scale.",
    approach: "Develop a machine learning model that can analyze text and determine emotional tone.",
    achievements: ["Academic Research Publication", "99% Accuracy Rate"],
    technologiesUsed: ["Pandas", "Scikit-learn", "Flask"],
    date: "5/12/2024 – 9/12/2024",
    badges: ["Machine Learning", "Web App"],
    fullDescription: [
      "Built a sentiment analysis model using Yelp review data, classifying reviews as positive or negative based on star ratings.",
      "Employed CountVectorizer and TfidfTransformer to process and transform text data into features.",
      "Applied Multinomial Naive Bayes for text classification and used GridSearchCV to optimize hyperparameters.",
      "Achieved an optimized model and evaluated performance using an accuracy score, predicting sentiment with high precision.",
      "Used libraries such as Pandas, Scikit-learn, and Flask for data processing, modeling, and web deployment."
    ]
  }
];
