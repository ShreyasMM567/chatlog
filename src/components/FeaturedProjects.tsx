import React from "react";
import GlassContainer from "./GlassContainer";

const projects = [
  {
    title: "Enterprise Dashboard",
    image: "/project1.png", // Placeholder, replace with real image
    description: "A scalable analytics dashboard for enterprise clients, featuring real-time data visualization and custom reporting.",
    tech: ["React", "Next.js", "TypeScript", "D3.js"],
    link: "#",
  },
  {
    title: "Cloud Automation Suite",
    image: "/project2.png",
    description: "Automated cloud resource management platform with CI/CD integration and cost optimization tools.",
    tech: [".NET", "Azure", "Docker", "GitHub Actions"],
    link: "#",
  },
  {
    title: "E-Commerce Platform",
    image: "/project3.png",
    description: "Full-featured e-commerce solution with secure payments, product management, and user analytics.",
    tech: ["React", "Node.js", "Stripe", "MongoDB"],
    link: "#",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-20 px-8 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">
            A selection of impactful projects demonstrating my expertise in building modern, scalable, and visually engaging applications.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-red-500 mx-auto rounded-full"></div>
        </div>
        <GlassContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group bg-white/5 rounded-2xl overflow-hidden shadow-xl border border-white/10 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                </div>
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-purple-600 to-red-500 text-white text-xs font-semibold rounded-full shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-auto px-5 py-2 bg-white/10 border border-purple-500 rounded-lg text-purple-300 font-medium hover:bg-purple-600 hover:text-white transition-all duration-300 shadow group-hover:scale-105"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </GlassContainer>
      </div>
    </section>
  );
} 