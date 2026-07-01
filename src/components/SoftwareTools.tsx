export default function SoftwareTools() {
  const tools = [
    "Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro", "Adobe After Effects",
    "DaVinci Resolve", "Blender", "Autodesk Maya", "CorelDRAW", "Adobe InDesign",
    "Adobe Audition", "Adobe Animate", "ChatGPT", "Leonardo AI", "Nano Banana AI",
    "Google Veo", "Sora AI"
  ];

  return (
    <section className="relative w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24 z-30 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight">
          Software & Tools
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {tools.map((tool, idx) => (
            <div 
              key={idx}
              className="px-6 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white font-medium hover:bg-white/10 transition-colors duration-300"
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
