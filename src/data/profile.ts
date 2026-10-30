// All portfolio content lives here. Edit this file to update the site.

export type IconName = 'code' | 'layers' | 'cpu' | 'target' | 'chart' | 'terminal' | 'shield' | 'lock' | 'drone'

export const PERSON = {
  name: 'Patrick Ulad-Lieu',
  shortName: 'Patrick',
  role: 'Software Engineer',
  specialty: 'Systems Automation',
  headline: 'Software Engineer & Systems Automation Specialist',
  location: 'Greater Philadelphia',
  region: 'PA',
  email: 'puladlieu@gmail.com',
  linkedin: 'https://www.linkedin.com/in/patrickuladlieu/',
  workStyle: 'Remote / Hybrid / On-site',
  status: 'Open to full-time software engineering & tech advisory roles',
  summary:
    'Full-stack development, data pipelines & analytics automation, and systems integration. I build the software that turns fragmented data and manual work into dependable, automated systems, from a hardware forecast covering 30,000 City employees to precision laser control routines.',
  // Drop files into /public and put their paths here, e.g. '/photo.jpg' and '/Patrick-Ulad-Lieu-Resume.pdf'.
  // Leave empty to hide the headshot (P logo shows instead) or the résumé buttons.
  photo: '',
  resume: '',
  focus: ['Full-Stack Development', 'Data Pipelines & Analytics', 'Automation & Scripting', 'Hardware / Software Integration'],
}

export const NAV = [
  { id: 'stack', label: 'Stack' },
  { id: 'pillars', label: 'Pillars' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'recommendations', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
] as const

export const TICKER: [string, string][] = [
  ['Patrick Ulad-Lieu', 'Software Engineer'], ['Status', 'Available'], ['Location', 'Greater Philadelphia'],
  ['Lifecycle forecasting', '30,000+ employees'], ['Assets migrated', '100,000+'], ['Endpoints analyzed', '14,000+'],
  ['Tracking accuracy', '+25%'], ['Entry errors', '−30%'], ['Support satisfaction', '95%+'], ['Degree', 'BS Computer Science'],
]

export const STATS = [
  { label: 'City employees covered by lifecycle forecasting', value: 30000, suffix: '+', fill: 22 },
  { label: 'IT assets imported into TeamDynamix', value: 100000, suffix: '+', fill: 24 },
  { label: 'Tracking accuracy boost via automation', value: 25, suffix: '%', fill: 6 },
  { label: 'City departments supported', value: 40, suffix: '+ depts', fill: 16 },
]

export const STACK: { key: string; title: string; icon: IconName; items: string[] }[] = [
  { key: 'languages', title: 'Languages', icon: 'code', items: ['Python', 'JavaScript', 'Java', 'VBA', 'PowerShell', 'SQL', 'C++', 'HTML5/CSS3'] },
  { key: 'tools', title: 'Frameworks & Tools', icon: 'layers', items: ['Git', 'Tailwind CSS','TeamDynamix (TDX) ETL', 'REST APIs', 'Pandas/NumPy', 'ChatGPT (AI-assisted development)', 'Android Development', 'Microsoft Excel & Office', 'SAP', 'Bullhorn'] },
  { key: 'systems', title: 'Systems, Security & Hardware', icon: 'cpu', items: ['Kali Linux', 'BlackArch', 'CrowdStrike Falcon Sensor', 'Active Directory', 'SysAid', 'Remote Troubleshooting', 'CAD', 'CoreXY FDM/3D Prototyping', 'Laser MOPA Vector Processing'] },
  { key: 'concepts', title: 'Engineering Practices', icon: 'target', items: ['Data Structures & Algorithms', 'Forecasting & Data Modeling', 'Data Normalization & Validation', 'Threat Modeling', 'Cyber Defense', 'OSINT', 'Full Lifecycle Engineering'] },
  { key: 'delivery', title: 'Project Delivery & Analysis', icon: 'chart', items: ['Scrum', 'Complex Project Management', 'IT Asset Management', 'Statistical Data Analysis', 'Technical Documentation', 'Technical Training', 'Performance Analysis'] },
]

export const PILLARS: { title: string; icon: IconName; description: string; skills: string[] }[] = [
  { title: 'Full-Stack & Systems Software Development', icon: 'code',
    description: 'Architecting clean, modular software solutions, algorithms, data processing scripts, and modern interactive web platforms.',
    skills: ['JavaScript', 'Python', 'Data Structures & Algorithms', 'RESTful Workflows', 'Responsive Web Design'] },
  { title: 'Data Engineering & Forecasting', icon: 'chart',
    description: 'Building hardware lifecycle forecasts, cleaning fragmented enterprise datasets, and automating analytics and reporting workflows.',
    skills: ['Excel & VBA Automation', 'Dataset Normalization', 'Lifecycle Forecasting', 'Statistical Data Analysis', 'AI-Assisted Development'] },
  { title: 'Systems Automation & Scripting', icon: 'terminal',
    description: 'Eliminating manual data-entry overhead through automated validation workflows, PowerShell workstation provisioning, and custom tooling.',
    skills: ['PowerShell Scripting', 'Automated Validation', 'Linchpin Workstation Imaging', 'Data Pipeline Automation'] },
  { title: 'Hardware-Software & Applied Physics R&D', icon: 'cpu',
    description: 'Developing high-precision vector workflows, pulse frequency tuning algorithms, and G-code/STL processing for laser and 3D additive systems.',
    skills: ['MOPA Fiber Laser Parameter Optimization', 'Bambu Lab CoreXY FDM Pipelines', 'Vector CAD/CAM', 'Embedded & Sensor Integration'] },
]

// Case studies. Every fact here comes from Patrick's LinkedIn; keep it that way when editing.
export const PROJECTS: {
  title: string; org: string; period: string; icon: IconName
  metrics: [string, string][]; problem: string; built: string[]; outcome: string; tech: string[]
}[] = [
  { title: 'Hardware lifecycle forecasting', org: 'City of Philadelphia · OIT', period: '2023 – Present', icon: 'chart',
    metrics: [['30,000+', 'employees covered'], ['40+', 'departments'], ['5,000+', 'high-risk assets flagged']],
    problem: 'Laptop replacements were handled reactively. Warranty and asset data was fragmented, so the City could not see expirations or procurement demand coming.',
    built: [
      'Cleaned and standardized fragmented asset datasets and organized warranty and replacement history for each device.',
      'Designed the forecasting logic and built it in Excel/VBA, modeling historical warranty and replacement patterns to project laptop expirations and procurement demand.',
      'Used ChatGPT as a coding assistant to draft formula and VBA syntax for the logic I designed.',
      'Produced a 2024–2028 hardware expiration forecast by department, with executive-ready risk reports for Police, Fire, and Emergency Services.',
    ],
    outcome: 'Moved City-wide planning from reactive hardware support to proactive, data-driven forecasting, giving leadership a budget and refresh plan years ahead.',
    tech: ['Excel / VBA', 'Forecasting', 'Data Modeling', 'Data Cleaning', 'AI-Assisted Development'] },
  { title: 'TeamDynamix asset migration', org: 'City of Philadelphia · OIT', period: '2023 – Present', icon: 'layers',
    metrics: [['100,000+', 'assets imported'], ['1,000+', 'fields unified'], ['+25%', 'tracking accuracy']],
    problem: 'IT asset tracking lived in static Excel sheets, with inconsistent naming and recurring data-entry errors.',
    built: [
      'Partnered with TeamDynamix to move asset management to a dynamic, centralized platform.',
      'Led the design and import of 100,000+ IT assets, including naming conventions, data integrity checks, and live sync integration.',
      'Unified 1,000+ asset data fields to TDX conventions and verified 90+ City properties with OSINT methods for location accuracy.',
    ],
    outcome: 'Asset-tracking accuracy improved by about 25% and recurring data-entry errors dropped by 30%.',
    tech: ['TeamDynamix', 'ETL', 'Data Validation', 'OSINT', 'Excel Automation'] },
  { title: 'Windows 11 readiness reporting', org: 'City of Philadelphia · OIT', period: '2023 – 2024', icon: 'terminal',
    metrics: [['14,000+', 'assets analyzed'], ['Weekly', 'leadership reports']],
    problem: 'Senior IT leadership needed to know which City devices could move to Windows 11 and what had to be replaced.',
    built: [
      'Analyzed 14,000+ City IT assets for Windows 11 compatibility.',
      'Built VBA-based upgrade-readiness reporting for senior IT leadership.',
      'Delivered weekly analytical reports to the Director of Support Services, translating compatibility and risk data into purchasing and deployment decisions.',
    ],
    outcome: 'Gave leadership a clear, recurring view of upgrade readiness to drive purchasing and deployment.',
    tech: ['VBA', 'Excel', 'Reporting Automation', 'Data Analysis'] },
]

export const EXP_FILTERS = [
  { key: 'all', label: 'All roles' },
  { key: 'software', label: 'Software & Data' },
  { key: 'automation', label: 'Automation' },
  { key: 'hardware', label: 'Hardware R&D' },
  { key: 'security', label: 'Security' },
  { key: 'leadership', label: 'Leadership' },
]

export type Role = {
  role: string; org: string; period: string; note?: string; active: boolean; featured?: boolean
  tags: string[]; bullets: string[]; tech: string[]
  start: string; end?: string // ISO yyyy-mm, used for structured data
}

export const EXPERIENCE: Role[] = [
  { role: 'IT Project Manager & Data Analyst', org: 'Office of Innovation & Technology — City of Philadelphia',
    period: 'Apr 2023 – Present', note: 'Appointed IT Project Manager Nov 2024 · Data Analyst since Apr 2023', start: '2023-04',
    active: true, featured: true, tags: ['software', 'automation', 'leadership'],
    bullets: [
      'Designed and built an Excel/VBA hardware lifecycle forecast for 30,000+ City employees, modeling historical warranty and replacement patterns to predict laptop expirations and procurement demand, with ChatGPT as a coding assistant.',
      'Led the design and import of 100,000+ IT assets into TeamDynamix (TDX), including naming conventions, data integrity checks, and live sync integration, replacing static Excel tracking.',
      'Delivered a 2024–2028 hardware expiration forecast across 40+ departments, identifying 5,000+ aging, high-risk assets for refresh and budget planning.',
      'Analyzed 14,000+ City assets for Windows 11 compatibility and built VBA-based upgrade-readiness reporting for senior IT leadership.',
      'Automated data validation and reporting, improving asset-tracking accuracy by ~25% and cutting recurring data-entry errors by 30%.',
      'Produced executive-ready risk reports for Police, Fire, and Emergency Services, and weekly analytics for the Director of Support Services.',
      'Verified 90+ City properties with OSINT methods to improve geographic accuracy in the asset tracking system.',
    ], tech: ['Excel / VBA', 'Forecasting', 'AI-Assisted Development', 'TeamDynamix', 'Scrum', 'OSINT'] },
  { role: 'Technology Support Specialist / Cyber Security', org: 'Office of Innovation & Technology — City of Philadelphia',
    period: 'Aug 2022 – Present', note: 'Started as an OIT intern, Jun – Aug 2022', start: '2022-08',
    active: true, tags: ['security', 'automation'],
    bullets: [
      'Resolve 40–100+ support tickets a month while keeping a 95%+ satisfaction rating across 40+ departments.',
      'Manage user access and hardware deployment across Active Directory, SysAid, and TDX; track City devices with the CrowdStrike Falcon sensor.',
      'Led end-of-life equipment disposal and supported procurement and transfers for 84+ departments, cutting transfer processing time by 50% and clearing a COVID-19 backlog in under 4 weeks.',
    ], tech: ['CrowdStrike Falcon', 'Active Directory', 'SysAid', 'TDX'] },
  { role: 'Laser Systems & Applied Materials Science R&D Consultant', org: 'Philly Industrial Works LLC',
    period: 'Aug 2026 – Present', note: 'Full-time · Remote', start: '2026-08', active: true, tags: ['hardware', 'leadership'],
    bullets: [
      'Lead materials R&D on a ComMarker B6 60W MOPA fiber laser, testing power, scan speed, pulse frequency, and hatch spacing to build repeatable, material-specific processes.',
      'Study laser interactions with nitrided and hardened steel, Cerakote, and DLC coatings for color, texture, deep engraving, and surface finishing.',
      'Provide remote technical consulting, software configuration, and troubleshooting, and train ownership on laser operation and test workflows.',
    ], tech: ['MOPA Fiber Laser', 'Materials Science', 'Process Optimization', 'Technical Training'] },
  { role: 'Cyber Security Consultant', org: 'Gun Store Philly',
    period: 'Oct 2026 – Present', note: 'Part-time · Hybrid', start: '2026-10', active: true, tags: ['security'],
    bullets: [
      'Assessed security risk after an unauthorized-access incident on an executive workstation, checking for malware persistence and system integrity.',
      'Inspected inbound and outbound connections, SSH activity, and IP addresses; advised leadership on ransomware, lateral movement, and credential-compromise scenarios.',
      'Run weekly security inspections, patch and endpoint configuration reviews, and led a hardened browser migration with ad and tracker blocking.',
    ], tech: ['Incident Assessment', 'Threat Modeling', 'Network Inspection', 'Endpoint Hardening'] },
  { role: 'Member Manager', org: 'Ex Machina Parlor',
    period: 'Sep 2024 – Present', note: 'Member since Sep 2024 · Member Manager since Sep 2025', start: '2024-09', active: true, tags: ['hardware', 'leadership'],
    bullets: [
      'Design and 3D print STL prototypes for a defense training academy on a Bambu Lab P1S CoreXY system.',
      'Built xTool S1 40W laser workflows to restore markings on Cerakote-coated components, and train personnel on vector design, jig alignment, and material tuning.',
      'Support community cybersecurity research and rapid prototyping; pursuing the FAA Part 107 Small UAS certification.',
    ], tech: ['xTool S1', 'Bambu Lab P1S', 'STL/CAD', 'Additive Manufacturing'] },
  { role: 'Member & Forum Moderator', org: 'YPO',
    period: 'Oct 2024 – Present', start: '2024-10', active: true, tags: ['leadership'],
    bullets: [
      'Facilitate monthly confidential peer forums for leaders in a global community of 35,000+ chief executives.',
      'Introduced structured, flexible agendas that support open dialogue and mutual accountability.',
    ], tech: ['Facilitation', 'Leadership'] },
  { role: 'Mayor Transition Ops', org: 'Office of Innovation & Technology — City of Philadelphia',
    period: 'Jun 2023 – Dec 2023', start: '2023-06', end: '2023-12', active: false, tags: ['leadership'],
    bullets: [
      'Represented the Asset Management Unit on the Mayoral transition team, aligning 7 OIT sub-divisions.',
      'Turned legacy City documents into 9 technical documents on asset protocols, PC refreshes, procurement, and deployment for a 30+ member transition team.',
    ], tech: ['Technical Documentation', 'Stakeholder Alignment'] },
  { role: 'Associate Consultant', org: 'Deloitte',
    period: 'Aug 2020 – Jun 2021', start: '2020-08', end: '2021-06', active: false, tags: ['software'],
    bullets: [
      'Ran a national survey of 3,000+ Cristo Rey alumni and analyzed the results to recommend talent-pipeline diversification strategies.',
      'Presented data-driven findings to a senior leadership team of 8.',
    ], tech: ['Statistical Analysis', 'Survey Design', 'Consulting'] },
  { role: 'IT Support Intern', org: 'Deloitte',
    period: 'Sep 2019 – Aug 2020', start: '2019-09', end: '2020-08', active: false, tags: ['automation'],
    bullets: [
      'Wrote PowerShell scripts and reimaged HP and Dell laptops with Linchpin to client specifications.',
      'Kept weekly asset inventory records at 100% accuracy and performed secure wipes and decommissioning after user separations.',
    ], tech: ['PowerShell', 'Linchpin Imaging', 'Asset Inventory'] },
  { role: 'Early-career internships', org: 'Philadelphia Gas Works · Day & Zimmermann · Philadelphia Streets Dept',
    period: 'Aug 2017 – Aug 2019', note: 'Through Cristo Rey Corporate Work-Study and the Philadelphia Youth Network',
    start: '2017-08', end: '2019-08', active: false, tags: ['software'],
    bullets: [
      'IT Intern, Philadelphia Gas Works (2019): built and tested 30+ custom Ethernet cables and reimaged employee workstations.',
      'Corporate Finance Analyst, Day & Zimmermann (2018–19): organized 10,000+ item datasets and pulled SAP financial data into Excel reporting.',
      'IT Intern, Philadelphia Streets Dept (2018): set up a dedicated reimaging station and ran monthly hardware inventory checks.',
      'Business Intelligence Analyst, Day & Zimmermann (2017–18): configured 4,000+ healthcare leads and produced weekly sales reports from Bullhorn and Excel.',
    ], tech: ['SAP', 'Excel', 'Bullhorn', 'Reimaging'] },
]

export const EDUCATION = [
  { degree: 'Bachelor of Science in Computer Science', short: 'BS', institution: 'Wilmington University', year: 'Sep 2024 – Dec 2025',
    details: 'Graduated December 2025.', listLabel: 'Coursework',
    list: ['Java Programming II', 'JavaScript I', 'Systems Analysis & Design', 'User-Centered Design', 'Web Design & Development', 'Data Visualization', 'Fundamentals in Cybersecurity', 'Networks & Telecomms', 'Programming with Python', 'Computer Hardware & Operation', 'Experiential Learning in CSC'] },
  { degree: 'Associate of Science in Computer Science', short: 'AS', institution: 'Community College of Philadelphia', year: '2021 – 2024',
    details: 'Octavius Catto Scholar and Ambassador; Center for Male Engagement (CME).', listLabel: 'Coursework',
    list: ['Computer Science I & II', 'Data Structures & Algorithms', 'Computer Organization', 'Statistics for Computing', 'Database Management Systems', 'Android App Development', 'Physics: Mechanics, Heat & Sound', 'Physics: Electricity, Magnetism & Light'] },
  { degree: 'High School Diploma, College Preparatory', short: 'HS', institution: 'Cristo Rey Philadelphia High School', year: '2017 – 2021',
    details: 'Four years of Corporate Work-Study alongside a college-prep curriculum.', listLabel: 'Activities',
    list: ['FIRST Robotics Team 7599', 'Chess Team', 'FBLA', 'Student Ambassador'] },
]

export const CERTS: { title: string; issuer: string; icon: IconName; id?: string }[] = [
  { title: 'JavaScript Algorithms & Data Structures', issuer: 'freeCodeCamp', icon: 'code' },
  { title: 'Responsive Web Design', issuer: 'freeCodeCamp', icon: 'layers' },
  { title: 'Python for Data Science and AI', issuer: 'IBM · Coursera', icon: 'chart' },
  { title: 'FAA TRUST Drone Pilot', issuer: 'Federal Aviation Administration — Recreational UAS Safety Test', id: 'EASY36503561585', icon: 'drone' },
  { title: 'HIPAA 2025/2026 Technical Compliance', issuer: 'City of Philadelphia', icon: 'shield' },
  { title: 'Cyber Security Awareness (2023–2026)', issuer: 'City of Philadelphia OIT', icon: 'lock' },
]

export const HONORS = [
  { title: 'NBCU Academy Scholarship', issuer: 'NBCU', date: 'Mar 2024' },
  { title: 'Strong Men, Strong Lives, Strong Futures Scholarship', issuer: 'CCP Center for Male Engagement', date: 'Mar 2024' },
  { title: 'Octavius Catto Scholarship', issuer: 'Community College of Philadelphia', date: 'Aug 2023' },
  { title: 'Black Faculty and Staff Alliance Scholarship', issuer: 'Community College of Philadelphia', date: 'Mar 2023' },
  { title: 'Corporate Work-Study Award', issuer: 'Cristo Rey Philadelphia High School · one recipient per class', date: 'Jun 2021' },
  { title: 'College Access Academy Graduate', issuer: 'Drexel University', date: 'Jul 2019' },
  { title: 'PFEW Graduate', issuer: 'Pennsylvania Free Enterprise Week', date: 'Jul 2019' },
  { title: 'Saint Joseph Scholarship', issuer: 'Our Lady of Hope', date: 'Dec 2018' },
  { title: 'Morris Scholarship', issuer: 'Morris Foundation', date: 'Sep 2018' },
  { title: 'Howley Foundation Scholarship', issuer: 'Howley Foundation', date: 'Feb 2018' },
  { title: 'Student Ambassador', issuer: 'Cristo Rey Philadelphia High School', date: 'Feb 2018' },
  { title: 'Corporate Work Study Scholarship', issuer: 'Cristo Rey Philadelphia High School', date: 'Aug 2017' },
]

export const RECS = [
  { author: 'Joseph Dinh', role: 'IAM Administrator @ OIT | Application Security Practitioner @ EMP',
    text: "Patrick demonstrated himself to be a credible financial & career consultant through his exemplary services in pro-bono application. He directly advised me over the course of five years leading into the operations of Computer Systems & Networking. His ability to navigate as a team leader expanded my portfolio to a variety of skills ranging from multiple hardware/software advancements... To build credentials as suggested, the modules recommended were AWS, C++, Java, Python, etc. I recommend Patrick for future consultation whether it's finances, career, or strategic operations!" },
  { author: 'Jay Michael Gloede', role: 'Director, Clinical Operations @ Retina Associates (Former Deloitte Manager)',
    text: 'Patrick was a great addition to our Deloitte Philadelphia office... Due to COVID, he was a Consultant offering recommendations of his research on diversity and inclusiveness within and outside of Deloitte. His ability to complete a multitude of tasks with a strong work ethic and efficiency makes him an invaluable addition to any team whether in person or virtually.' },
  { author: 'Chris Hediger', role: 'Operations Executive',
    text: 'Patrick worked for us as an intern through his high school and was a great addition to the team. His work ethic and willingness to take on tasks allowed him to complete tasks quickly and accurately. He is able to build rapport with people and is willing to help others as well.' },
]

export const TOPICS = ['Full-time role', 'Contract / project', 'Data & analytics', 'Automation', 'Tech advisory']
