import { Palette, Video, Box, Cross, Sparkles } from "lucide-react";

const services = [
  {
    title: "Graphic Design",
    icon: <Palette size={32} className="text-white mb-4" />,
    items: [
      "Logo Design",
      "Brand Identity Design",
      "Social Media Design",
      "YouTube Thumbnail Design",
      "Poster & Banner Design"
    ]
  },
  {
    title: "Video Editing",
    icon: <Video size={32} className="text-white mb-4" />,
    items: [
      "Cinematic Video Editing",
      "Motion Graphics"
    ]
  },
  {
    title: "3D Art & Modeling",
    icon: <Box size={32} className="text-white mb-4" />,
    items: [
      "3D Modeling",
      "3D Animation",
      "Product Visualization"
    ]
  },
  {
    title: "Church Media Design",
    icon: <Cross size={32} className="text-white mb-4" />,
    items: [
      "Sermon Series Graphics",
      "Announcement Slides",
      "Social Media Content"
    ]
  },
  {
    title: "AI Image & Video",
    icon: <Sparkles size={32} className="text-white mb-4" />,
    items: [
      "AI Prompt Engineering",
      "Concept Generation",
      "Visual Enhancements"
    ]
  }
];

export default function Services() {
  return (
    <section className="relative w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24 z-30 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight text-center">
          My Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="group rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-8 hover:bg-white/10 transition-colors duration-500"
            >
              {service.icon}
              <h3 className="text-2xl font-semibold text-white mb-6">{service.title}</h3>
              <ul className="space-y-3">
                {service.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-neutral-400 font-light flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
