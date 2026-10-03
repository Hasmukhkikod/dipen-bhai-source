// NOT used at runtime anymore — the site now loads all content from the
// MySQL-backed API (see ../context/ContentContext.jsx and server/src/seed.js).
// Kept only as a historical/reference snapshot of the content shape.
var defaultContent = {
  profile: {
    firstName: `NAVYRIX`,
    lastName: `LABS`,
    fullName: `NAVYRIX LABS`,
    tagline: `Engineering Ideas Into Products That Ship.`,
    roleDescription: `Product Engineering Services (Electronics & Defense, Agritech, Biotech) | IoT & Connected Systems | Agile Product Architecture | Startup Mentor & Consulting Services | Expert Talks`,
    shortBio: `NAVYRIX is a product engineering practice led by Dipen Parmar, built on 18+ years across electronics, defense, agritech, and biotech. We take connected ideas from first sketch to certified, mass production — and mentor the founders building the next generation of innovative hardware startups..`,
    aboutHeadline: `Two decades of engineering discipline. One partner for product execution.`,
    aboutIntro: `At Navyrix Labs, we combine 18+ years of embedded systems expertise with startup product delivery, agritech innovation, and technology mentorship. Led by Chief Architect Dipen Parmar, our specialized engineering group helps organizations design, validate, and scale connected hardware systems.`,
    avatarUrl: `/dipen_hero.png`,
    cvUrl: `#`,
    ctaDiscoveryUrl: `https://calendly.com/dipen-parmar/30min`,
    trustStats: [{
      id: `stat-1`,
      value: `18+`,
      label: `Years Experience`
    }, {
      id: `stat-2`,
      value: `12+`,
      label: `Years SLS Leadership`
    }, {
      id: `stat-3`,
      value: `2+`,
      label: `Years at Qualcomm`
    }, {
      id: `stat-4`,
      value: `5+`,
      label: `Animal Husbandry & Agritech`
    }, {
      id: `stat-5`,
      value: `25+`,
      label: `Tech & Startup Talks`
    }, {
      id: `stat-6`,
      value: `30+`,
      label: `Startup Mentorship`
    }],
    trustBrands: [`Qualcomm`, `System Level Solutions`, `Nebulae IoT`, `ME2MILLET`, `LibreRouter`, `i-Hub Gujarat`]
  },
  ventures: [{
    id: `v-1`,
    name: `ME2MILLET`,
    desc: `A brand of Krishitattva Agtech Private Limited. Focused on millet awareness, farming, and processing, and on value-added gluten-free products in Ready-to-Cook and Ready-to-Eat categories.`,
    status: `Co-Founder`,
    website: `www.me2millet.com | www.krishitattva.com`
  }, {
    id: `v-2`,
    name: `Gavyam Gentech Private Limited`,
    desc: `Animal husbandry (agritech and biotech) IoT products and services for animal breeding and monitoring.`,
    status: `Past: Director & Technology Architect | Past Co-Founder`,
    website: `www.gavyamgentec.com`
  }, {
    id: `v-3`,
    name: `Defen System Solutions Private Limited`,
    desc: `Defense electronics product development.`,
    status: `Past: Director | Past Co-Founder`,
    website: ``
  }, {
    id: `v-4`,
    name: `System Level Solutions Private Limited`,
    desc: `Custom embedded products and services, and IoT architecture including gateway and other subsystems.`,
    status: `Past: Sr. Manager`,
    website: `www.slscorp.com`
  }],
  credentials: {
    technicalProjects: [],
    mentorProjects: [],
    jurySlots: [`Past: Startup Pitch Evaluator & Jury Panelist, i-Hub Gujarat`, `Past: Startup Pitch Evaluator & Jury Panelist, Sardar Patel Startup and Entrepreneurship Council, Anand`],
    lectures: [],
    patents: [`Paper Submitted: Dual-bank secure OTA firmware updating method for low-power mesh utility nodes (details to follow)`],
    copyrights: [],
    memberships: []
  },
  expertise: [{
    id: `exp-1`,
    number: `01`,
    title: `Embedded Systems`,
    description: `Custom embedded product development that includes sensor, gateway, cloud, and application layers — web and mobile based.`,
    skills: [`Embedded Architecture`, `(Secure) Linux/RTOS and FoTA`, `Protocol and Cloud Agnostic Connectivity`]
  }, {
    id: `exp-2`,
    number: `02`,
    title: `IoT & Connected Products`,
    description: `End-to-end communication network architectures and industrial networking protocols.`,
    skills: [`Smart City`, `Sensor Networks`, `Zigbee`, `Wi-Fi`, `BLE`, `LoRa`, `Wired Network`, `Modbus`, `MQTT`, `NB-IoT`]
  }, {
    id: `exp-3`,
    number: `03`,
    title: `Product Engineering`,
    description: `Guiding hardware concepts from specifications to market-ready architecture.`,
    skills: [`Architecture Design`, `Prototype Development`, `Regulatory Testing`, `Field Pilot Runs`, `Production Readiness`, `Patent, Copyrights Generation and Review, Open Source Compliances`]
  }, {
    id: `exp-4`,
    number: `04`,
    title: `AI + IoT`,
    description: `Edge intelligence and data-driven connected hardware.`,
    skills: [`Sensor Intelligence`, `AI/ML Integration`, `Connected Agriculture`, `Data-driven Products`]
  }, {
    id: `exp-5`,
    number: `05`,
    title: `Manufacturing`,
    description: `Bridge between PoC (Proof of Concept) and mass manufacturing, with automation test support and certification services including user manual and packaging needs.`,
    skills: [`Product Readiness`, `Certification Support`, `Quality Systems`, `Production Support`]
  }],
  ecosystem: {
    headline: `Beyond Engineering.`,
    subheading: `Building technology is only one part of the journey. Navyrix Labs actively mentors, evaluates, and contributes to scaling connected product ecosystems.`,
    activities: [{
      id: `act-1`,
      title: `STARTUP MENTOR & JURY`,
      detail: `Agritech Mentor & Jury member at Sardar Patel Startup Entrepreneurship Council and i-Hub Gujarat (past), guiding early-stage innovators.`
    }, {
      id: `act-2`,
      title: `AGRITECH INNOVATOR`,
      detail: `Co-founder of Krishitattva (ME2MILLET). Past: Gavyam Gentech, deploying IoT and AI/ML systems in animal husbandry and sustainable farming.`
    }, {
      id: `act-3`,
      title: `OPEN-SOURCE CONTRIBUTOR`,
      detail: `Active contributor to open-source hardware and software products, including LibreRouter — developed for community network needs.`
    }, {
      id: `act-4`,
      title: `INDUSTRY SPEAKER`,
      detail: `Expert Speaker at AICTE ATAL Academy FDP programs, engineering colleges, and startup incubator workshops.`
    }]
  },
  projects: [],
  journey: [],
  speaking: [{
    id: `sp-1`,
    date: `Dec 2024`,
    event: `AICTE ATAL Academy FDP`,
    topic: `Next-Gen IoT and Edge Intelligence in Agriculture`
  }, {
    id: `sp-2`,
    date: `Oct 2024`,
    event: `i-Hub Gujarat Startup Incubator`,
    topic: `Hardware Prototyping: From Schematic to Mass Production`
  }, {
    id: `sp-3`,
    date: `Jul 2024`,
    event: `Sardar Patel SEC Seminar`,
    topic: `Bridging the Gap: IoT Product-Market Fit for Agritech Founders`
  }, {
    id: `sp-4`,
    date: `Feb 2024`,
    event: `SVIT Engineering College Lecture`,
    topic: `Career Pathways in Modern Embedded Linux & Wireless Networking`
  }],
  global: {
    headline: `Technology Without Borders.`,
    description: `International business exposure, global client support, and technical trade representation across crucial tech hubs.`,
    countries: [`United Kingdom`, `Japan`, `China`, `European Union`, `Oman`, `United Arab Emirates`]
  },
  skills: [`C`, `C++`, `Python`, `Linux Kernel`, `FreeRTOS`, `U-Boot`, `8/32/64-bit ARM`, `RISC`, `FPGA Processors`, `STM32`, `IoT`, `6LoWPAN`, `Zigbee`, `Wi-Fi`, `PCIe`, `I2C`, `SPI`, `UART`, `Git`, `GitHub`, `GitLab`, `Gerrit`, `Jenkins`, `Jira`, `Tuleap`, `MISRA C`, `FoTA`, `Unity C`],
  certifications: [{
    id: `c-1`,
    title: `Certified Scrum Product Owner (CSPO)`
  }, {
    id: `c-2`,
    title: `ISO 9001 Quality Management Systems Internal Auditor`
  }, {
    id: `c-3`,
    title: `ISO 27001 Information Security Management Systems Internal Auditor`
  }, {
    id: `c-4`,
    title: `ISO 13485 Medical Devices QMS Knowledge`
  }, {
    id: `c-5`,
    title: `MISRA C Programming Standard Expert`
  }],
  process: [{
    step: `01`,
    name: `Discovery`,
    desc: `Understanding the problem, feasibility analysis, and defining product requirements.`
  }, {
    step: `02`,
    name: `Architecture`,
    desc: `Defining product architecture — hardware schematics, software stack, low-power constraints, and connectivity protocols — considering stability, cost, and user adaptability.`
  }, {
    step: `03`,
    name: `Prototype`,
    desc: `Quick PoC with off-the-shelf development kits, or spinning initial PCB runs and developing first-stage firmware for lab testing.`
  }, {
    step: `04`,
    name: `Testing`,
    desc: `Rigorous testing of board interfaces, range coverage, power profiles, and code reliability.`
  }, {
    step: `05`,
    name: `Pilot`,
    desc: `Deploying a small batch of hardware units in real-world field environments to collect telemetry.`
  }, {
    step: `06`,
    name: `Production`,
    desc: `Sourcing components, designing test jigs, and finalizing QA systems for volume assembly.`
  }, {
    step: `07`,
    name: `Support`,
    desc: `Rolling out secure FOTA updates and maintaining field hardware throughout its life cycle, including product after-life support for repair and bug fixes.`
  }],
  leads: [{
    id: `lead-1`,
    name: `Rajesh Patel`,
    email: `rpatel@agrotech-ventures.in`,
    company: `Agrotech Ventures Ltd`,
    industry: `Agritech`,
    description: `Looking to develop a solar-powered soil moisture node network using LoRaWAN mesh communication. Need guidance on hardware design and production prep.`,
    budget: `10,000 - 25,000 USD`,
    timeline: `3 - 6 Months`,
    date: `2026-08-09T14:32:00.000Z`
  }, {
    id: `lead-2`,
    name: `Kenji Tanaka`,
    email: `t.kenji@smart-grid-jp.com`,
    company: `Tokyo Grid Analytics`,
    industry: `Energy / Utilities`,
    description: `Need help reviewing firmware security standards and G3-PLC/DLMS integration for utility gateway endpoints.`,
    budget: `25,000+ USD`,
    timeline: `1 - 3 Months`,
    date: `2026-08-10T09:15:00.000Z`
  }],
  blogs: [{
    id: `blog-1`,
    title: `The Future of Agritech: IoT Sensors in Millet Farming`,
    slug: `future-of-agritech-millet-farming`,
    excerpt: `Exploring how soil moisture, ambient humidity, and NPK metrics collected via sub-GHz low power nodes can optimize crop yields and save water resources in arid regions.`,
    content: `The intersection of electronics and agriculture holds the key to solving global food security challenges. In recent years, millet farming—particularly in dry regions of India and sub-Saharan Africa—has benefited immensely from targeted IoT deployments.

### Why Millets?
Millets are highly resilient crops, but they are extremely sensitive to waterlogging and nutrient depletion during early vegetative phases. Traditional agricultural methods rely on guesswork, which often leads to over-watering or soil salinity issues.

### The Role of IoT Nodes
By deploying sub-GHz wireless sensor nodes equipped with soil moisture probes, temperature sensors, and electrical conductivity sensors, we can feed real-time analytics to dashboard systems.

1. **Sub-GHz Mesh Networks**: Sub-GHz radio frequencies (like 868MHz or 915MHz) provide excellent propagation through dense foliage, allowing nodes to communicate across vast crop fields.
2. **Ultra-Low Power Harvesting**: Deploying nodes that run on tiny solar cells combined with supercapacitors ensures zero-maintenance lifecycles of up to 5-10 years.
3. **Edge Inferences**: Filtering raw telemetry data at the node level before transmission reduces radio power consumption, which is the largest drain on battery systems.

At **ME2MILLET**, our mission has been to commoditize these edge sensor networks, proving that smart hardware can create measurable ecological and commercial benefits for local growers.`,
    image: `/me2millet.png`,
    category: `Agritech`,
    readTime: `4 min read`,
    date: `August 10, 2026`,
    published: !0
  }],
  settings: {
    seoTitle: `Navyrix Labs | Embedded Systems, IoT & Product Engineering Services`,
    seoDescription: `Navyrix Labs delivers embedded systems, IoT architecture, and end-to-end product engineering — from firmware and connected hardware to certification and mass production — across electronics, defense, agritech, and biotech.`,
    seoKeywords: `embedded systems, IoT architecture, product engineering services, firmware development, connected hardware design, agritech IoT, defense electronics, startup mentorship, hardware prototyping, mass manufacturing support`,
    contactEmail: `info@navyrix.com`,
    contactPhone: `+91 99987 44676`,
    contactLinkedin: `linkedin.com/in/dipenparmar`,
    contactLocation: `Gujarat, India`,
    adminPassword: `dipen123`
  }
};

export default defaultContent;
