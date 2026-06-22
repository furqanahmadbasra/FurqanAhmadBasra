export interface Certification {
  title: string;
  issuer: string;
  platform: string;
}

export const certifications: Certification[] = [
  {
    title: 'Web Development Bootcamp',
    issuer: 'Dr. Angela Yu',
    platform: 'Udemy',
  },
  {
    title: 'Advanced Python Programming',
    issuer: 'Cisco',
    platform: 'Networking Academy',
  },
  {
    title: 'Machine Learning',
    issuer: 'Andrew Ng',
    platform: 'Coursera',
  },
];
