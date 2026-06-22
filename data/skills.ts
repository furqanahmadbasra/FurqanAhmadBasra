export interface SkillModule {
  id: string;
  title: string;
  skills: string[];
  proficiency: number; // 0-100
  connections: string[]; // ids of connected modules
}

export const skillModules: SkillModule[] = [
  {
    id: 'programming',
    title: 'PROGRAMMING_LANGUAGES',
    skills: ['JavaScript', 'TypeScript', 'Python', 'C++', 'Java', 'C'],
    proficiency: 90,
    connections: ['frontend', 'backend', 'ai-ml'],
  },
  {
    id: 'frontend',
    title: 'FRONTEND_SYSTEMS',
    skills: ['React', 'Next.js', 'React Native', 'Flutter', 'HTML', 'CSS', 'Tailwind CSS'],
    proficiency: 92,
    connections: ['programming', 'backend'],
  },
  {
    id: 'backend',
    title: 'BACKEND_ENGINES',
    skills: ['Node.js', 'Express.js', 'Spring Boot', 'REST APIs', 'GraphQL', 'Socket.IO', 'WebSockets'],
    proficiency: 88,
    connections: ['programming', 'frontend', 'databases'],
  },
  {
    id: 'ai-ml',
    title: 'AI/ML_CORE',
    skills: ['Machine Learning', 'Deep Learning', 'NLP', 'RAG', 'LLM Apps', 'Speech Recognition', 'BiLSTM', 'XGBoost', 'Bayesian Networks'],
    proficiency: 85,
    connections: ['programming', 'ai-infra', 'data-science'],
  },
  {
    id: 'data-science',
    title: 'DATA_SCIENCE',
    skills: ['Data Cleaning', 'Feature Engineering', 'EDA', 'Statistical Analysis', 'Predictive Modeling', 'Visualization'],
    proficiency: 82,
    connections: ['ai-ml', 'ai-infra'],
  },
  {
    id: 'databases',
    title: 'DATABASES_&_VECTORS',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Pinecone', 'ChromaDB'],
    proficiency: 86,
    connections: ['backend', 'ai-infra', 'cloud'],
  },
  {
    id: 'cloud',
    title: 'CLOUD_&_DEVOPS',
    skills: ['Docker', 'Git', 'GitHub', 'CI/CD', 'DB Replication', 'Fault Tolerance', 'CRDT Sync'],
    proficiency: 78,
    connections: ['databases', 'backend'],
  },
  {
    id: 'dsa-systems',
    title: 'DSA_&_SYSTEMS',
    skills: ['OOP', 'Data Structures', 'Search Engine Design', 'Hash Tables', 'Inverted Indexes', 'TF-IDF', 'Compilers', 'ECC', 'Memory Scrubbing'],
    proficiency: 88,
    connections: ['programming', 'cloud'],
  },
  {
    id: 'ai-infra',
    title: 'AI_INFRASTRUCTURE',
    skills: ['PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'Sentence Transformers', 'Faster-Whisper', 'n8n'],
    proficiency: 83,
    connections: ['ai-ml', 'databases', 'data-science'],
  },
];
