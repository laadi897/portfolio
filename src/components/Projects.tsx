import { ExternalLink, Code } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Brand Identity Design",
    description: "A complete visual overhaul for a modern lifestyle brand, including logo, typography, and social media assets.",
    tags: ["Illustrator", "Photoshop", "Graphic Design"],
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cinematic Event Recap",
    description: "High-energy cinematic video editing for a major corporate conference, featuring seamless transitions and color grading.",
    tags: ["Premiere Pro", "DaVinci Resolve", "Video Editing"],
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "3D Product Visualization",
    description: "Photorealistic 3D modeling and animation for an upcoming tech gadget, used in their global marketing campaign.",
    tags: ["Blender", "Maya", "3D Modeling"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Church Media Package",
    description: "Dynamic motion graphics, announcement slides, and sermon series artwork tailored for modern church services.",
    tags: ["After Effects", "Motion Graphics", "Church Media"],
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }
];

export default function Projects() {
  return (
    <section className="relative w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24 z-30 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight">
          Selected Work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md p-2 hover:bg-white/10 transition-colors duration-500"
            >
              <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden mb-6">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="px-4 pb-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <div className="flex gap-3 text-neutral-400">
                    <a href="#" className="hover:text-white transition-colors"><Code size={20} /></a>
                    <a href="#" className="hover:text-white transition-colors"><ExternalLink size={20} /></a>
                  </div>
                </div>
                <p className="text-neutral-400 mb-6 font-light leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 rounded-full text-xs font-medium text-white/70 bg-white/5 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
