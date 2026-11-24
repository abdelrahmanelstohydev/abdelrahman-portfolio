import {
  PersonalDetails,
  AboutCard,
  StatItem,
  EducationItem,
  ExperienceItem,
  SkillCategory,
  ProjectItem,
  TestimonialItem,
  ServiceItem,
} from '../models/portfolio.model';

export const PERSONAL_DATA: PersonalDetails = {
  name: 'Abdelrahman Elstohy',
  roleTitles: ['Junior Full-Stack Web Developer', 'MEAN Stack Developer', 'Backend Developer'],
  university: 'Mansoura University',
  faculty: 'Faculty of Computer Science',
  status: 'Third-Year Computer Science Student',
  bio: `I'm Abdelrahman Elstohy, a third-year Computer Science student at Mansoura University and a MEAN Stack trainee at the National Telecommunication Institute (NTI). I build full-stack web applications using JavaScript, Angular, Node.js, Express.js, and MongoDB, with a strong foundation in C#, object-oriented programming, and computer science fundamentals. I'm particularly interested in backend development, API design, and building reliable applications.`,
  aboutIntro: `I'm a third-year Computer Science student at Mansoura University focused on full-stack web development and backend engineering.`,
  aboutSecondary: `I work with JavaScript, TypeScript, Angular, Node.js, Express.js, and MongoDB. I also have an advanced foundation in C# and OOP, alongside experience with REST APIs, database design, and responsive interfaces.`,
  aboutBelief: `I believe strong developers keep learning, understand the problems they solve, and write code that is clear, maintainable, and useful.`,
  aboutConclusion: `I'm open to internships, junior full-stack and backend opportunities, and freelance projects where I can contribute, collaborate, and continue growing as a software developer.`,
  profileImage: 'assets/images/profile.jpeg',
  cvUrl: 'assets/files/cv.pdf',
  whatsappUrl: 'https://wa.me/201097070200',
  whatsappDisplay: '+20 01097070200',
  email: 'abdelrahmanelstohy.dev@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/abdelrahman-elstohy/',
  githubUrl: 'https://github.com/abdelrahmanelstohydev',
};

export const ABOUT_CARDS: AboutCard[] = [
  {
    title: 'Problem Solver', subtitle: 'Computer Science Fundamentals',
    description: 'Building logical thinking through programming practice, data structures, algorithms, and debugging.',
    icon: 'bi-lightbulb', badge: 'Core Skill',
  },
  {
    title: 'Full-Stack Developer', subtitle: 'MEAN Stack Development',
    description: 'Building full-stack applications by connecting Angular interfaces, Node.js and Express APIs, and MongoDB data storage.',
    icon: 'bi-journal-code', badge: 'Current Focus',
  },
  {
    title: 'Continuous Learner', subtitle: 'Always Improving',
    description: 'Developing practical skills through university study, technical training, and hands-on projects.',
    icon: 'bi-cpu', badge: 'Growth Mindset',
  },
];

export const STATS_DATA: StatItem[] = [
  { id: 'education', value: '3rd', label: 'University Year', description: 'Computer Science at Mansoura University', icon: 'bi-mortarboard', isPlaceholder: false },
  { id: 'training', value: '2026', label: 'MEAN Stack Training', description: 'National Telecommunication Institute (NTI)', icon: 'bi-code-slash', isPlaceholder: false },
  { id: 'stack', value: 'MEAN', label: 'Development Focus', description: 'MongoDB, Express, Angular, and Node.js', icon: 'bi-layers-half', isPlaceholder: false },
];

export const EDUCATION_DATA: EducationItem = {
  institution: 'Mansoura University',
  faculty: 'Faculty of Computer Science',
  fieldOfStudy: 'Computer Science',
  degree: "Bachelor's Degree (In Progress)",
  status: 'Third-Year Student',
  startYear: 'Third Year',
  expectedGraduation: '2028',
  description: 'Studying Computer Science at Mansoura University, with coursework and practical learning in programming, data structures, algorithms, databases, and software development.',
  coursework: ['Programming', 'Object-Oriented Programming', 'Data Structures', 'Algorithms', 'Database Systems', 'Web Development'],
  achievements: ['MEAN Stack training at the National Telecommunication Institute (NTI), 2026'],
  isPlaceholderDetails: false,
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'nti-mean-training',
    title: 'MEAN Stack Trainee',
    company: 'National Telecommunication Institute (NTI)',
    employmentType: 'Technical Training',
    location: 'Egypt',
    period: '2026',
    description: 'Completed practical training focused on full-stack web development using the MEAN stack, including client-side development, server-side programming, and database integration.',
    responsibilities: [
      'Practiced building web interfaces with HTML, CSS, JavaScript, TypeScript, and Angular.',
      'Worked with Node.js and Express to understand server-side development and REST APIs.',
      'Learned MongoDB fundamentals and how to connect application layers.',
      'Collaborated on a team feature involving payment gateway integration.',
    ],
    technologies: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'JavaScript', 'TypeScript'],
    isPlaceholder: false,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages', title: 'Programming Languages', icon: 'bi-code-slash', description: 'Languages used in coursework and web development',
    skills: [
      { name: 'JavaScript', icon: 'bi-filetype-js', category: 'languages', highlight: true, proficiency: 'Advanced' },
      { name: 'TypeScript', icon: 'bi-filetype-tsx', category: 'languages', highlight: true, proficiency: 'Good' },
      { name: 'C#', icon: 'bi-filetype-cs', category: 'languages', proficiency: 'Advanced' },
      { name: 'C++', icon: 'bi-filetype-cpp', category: 'languages' },
    ],
  },
  {
    id: 'backend', title: 'Back-End Development', icon: 'bi-hdd-network', description: 'Server-side development and API fundamentals',
    skills: [
      { name: 'Node.js', icon: 'bi-node-plus', category: 'backend', highlight: true, proficiency: 'Good' },
      { name: 'Express.js', icon: 'bi-hdd-network', category: 'backend', highlight: true, proficiency: 'Good' },
      { name: 'REST APIs', icon: 'bi-arrow-left-right', category: 'backend', highlight: true },
      { name: 'Authentication', icon: 'bi-shield-lock', category: 'backend' },
    ],
  },
  {
    id: 'frontend', title: 'Front-End Development', icon: 'bi-window-sidebar', description: 'Responsive and interactive web interfaces',
    skills: [
      { name: 'HTML5', icon: 'bi-filetype-html', category: 'frontend', proficiency: 'Advanced' },
      { name: 'CSS3', icon: 'bi-filetype-css', category: 'frontend', proficiency: 'Advanced' },
      { name: 'JavaScript', icon: 'bi-filetype-js', category: 'frontend', proficiency: 'Advanced' },
      { name: 'TypeScript', icon: 'bi-filetype-tsx', category: 'frontend', proficiency: 'Good' },
      { name: 'Angular', icon: 'bi-triangle-half', category: 'frontend', highlight: true, proficiency: 'Good' },
      { name: 'Bootstrap', icon: 'bi-bootstrap', category: 'frontend', proficiency: 'Advanced' },
    ],
  },
  {
    id: 'databases', title: 'Databases', icon: 'bi-database', description: 'Working with document and relational database concepts',
    skills: [
      { name: 'MongoDB', icon: 'bi-database', category: 'databases', highlight: true, proficiency: 'Good' },
      { name: 'MongoDB Compass', icon: 'bi-window', category: 'databases' },
      { name: 'SQL Fundamentals', icon: 'bi-filetype-sql', category: 'databases' },
      { name: 'Database Design', icon: 'bi-diagram-2', category: 'databases' },
    ],
  },
  {
    id: 'fundamentals', title: 'Computer Science Fundamentals', icon: 'bi-mortarboard', description: 'Foundations for problem solving and software development',
    skills: [
      { name: 'Object-Oriented Programming', icon: 'bi-puzzle', category: 'fundamentals', highlight: true },
      { name: 'Data Structures', icon: 'bi-node-plus', category: 'fundamentals', highlight: true },
      { name: 'Algorithms', icon: 'bi-diagram-3', category: 'fundamentals' },
      { name: 'Problem Solving', icon: 'bi-lightning-charge', category: 'fundamentals', highlight: true },
      { name: 'MVC Pattern', icon: 'bi-diagram-3-fill', category: 'fundamentals' },
    ],
  },
  {
    id: 'communication', title: 'Languages', icon: 'bi-translate', description: 'Languages used for communication',
    skills: [
      { name: 'English', icon: 'bi-globe', category: 'communication', proficiency: 'Intermediate' },
    ],
  },
  {
    id: 'tools', title: 'Development Tools', icon: 'bi-tools', description: 'Tools used during learning and development',
    skills: [
      { name: 'Git', icon: 'bi-git', category: 'tools', highlight: true, proficiency: 'Good' },
      { name: 'GitHub', icon: 'bi-github', category: 'tools', highlight: true, proficiency: 'Good' },
      { name: 'Visual Studio Code', icon: 'bi-terminal', category: 'tools' },
      { name: 'Postman', icon: 'bi-send-check', category: 'tools' },
      { name: 'MongoDB Compass', icon: 'bi-database', category: 'tools' },
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'northstar-shop', title: 'Northstar Shop', category: 'fullstack', categoryLabel: 'Personal Full-Stack Project',
    shortDescription: 'A bilingual e-commerce application with product browsing, shopping cart, checkout, order emails, and payment integration.',
    longDescription: 'Designed and developed a full-stack e-commerce application with an Arabic and English interface. The project includes product browsing, a shopping cart and checkout flow, and order confirmation emails. Stripe payment integration was implemented collaboratively as part of a team contribution.',
    technologies: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'Stripe', 'REST APIs'], githubUrl: 'https://github.com/abdelrahmanelstohydev/northstar-shop', image: 'assets/images/projects/northstar-shop.png', isSamplePlaceholder: false,
    features: ['Arabic and English language support', 'Product browsing and shopping cart', 'Checkout with Stripe payment integration (team contribution)', 'Order confirmation emails'],
  },
  {
    id: 'blood-bank-management', title: 'Blood Bank Management System', category: 'backend', categoryLabel: 'Academic Database Project',
    shortDescription: 'Database design for a system involving blood banks, hospitals, managers, and related operational data.',
    longDescription: 'An academic database-design project focused on organizing data for blood banks, hospitals, and their related entities. The work involved planning collections and relationships to support the system’s core operations.',
    technologies: ['MongoDB', 'Database Design', 'Data Modeling'], githubUrl: '', image: 'assets/images/projects/blood-bank.svg', isSamplePlaceholder: false,
    features: ['Designed database collections and relationships', 'Organized data for blood banks and hospitals', 'Structured related manager and operational information'],
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [];

export const SERVICES_DATA: ServiceItem[] = [
  { id: 'service-angular', number: '01', title: 'Angular Development', description: 'Building responsive web interfaces and single-page application experiences with Angular and TypeScript.', icon: 'bi-triangle-half', highlights: ['Angular', 'TypeScript', 'Component-Based UI', 'Responsive Layouts'] },
  { id: 'service-node', number: '02', title: 'Node.js & Express', description: 'Developing server-side application features and REST API endpoints with Node.js and Express.', icon: 'bi-hdd-network', highlights: ['Node.js', 'Express.js', 'REST APIs', 'Request Handling'] },
  { id: 'service-database', number: '03', title: 'Database Development', description: 'Designing data structures and connecting web applications to databases.', icon: 'bi-database', highlights: ['MongoDB', 'CRUD Operations', 'Data Modeling', 'Database Integration'] },
  { id: 'service-fullstack', number: '04', title: 'MEAN Stack Applications', description: 'Learning and building end-to-end web applications across the frontend, backend, and database layers.', icon: 'bi-layers', highlights: ['MongoDB', 'Express.js', 'Angular', 'Node.js'] },
  { id: 'service-problemsolving', number: '05', title: 'Problem Solving', description: 'Applying computer science fundamentals to break down problems and develop clear solutions.', icon: 'bi-puzzle-fill', highlights: ['Object-Oriented Programming', 'Data Structures', 'Algorithms', 'Debugging'] },
];
