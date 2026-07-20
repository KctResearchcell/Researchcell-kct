export interface ResearchCircleDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  areasOfInvestigation: {
    title: string;
    description: string;
  }[];
  featuredResearch: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    leader: string;
    outcome?: string;
  }[];
  publications: {
    title: string;
    authors: string[];
    journal: string;
    year: number;
    doi: string;
    abstract: string;
    url?: string;
  }[];
  locations: {
    name: string;
    description: string;
    image: string;
  }[];
  people: {
    name: string;
    role: string;
    bio: string;
    image: string;
  }[];
}

export const RESEARCH_CIRCLES: ResearchCircleDetail[] = [
  {
    id: "environmental-science",
    title: "Environmental Science and Systems Research Circle",
    tagline: "Building a future where growth and sustainability can coexist.",
    description: "The Sustainable Systems Circle explores environmental resilience, sustainable infrastructure, circular economy models, and resource-conscious innovation.",
    areasOfInvestigation: [
      {
        title: "Green & Sustainable Concrete",
        description: "Investigating low-carbon alternatives to Portland cement by utilizing fly ash, volcanic tuffs, slag, and natural fibers to achieve zero-pollution structural materials."
      },
      {
        title: "Rice Husk Composite Materials",
        description: "Re-engineering agricultural residue, particularly silica-rich rice husk ash, into premium, fire-resistant architectural panels and particle boards."
      },
      {
        title: "Circular Economy Systems",
        description: "Mapping industrial waste streams to close fabric loop cycles, designing municipal recycling flows, and modeling product life cycles for regional manufacturers."
      },
      {
        title: "Climate Resilience Research",
        description: "Monitoring localized climate variances using sensor arrays and spatial telemetry grids to observe changes across vulnerable river basins."
      },
      {
        title: "Sustainable Agriculture Technologies",
        description: "Developing soil moisture sensing algorithms, automated composting systems, and pesticide-drift reduction nozzles for rural farmers."
      }
    ],
    featuredResearch: [
      {
        title: "Green Concrete for Future Infrastructure",
        subtitle: "Low-Carbon Cement Substitution Studies",
        description: "Replacing standard limestone clinkers with regional industrial byproducts. Mechanical tests demonstrate comparable load capacities with 40% lower carbon footprints.",
        image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop",
        leader: "Prof. K. Ramesh",
        outcome: "Fully certified prototype structural segments placed in local campus pathways."
      },
      {
        title: "Rice Husk Composite for Circular Construction Systems",
        subtitle: "Agricultural Residue Upcycling",
        description: "Thermally pressed rice husks bound with biodegradable natural starch-adhesives. Offers high acoustic absorption and flame barrier properties.",
        image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=800&auto=format&fit=crop",
        leader: "Dr. S. Vignesh",
        outcome: "Awarded top regional materials innovation prize and filed patent application."
      }
    ],
    publications: [
      {
        title: "Characterization of Rice Husk Ash Silica Residues in Biodegradable Polymer Matrices",
        authors: ["S. Vignesh", "K. Ramesh", "P. Nandhakumar"],
        journal: "International Journal of Sustainable Architecture & Materials Science",
        year: 2025,
        doi: "10.1016/j.ijsams.2025.10521",
        abstract: "Using silica-rich agricultural waste as active reinforcement improves high temperature thermal degradation and flexural strengths of biodegradable composite panel structures."
      },
      {
        title: "Localized telemetry grid systems for monitoring river basin climate resilience",
        authors: ["R. Nandhakumar", "G. Balaji"],
        journal: "Hydro-Meteorology Studies Quarterly",
        year: 2024,
        doi: "10.1109/HMSQ.2024.98182",
        abstract: "A low-power sensor network deployed along vulnerable water canals transmits environmental parameters to evaluate soil drainage parameters and regional micro-climate changes."
      }
    ],
    locations: [
      {
        name: "Sustainable Materials Lab",
        description: "Equipped with automated fiber processing lines, hydraulic hot-press molding machines, and structural testing assemblies.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Eco-Telemetry Station",
        description: "Computational room mapping live agricultural streams, GIS data feeds, and regional micro-climates in real-time.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop"
      }
    ],
    people: [
      {
        name: "Prof. K. Ramesh",
        role: "Faculty Research Co-Lead",
        bio: "Specialist in composite materials and regional materials science with over 40+ scholarly peer publications.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150"
      },
      {
        name: "Sanjay Kumar",
        role: "Student Research Fellow",
        bio: "BTech Mechanical Engineering senior developing low-carbon concrete and bio-composites.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150"
      }
    ]
  },
  {
    id: "bioscience",
    title: "Bioscience Research Circle",
    tagline: "Advancing scientific understanding to improve human wellbeing.",
    description: "The Human Health & Bioscience Circle investigates biological systems, healthcare technologies, biomaterials, and scientific innovations that address real-world health challenges.",
    areasOfInvestigation: [
      {
        title: "CRISPR-Cas9 Systems",
        description: "Studying precision gene-editing guidelines targeting localized seed vulnerabilities to build resilient crop breeds under extreme arid settings."
      },
      {
        title: "Diabetic Wound Healing Scaffolds",
        description: "Fabricating bio-polymeric skin patches seeded with growth factors that maintain optimal micro-environments for accelerated tissue regeneration."
      },
      {
        title: "Agricultural Biotechnology",
        description: "Developing biological inoculants and microbial cultures to improve nutrient absorption rates of regional crops with zero chemical inputs."
      },
      {
        title: "Biomaterial Applications",
        description: "Synthesizing bio-compatible compounds from silk cocoons and medical grade starches to construct non-toxic drug delivery vessels."
      },
      {
        title: "Thermal Cocoon Systems",
        description: "Designing dynamic incubators utilizing specialized phase-change bio-material blankets to stabilize neonate temperatures."
      }
    ],
    featuredResearch: [
      {
        title: "Scaffolds for Diabetic Wound Healing",
        subtitle: "Translational Bio-Polymer Engineering",
        description: "Created electrospun chitosan-gelatin scaffolds with targeted antimicrobial dissemination to accelerate skin-tissue healing in diabetic outpatients.",
        image: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?q=80&w=800&auto=format&fit=crop",
        leader: "Dr. Meera Krishnan",
        outcome: "Validated in cell-culture laboratory lines. Published in high-impact biotechnology logs."
      },
      {
        title: "Improving Agricultural Crop Sustainability",
        subtitle: "Integrated Biological Inoculants Studies",
        description: "Isolating regional rhizosphere bacteria that shield crop roots from severe drought conditions and assist nitrogen compound stabilization.",
        image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=800&auto=format&fit=crop",
        leader: "Dr. S. Rajeswari",
        outcome: "Formulated liquid cultures tested across five pilot farms with excellent yield records."
      }
    ],
    publications: [
      {
        title: "Electrospun Chitosan-Gelatin Nano-fibrous Scaffolds for Accelerating Diabetic Retinopathy Prevention and Wound Recovery",
        authors: ["Meera Krishnan", "S. Rajeswari", "C. Catherine"],
        journal: "Biomaterials and Tissue Engineering Letters",
        year: 2026,
        doi: "10.1016/j.btel.2026.11029",
        abstract: "We report on the compounding characteristics of micro-fibered scaffolds. Our biological assays indicate superior tissue cell migration and high antibacterial responses under testing environments."
      },
      {
        title: "Rhizospheric Isolation of Drought-Tolerance Microbes for Rice Cultivars in Southern India",
        authors: ["S. Rajeswari", "Meera Krishnan"],
        journal: "Indian Journal of Agron-Biotechnology",
        year: 2025,
        doi: "10.1109/IJAB.2025.321890",
        abstract: "Drought stress in agricultural systems can be mitigated by introducing endemic soil microbes. This research indexes five highly active strains supporting root stabilization."
      }
    ],
    locations: [
      {
        name: "Bio-Materials & Tissue Lab",
        description: "Sterile diagnostics workspace equipped with electrospinning platforms, cell-culture hoods, and analytical spectroscopy.",
        image: "https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Agritech Experimental Greenhouse",
        description: "Climate-controlled research greenhouse for monitoring plant physiology and testing biological inoculants.",
        image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=600&auto=format&fit=crop"
      }
    ],
    people: [
      {
        name: "Dr. Meera Krishnan",
        role: "Faculty Mentor & Lead Advisor",
        bio: "Preeminent biotechnology educator specializing in tissue regeneration assays and innovative bio-compatible engineering.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150"
      },
      {
        name: "Catherine",
        role: "KREST Fellow",
        bio: "Doctoral candidate researching growth-factor encapsulation inside phase-change scaffolds.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
      }
    ]
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy Circle",
    tagline: "Exploring how the world will generate, store, and distribute energy.",
    description: "The Energy Futures Circle focuses on renewable energy systems, storage technologies, energy resilience, and sustainable power solutions.",
    areasOfInvestigation: [
      {
        title: "Battery Design & Fabrication",
        description: "Assembling customized lithium-iron-phosphate (LFP) pouch cells with localized cooling jackets to increase electric vehicle safety."
      },
      {
        title: "Battery Energy Storage Systems (BESS)",
        description: "Developing intelligent state-of-charge calculation algorithms and thermal balancing relays to operate grid-scale backups."
      },
      {
        title: "Wind Turbine Blade Development",
        description: "Optimizing the aerodynamic lift coefficients of micro-turbine blades by replacing heavy fiberglass with lightweight natural-woven composites."
      },
      {
        title: "MPPT Systems",
        description: "Coding digital Maximum Power Point Tracking logic on microcontrollers to squeeze 15% more power from rooftop solar systems."
      },
      {
        title: "Renewable Energy Integration",
        description: "Structuring microgrid power flows and high-frequency inverters to combine decentralized solar arrays with regional utility lines."
      }
    ],
    featuredResearch: [
      {
        title: "EVault Intelligent Battery Pack",
        subtitle: "High-Safety Pack Prototyping",
        description: "Engineered an smart battery with active thermal balance chips and fire-retardant enclosures. Ideal for hot tropical operating conditions.",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop",
        leader: "Dr. G. Balaji",
        outcome: "Tested over 1,200 charge cycles showing zero thermal runaway events."
      },
      {
        title: "Wind Turbine Blade Design Research",
        subtitle: "Bio-Composite Lift Optimization",
        description: "Re-modeling airfoil shapes for low-wind-speed regional areas, utilizing flax and natural fibers to achieve modular, light blade elements.",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop",
        leader: "Prof. K. Ramesh",
        outcome: "Produced physical 1.5m blade prototypes demonstrating high torsional capacity."
      }
    ],
    publications: [
      {
        title: "Micro-grid State-of-Charge Estimation using Edge-Optimized Kalman Filtering Algorithms",
        authors: ["G. Balaji", "K. Ramesh", "Karan P."],
        journal: "IEEE Transactions on Power Electronics & Energy Futures",
        year: 2025,
        doi: "10.1109/TPEEF.2025.10922",
        abstract: "Battery life degradation algorithms require fast calculation loops. We present an edge-stabilized filter design implemented on 8-bit controllers to track cell charges with 98.4% estimation accuracy."
      },
      {
        title: "Aerodynamic Performance of Hybrid Eco-Fibre Airfoils for Low Wind Speed Microgrids",
        authors: ["K. Ramesh", "G. Balaji"],
        journal: "Renewable Energy Prototyping Review",
        year: 2024,
        doi: "10.1016/j.repr.2024.55182",
        abstract: "Natural fiber composites offer great weight savings. This study records lift and drag properties of micro-turbine blades under wind tunnel environments, showing impressive mechanical responses."
      }
    ],
    locations: [
      {
        name: "Electric Battery Lab",
        description: "Equipped with cell spot welding machines, climate chamber testers, precision charge dischargers, and thermal vision rigs.",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Microgrid Integration Hub",
        description: "Electrical workbench featuring simulation nodes, custom MPPT control test stands, and high-frequency digital oscilloscopes.",
        image: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=600&auto=format&fit=crop"
      }
    ],
    people: [
      {
        name: "Dr. G. Balaji",
        role: "Faculty Research Lead",
        bio: "Expert researcher in cell chemistry, smart microgrids, and high-efficiency power electronics.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
      },
      {
        name: "Karan",
        role: "Student Energy Intern",
        bio: "EE senior coding firmware and testing real-world battery thermal response models.",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"
      }
    ]
  },
  {
    id: "automotive",
    title: "Automotive Research Circle",
    tagline: "Designing the future of transportation.",
    description: "The Mobility & Automotive Circle investigates sustainable mobility, vehicle innovation, electric transportation, and future transportation systems.",
    areasOfInvestigation: [
      {
        title: "Compact Electric Vehicles",
        description: "Prototyping affordable, ultra-maneuverable electric personal transport units tailored for dense urban traffic circles."
      },
      {
        title: "Green Campus Mobility Systems",
        description: "Modeling and operating intelligent, solar-recharged fleet transit systems for emission-free university centers."
      },
      {
        title: "Sustainable Transportation Models",
        description: "Formulating geographic route-optimization algorithms to trim public fleet fuels and cut exhaust limits."
      },
      {
        title: "Vehicle Design Research",
        description: "Studying low-drag body shapes and testing bio-composite chassis units to improve electric driving ranges on standard motors."
      },
      {
        title: "Human-Centered Mobility Solutions",
        description: "Designing tactile control interfaces, smart cabin layouts, and assistive entry gates for differently-abled commuters."
      }
    ],
    featuredResearch: [
      {
        title: "Compact Electric Trike",
        subtitle: "Emission-Free Campus Shuttle Prototyping",
        description: "Designed a light, three-wheeled electric vehicle with custom bio-composite structural fairings. Perfect for low-speed urban transit loops.",
        image: "https://images.unsplash.com/photo-1516594798947-e6f55041993c?q=80&w=800&auto=format&fit=crop",
        leader: "Prof. Manikandan R.",
        outcome: "Currently in daily operation on-campus for visitor transit under solar recharge grids."
      },
      {
        title: "Future Mobility Concepts",
        subtitle: "Aero-Acoustics Chassis Optimization",
        description: "Wind resistance simulations combined with bio-matrix panels to optimize drag metrics, achieving 18% less motor resistance under testing.",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
        leader: "Dr. S. Vignesh",
        outcome: "Model simulations published at the International Clean Transit symposium."
      }
    ],
    publications: [
      {
        title: "Design and Validation of a Bio-Composite Reinforced Compact Electric Vehicle for Sustainable Logistics",
        authors: ["M. R. Manikandan", "K. Ramesh", "A. Peter"],
        journal: "International Journal of Automotive & Clean Mobility",
        year: 2025,
        doi: "10.1016/ijacm.2025.22018",
        abstract: "This paper evaluates the chassis integration of organic polymers on three-wheeled vehicle layouts. Mass constraints decreased by 12% without sacrificing safety thresholds."
      },
      {
        title: "Aero-acoustic simulation parameters of low-drag vehicle bodies constructed with natural fiber composites",
        authors: ["S. Vignesh", "M. R. Manikandan"],
        journal: "Journal of Clean Transport Systems",
        year: 2024,
        doi: "10.1109/JCTS.2024.11029",
        abstract: "By evaluating micro-vibrations of organic fairing panels under high wind flows, we observe improved sound damping properties relative to fiberglass shells."
      }
    ],
    locations: [
      {
        name: "Automotive Fabrication Bay",
        description: "Heavy prototyping workshop containing frame welding units, structural test stands, and low-speed aerodynamic tunnels.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Clean Transit Solar Garage",
        description: "Recharging point and operational hub of the campus electric fleet, fitted with telemetry monitoring arrays.",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop"
      }
    ],
    people: [
      {
        name: "Prof. Manikandan R.",
        role: "Faculty Prototyping Mentor",
        bio: "Automotive design researcher specializing in electric drive components, active suspension designs, and lightweight frames.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150"
      },
      {
        name: "Peter",
        role: "Student Mechanical Researcher",
        bio: "Senior scholar focused on frame FEA simulations and bio-reinforced structural fabrication loops.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150"
      }
    ]
  },
  {
    id: "educational",
    title: "Educational Research Circle",
    tagline: "Making learning more inclusive and accessible.",
    description: "The Learning & Accessibility Circle explores educational innovation, assistive technologies, accessibility research, and human-centered learning experiences.",
    areasOfInvestigation: [
      {
        title: "Assistive Learning Technologies",
        description: "Engaging deep learning computer vision to parse sign-language glyphs and generate immediate audio representations."
      },
      {
        title: "Educational Systems Design",
        description: "Building zero-bandwidth cognitive feedback loops designed to run inside budget smartphones used by rural children."
      },
      {
        title: "Learning Experience Research",
        description: "Tracking student interaction telemetry to identify cognitive roadblocks and personalize math curriculum speeds."
      },
      {
        title: "Accessibility Innovation",
        description: "Prototyping dynamic paper braille displays driven by microscopic actuators, bringing down digital access prices."
      },
      {
        title: "Inclusive Design",
        description: "Formulating physical and digital design toolkits focused on children with sensory and behavioral challenges."
      }
    ],
    featuredResearch: [
      {
        title: "HeaRmeNow",
        subtitle: "Sign-to-Audio AI Assist Suite",
        description: "Integrated camera app to trace mute sign hand gestures and play fluid regional speech. Allows easy everyday interactions for mute individuals.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
        leader: "Dr. A. Karthikeyan",
        outcome: "Currently undergoing testing in municipal schools with amazing usability reviews."
      },
      {
        title: "Assistive Learning Solution for Deaf and Mute Communities",
        subtitle: "Tactile Sound-Wave Synthesizer",
        description: "Developed a wearable wristband converting audio waves into structured physical vibes, supporting deaf students to feel the tones of music.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
        leader: "Dr. S. Dhanalakshmi",
        outcome: "Prototyped and deployed across two local specialized education institutions."
      }
    ],
    publications: [
      {
        title: "Real-time edge convolutional parsing of Dravidian sign language glyphs for assistive speech generation",
        authors: ["A. Karthikeyan", "S. Dhanalakshmi", "M. Anjali"],
        journal: "IEEE Transactions on Assistive Learning & Rehabilitation Systems",
        year: 2026,
        doi: "10.1109/TALRS.2026.11082",
        abstract: "We introduce a lightweight attention-convolutional model to map hand movements. The application compiles at under 24MB, making it ideal for low-budget, low-battery devices."
      },
      {
        title: "Designing tactile actuators to stabilize educational tone feedback for hearing-impaired children",
        authors: ["S. Dhanalakshmi", "A. Karthikeyan"],
        journal: "Inclusive Education & Design Review",
        year: 2025,
        doi: "10.1016/j.iedr.2025.32185",
        abstract: "Wearable haptic platforms can convey complex musical and verbal tones. This paper presents structural actuator coordinates and feedback telemetry evaluated over 6-month clinical trials."
      }
    ],
    locations: [
      {
        name: "Assistive Technology Lab",
        description: "Prototyping workshop featuring 3D printers, haptic development software, and automated evaluation tracks.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Interactive Systems Studio",
        description: "Child-friendly observation studio for test-running accessibility systems and recording pedagogical metrics.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
      }
    ],
    people: [
      {
        name: "Dr. A. Karthikeyan",
        role: "Faculty Coordinator & Mentor",
        bio: "Specializes in edge computing, adaptive networks, and assistive deep-learning configurations.",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"
      },
      {
        name: "Anjali",
        role: "Undergraduate Researcher",
        bio: "Computer Applications senior programming sign-recognition algorithms and haptic drivers.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150"
      }
    ]
  },
  {
    id: "design-society",
    title: "Design Research Circle",
    tagline: "Understanding people, systems, and experiences.",
    description: "The Design & Society Circle investigates human behavior, systems thinking, design research, community engagement, and societal challenges through an interdisciplinary lens.",
    areasOfInvestigation: [
      {
        title: "Human-Centered Design",
        description: "Mapping day-to-day user tasks and testing tangible UI layouts to ensure technology fits naturally with the target population."
      },
      {
        title: "Systems Thinking",
        description: "Modeling massive municipal operations, studying complex craft communities, and drafting solutions targeting core bottlenecks."
      },
      {
        title: "Community Research",
        description: "Conducting deep field ethnography and qualitative interviews to preserve local heritage techniques and optimize cottage industries."
      },
      {
        title: "Design Education",
        description: "Structuring modern spatial learning experiences and developing material-centered curriculum for student designers."
      },
      {
        title: "Social Innovation",
        description: "Co-creating grassroots technologies, sustainable packaging schemes, and and community-owned water filtering models."
      }
    ],
    featuredResearch: [
      {
        title: "Design-Led Community Studies",
        subtitle: "Grassroots Craft Preservation",
        description: "Partnering directly with regional temple sculpture communities to map historic tools, cataloging spatial carvings for modern digital catalogs.",
        image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800&auto=format&fit=crop",
        leader: "Dr. S. Dhanalakshmi",
        outcome: "Constructed the open digital repository with 500+ annotated design carvings."
      },
      {
        title: "Human-Centered Systems Research",
        subtitle: "Municipal Water Waste Mapping",
        description: "A community co-developed system to trace municipal plumbing routes, using human-centered logic to install five heavy chemical alert sensors.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
        leader: "Dr. R. Nandhakumar",
        outcome: "Currently utilized by local regulatory departments to address heavy industry outflows."
      }
    ],
    publications: [
      {
        title: "Systems modeling and ethnography of cottage-industry craft clusters in Western Tamil Nadu",
        authors: ["S. Dhanalakshmi", "R. Nandhakumar", "J. Sanjay"],
        journal: "Design and Social Systems Quarterly",
        year: 2025,
        doi: "10.1016/j.dssq.2025.21092",
        abstract: "Cottage craftsmen suffer from severe market isolation and chemical health risks. This design-led research structures a model providing safe tools while preserving historic Dravidian design patterns."
      },
      {
        title: "Co-designing water-safety interfaces with rural populations in industrial river basins",
        authors: ["R. Nandhakumar", "S. Vignesh"],
        journal: "Journal of Human-Environment Systems Research",
        year: 2024,
        doi: "10.1109/JHESR.2024.90184",
        abstract: "When environmental telemetry interfaces are created with local user participation, community vigilance and reporting rates of toxic industrial spills rise by over 300%."
      }
    ],
    locations: [
      {
        name: "Systems & Co-Design Studio",
        description: "An open, collaborative workspace for team brainstorming, large wall-scale mapping, and conducting community focus reviews.",
        image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Ethnographic Field Archive",
        description: "Research library indexing local dialect maps, craft recordings, physical specimens, and socio-economic datasets.",
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop"
      }
    ],
    people: [
      {
        name: "Dr. S. Dhanalakshmi",
        role: "Faculty Epigraphist & Researcher",
        bio: "Pioneering humanities and computing, with deep experience in regional crafts cataloging and script translations.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150"
      },
      {
        name: "N. Palanisamy",
        role: "Agricultural Cooperative Advisor",
        bio: "Advises our systems circle on community needs, farm logistics, and regional economic priorities.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
      }
    ]
  }
];
