export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  profileImage?: string;
  summary: string;
}

export interface Skill {
  name: string;
  level: number; // 1-10
  category: 'frontend' | 'backend' | 'tools' | 'languages' | 'other';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  startDate: string;
  endDate?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Craig Pestell",
    title: "Senior Computer Systems Analyst",
    email: "craigpestell@gmail.com",
    phone: "+1 (415) 513-7188",
    location: "Vancouver, BC, Canada",
    website: "https://craigpestell.com",
    github: "https://github.com/craigpestell",
    linkedin: "https://linkedin.com/in/craigpestell",
    profileImage: "/images/icons8-eggman-robotnik-480.png",
    summary: "Senior Computer Systems Analyst with 15+ years of experience analyzing and designing complex enterprise-scale computer systems for global organizations including Apple, Google, and Macy's. Expert in evaluating organizational data processing needs, architecting scalable system infrastructures, and optimizing information workflows to deliver high-value technical solutions."
  },
  skills: [
    { name: "React", level: 9, category: "frontend" },
    { name: "TypeScript", level: 9, category: "languages" },
    { name: "JavaScript", level: 10, category: "languages" },
    { name: "Next.js", level: 9, category: "frontend" },
    { name: "Vue.js", level: 8, category: "frontend" },
    { name: "Angular", level: 8, category: "frontend" },
    { name: "Node.js", level: 9, category: "backend" },
    { name: "Python", level: 8, category: "languages" },
    { name: "Java", level: 7, category: "languages" },
    { name: "TailwindCSS", level: 9, category: "frontend" },
    { name: "SASS/SCSS", level: 9, category: "frontend" },
    { name: "PostgreSQL", level: 8, category: "backend" },
    { name: "MongoDB", level: 7, category: "backend" },
    { name: "Express.js", level: 9, category: "backend" },
    { name: "NestJS", level: 8, category: "backend" },
    { name: "Webpack", level: 8, category: "tools" },
    { name: "Git", level: 10, category: "tools" },
    { name: "Linux", level: 9, category: "tools" },
    { name: "AWS", level: 7, category: "tools" },
    { name: "Azure", level: 7, category: "tools" },
    { name: "Google Cloud", level: 7, category: "tools" },
    { name: "Docker", level: 8, category: "tools" },
    { name: "Kubernetes", level: 7, category: "tools" },
    { name: "Auth0", level: 8, category: "tools" },
    { name: "GraphQL", level: 7, category: "backend" },
    { name: "Redux", level: 8, category: "frontend" }
  ],
  projects: [
    {
      id: "project-1",
      title: "Enterprise Hardware Testing Platform",
      description: "Systems analysis and requirements evaluation for mission-critical platform supporting embedded software engineering workflows and hardware test data processing",
      longDescription: "Performed requirements analysis for Apple's embedded software engineering platform, evaluating testing workflows and data processing needs. Documented system performance requirements and scalability considerations to support hardware development teams across multiple product lines.",
      technologies: ["TypeScript", "Next.js", "React", "Python"],
      imageUrl: "/images/portfolio-1.jpg",
      startDate: "2024-08",
      endDate: "2025-09",
      featured: true
    },
    {
      id: "project-2", 
      title: "AI-Powered Healthcare Platform",
      description: "Systems analysis and requirements evaluation for AI-powered healthcare platform with integrated subscription management and authentication infrastructure",
      longDescription: "Performed feasibility studies evaluating AI technology integration for healthcare operations. Analyzed requirements for subscription management and authentication systems, documented security and integration specifications, and assessed workflow optimization opportunities.",
      technologies: ["TypeScript", "Next.js", "NestJS", "Python", "Azure", "Auth0"],
      imageUrl: "/images/portfolio-2.jpg",
      projectUrl: "https://example-healthcare.com",
      startDate: "2023-07",
      endDate: "2024-05",
      featured: true
    },
    {
      id: "project-3",
      title: "Silicon Design Collaboration Platform",
      description: "Systems analysis and requirements evaluation for version control and collaboration platform serving silicon chip design teams across 20+ engineering organizations",
      longDescription: "Evaluated collaboration workflow requirements for silicon chip design teams across 20+ organizations. Analyzed integration and performance needs, documented technical specifications and wireframes, and assessed architectural approaches to support distributed engineering teams.",
      technologies: ["Angular", "TypeScript", "Python", "RxJS"],
      imageUrl: "/images/portfolio-3.jpg",
      startDate: "2022-02",
      endDate: "2023-10",
      featured: true
    },
    {
      id: "project-4",
      title: "Enterprise Micro-Frontend Architecture",
      description: "Systems analysis and evaluation of legacy monolithic e-commerce platform modernization requirements and architectural recommendations",
      longDescription: "Evaluated Williams Sonoma's legacy e-commerce platform to identify modernization opportunities and scalability requirements. Analyzed deployment workflows, documented architectural specifications, and assessed performance optimization strategies for supporting independent team deployment models.",
      technologies: ["Vue.js", "Node.js", "TailwindCSS", "SASS", "Jest", "Yeoman"],
      imageUrl: "/images/portfolio-4.jpg",
      startDate: "2020-10",
      endDate: "2021-12",
      featured: false
    },
    {
      id: "project-4a",
      title: "Context-Agnostic Component Library",
      description: "Systems analysis for multi-brand component system requirements and architecture supporting Williams Sonoma's portfolio brands",
      longDescription: "Evaluated component library requirements for Williams Sonoma's multi-brand portfolio (Pottery Barn, West Elm, Mark and Graham). Analyzed theming and customization needs across brands, documented architectural specifications for scalable component reuse, and assessed maintainability requirements.",
      technologies: ["Vue.js", "JavaScript", "SASS", "CSS Variables", "Storybook", "Jest"],
      imageUrl: "/images/portfolio-10.jpg",
      startDate: "2020-12",
      endDate: "2021-11",
      featured: true
    },
    {
      id: "project-5",
      title: "High-Performance E-commerce Platform",
      description: "Systems analysis and performance evaluation for scalable e-commerce platform serving millions of users with advanced integration requirements",
      longDescription: "Evaluated performance and scalability requirements for Macy's enterprise e-commerce platform serving millions of users. Analyzed system architecture and integration approaches, documented optimization opportunities, and assessed analytics infrastructure requirements.",
      technologies: ["React", "Redux", "GraphQL", "Node.js", "Webpack", "Foundation"],
      imageUrl: "/images/portfolio-5.jpg",
      startDate: "2015-02",
      endDate: "2020-04",
      featured: false
    },
    {
      id: "project-6",
      title: "Custom E-commerce Platform",
      description: "End-to-end development of responsive product catalog with integrated content management system",
      longDescription: "Independently designed and developed a comprehensive e-commerce platform for Kali Protectives, delivering a fully responsive product catalog with custom content management capabilities. Implemented Node.js REST API architecture, integrated Cloudinary for optimized image delivery, and established complete DevOps pipeline across development, staging, and production environments.",
      technologies: ["Node.js", "Express", "PostgreSQL", "Handlebars", "TinyMCE"],
      imageUrl: "/images/kali-interceptor.jpg",
      projectUrl: "https://kaliprotectives.com",
      startDate: "2016-01",
      endDate: "2019-10",
      featured: false
    },
    {
      id: "project-7",
      title: "Travel Insurance Platform",
      description: "Comprehensive travel insurance web portal for domestic and international policies",
      longDescription: "Developed multiple intranet applications and public websites for TIC/The Cooperators travel insurance. Created online claims submission forms, customer portals, and integrated web services for policy management and customer service operations.",
      technologies: ["PHP", "MySQL", "JavaScript"],
      imageUrl: "/images/cooperators.png",
      projectUrl: "https://travelinsurance.ca",
      startDate: "2006-05",
      endDate: "2013-09",
      featured: false
    },
    {
      id: "project-8",
      title: "Hayes Bicycle Group Website",
      description: "Product catalog and marketing website for bicycle component manufacturer",
      longDescription: "Collaborated with marketing team to build a comprehensive website featuring product catalog, blog posts, and hierarchical page structure. Implemented PHP/MySQL backend for dynamic content delivery and integrated Cloudinary for optimized image management.",
      technologies: ["PHP", "MySQL", "WordPress", "JavaScript"],
      imageUrl: "/images/hayes-homepage.png",
      startDate: "2009-01",
      endDate: "2009-12",
      featured: false
    },
    {
      id: "project-9",
      title: "Race Face Performance Products",
      description: "E-commerce platform for mountain bike component manufacturer",
      longDescription: "Designed and developed comprehensive e-commerce solution for Race Face, including public product catalogs, distributor portals, and email marketing campaigns. Managed complete Linux server infrastructure across multiple environments.",
      technologies: ["PHP", "MySQL", "WordPress", "JavaScript"],
      imageUrl: "/images/raceface-home-bars.png",
      projectUrl: "https://raceface.com",
      startDate: "2008-09",
      endDate: "2016-03",
      featured: false
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "Apple Inc.",
      position: "Senior Computer Systems Analyst",
      startDate: "2024-08",
      description: "Analyzing enterprise-level system architectures and optimizing embedded software engineering workflows and mission-critical hardware testing processes through comprehensive systems evaluation and documentation",
      achievements: [
        "Analyzed complex organizational workflows and system requirements to optimize embedded software engineering processes and hardware testing infrastructure",
        "Evaluated business and technical requirements in collaboration with cross-functional teams to design scalable system architectures for high-volume test data processing",
        "Documented technical specifications and system interfaces for backend services to support automated data analysis and performance monitoring requirements"
      ],
      technologies: ["TypeScript", "Next.js", "React", "Python", "Docker", "Kubernetes"]
    },
    {
      id: "exp-2",
      company: "Healthcare Technology Startup",
      position: "Senior Computer Systems Analyst",
      startDate: "2023-07",
      endDate: "2024-05",
      description: "Performed comprehensive feasibility studies and systems analysis for AI-powered healthcare platform to optimize operational workflows and reduce infrastructure costs through detailed requirement analysis and system evaluation",
      achievements: [
        "Conducted feasibility studies and comprehensive systems analysis to evaluate organizational requirements for AI-powered healthcare platform optimization and cost reduction",
        "Analyzed and documented system-wide requirements for customer subscription management infrastructure, evaluating technical approaches and integration points",
        "Evaluated security and data integrity requirements, documenting enterprise-grade authentication system specifications across distributed application ecosystem"
      ],
      technologies: ["TypeScript", "Next.js", "NestJS", "Python", "Azure", "Auth0"]
    },
    {
      id: "exp-3",
      company: "Google Inc.",
      position: "Senior Computer Systems Analyst",
      startDate: "2022-02",
      endDate: "2023-10",
      description: "Conducted comprehensive systems analysis and evaluation for silicon chip design collaboration platforms utilized by over 20 global engineering teams, focusing on architectural requirements and workflow optimization",
      achievements: [
        "Conducted detailed systems analysis to evaluate collaboration workflow requirements for silicon chip design specifications across 20+ global engineering teams",
        "Analyzed business and technical requirements, creating technical specifications and wireframes for Fuse Manager application to ensure architectural alignment with design requirements",
        "Evaluated system-wide performance requirements and architectural trade-offs, providing recommendations for critical design decisions and standards adherence"
      ],
      technologies: ["Angular", "TypeScript", "Python", "RxJS"]
    },
    {
      id: "exp-4",
      company: "Williams Sonoma",
      position: "Senior Computer Systems Analyst",
      startDate: "2020-10",
      endDate: "2021-12",
      description: "Led comprehensive systems analysis and evaluation of legacy e-commerce platform to identify optimization opportunities and system modernization requirements for scalability and performance improvement",
      achievements: [
        "Conducted systems analysis and evaluation of legacy monolithic e-commerce platform to identify architectural inefficiencies and modernization requirements",
        "Analyzed system requirements for component-based architecture and CI/CD pipeline integration, documenting technical specifications to ensure high system availability",
        "Evaluated migration strategies and assessed performance impact of system modernization, providing recommendations for platform transformation"
      ],
      technologies: ["Vue.js", "Node.js", "TailwindCSS", "SASS", "Jest"]
    },
    {
      id: "exp-5",
      company: "Macy's",
      position: "Senior Computer Systems Analyst",
      startDate: "2015-02",
      endDate: "2020-04",
      description: "Analyzed enterprise-scale system requirements and designed scalable system architecture to serve millions of users, evaluating performance optimization opportunities and system integration needs",
      achievements: [
        "Analyzed system requirements and performance characteristics to design enterprise-scale platform architecture capable of serving millions of users",
        "Evaluated server-side system performance requirements, analyzing REST service and application optimization opportunities within cloud-based infrastructure",
        "Analyzed developer workflow requirements and documented system tooling specifications to standardize onboarding procedures and technical processes"
      ],
      technologies: ["React", "Redux", "GraphQL", "Node.js", "Java", "Webpack", "SASS"]
    },
    {
      id: "exp-6",
      company: "Kali Protectives",
      position: "Lead Full Stack Developer",
      startDate: "2016-01",
      endDate: "2019-10",
      description: "Independently delivered comprehensive e-commerce platform and brand digital presence for sports equipment manufacturer",
      achievements: [
        "Collaborated with marketing team to establish compelling brand identity and comprehensive style guide",
        "Architected and implemented robust Node.js REST API providing scalable data endpoints",
        "Integrated Cloudinary for advanced image optimization delivering superior responsive web performance",
        "Established complete DevOps infrastructure across development, staging, and production environments",
        "Designed and delivered targeted HTML email marketing campaigns driving customer engagement"
      ],
      technologies: ["Node.js", "Express", "PostgreSQL", "Handlebars", "TinyMCE"]
    },
    {
      id: "exp-7",
      company: "Autodesk",
      position: "UI Developer",
      startDate: "2014-09",
      endDate: "2015-12",
      description: "Developed features for customer subscription portal enabling Autodesk's transition to Software-as-a-Service model",
      achievements: [
        "Built customer subscription management features allowing users to purchase and manage Autodesk product subscriptions",
        "Collaborated within Agile development team to deliver high-quality user interface components",
        "Implemented responsive web design using modern frontend technologies and frameworks"
      ],
      technologies: ["jQuery", "Backbone.js", "Require.js", "Bootstrap", "Node.js", "HTML5", "CSS3", "Jasmine", "Gulp", "Grunt", "LESS"]
    },
    {
      id: "exp-8",
      company: "Google Inc.",
      position: "Software Engineer",
      startDate: "2012-02",
      endDate: "2014-09",
      description: "Developed and maintained Google Unified Ticketing System (GUTS), a high-performance internal application serving over 10,000 requests per second",
      achievements: [
        "Maintained 99.9% uptime for critical internal ticketing system processing 10+ million records",
        "Converted legacy code for 100+ ticket forms to modern, refactored framework architecture",
        "Designed and implemented mobile frontend for GUTS ticketing system improving accessibility",
        "Collaborated with cross-domain users to collect requirements and implement new ticket types",
        "Leveraged Google's internal technologies to achieve enterprise-scale performance optimization"
      ],
      technologies: ["Python", "JavaScript", "Google Closures", "Fava Framework", "Oracle DB", "BMC Remedy"]
    },
    {
      id: "exp-9",
      company: "Race Face Performance Products",
      position: "Web Developer",
      startDate: "2008-06",
      endDate: "2016-08",
      description: "Developed and maintained comprehensive web ecosystem for mountain bike component manufacturer including public catalogs and distributor portals",
      achievements: [
        "Managed complete web application infrastructure across development, staging, and production environments",
        "Created online product catalogs serving both public customers and distributor networks",
        "Implemented email marketing campaigns reaching thousands of recipients with measurable engagement",
        "Configured Linux server environments with proper security, user management, and FTP access controls",
        "Designed MySQL database architecture for efficient product and content management"
      ],
      technologies: ["PHP", "MySQL", "WordPress", "jQuery", "HTML", "CSS", "JavaScript"]
    },
    {
      id: "exp-10",
      company: "TIC / The Cooperators",
      position: "Web Developer",
      startDate: "2006-02",
      endDate: "2013-09",
      description: "Developed multiple web applications and services for domestic and international travel insurance operations",
      achievements: [
        "Created and maintained several intranet applications supporting travel insurance business operations",
        "Developed online claims submission systems streamlining customer service workflows",
        "Built public-facing websites serving thousands of customers seeking travel insurance policies",
        "Implemented web services and APIs enabling integration with third-party insurance systems"
      ],
      technologies: ["PHP", "MySQL", "JavaScript", "SOAP", "XML", "HTML", "CSS"]
    },
    {
      id: "exp-11",
      company: "Hayes Bicycle Group",
      position: "Web Developer",
      startDate: "2009-01",
      endDate: "2009-12",
      description: "Developed comprehensive website featuring product catalog, blog posts, and hierarchical page structure for bicycle component manufacturer",
      achievements: [
        "Collaborated with marketing team to build fresh website with dynamic product catalog",
        "Implemented PHP/MySQL backend for dynamic content delivery and page management",
        "Optimized images and file formats for responsive web design using early optimization techniques",
        "Created Linux server environments for development, staging, and production hosting"
      ],
      technologies: ["PHP", "MySQL", "WordPress", "HTML", "CSS", "JavaScript"]
    },
    {
      id: "exp-12",
      company: "iWasteNot Systems",
      position: "Web Developer",
      startDate: "2008-01",
      endDate: "2010-12",
      description: "Developed web and mobile software solutions to assist businesses in waste reduction and environmental sustainability",
      achievements: [
        "Built environmental recycling web portal used by private companies and local governments",
        "Implemented features to reduce waste, save costs, and generate alternative energy insights",
        "Developed SOAP web services for integration with third-party environmental systems",
        "Created user interfaces for waste tracking and reporting functionality"
      ],
      technologies: ["PHP", "XML", "HTML", "CSS", "JavaScript", "SOAP"]
    },
    {
      id: "exp-13",
      company: "Engine Digital",
      position: "Software Consultant / Developer",
      startDate: "2005-01",
      endDate: "2006-12",
      description: "Provided consulting and development services for digital marketing consultancy, extending their technical capabilities",
      achievements: [
        "Developed PHP and MySQL Content Management Systems for life insurance industry",
        "Created CSS for mobile website implementations using early responsive design techniques",
        "Built multiple marketing campaign websites for diverse client portfolio",
        "Enabled agency to take on projects outside their core business scope through technical expertise"
      ],
      technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    {
      id: "exp-14",
      company: "Core Solutions Software",
      position: "Software Consultant / Developer",
      startDate: "2002-01",
      endDate: "2004-12",
      description: "Designed and developed custom software solutions for customers across various industries including education administration",
      achievements: [
        "Developed web-based education administration and student information system for Durham District School Board",
        "Created application components to track student attendance, curriculum scores, and cumulative grades",
        "Designed and implemented global search feature to align with legacy FileMaker application functionality",
        "Built comprehensive student management system using modern web technologies for the era"
      ],
      technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"]
    },
    {
      id: "exp-15",
      company: "UV Media",
      position: "Software Developer",
      startDate: "2000-01",
      endDate: "2002-12",
      description: "Designed and developed wide range of web-based software solutions using PHP and MySQL for diverse corporate clients",
      achievements: [
        "Developed reusable software components for rapid application development",
        "Created multiple product catalogs for variety of corporate clients using PHP and ColdFusion",
        "Built Recreational Hockey League application for player statistics, metrics, and tournament management",
        "Developed Air India bombing trial document management system for legal proceedings"
      ],
      technologies: ["PHP", "ColdFusion", "MySQL", "HTML", "CSS", "JavaScript"]
    },
    {
      id: "exp-16",
      company: "Canada Reconnect",
      position: "Software Consultant / Developer",
      startDate: "2000-01",
      endDate: "2000-12",
      description: "Designed custom software solution that streamlined telephone service reseller's customer files, accounting, and call center operations",
      achievements: [
        "Built comprehensive call center application serving 40+ staff members",
        "Created distance calculation tool for finding customer payment locations (pre-Google Maps era)",
        "Designed reports providing metrics to guide TV commercial spending and targeting decisions",
        "Installed and administered local area network for call center operations"
      ],
      technologies: ["MS Access", "VB Script"]
    },
    {
      id: "exp-17",
      company: "Ucora Corporation",
      position: "Software Developer",
      startDate: "1998-01",
      endDate: "2000-12",
      description: "Participated in design and development of medium-sized database applications for large corporate clients including AXA, BC Rail, and BC Supreme Courts",
      achievements: [
        "Developed fixed-cost database applications requiring complete upfront requirements analysis",
        "Worked with major enterprise clients across diverse industries and government sectors",
        "Gained early experience in enterprise software development and client relationship management",
        "Contributed to applications serving critical business operations for large organizations"
      ],
      technologies: ["MS Access", "VB Script", "ColdFusion"]
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "British Columbia Institute of Technology",
      degree: "Diploma in Computer Systems Technology",
      field: "Data Communications & Networking",
      startDate: "2004-01",
      endDate: "2006-12",
      achievements: [
        "Specialized in systems architecture and enterprise network design",
        "Comprehensive curriculum in data communications infrastructure, system analysis, and enterprise network security",
        "Foundation in system design methodologies and technology infrastructure evaluation"
      ]
    },
    {
      id: "edu-2",
      institution: "British Columbia Institute of Technology", 
      degree: "Certificate in Programming",
      field: "Programming Concepts and Methodologies",
      startDate: "1999-01",
      endDate: "1999-12",
      achievements: [
        "Foundational training in software development principles and best practices",
        "Early specialization in object-oriented programming and system design methodologies",
        "Completed Java-based projects focusing on enterprise application development patterns"
      ]
    }
  ]
};
