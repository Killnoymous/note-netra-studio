const projects = [
  {
    id: 'idp',
    title: 'Intelligent Document Processing',
    description:
      'AI-powered pipeline that extracts, classifies, and routes documents automatically. Reduces manual processing time by 90%.',
    tags: ['AI/ML', 'OCR', 'Pipeline'],
    status: 'Production',
  },
  {
    id: 'automation',
    title: 'Smart Automation Platform',
    description:
      'Workflow automation engine that connects disparate systems without code. Built for enterprise reliability.',
    tags: ['Automation', 'Integration', 'No-code'],
    status: 'Beta',
  },
  {
    id: 'core',
    title: 'Note Netra Core',
    description:
      'Advanced note-taking system with semantic search and AI-assisted organization. Your second brain, engineered.',
    tags: ['Notes', 'Search', 'AI'],
    status: 'Development',
  },
  {
    id: 'piezo',
    title: 'Piezo Electric Energy System',
    description:
      'A piezoelectric-based energy generation project focused on converting mechanical stress into usable electrical power.',
    tags: ['Embedded Systems', 'Energy', 'Sensors'],
    status: 'Research / Prototype',
  },
  {
    id: 'vape',
    title: 'Vape Detection & Alert System',
    description:
      'Real-time vape detection system implemented across college premises to detect aerosol emissions and trigger instant alerts.',
    tags: ['IoT', 'Real-time', 'Safety'],
    status: 'Deployed',
  },
  {
    id: 'infra',
    title: 'Infrastructure Toolkit',
    description:
      'Developer tools for monitoring, deployment, and infrastructure management. CLI-first, batteries included.',
    tags: ['DevOps', 'CLI', 'Monitoring'],
    status: 'Internal',
  },
];

const ProjectBackground = ({ id }: { id: string }) => {
  const commonClasses = "absolute inset-0 w-full h-full stroke-white/5 fill-none stroke-[0.5] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-x-2";

  switch (id) {
    case 'idp': // Document Flow / Pipeline
      return (
        <svg className={commonClasses} viewBox="0 0 400 400" preserveAspectRatio="none">
          <path d="M50,100 Q200,50 350,100 T50,200 T350,300" opacity="0.5" />
          <rect x="100" y="80" width="40" height="50" rx="2" className="stroke-white/10" />
          <rect x="250" y="180" width="40" height="50" rx="2" className="stroke-white/10" />
          <rect x="180" y="280" width="40" height="50" rx="2" className="stroke-white/10" />
        </svg>
      );
    case 'automation': // Nodes / Network
      return (
        <svg className={commonClasses} viewBox="0 0 400 400" preserveAspectRatio="none">
          <circle cx="100" cy="100" r="40" className="stroke-white/10" />
          <circle cx="300" cy="150" r="30" className="stroke-white/10" />
          <circle cx="200" cy="300" r="50" className="stroke-white/10" />
          <path d="M135,115 L275,140" strokeDasharray="4 4" />
          <path d="M280,165 L220,260" strokeDasharray="4 4" />
          <path d="M120,135 L170,265" strokeDasharray="4 4" />
        </svg>
      );
    case 'core': // Brain / Semantic
      return (
        <svg className={commonClasses} viewBox="0 0 400 400" preserveAspectRatio="none">
          <path d="M200,350 Q20,250 20,150 Q20,50 200,50 Q380,50 380,150 Q380,250 200,350 Z" className="stroke-white/5" strokeDasharray="2 2" />
          <path d="M200,100 C150,100 100,150 100,200 C100,250 150,300 200,300 C250,300 300,250 300,200 C300,150 250,100 200,100" opacity="0.5" />
          <circle cx="200" cy="200" r="2" className="fill-white/20" />
        </svg>
      );
    case 'piezo': // Energy / Waves
      return (
        <svg className={commonClasses} viewBox="0 0 400 400" preserveAspectRatio="none">
          <path d="M0,200 Q50,100 100,200 T200,200 T300,200 T400,200" className="stroke-white/10" />
          <path d="M0,220 Q50,120 100,220 T200,220 T300,220 T400,220" className="stroke-white/5" />
          <path d="M0,180 Q50,80 100,180 T200,180 T300,180 T400,180" className="stroke-white/5" />
        </svg>
      );
    case 'vape': // Sensor signals
      return (
        <svg className={commonClasses} viewBox="0 0 400 400" preserveAspectRatio="none">
          <circle cx="200" cy="200" r="50" className="stroke-white/10" />
          <circle cx="200" cy="200" r="100" className="stroke-white/5" />
          <circle cx="200" cy="200" r="150" className="stroke-white/5" strokeDasharray="8 8" />
          <path d="M200,200 L350,50" className="stroke-white/5" />
        </svg>
      );
    case 'infra': // Layers / Stack
      return (
        <svg className={commonClasses} viewBox="0 0 400 400" preserveAspectRatio="none">
          <path d="M100,300 L200,350 L300,300 L200,250 Z" className="stroke-white/10" />
          <path d="M100,240 L200,290 L300,240 L200,190 Z" className="stroke-white/5" />
          <path d="M100,180 L200,230 L300,180 L200,130 Z" className="stroke-white/5" />
          <path d="M200,50 L200,130" className="stroke-white/5" strokeDasharray="4 4" />
        </svg>
      );
    default:
      return null;
  }
};

const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
  <div
    className="relative h-full group bg-card border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.4)]"
  >
    {/* Ambient Glow / Bloom */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    {/* Abstract Visual Layer */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.08] blur-[0.5px]">
      <ProjectBackground id={project.id} />
    </div>

    {/* Content Container */}
    <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        {/* Logo/Icon */}
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors duration-300">
          <span className="font-sans font-bold text-xl text-[#EEE8DD]">
            {project.title === 'Note Netra Core' ? 'N' : project.title[0]}
          </span>
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-[#EEE8DD] text-2xl tracking-tight leading-none mb-1">
            {project.title === 'Note Netra Core' ? (
              <a href="https://www.notenetra.in/" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-primary transition-colors flex items-center gap-2">
                {project.title}
                <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            ) : (
              project.title
            )}
          </h3>
          <span className="text-sm font-light text-white/40 tracking-wide font-mono mt-1">
            {project.title === 'Note Netra Core' ? 'Subsidiary' : project.status}
          </span>
        </div>
      </div>

      {/* Body */}
      <p className="text-white/60 text-base leading-relaxed mb-8 transform group-hover:-translate-y-1 transition-transform duration-300">
        {project.description}
      </p>

      {/* Tags */}
      <div className="mt-auto flex flex-wrap gap-2">
        {project.tags.map((tag, i) => (
          <span
            key={tag}
            className="px-4 py-1.5 text-xs font-medium text-white/50 bg-white/5 border border-white/5 rounded-full transition-all duration-300 group-hover:border-white/10 group-hover:bg-white/10 group-hover:text-white/70"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

import RevealOnScroll from "./RevealOnScroll";

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background hint */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent backdrop-blur-sm" />

      <div className="container-main relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <RevealOnScroll>
            <div className="accent-line mb-6" />
            <span className="text-label mb-4 block">Our work</span>
            <h2 className="heading-section mb-6 text-[#EEE8DD]">
              Projects that solve
              <br />
              real problems.
            </h2>
            <p className="text-body">
              We focus on building tools and systems that address genuine needs,
              not hypothetical ones.
            </p>
          </RevealOnScroll>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <RevealOnScroll key={project.id} delay={index * 100} className="h-full">
              <ProjectCard project={project} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
