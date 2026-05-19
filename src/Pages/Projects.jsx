import React, { useState, useEffect, useRef } from "react";
import { FaCode, FaExternalLinkAlt, FaGithub, FaFolder, FaStar, FaFilter, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const projects = [
  {
    title: "CPY Ambulance",
    description: "An ambulance dispatch and patient transport system designed to streamline emergency requests, driver assignment, and live status updates.",
    imgSrc: "/CPY-Ambulance.png",
    githubLink: "https://github.com/vikasprajapat000/CPY-Ambulance",
    liveDemoLink: "",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    category: "fullstack",
    featured: true,
    comingSoon: true,
  },
  {
    title: "My Portfolio Website",
    description: "This portfolio project showcases my skills, projects, and contact information in a modern responsive design.",
    imgSrc: "/Portfolio-Website.png",
    githubLink: "",
    liveDemoLink: "",
    tech: ["React", "Tailwind CSS", "Vite"],
    category: "frontend",
    comingSoon: true,
  },
];

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const projectsRef = useRef(null);
  
  // Animation when scrolling to projects section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const projectCards = document.querySelectorAll('.project-card');
          projectCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('show');
            }, 100 * index);
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    
    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, [filter]);

  // Filter projects based on category
  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'featured'
      ? projects.filter(project => project.featured)

      : projects.filter(project => project.category === filter);
    
  // Open project details
  const openProjectDetails = (project) => {
    setActiveProject(project);
    setIsDetailView(true);
    document.body.style.overflow = 'hidden';
  };
  
  // Close project details
  const closeProjectDetails = () => {
    setIsDetailView(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setActiveProject(null), 300);
  };
  
  const currentProjectIndex = activeProject ? projects.findIndex(project => project.title === activeProject.title) : -1;
  const prevProject = currentProjectIndex > 0 ? projects[currentProjectIndex - 1] : null;
  const nextProject = currentProjectIndex >= 0 && currentProjectIndex < projects.length - 1 ? projects[currentProjectIndex + 1] : null;

  const goToPrevProject = (e) => {
    e.stopPropagation();
    if (prevProject) {
      setActiveProject(prevProject);
    }
  };

  const goToNextProject = (e) => {
    e.stopPropagation();
    if (nextProject) {
      setActiveProject(nextProject);
    }
  };
  
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  
  return (
    <section id="Projects" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -right-20 w-72 h-72 bg-gradient-to-br from-orange-600/10 to-pink-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-purple-600/10 to-blue-600/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 reveal">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 mb-5 shadow-glow">
            <FaFolder className="text-white text-2xl" />
          </div>
          <h2 className="text-4xl font-bold mb-2">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Projects</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl">
            A curated collection of my work showcasing my skills across various technologies.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-4"></div>
        </div>

        {/* Category filters with mobile toggle */}
        <div className="mb-10 relative">
          <div className="flex justify-center mb-4 md:hidden">
            <button
              onClick={toggleFilters}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white"
            >
              <FaFilter /> 
              {isFiltersOpen ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
          
          <div className={`
            flex flex-wrap justify-center gap-3 
            ${isFiltersOpen ? 'max-h-40' : 'max-h-0 md:max-h-40'} 
            overflow-hidden transition-all duration-500 ease-in-out
          `}>
            {['all', 'featured', 'frontend', 'backend', 'fullstack'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${filter === category 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'}
                `}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid with staggered animation */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="project-card opacity-0 translate-y-10 group backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-glow hover:scale-105 hover:border-orange-500/30 cursor-pointer"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => openProjectDetails(project)}
            >
              <div className="relative">
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs py-1 px-3 rounded-full flex items-center gap-1">
                    <FaStar className="text-yellow-300" /> Featured
                  </div>
                )}
                
                <div className="relative h-48 overflow-hidden group-hover:h-56 transition-all duration-700">
                  <img
                    src={project.imgSrc}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
                  
                  {/* Project links */}
                  <div className="absolute bottom-3 right-3 flex space-x-2 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {project.githubLink ? (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/60 backdrop-blur-sm p-2 rounded-full text-white hover:bg-orange-600 transition-colors"
                        aria-label={`GitHub repository for ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub />
                      </a>
                    ) : (
                      <div className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full text-xs text-white uppercase tracking-[0.12em]">
                        GitHub upload soon
                      </div>
                    )}
                    {project.liveDemoLink && (
                      <a
                        href={project.liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/60 backdrop-blur-sm p-2 rounded-full text-white hover:bg-orange-600 transition-colors"
                        aria-label={`Live demo for ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <FaCode className="text-orange-500 mr-3 text-lg" />
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.slice(0, 3).map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 text-xs rounded-md bg-white/10 text-gray-300 backdrop-blur-sm border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-md bg-orange-500/20 text-orange-300 backdrop-blur-sm">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty state for no matches */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-gray-400 text-8xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">Try selecting a different category filter</p>
            <button 
              onClick={() => setFilter('all')}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white"
            >
              Show all projects
            </button>
          </div>
        )}
        
        {/* GitHub link */}
        <div className="flex justify-center mt-12">
          <a 
            href="https://github.com/vikasprajapat000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:translate-y-1 flex items-center space-x-2"
          >
            <FaGithub className="mr-2" /> See More on GitHub
          </a>
        </div>
      </div>
      
      {/* Project detail modal */}
      {isDetailView && activeProject && (
        <div 
          className={`fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isDetailView ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeProjectDetails}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] overflow-auto bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-transform duration-500 transform"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-10 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              onClick={closeProjectDetails}
            >
              <FaTimes />
            </button>
            
            <div className="relative h-72 sm:h-96 overflow-hidden">
              <button
                className="absolute top-4 left-4 z-20 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={goToPrevProject}
                disabled={!prevProject}
                aria-label="Previous project"
              >
                <FaChevronLeft />
              </button>
              <button
                className="absolute top-4 right-4 z-20 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={goToNextProject}
                disabled={!nextProject}
                aria-label="Next project"
              >
                <FaChevronRight />
              </button>
              <img 
                src={activeProject.imgSrc} 
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{activeProject.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    {activeProject.githubLink ? (
                      <a 
                        href={activeProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white flex items-center gap-2 hover:bg-white/20 transition-colors"
                      >
                        <FaGithub /> GitHub
                      </a>
                    ) : (
                      <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm uppercase tracking-[0.08em]">
                        GitHub upload soon
                      </div>
                    )}
                    {activeProject.liveDemoLink && (
                      <a 
                        href={activeProject.liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 pt-0">
              <p className="text-gray-300 text-lg my-6">{activeProject.description}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom animation styles */}
      <style jsx>{`
        .project-card.show {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Projects;
