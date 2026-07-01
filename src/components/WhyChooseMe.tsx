import { CheckCircle2 } from "lucide-react";

export default function WhyChooseMe() {
  const reasons = [
    {
      title: "Premium Quality",
      description: "Delivering high-end, polished visuals that elevate your brand's perception."
    },
    {
      title: "Creative Innovation",
      description: "Pushing boundaries with unique concepts and utilizing the latest tools and AI technology."
    },
    {
      title: "Attention to Detail",
      description: "Meticulous focus on every pixel, frame, and keyframe to ensure flawless execution."
    },
    {
      title: "Reliable & On-Time",
      description: "Committed to clear communication and delivering exceptional work within your deadlines."
    }
  ];

  return (
    <section className="relative w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24 z-30 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Why Choose Me
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, idx) => (
            <div 
              key={idx}
              className="flex items-start gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <CheckCircle2 size={32} className="text-white shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-semibold text-white mb-3">{reason.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
