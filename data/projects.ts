export type ProjectCategory = 'ai-ml' | 'full-stack' | 'systems' | 'security' | 'mobile';

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  semester: string;
  featured: boolean;
  github?: string;
  live?: string;
  highlights: string[];
}

export const categoryColors: Record<ProjectCategory, string> = {
  'ai-ml': '#2563eb',
  'full-stack': '#0f766e',
  systems: '#b45309',
  security: '#b91c1c',
  mobile: '#7c3aed',
};

export const categoryLabels: Record<ProjectCategory, string> = {
  'ai-ml': 'AI/ML & RAG',
  'full-stack': 'FULL-STACK',
  'systems': 'SYSTEMS & LOW-LEVEL',
  'security': 'SECURITY',
  'mobile': 'MOBILE',
};

export const projects: Project[] = [
  {
    slug: 'clutch-ai',
    title: 'Clutch.ai',
    tagline: 'Real-Time Interview Assistance System',
    description: 'Developed a real-time interview co-pilot capable of listening, transcribing, classifying, retrieving knowledge, and generating contextual assistance.',
    tech: ['Python', 'Deep Learning', 'RAG', 'ChromaDB', 'Faster-Whisper', 'BiLSTM', 'PyQt5'],
    category: 'ai-ml',
    semester: 'Semester 6',
    featured: true,
    highlights: [
      'Integrated Faster-Whisper for speech recognition with BiLSTM and Attention mechanism for intent classification',
      'Built retrieval-augmented generation (RAG) pipelines using MiniLM embeddings and ChromaDB',
      'Implemented cross-attention reranking and contrastive embedding fine-tuning for improved retrieval',
      'Developed PyQt5 overlay interfaces supporting both demonstration and stealth modes',
      'Led development of the speech processing pipeline including audio capture, VAD systems, and ASR integration',
    ],
  },
  {
    slug: 'flowra',
    title: 'Flowra',
    tagline: 'Agentic Agile Orchestration Platform',
    description: 'Designed an AI-assisted project coordination platform for Agile workflow automation that connects repositories and boards to verify real development progress.',
    tech: ['AI Agents', 'GitHub API', 'Jira API', 'Discord Bot', 'Analytics'],
    category: 'full-stack',
    semester: 'Semester 6',
    featured: true,
    highlights: [
      'Connected GitHub repositories, Jira boards, and communication platforms to verify real progress',
      'Implemented proof-of-work verification using commits, pull requests, reviews, and communication signals',
      'Generated role-specific performance analytics and sprint-level contribution metrics for teams',
      'Automated Jira workflow recommendations subject to managerial approval',
      'Supported automated project tracking by analyzing daily standups, blockers, and completion signals',
    ],
  },
  {
    slug: 'search-engine',
    title: 'Search Engine',
    tagline: 'Custom C++ Search Engine from Scratch',
    description: 'Built a search engine from scratch in C++ without STL, implementing custom hash tables, lexicons, forward indexes, and inverted indexes.',
    tech: ['C++', 'React', 'Crow', 'TF-IDF', 'Inverted Index'],
    category: 'systems',
    semester: 'Semester 3',
    featured: true,
    highlights: [
      'Developed backend APIs using the Crow framework and integrated them with a React frontend',
      'Implemented custom hash tables, lexicons, forward indexes, and inverted indexes without STL',
      'Implemented TF-IDF ranking and barrel indexing for efficient document retrieval',
      'Processed and indexed 50,000+ documents while maintaining sub-50ms query response times',
      'Exposed search functionality through REST APIs to support scalable frontend interactions',
    ],
  },
  {
    slug: 'document-intelligence',
    title: 'Document Intelligence System',
    tagline: 'RAG-Based Q&A Platform',
    description: 'Built an intelligent question-answering platform capable of extracting answers directly from uploaded documents using retrieval-augmented generation.',
    tech: ['Python', 'NLP', 'RAG', 'LLMs', 'Embedding Models'],
    category: 'ai-ml',
    semester: 'Semester 6',
    featured: true,
    highlights: [
      'Implemented document parsing, chunking, embedding generation, and semantic retrieval pipelines',
      'Integrated large language models with retrieval-augmented generation to provide grounded responses',
      'Supported natural language querying across multiple document formats for broader accessibility',
      'Built retrieval pipelines to locate relevant information from large document collections before generation',
    ],
  },
  {
    slug: 'dreamhome',
    title: 'DreamHome',
    tagline: 'Collaborative Interior Design Platform',
    description: 'Developed a real-time collaborative interior design system for shared room planning, implementing WebSocket-based synchronization with low-latency editing.',
    tech: ['React', 'Node.js', 'Socket.IO', 'PostgreSQL', 'Redis', 'CRDT'],
    category: 'full-stack',
    semester: 'Semester 6',
    featured: true,
    highlights: [
      'Implemented WebSocket-based synchronization with low-latency collaborative editing',
      'Designed CRDT-based conflict resolution mechanisms for concurrent user actions',
      'Developed fault-tolerant persistence using replicated databases and recovery mechanisms',
      'Planned scalable room sharding and distributed architecture for supporting large user bases',
      'Designed backend architecture for fault tolerance, failover, and horizontal scalability',
    ],
  },
  {
    slug: 'ecc-simulator',
    title: 'ECC Memory Scrubbing Simulator',
    tagline: 'OS Reliability Engineering Simulator',
    description: 'Developed an interactive simulator modeling Error-Correcting Codes (ECC) and memory scrubbing in OS-oriented computer systems.',
    tech: ['Python', 'PySide6', 'ECC', 'Hamming Codes', 'System Simulation'],
    category: 'systems',
    semester: 'Semester 5',
    featured: false,
    highlights: [
      'Implemented Hamming SEC-DED algorithms for single-error correction and double-error detection',
      'Simulated transient hardware faults, memory bit flips, and subsystem reliability under fault conditions',
      'Integrated memory controller, CPU scheduling, thermal management, networking, storage, and security modules',
      'Built a PySide6 GUI for real-time visualization of fault injection, correction events, and system health metrics',
    ],
  },
  {
    slug: 'compiler',
    title: 'Custom Compiler',
    tagline: 'Compiler for Custom Instruction Set',
    description: 'Designed and implemented a compiler for a custom instruction language, handling parsing, semantic validation, and code generation.',
    tech: ['Compiler Construction', 'Parsing', 'Code Generation', 'Virtual Machine'],
    category: 'systems',
    semester: 'Semester 6',
    featured: false,
    highlights: [
      'Developed lexical analysis, syntax analysis, semantic validation, and code generation modules',
      'Constructed parsing mechanisms and translation workflows for instruction execution',
      'Designed complete compiler architecture for translating custom instructions into executable workflows',
    ],
  },
  {
    slug: 'ai-email-reply',
    title: 'AI Email Reply System',
    tagline: 'Context-Aware AI Email Automation',
    description: 'Developed backend automation pipelines to process and classify incoming emails in real time using Pinecone vector database for context-aware responses.',
    tech: ['React', 'Node.js', 'MongoDB', 'Pinecone', 'n8n'],
    category: 'ai-ml',
    semester: 'Semester 5',
    featured: false,
    highlights: [
      'Integrated Pinecone vector database for context-aware AI responses across multi-turn conversations',
      'Built React frontend supporting editable responses, conversation history tracking, and voice/chat interaction',
      'Implemented version control for generated replies and workflow automation using n8n',
    ],
  },
  {
    slug: 'crop-yield',
    title: 'Crop Yield Prediction',
    tagline: 'ML-Based Agricultural Decision Support',
    description: 'Trained and optimized Random Forest and XGBoost models achieving approximately 92% prediction accuracy for agricultural decision support.',
    tech: ['Python', 'Random Forest', 'XGBoost', 'Flask', 'Scikit-learn'],
    category: 'ai-ml',
    semester: 'Semester 5',
    featured: false,
    highlights: [
      'Applied feature engineering techniques to improve prediction quality from soil and weather datasets',
      'Trained Random Forest and XGBoost regression models achieving approximately 92% prediction accuracy',
      'Generated visual reports and performance evaluations for agricultural decision support',
    ],
  },
  {
    slug: 'disease-prediction',
    title: 'Disease Prediction System',
    tagline: 'Bayesian Network Medical Diagnosis',
    description: 'Developed a disease prediction system using Bayesian Networks to model probabilistic relationships between symptoms and diseases.',
    tech: ['Python', 'Bayesian Networks', 'Probabilistic Inference'],
    category: 'ai-ml',
    semester: 'Semester 3',
    featured: false,
    highlights: [
      'Implemented inference mechanisms to estimate disease likelihood based on user-provided symptoms',
      'Evaluated prediction accuracy and explored uncertainty-aware decision making',
      'Applied probabilistic modeling to evaluate complex symptom relationships',
    ],
  },
  {
    slug: 'eventify',
    title: 'Eventify',
    tagline: 'Event Management Platform',
    description: 'Developed backend APIs for event creation, registration, and administrative management, including role-based access control.',
    tech: ['React', 'Node.js', 'MongoDB', 'Leaflet.js'],
    category: 'full-stack',
    semester: 'Semester 4',
    featured: false,
    highlights: [
      'Implemented role-based access control for participants, hosts, and administrators',
      'Integrated Leaflet.js for map-based event discovery and location-aware search',
      'Built responsive React interfaces with dynamic event listings and real-time updates',
    ],
  },
  {
    slug: 'mobile-cover-store',
    title: 'Custom Mobile Cover Store',
    tagline: 'E-Commerce Customization Platform',
    description: 'Developed an e-commerce platform for personalized mobile cover customization, enabling image uploads, design previews, and workflows.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    category: 'full-stack',
    semester: 'Semester 4',
    featured: false,
    highlights: [
      'Enabled image uploads, design previews, and extensive customization workflows',
      'Integrated secure payment processing and administrative order management features',
      'Designed scalable PostgreSQL database schemas using the Prisma ORM',
    ],
  },
  {
    slug: 'iot-dashboard',
    title: 'IoT Device Management',
    tagline: 'Real-Time IoT Monitoring Platform',
    description: 'Developed an IoT monitoring platform supporting device registration, real-time status tracking, and visualized sensor data.',
    tech: ['React', 'Node.js', 'MongoDB', 'MQTT'],
    category: 'full-stack',
    semester: 'Semester 4',
    featured: false,
    highlights: [
      'Built interactive dashboards for visualizing real-time sensor data and device health metrics',
      'Developed a scalable IoT monitoring platform supporting bulk device registration and status tracking',
      'Designed robust REST APIs and scalable MongoDB schemas for long-term device management',
    ],
  },
  {
    slug: 'fifa-analytics',
    title: 'FIFA Recruitment Analytics',
    tagline: 'Data-Driven Player Scouting',
    description: 'Conducted comprehensive football player analytics for a simulated recruitment agency to identify optimal recruitment targets.',
    tech: ['Python', 'Plotly Dash', 'Pandas', 'Data Visualization'],
    category: 'ai-ml',
    semester: 'Semester 5',
    featured: false,
    highlights: [
      'Evaluated players based on age, overall ratings, performance metrics, market value, and potential growth',
      'Built visualizations and analytical dashboards to identify optimal recruitment targets',
      'Applied data-driven decision making to support strategic transfer and scouting strategies',
    ],
  },
  {
    slug: 'gmail-chat',
    title: 'Gmail Chat Application',
    tagline: 'Real-Time Firebase Chat',
    description: 'Developed a mobile chat application using Flutter with Firebase Authentication, Firestore, and push notifications.',
    tech: ['Flutter', 'Firebase', 'Firestore', 'FCM'],
    category: 'mobile',
    semester: 'Additional',
    featured: false,
    highlights: [
      'Implemented one-on-one and group chat functionality with message history storage',
      'Used Firebase Authentication for secure Google sign-in and account management',
      'Added push notifications via Firebase Cloud Messaging for background alerts',
    ],
  },
  {
    slug: 'ai-firewall',
    title: 'AI-Powered Firewall Research',
    tagline: 'ML-Based Cybersecurity Research',
    description: 'Contributed to the development of AI-powered firewall systems for threat detection, traffic analysis, anomaly identification, and monitoring.',
    tech: ['AI', 'Machine Learning', 'Cybersecurity', 'Network Analysis'],
    category: 'security',
    semester: 'Additional',
    featured: false,
    highlights: [
      'Explored intelligent threat detection, anomaly analysis, and automated monitoring systems',
      'Investigated practical machine learning applications for modern firewall architectures',
      'Supported research initiatives at the Agritech Cybersecurity Zone during internship',
    ],
  },
  {
    slug: 'tic-tac-toe',
    title: 'Tic-Tac-Toe Game',
    tagline: 'Console Game in C',
    description: 'Developed a console-based Tic-Tac-Toe game using C programming with core algorithms for game states.',
    tech: ['C', 'Game Logic', 'Arrays', 'Functions'],
    category: 'systems',
    semester: 'Semester 1',
    featured: false,
    highlights: [
      'Implemented core game logic, user input validation, turn management, and win-condition detection',
      'Applied fundamental programming concepts including loops, functions, arrays, and conditional logic',
      'Developed a reliable console-based interface for interactive two-player sessions',
    ],
  },
  {
    slug: 'laptop-store-management',
    title: 'Laptop Store Management System',
    tagline: 'E-Commerce and Inventory Platform',
    description: 'Developed a full-stack e-commerce platform for laptop sales using Spring Boot and MySQL for inventory and customer management.',
    tech: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Thymeleaf'],
    category: 'full-stack',
    semester: 'Semester 2',
    featured: false,
    highlights: [
      'Implemented user authentication, secure product management, shopping cart, and order processing',
      'Designed robust REST APIs and integrated database operations for real-time inventory management',
      'Built backend services supporting scalable e-commerce transactions and data storage',
    ],
  },
  {
    slug: 'information-security-risk-assessment',
    title: 'Information Security Risk Assessment',
    tagline: 'Enterprise Security Risk Register',
    description: 'Performed a comprehensive risk assessment for a simulated enterprise environment to identify assets, threats, and vulnerabilities.',
    tech: ['Information Security', 'Risk Assessment', 'Security Controls', 'Documentation'],
    category: 'security',
    semester: 'Semester 3',
    featured: false,
    highlights: [
      'Identified critical assets, potential threats, active vulnerabilities, and risk exposure levels',
      'Evaluated mitigation strategies and prioritized organizational risks based on likelihood and impact',
      'Produced comprehensive security recommendations aligned with standard industry risk management practices',
    ],
  },
  {
    slug: 'client-website-development',
    title: 'Client Website Development',
    tagline: 'Responsive Frontend Client Work',
    description: 'Designed and implemented a responsive client website according to specific business requirements and design constraints.',
    tech: ['React', 'Frontend Development', 'Responsive Design', 'Accessibility'],
    category: 'full-stack',
    semester: 'Additional',
    featured: false,
    highlights: [
      'Designed and implemented a production-ready frontend according to precise client specifications',
      'Focused strictly on responsive design, cross-device usability, and modern UI/UX principles',
      'Delivered a polished web experience fully optimized across multiple screen sizes and categories',
    ],
  },
];

export const featuredProjects = projects.filter(p => p.featured);
export const allProjects = projects;


