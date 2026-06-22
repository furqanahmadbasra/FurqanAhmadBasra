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
    description: 'A real-time interview co-pilot capable of listening, transcribing, classifying intent, retrieving knowledge via RAG, and generating contextual interview assistance.',
    tech: ['Python', 'Deep Learning', 'RAG', 'ChromaDB', 'Faster-Whisper', 'BiLSTM', 'PyQt5'],
    category: 'ai-ml',
    semester: 'Semester 6',
    featured: true,
    highlights: [
      'Integrated Faster-Whisper for speech recognition with BiLSTM + Attention for intent classification',
      'Built RAG pipelines using MiniLM embeddings and ChromaDB',
      'Implemented cross-attention reranking and contrastive embedding fine-tuning',
      'Developed PyQt5 overlay interfaces supporting demo and stealth modes',
      'Engineered low-latency audio stack routing mic and system audio to ASR',
    ],
  },
  {
    slug: 'flowra',
    title: 'Flowra',
    tagline: 'Agentic Agile Orchestration Platform',
    description: 'AI-assisted project coordination platform for Agile workflow automation. Connects GitHub, Jira, and Discord to verify real development progress.',
    tech: ['AI Agents', 'GitHub API', 'Jira API', 'Discord Bot', 'Analytics'],
    category: 'full-stack',
    semester: 'Semester 6',
    featured: true,
    highlights: [
      'Connected GitHub repos, Jira boards, and communication platforms',
      'Implemented proof-of-work verification using commits, PRs, reviews, and communication signals',
      'Generated role-specific performance analytics and sprint-level contribution metrics',
      'Automated Jira workflow recommendations subject to managerial approval',
      'Built evidence dashboard highlighting discrepancies between reported and actual activity',
    ],
  },
  {
    slug: 'search-engine',
    title: 'Search Engine',
    tagline: 'Custom C++ Search Engine from Scratch',
    description: 'Built from scratch in C++ without STL. Custom hash tables, lexicons, forward/inverted indexes. TF-IDF ranking with 50,000+ documents indexed and sub-50ms queries.',
    tech: ['C++', 'React', 'Crow', 'TF-IDF', 'Inverted Index'],
    category: 'systems',
    semester: 'Semester 3',
    featured: true,
    highlights: [
      'Implemented custom hash tables, lexicons, forward indexes, and inverted indexes without STL',
      'Developed backend APIs using the Crow framework integrated with a React frontend',
      'Implemented TF-IDF ranking and barrel indexing for efficient document retrieval',
      'Processed and indexed 50,000+ documents with sub-50ms query response times',
      'Added phrase queries and wildcard search using a positional index',
    ],
  },
  {
    slug: 'document-intelligence',
    title: 'Document Intelligence System',
    tagline: 'RAG-Based Q&A Platform',
    description: 'Intelligent question-answering platform that extracts answers directly from uploaded documents using RAG pipelines with source citation highlighting.',
    tech: ['Python', 'NLP', 'RAG', 'LLMs', 'Embedding Models'],
    category: 'ai-ml',
    semester: 'Semester 6',
    featured: true,
    highlights: [
      'Implemented document parsing, chunking, embedding generation, and semantic retrieval',
      'Integrated LLMs with retrieval-augmented generation for grounded responses',
      'Added source citation highlighting showing exact passages used for each answer',
      'Optimized chunking strategies for PDF, DOCX, TXT to preserve context',
    ],
  },
  {
    slug: 'dreamhome',
    title: 'DreamHome',
    tagline: 'Collaborative Interior Design Platform',
    description: 'Real-time collaborative interior design system with CRDT-based conflict resolution, WebSocket sync, and fault-tolerant replicated databases.',
    tech: ['React', 'Node.js', 'Socket.IO', 'PostgreSQL', 'Redis', 'CRDT'],
    category: 'full-stack',
    semester: 'Semester 6',
    featured: true,
    highlights: [
      'Implemented WebSocket-based synchronization with low-latency collaborative editing',
      'Designed CRDT-based conflict resolution for concurrent user actions',
      'Developed fault-tolerant persistence using replicated databases',
      'Built drag-and-drop furniture placement with snap-to-grid and layer management',
      'Added presence indicators, cursor tracking, and shared undo/redo',
    ],
  },
  {
    slug: 'ecc-simulator',
    title: 'ECC Memory Scrubbing Simulator',
    tagline: 'OS Reliability Engineering Simulator',
    description: 'Interactive simulator modeling Error-Correcting Codes and memory scrubbing with Hamming SEC-DED algorithms.',
    tech: ['Python', 'PySide6', 'ECC', 'Hamming Codes', 'System Simulation'],
    category: 'systems',
    semester: 'Semester 5',
    featured: false,
    highlights: [
      'Implemented Hamming SEC-DED for single-error correction and double-error detection',
      'Simulated transient hardware faults, memory bit flips, and subsystem reliability',
      'Built PySide6 GUI for real-time visualization of fault injection and correction',
      'Generated reliability reports with MTTF and correction coverage statistics',
    ],
  },
  {
    slug: 'compiler',
    title: 'Custom Compiler',
    tagline: 'Compiler for Custom Instruction Set',
    description: 'Full compiler with lexical analysis, syntax analysis, semantic validation, and code generation for a custom instruction language.',
    tech: ['Compiler Construction', 'Parsing', 'Code Generation', 'Virtual Machine'],
    category: 'systems',
    semester: 'Semester 6',
    featured: false,
    highlights: [
      'Developed lexical analysis, syntax analysis, semantic validation, and code generation modules',
      'Added support for variable scoping, loops, and conditionals',
      'Generated intermediate three-address code',
      'Built a simple assembler converting to executable bytecode for a custom VM',
    ],
  },
  {
    slug: 'ai-email-reply',
    title: 'AI Email Reply System',
    tagline: 'Context-Aware AI Email Automation',
    description: 'Backend automation pipelines to process and classify incoming emails with context-aware AI responses via Pinecone vector database.',
    tech: ['React', 'Node.js', 'MongoDB', 'Pinecone', 'n8n'],
    category: 'ai-ml',
    semester: 'Semester 5',
    featured: false,
    highlights: [
      'Integrated Pinecone vector database for context-aware AI responses',
      'Designed intent classifier routing emails to appropriate response templates',
      'Reduced manual reply drafting time by ~40%',
    ],
  },
  {
    slug: 'crop-yield',
    title: 'Crop Yield Prediction',
    tagline: 'ML-Based Agricultural Decision Support',
    description: 'Random Forest and XGBoost models achieving ~92% prediction accuracy for crop yield based on soil and weather data.',
    tech: ['Python', 'Random Forest', 'XGBoost', 'Flask', 'Scikit-learn'],
    category: 'ai-ml',
    semester: 'Semester 5',
    featured: false,
    highlights: [
      'Trained Random Forest and XGBoost models achieving ~92% accuracy',
      'Performed hyperparameter tuning using GridSearchCV and cross-validation',
      'Built Flask API for custom input predictions',
    ],
  },
  {
    slug: 'disease-prediction',
    title: 'Disease Prediction System',
    tagline: 'Bayesian Network Medical Diagnosis',
    description: 'Disease prediction using Bayesian Networks to model probabilistic relationships between symptoms and diseases.',
    tech: ['Python', 'Bayesian Networks', 'Probabilistic Inference'],
    category: 'ai-ml',
    semester: 'Semester 3',
    featured: false,
    highlights: [
      'Created a network of 25+ symptoms and 10+ diseases',
      'Visualized belief propagation process',
      'Generated ranked differential diagnoses with confidence scores',
    ],
  },
  {
    slug: 'eventify',
    title: 'Eventify',
    tagline: 'Event Management Platform',
    description: 'Full-stack event platform with role-based access, map-based discovery via Leaflet.js, and RSVP management.',
    tech: ['React', 'Node.js', 'MongoDB', 'Leaflet.js'],
    category: 'full-stack',
    semester: 'Semester 4',
    featured: false,
    highlights: [
      'Implemented role-based access control for participants, hosts, and administrators',
      'Integrated Leaflet.js for map-based event discovery',
      'Added RSVP tracking and email confirmation flows',
    ],
  },
  {
    slug: 'mobile-cover-store',
    title: 'Custom Mobile Cover Store',
    tagline: 'E-Commerce Customization Platform',
    description: 'E-commerce platform for personalized mobile cover customization with canvas-based design tools.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    category: 'full-stack',
    semester: 'Semester 4',
    featured: false,
    highlights: [
      'Implemented canvas-based design tool with text, stickers, and layout controls',
      'Integrated payment processing and admin order management',
      'Added order tracking from production to shipment',
    ],
  },
  {
    slug: 'iot-dashboard',
    title: 'IoT Device Management',
    tagline: 'Real-Time IoT Monitoring Platform',
    description: 'IoT monitoring platform with real-time sensor data visualization, MQTT streams, and threshold-based alerts.',
    tech: ['React', 'Node.js', 'MongoDB', 'MQTT'],
    category: 'full-stack',
    semester: 'Semester 4',
    featured: false,
    highlights: [
      'Simulated sensor data streams using MQTT',
      'Displayed live charts for temperature, humidity, and battery levels',
      'Implemented alert rules triggering email notifications',
    ],
  },
  {
    slug: 'fifa-analytics',
    title: 'FIFA Recruitment Analytics',
    tagline: 'Data-Driven Player Scouting',
    description: 'Football player analytics with interactive dashboards, cluster analysis, and recruitment optimization.',
    tech: ['Python', 'Plotly Dash', 'Pandas', 'Data Visualization'],
    category: 'ai-ml',
    semester: 'Semester 5',
    featured: false,
    highlights: [
      'Created interactive dashboard filtering by position, league, and value',
      'Performed cluster analysis to group players into tactical archetypes',
    ],
  },
  {
    slug: 'gmail-chat',
    title: 'Gmail Chat Application',
    tagline: 'Real-Time Firebase Chat',
    description: 'Real-time chat application using Flutter with Firebase Authentication, Firestore, and push notifications.',
    tech: ['Flutter', 'Firebase', 'Firestore', 'FCM'],
    category: 'mobile',
    semester: 'Additional',
    featured: false,
    highlights: [
      'One-on-one and group chat with typing indicators and read receipts',
      'Push notifications via Firebase Cloud Messaging',
      'Material design interface with dark mode support',
    ],
  },
  {
    slug: 'ai-firewall',
    title: 'AI-Powered Firewall Research',
    tagline: 'ML-Based Cybersecurity Research',
    description: 'AI-assisted cybersecurity concepts for intelligent threat detection and anomaly analysis during NSTP internship.',
    tech: ['AI', 'Machine Learning', 'Cybersecurity', 'Network Analysis'],
    category: 'security',
    semester: 'Additional',
    featured: false,
    highlights: [
      'Trained anomaly detection models on network traffic logs',
      'Proposed adaptive detection threshold feedback loop',
    ],
  },
  {
    slug: 'tic-tac-toe',
    title: 'Tic-Tac-Toe Game',
    tagline: 'Console Game in C',
    description: 'A console-based two-player Tic-Tac-Toe game built in C with clean turn handling, input validation, replay support, and draw detection.',
    tech: ['C', 'Game Logic', 'Arrays', 'Functions'],
    category: 'systems',
    semester: 'Semester 1',
    featured: false,
    highlights: [
      'Implemented turn management, win-condition detection, and input validation',
      'Built a clean terminal interface with real-time feedback after each move',
      'Added draw detection and a simple replay feature without dynamic memory allocation',
    ],
  },
  {
    slug: 'laptop-store-management',
    title: 'Laptop Store Management System',
    tagline: 'E-Commerce and Inventory Platform',
    description: 'A full-stack laptop store platform using Java, Spring Boot, and MySQL with product management, authentication, cart, orders, and admin inventory features.',
    tech: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Thymeleaf'],
    category: 'full-stack',
    semester: 'Semester 2',
    featured: false,
    highlights: [
      'Implemented authentication, product management, shopping cart, and order processing',
      'Designed REST APIs and database operations for inventory and customer management',
      'Built admin tools for inventory tracking, sales reports, and user management',
    ],
  },
  {
    slug: 'information-security-risk-assessment',
    title: 'Information Security Risk Assessment',
    tagline: 'Enterprise Security Risk Register',
    description: 'A structured information security assessment for a simulated enterprise environment, covering assets, threats, vulnerabilities, risk ratings, and mitigation recommendations.',
    tech: ['Information Security', 'Risk Assessment', 'Security Controls', 'Documentation'],
    category: 'security',
    semester: 'Semester 3',
    featured: false,
    highlights: [
      'Identified assets, threats, vulnerabilities, and exposure levels across organizational systems',
      'Prioritized risks using likelihood and business impact ratings',
      'Produced a risk register with recommended controls and mitigation strategies',
    ],
  },
  {
    slug: 'client-website-development',
    title: 'Client Website Development',
    tagline: 'Responsive Frontend Client Work',
    description: 'A production-ready frontend website delivered for a client, focused on responsive design, accessibility, usability, and maintainable UI structure.',
    tech: ['React', 'Frontend Development', 'Responsive Design', 'Accessibility'],
    category: 'full-stack',
    semester: 'Additional',
    featured: false,
    highlights: [
      'Designed and implemented a responsive website according to business requirements',
      'Focused on usability, accessibility, spacing, and consistent visual design',
      'Delivered a polished experience optimized across multiple device categories',
    ],
  },
];

export const featuredProjects = projects.filter(p => p.featured);
export const allProjects = projects;


