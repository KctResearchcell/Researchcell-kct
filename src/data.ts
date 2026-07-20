import {
  ResearchArea,
  Project,
  Publication,
  Lab,
  Challenge,
  Resource,
  Program,
  CareerOpportunity,
  EventItem,
  Member
} from './types';
export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: "renewable-energy",
    title: "Renewable Energy Systems",
    iconName: "Sun",
    summary:
      "Advancing sustainable energy solutions through research in solar, wind, hybrid energy systems, energy conversion, and decentralized power technologies.",
    overview:
      "The Renewable Energy Systems domain focuses on designing, optimizing, and deploying clean energy technologies that address future energy demands. Research spans solar photovoltaics, small wind turbines, hybrid renewable systems, energy conversion technologies, smart grids, and sustainable power generation, enabling resilient and environmentally responsible energy solutions.",
    projectsList: [
      "small-scale-wind-turbine",
      "battery-energy-storage-system"
    ],
    publicationsList: [],
    labsList: [],
    researchersList: [],
    impact:
      "Developing innovative renewable energy technologies that contribute towards sustainable infrastructure, cleaner energy adoption, and next-generation engineering solutions."
  },

  {
    id: "battery-energy-storage",
    title: "Battery & Energy Storage",
    iconName: "BatteryCharging",
    summary:
      "Exploring next-generation battery technologies, energy storage systems, battery management, and intelligent power solutions for a sustainable future.",
    overview:
      "This domain investigates advanced battery materials, battery management systems, thermal management, energy storage architectures, and intelligent charging technologies. The research supports electric mobility, renewable energy integration, and resilient energy infrastructure through efficient and reliable storage solutions.",
    projectsList: [
      "battery-energy-storage-system"
    ],
    publicationsList: [],
    labsList: [],
    researchersList: [],
    impact:
      "Supporting the transition towards sustainable energy ecosystems through innovative storage technologies that improve efficiency, safety, and long-term performance."
  },

  {
    id: "automotive-mobility",
    title: "Sustainable Mobility & Automotive",
    iconName: "Car",
    summary:
      "Driving innovation in electric mobility, intelligent transportation systems, lightweight engineering, and future-ready automotive technologies.",
    overview:
      "The Sustainable Mobility & Automotive domain focuses on developing technologies that redefine transportation. Research includes electric vehicles, intelligent vehicle systems, lightweight structures, mobility solutions, energy-efficient transportation, and sustainable automotive engineering to address emerging industrial and societal needs.",
    projectsList: [
      "small-scale-wind-turbine"
    ],
    publicationsList: [],
    labsList: [],
    researchersList: [],
    impact:
      "Creating innovative mobility solutions that combine engineering excellence, sustainability, and emerging technologies for future transportation systems."
  },

  {
    id: "agriculture-food-systems",
    title: "Agriculture & Food Systems",
    iconName: "Sprout",
    summary:
      "Advancing sustainable agriculture through precision farming, smart technologies, resource optimization, and resilient food production systems.",
    overview:
      "Research within this domain integrates engineering, digital technologies, environmental science, and agricultural innovation to improve productivity, sustainability, and resilience. Focus areas include precision agriculture, smart irrigation, agricultural automation, climate-resilient farming, and technology-driven food systems.",
    projectsList: [],
    publicationsList: [],
    labsList: [],
    researchersList: [],
    impact:
      "Developing research-driven agricultural solutions that support sustainable farming practices, resource conservation, and food security."
  },

  {
    id: "biosciences-healthcare",
    title: "Biosciences & Healthcare Technologies",
    iconName: "HeartPulse",
    summary:
      "Creating interdisciplinary solutions in biomedical engineering, healthcare technologies, diagnostics, assistive systems, and bio-inspired innovation.",
    overview:
      "The Biosciences & Healthcare Technologies domain brings together engineering, biology, medicine, and technology to address healthcare challenges. Research spans medical devices, assistive technologies, diagnostics, rehabilitation systems, digital health, and bio-inspired innovations that improve quality of life and societal well-being.",
    projectsList: [
      "assistive-communication-device"
    ],
    publicationsList: [],
    labsList: [],
    researchersList: [],
    impact:
      "Developing accessible, technology-enabled healthcare innovations that improve patient outcomes and enhance inclusive healthcare delivery."
  },

  {
    id: "design-emerging-technologies",
    title: "Design, Human-Centred Innovation & Emerging Technologies",
    iconName: "Lightbulb",
    summary:
      "Integrating design thinking, emerging technologies, artificial intelligence, IoT, robotics, and digital innovation to create impactful solutions.",
    overview:
      "This interdisciplinary domain combines engineering, design, computing, and innovation to transform ideas into meaningful products and systems. Research focuses on human-centred design, intelligent systems, artificial intelligence, robotics, embedded systems, IoT, digital fabrication, and emerging technologies that shape future industries.",
    projectsList: [],
    publicationsList: [],
    labsList: [],
    researchersList: [],
    impact:
      "Enabling innovation through design-led research and emerging technologies that create scalable, user-centred, and future-ready solutions."
  },

  {
    id: "education-society-policy",
    title: "Education, Society & Policy",
    iconName: "GraduationCap",
    summary:
      "Exploring research that strengthens education, community development, social innovation, policy, and inclusive societal transformation.",
    overview:
      "The Education, Society & Policy domain examines how research can improve learning ecosystems, educational practices, community engagement, policy development, and social innovation. The domain encourages interdisciplinary collaboration to create meaningful and sustainable societal impact.",
    projectsList: [],
    publicationsList: [],
    labsList: [],
    researchersList: [],
    impact:
      "Supporting evidence-based educational innovation and socially relevant research that contributes to inclusive and sustainable development."
  },

  {
    id: "environment-sustainability",
    title: "Environmental Science & Sustainability Systems",
    iconName: "Leaf",
    summary:
      "Addressing environmental challenges through climate resilience, circular economy, ecological monitoring, sustainable technologies, and resource conservation.",
    overview:
      "This domain focuses on interdisciplinary research that advances environmental stewardship and sustainable development. Research areas include climate science, waste management, circular economy, environmental monitoring, ecological restoration, water resources, and green technologies that contribute to a more sustainable future.",
    projectsList: [],
    publicationsList: [],
    labsList: [],
    researchersList: [],
    impact:
      "Developing sustainable solutions that promote environmental responsibility, resource efficiency, and long-term ecological resilience."
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'battery-energy-storage-system',
    title: 'Battery Energy Storage System',
    areaId: 'sustainability',
    areaName: 'Sustainability',
    status: 'completed',
    stage: 'Product',
    leader: 'Battery Research Circle',
    description: 'Battery Energy Storage System (BESS) is an energy management solution that stores excess electrical energy generated from solar photovoltaic systems and supplies power during periods of low generation or high demand. The system enhances energy reliability, improves grid stability, and enables efficient integration of renewable energy sources.',
    outcome: 'Stores excess solar photovoltaic energy and supplies power on demand, enhancing grid stability.',
    details: 'Leveraging smart management systems coupled with high-efficiency power electronics to optimize regional micro-grid distribution networks. Deployed systems have demonstrated reliable peak shaving and load-balancing.',
    tags: ['Battery Storage', 'Renewable Energy', 'Grid Stability', 'Clean Tech']
  },
  {
    id: 'small-scale-wind-turbine',
    title: 'Small Scale Wind Turbine',
    areaId: 'sustainability',
    areaName: 'Sustainability',
    status: 'ongoing',
    stage: 'Prototype',
    leader: 'Team Sulal',
    description: 'This small-scale wind turbine utilizes sustainable and environmentally friendly materials, including eco-conscious composite blades, to efficiently convert wind energy into clean electricity. Its optimized aerodynamic design enhances energy capture while reducing environmental impact, supporting renewable energy adoption and sustainable power generation.',
    outcome: 'Completed initial low-velocity aerodynamic blade trials using eco-conscious composite materials.',
    details: 'Utilizing treated organic fibre composite blends for blade manufacture to ensure biodegradable disposal. Aerodynamic modeling indicates high lift-to-drag performance suited even for moderate geographical wind patterns.',
    tags: ['Wind Turbine', 'Aerodynamics', 'Clean Electricity', 'Eco Materials']
  },
  {
    id: 'assistive-communication-device',
    title: 'Assistive Communication Device for Hard of Hearing Individuals',
    areaId: 'educational',
    areaName: 'Educational Research Circle',
    status: 'ongoing',
    stage: 'Prototype',
    leader: 'Educational Research Circle',
    description: 'A platform that converts live multilingual speech into accessible captions for Deaf and Hard-of-Hearing users. Designed for Indian classrooms and everyday communication, it provides speech recognition, translation, speaker identification, and simplified captions to improve inclusion, comprehension, and accessibility.',
    outcome: 'Live multilingual captioning software tested within test classrooms.',
    details: 'Integrating advanced low-latency automated speech transcription to capture multivariant Indian speaker accents. Simplified caption formatting is formatted dynamically on tablet screens for better engagement.',
    tags: ['Speech Translation', 'Assistive Tech', 'Inclusive Education', 'Accessibility']
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-nlp-tamil',
    title: 'Deep Multi-Scale Attention Networks for Dravidian Epigraphy Character Stroke Re-association',
    authors: ['S. Dhanalakshmi', 'M. R. Manikandan', 'S. Vignesh'],
    journal: 'Journal of Archaeological Computational Science & Linguistics',
    year: 2025,
    doi: '10.1016/j.jacsl.2025.10425',
    abstract: 'Ancient granite stone carvings undergo severe wind and environmental micro-fissuring, causing segment degradation in classical scripts. We present a deep multi-scale architectural network specializing in stroke re-association. Evaluated across 2,000 annotated field samples of Vatteluttu, our model shows superior character segmentation.',
    category: 'AI & Heritage'
  },
  {
    id: 'pub-natural-fibre-composites',
    title: 'Mechanical and Dynamic Mechanical Analysis of Treated Banana Cellulose Bio-Composites for Light-Duty Chassis Applications',
    authors: ['K. Ramesh', 'S. Vignesh', 'R. Nandhakumar'],
    journal: 'Composites Part B: Engineering (Letters)',
    year: 2024,
    doi: '10.1016/j.compositesb.2024.1118',
    abstract: 'This study investigates the modification of banana pseudostem agricultural scrap. Alkali treatments in 5% NaOH solutions led to higher crystallinity index. The resulting bio-composites exhibit superior dampening characteristics, suggesting promising applications for structural vibration minimization in local electric vehicles.',
    category: 'Materials Science'
  },
  {
    id: 'pub-ai-screening',
    title: 'Edge-Optimized CNNs for Diabetic Retinopathy Classification on Low-Cost Handheld Systems',
    authors: ['Meera Krishnan', 'A. Karthikeyan'],
    journal: 'IEEE Transactions on Biophotonics and Medical Systems',
    year: 2025,
    doi: '10.1109/TBMS.2025.341890',
    abstract: 'Deploying robust Deep Learning models in medical facilities is limited by local compute power. We introduce an edge-optimized framework with custom model compression, scaling, and selective feature mappings. The model matches professional ophthalmologist diagnosis in sensitivity while requiring 80% fewer computational parameters.',
    category: 'Healthcare Diagnostics'
  }
];

export const LABS: Lab[] = [
  {
    id: 'materials-prototyping-lab',
    title: 'NFRC Materials Prototyping Laboratory',
    description: 'Equipped with custom extraction assets, advanced polymer mixers, hydraulic hot presses, and universal testing machines to formulate bio-materials.',
    facilities: ['Hydraulic Hot-Press Molding System', 'Alkali Cellulose Extraction Line', 'Universal Tensile Testing machine (UTM-50KN)', 'Vibration Shaking Chamber'],
    coordinator: 'Prof. K. Ramesh',
    contactEmail: 'ramesh.k.res@kumaraguru.edu',
    location: 'Mechanical Sciences Research Wing, Block D'
  },
  {
    id: 'ai-research-hub',
    title: 'RÉ High-Performance AI Research Hub',
    description: 'A GPU-accelerated laboratory environment catering to student explorer cohorts building neural vision models and high-throughput script parsers.',
    facilities: ['Dedicated GPU Compute Node (4x NVIDIA RTX A6000)', 'Virtual Deep Learning Environments', 'High-speed local storage arrays', 'Drone and Mobile hardware workbench'],
    coordinator: 'Dr. A. Karthikeyan',
    contactEmail: 'karthikeyan.aistudio@kumaraguru.edu',
    location: 'Innovation & Research Centre, Block A'
  },
  {
    id: 'heritage-digitalization-lab',
    title: 'Nithilam Heritage Imaging & Digitalization Laboratory',
    description: 'Providing student historians and computer scientists with elite field photogrammetry kits, multispectral imaging, and text classification tools.',
    facilities: ['Multispectral Camera Systems', 'Field Epigraphic Paper Print Scanner', 'High-precision structured 3D scanners', 'Tamil Lexicography Database'],
    coordinator: 'Dr. S. Dhanalakshmi',
    contactEmail: 'dhanalakshmi.s@kumaraguru.edu',
    location: 'Humanities & Social Sciences, Block H'
  }
];

export const CHALLENGES: Challenge[] = [
  {
    id: 'challenge-cotton-weed',
    title: 'Automated Micro-Weeding for Small Cotton Holdings',
    description: 'Manual weeding is labor-intensive and chemical weeding damages soil chemistry. We are seeking lightweight, mechanically automated micro-weeding solutions that can navigate narrow row distances in Western Tamil Nadu cotton farms.',
    targetIndustry: 'AgriTech & Local Cooperatives',
    deadline: 'December 15, 2026',
    scope: 'Prototype must fit within high-resolution crop row parameters and cost under ₹15,000 for local deployment.'
  },
  {
    id: 'challenge-water-noyyal',
    title: 'Real-time Trace Chemical Detection for Noyyal River Basins',
    description: 'Creating low-maintenance sensory nodes that can detect and report localized heavy metal and azo dye discharges in industrial outflows with robust wireless alerts.',
    targetIndustry: 'Environmental Monitoring & Textile Alliances',
    deadline: 'March 20, 2027',
    scope: 'Autonomously powered telemetry platform operational across extreme pH ranges (4.0 to 11.0) with localized GSM transmission.'
  }
];

export const RESOURCES: Resource[] = [
  {
    id: 'hpc-cluster',
    title: 'High-Performance Computing Cluster',
    description: 'Shared high-capacity processing instances dedicated to complex simulation, structural molecular dynamics model runs, and spatial environmental analyses.',
    specifications: ['128 Compute Cores', '512GB ECC RAM', 'Dynamic CPU-GPU memory resource allocation', 'Standard Linux Environment with Slurm scheduler.'],
    accessProcedure: 'Open to all KREST fellows and KRIP interns. Submit an exploration computational proposal via the research portal.',
    contactPerson: 'Mr. Vigneshwaran (Systems Administrator)'
  },
  {
    id: 'analytical-characterization',
    title: 'Materials Characterization Core Facility',
    description: 'Supporting researchers across disciplines with advanced chemical, thermal, and microstructural analysis of synthesized fabrics, materials and composites.',
    specifications: ['SEM (Scanning Electron Microscopy)', 'FTIR (Fourier Transform Infrared) Spectroscopy', 'TGA (Thermogravimetric Analysis)', 'Universal Testing Systems.'],
    accessProcedure: 'Book specific slots weekly via the Materials Science coordinator. External student researchers are eligible under regional training access schemes.',
    contactPerson: 'Dr. S. Vignesh (Lab In-Charge)'
  }
];

export const PROGRAMS: Program[] = [
  {
    id: "krest",
    title: "Kumaraguru Research Excellence Track (KREST)",
    tagline: "A Semester-Long Research Journey",
    description:
      "KREST is Ré's flagship semester-long research programme that nurtures students from curiosity to independent research through structured learning, mentorship, and project-based exploration.",

    overview:
      "Designed as the foundation of the Ré ecosystem, KREST enables students to experience the complete research lifecycle. Every semester, selected students undergo a structured journey beginning with orientation and probation, progressing through research fundamentals, nano projects, and culminating in full-scale interdisciplinary research projects under faculty mentorship.",

    programmeJourney: [
      "Orientation and probation phase",
      "Research fundamentals and literature review",
      "Nano project development",
      "Faculty-mentored full research project"
    ],

    activities: [
      "Research Orientation & Foundation",
      "Probationary Learning Phase",
      "Research Methodology & Literature Review",
      "Nano Project Development",
      "Faculty Mentorship",
      "Full Research Project Execution",
      "Project Review & Evaluation",
      "Research Presentation"
    ],

    highlights: [
      { label: "Duration", value: "1 semester" },
      { label: "Format", value: "Structured and mentored" }
    ],

    stories: [
      {
        author: "A KREST scholar",
        role: "Research fellow",
        quote: "The programme helped me turn curiosity into a step-by-step research practice."
      }
    ],

    outcomes: [
      "Strong foundation in research methodology",
      "Hands-on interdisciplinary project experience",
      "Mentorship from faculty researchers",
      "Opportunity to continue into advanced research programmes"
    ]
  },

  {
    id: "core",
    title: "Course-Oriented Research Experience (CORE)",
    tagline: "Integrating Research into the Curriculum",
    description:
      "CORE introduces research as part of academic learning through structured one-credit courses that develop research thinking alongside classroom education.",

    overview:
      "CORE enables students to experience research early in their academic journey by integrating research methodologies, critical thinking, scientific writing, and problem-solving into formal coursework. The programme encourages inquiry-driven learning while complementing the university curriculum.",

    programmeJourney: [
      "Classroom-based research orientation",
      "Critical thinking and literature exploration",
      "Mini research assignments",
      "Faculty-guided research communication"
    ],

    activities: [
      "Research Fundamentals",
      "Scientific Literature Exploration",
      "Critical Thinking Exercises",
      "Research Communication",
      "Mini Research Assignments",
      "Faculty-guided Learning"
    ],

    highlights: [
      { label: "Duration", value: "1 credit course" },
      { label: "Approach", value: "Curriculum-integrated" }
    ],

    stories: [
      {
        author: "A CORE learner",
        role: "Student researcher",
        quote: "The course made research feel like a natural extension of classroom learning."
      }
    ],

    outcomes: [
      "Research-oriented academic mindset",
      "Improved analytical thinking",
      "Early exposure to research practices",
      "Preparation for advanced research programmes"
    ]
  },

  {
    id: "urop",
    title: "Undergraduate Research Opportunities Programme (UROP)",
    tagline: "Faculty-Guided Research Experience",
    description:
      "UROP enables undergraduate students to work closely with faculty mentors on ongoing research projects while gaining authentic research experience.",

    overview:
      "Students selected under UROP contribute to active research undertaken by faculty members across various research domains. The programme emphasizes experiential learning, interdisciplinary collaboration, and sustained mentorship while exposing students to real-world research environments.",

    programmeJourney: [
      "Faculty mentorship and project selection",
      "Hands-on research participation",
      "Documentation and review",
      "Presentation of findings"
    ],

    activities: [
      "Faculty-guided Research",
      "Laboratory Experience",
      "Literature Review",
      "Experimental Investigation",
      "Research Documentation",
      "Project Presentations"
    ],

    highlights: [
      { label: "Focus", value: "Faculty-guided" },
      { label: "Setting", value: "Live research teams" }
    ],

    stories: [
      {
        author: "A UROP researcher",
        role: "Undergraduate fellow",
        quote: "Working beside faculty mentors made the research process much more tangible."
      }
    ],

    outcomes: [
      "Authentic faculty-guided research experience",
      "Enhanced research and technical skills",
      "Research publications where applicable",
      "Strong foundation for postgraduate research"
    ]
  },

  {
    id: "krip",
    title: "Kumaraguru Research Internship Programme (KRIP)",
    tagline: "Short-Term Immersive Research Internship",
    description:
      "KRIP offers students an intensive short-term research internship designed to provide hands-on exposure to interdisciplinary research, innovation, and experimentation.",

    overview:
      "KRIP is intended for students seeking focused research exposure without committing to a semester-long programme. Participants work with research mentors on ongoing projects while developing practical research skills through immersive learning experiences.",

    programmeJourney: [
      "Short-term research internship",
      "Mentored project immersion",
      "Hands-on experimentation",
      "Final presentation and reflection"
    ],

    activities: [
      "Research Internship",
      "Project-based Learning",
      "Laboratory Exposure",
      "Research Discussions",
      "Hands-on Experimentation",
      "Final Project Presentation"
    ],

    highlights: [
      { label: "Duration", value: "Short-term internship" },
      { label: "Experience", value: "Immersive and hands-on" }
    ],

    stories: [
      {
        author: "A KRIP intern",
        role: "Intern researcher",
        quote: "The internship gave me a focused window to learn by doing."
      }
    ],

    outcomes: [
      "Practical research exposure",
      "Experience working with research mentors",
      "Interdisciplinary collaboration",
      "Enhanced readiness for future research opportunities"
    ]
  },

  {
    id: "project-intake",
    title: "Project Intake",
    tagline: "Transforming Ideas into Research",
    description:
      "Project Intake provides a structured pathway for students and faculty to bring innovative ideas into the Ré ecosystem for mentorship, evaluation, and research development.",

    overview:
      "Individuals and teams with research ideas can submit proposals through Project Intake. Following expert evaluation, selected projects receive mentorship, access to research infrastructure, interdisciplinary collaboration, and support for further development, including funding opportunities wherever applicable.",

    programmeJourney: [
      "Idea submission and evaluation",
      "Research planning and mentorship",
      "Development and periodic review",
      "Potential scale-up or publication pathway"
    ],

    activities: [
      "Idea Submission",
      "Proposal Evaluation",
      "Research Planning",
      "Faculty Mentorship",
      "Project Development",
      "Periodic Reviews"
    ],

    highlights: [
      { label: "Entry point", value: "Project proposals" },
      { label: "Support", value: "Mentorship and facilities" }
    ],

    stories: [
      {
        author: "A project intake founder",
        role: "Innovator",
        quote: "The pathway made it easier to move from a spark of an idea to a structured research effort."
      }
    ],

    outcomes: [
      "Structured research support",
      "Access to mentors and research facilities",
      "Interdisciplinary collaboration",
      "Potential progression towards publications, intellectual property, startups, or societal solutions"
    ]
  },

  {
    id: "exploration-circle",
    title: "Exploration Circle",
    tagline: "Where Curiosity Begins",
    description:
      "The Exploration Circle serves as the gateway to the Ré ecosystem by fostering curiosity through talks, workshops, interactive sessions, research discussions, and exploratory learning experiences.",

    overview:
      "The Exploration Circle encourages students to discover emerging research areas, engage with researchers, interact with experts, and cultivate a research mindset before embarking on structured research programmes. It creates an inclusive environment where questions become opportunities for discovery.",

    programmeJourney: [
      "Discovery through talks and workshops",
      "Interaction with researchers and experts",
      "Curiosity-led exploration",
      "Pathway into structured research"
    ],

    activities: [
      "Workshops",
      "Seminars",
      "Coffee Table Talks",
      "Expert Lectures",
      "Research Showcases",
      "Innovation Events"
    ],

    highlights: [
      { label: "Entry point", value: "Curiosity-led" },
      { label: "Community", value: "Researchers and students" }
    ],

    stories: [
      {
        author: "An exploration circle member",
        role: "Student explorer",
        quote: "The circle made it easy to discover new directions and ask better questions."
      }
    ],

    outcomes: [
      "Exposure to diverse research disciplines",
      "Development of curiosity-driven thinking",
      "Networking with researchers and innovators",
      "Pathway into the Ré research ecosystem"
    ]
  }
];

export const CAREER_OPPORTUNITIES: CareerOpportunity[] = [
  {
    id: 'career-ra-nlp',
    title: 'Research Assistant — Dravidian NLP & Digitization',
    type: 'Assistantship',
    stipendOrPackage: '₹22,000 - ₹28,000 / month',
    description: 'Join our Nithilam Heritage center to work on modern attention neural architectures for character restoration on damaged regional materials.',
    requirements: [
      'Bachelor’s or Master’s in Computer Science, Information Technology, or Data Science.',
      'Strong proficiency in Python, PyTorch/TensorFlow, and basic Computer Vision libraries.',
      'Strong appreciation or familiarity with historical scripts and epigraphical science is highly valued.'
    ],
    process: [
      'Preliminary evaluation of candidate CV and review of machine learning portfolios on GitHub',
      'A practical remote coding and image model modification test (90 minutes)',
      'Academic panel interview focused on methodology and research writing goals.'
    ],
    deadline: 'July 5, 2026'
  },
  {
    id: 'career-intern-nfrc',
    title: 'Undergraduate Research Intern — Bio-Composite Development',
    type: 'Internship',
    stipendOrPackage: '₹8,000 / month (KREST-subsidized)',
    description: 'Work alongside mechanical science faculty in our Materials Prototyping Lab to chemical treat and fiber-wrap polymer specimens.',
    requirements: [
      'Enrollment in pre-final or final year BE/BTech (Mechanical, Aeronautical, Automobile, or Textile Engineering).',
      'Basic conceptual understanding of material strength, mechanics, and composite material metrics.',
      'Hands-on lab attitude and eagerness to process agricultural fabrics and resins.'
    ],
    process: [
      'Submission of research interest statement detailing curiosity and career direction',
      'In-person basic lab practical test involving chemical compounding or material testing demonstration',
      'Short interview discussing academic alignment.'
    ],
    deadline: 'June 30, 2026'
  },
  {
    id: 'career-faculty-fellow',
    title: 'Postdoctoral Research Fellow — Sustainable Circular Materials',
    type: 'Faculty',
    stipendOrPackage: 'Consolidated competitive pay package up to ₹7.2 Lakhs / annum',
    description: 'Lead research explorations inside the Natural Fibre Research Centre focusing on bio-waste upcycling and commercial polymer composite fabrication.',
    requirements: [
      'PhD in Material Science, Chemistry, Polymeric engineering, or allied mechanical research fields.',
      'At least three published papers in high-quality international journals (Q1/Q2 tier lists).',
      'Demonstrated capacity to write proposals for central and state funding agencies.'
    ],
    process: [
      'Academic CV evaluation by our Board of Advisors',
      'Presentation of past research outcomes and future roadmap to core research cluster',
      'Final discussion with Kumaraguru Institutions scientific leadership board.'
    ],
    deadline: 'August 15, 2026'
  },
  {
    id: 'career-industry-liason',
    title: 'Industry Collaboration Research Executive',
    type: 'Industry',
    stipendOrPackage: 'Commensurate with experience & qualification',
    description: 'Drive high-value technology transfer, sponsored industrial research projects, and corporate alliances across automotive and digital sectors.',
    requirements: [
      'Master’s or MBA with a solid engineering background (Mechanical, Materials, or Electronics).',
      'Minimum of 3 years working in industry-academia technology transfer units, technology incubators, or corporate R&D alliances.',
      'Outstanding communication, legal documentation drafting, and contract closure capacities.'
    ],
    process: [
      'Initial filtering of profiles with verifiable industrial partnerships closed',
      'Case scenario response test analyzing technology licensing agreements',
      'Leadership interaction, evaluating strategic values.'
    ],
    deadline: 'July 20, 2026'
  }
];

export const EVENTS: EventItem[] = [
  {
    id: 'event-icon-2026',
    title: 'ICON 2026 — International Conference on Sustainable Agricultural Materials',
    type: 'Conference',
    date: 'September 18-20, 2026',
    time: '09:00 AM - 05:30 PM (IST)',
    venue: 'Vivekananda Auditorium, Kumaraguru Campus & Live Stream',
    speaker: 'DR. HELENA KÄRKKÄINEN (Aalto University, Finland)',
    description: 'A global stage bringing academic researchers, material scientists, and industrial visionaries together to discuss eco-composite engineering and organic fiber products.',
    agenda: [
      'Keynote Address: Restructuring Agricultural Byproducts for Global Light Transit Industries (Dr. Helena)',
      'Panel Discussion: Replacing Synthetic Composites — Regulatory frameworks, mechanical limits, and cost parameters',
      'Technical Paper presentation sessions (Mechanical, Chemistry, and Industrial Design paths)',
      'Awards Ceremony for top student-explorer prototypes'
    ],
    status: 'upcoming'
  },
  {
    id: 'event-talk-epigraphy',
    title: 'RÉ Research Talk — Computational Epigraphy anddravidian NLP Systems',
    type: 'Talk',
    date: 'June 25, 2026',
    time: '03:00 PM - 04:30 PM (IST)',
    venue: 'Seminar Hall 3, Block B, Kumaraguru Campus',
    speaker: 'PROF. S. SENGUTTUVAN (Archaeology & Heritage Director, State Epigraphical Assembly)',
    description: 'An interactive seminar discussing practical computational approaches towards resolving degraded historical scripts, exploring direct links to regional neural network transcription.',
    agenda: [
      'The Journey of In-situ Paper Prints: Collecting weathered stone script prints (Prof. Senguttuvan)',
      'Computational Visual Processing of stone carving anomalies (Dr. S. Dhanalakshmi)',
      'Open Q&A with student historians and AI engineering cohorts'
    ],
    status: 'upcoming'
  },
  {
    id: 'event-workshop-composites',
    title: 'Practical Hands-on Workshop: Alkali Treatment and Fiber Composite Design',
    type: 'Workshop',
    date: 'April 14, 2026',
    time: '10:00 AM - 04:00 PM',
    venue: 'NFRC Materials Prototyping Laboratory, Block D',
    speaker: 'DR. S. VIGNESH & Lab Technologists',
    description: 'Learners from across departments explored natural banana fiber processing, resin binding, hot-press operational loops, and tensile testing procedures.',
    agenda: [
      'Fibre Extraction: Reclaiming raw agricultural residue',
      'Chemical Scrubbing: Alkali chemical treatment using NaOH Solutions',
      'Molding and Hot pressing composite test plates',
      'Tensile and physical performance testing (UTM)'
    ],
    status: 'past'
  }
];

export const MEMBERS: Member[] = [
  {
    name: 'Dr. S. Dhanalakshmi',
    role: 'Lead Researcher, Nithilam Heritage Centre & Associate Professor',
    designation: 'Department of Computer Applications',
    bio: 'Dedicated to bridging humanity studies with computational sciences, Dr. Dhanalakshmi has cataloged 100+ stone inscriptions and leads our Vatteluttu script AI restoration.',
    publicationsCount: 24
  },
  {
    name: 'Prof. K. Ramesh',
    role: 'Coordinator, Natural Fibre Research Centre & Senior Professor',
    designation: 'Department of Mechanical Engineering',
    bio: 'An expert in polymeric blends and biocomposite materials, Prof. Ramesh works with domestic EV enterprises to scale lightweight bio-composite parts.',
    publicationsCount: 42
  },
  {
    name: 'Dr. Meera Krishnan',
    role: 'Lead Diagnostics Scholar, Biomedical Electronics Wing',
    designation: 'Department of Biotechnology',
    bio: 'Focused on delivering diagnostics tools to local populations, Dr. Krishnan develops affordable screening equipment utilizing localized micro-image classification.',
    publicationsCount: 18
  },
  {
    name: 'Dr. S. Vignesh',
    role: 'Materials Characterization Core Officer & Assistant Professor',
    designation: 'Department of Chemistry',
    bio: 'Dr. Vignesh researches polymer chemistry, raw cellulose cellulose extraction methodologies, and organic starch-based eco-adhesives.',
    publicationsCount: 15
  },
  {
    name: 'Dr. A. Karthikeyan',
    role: 'Lead Scholar, High-Performance AI Research Hub',
    designation: 'Department of Artificial Intelligence & Data Science',
    bio: 'Dr. Karthikeyan specializes in edge-optimized deep learning models, real-time spatial analysis, and localized digital grids.',
    publicationsCount: 31
  }
];
