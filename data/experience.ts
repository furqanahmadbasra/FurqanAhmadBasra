export interface ExperienceEntry {
  id: string;
  timestamp: string;
  title: string;
  organization: string;
  status: 'COMPLETED' | 'IN_PROGRESS';
  details: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: 'internship',
    timestamp: 'Jun 2025 - Aug 2025',
    title: 'AI/ML Intern',
    organization: 'Agritech Cybersecurity Zone (NSTP)',
    status: 'COMPLETED',
    details: [
      'Worked on AI-assisted firewall concepts for threat detection, anomaly analysis, and real-time monitoring.',
      'Built machine learning workflows for data preprocessing, experimentation, and deployment-oriented evaluation.',
      'Explored how adaptive models can support modern cybersecurity systems beyond static rule sets.',
    ],
  },
  {
    id: 'client-work',
    timestamp: 'Client work',
    title: 'Frontend Developer',
    organization: 'Freelance',
    status: 'COMPLETED',
    details: [
      'Designed and implemented responsive client websites from business requirements.',
      'Focused on clean layouts, usability, accessibility, and consistent UI behavior across devices.',
      'Delivered production-ready frontend work with contact flows and maintainable content structure.',
    ],
  },
  {
    id: 'education',
    timestamp: '2023 - Present',
    title: 'BS Computer Science',
    organization: 'National University of Sciences and Technology (NUST)',
    status: 'IN_PROGRESS',
    details: [
      'Islamabad, Pakistan.',
      'CGPA: 3.16 / 4.00.',
      'Coursework and projects across AI, machine learning, compilers, operating systems, distributed systems, and data structures.',
    ],
  },
];
