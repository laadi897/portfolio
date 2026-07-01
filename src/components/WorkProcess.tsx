export default function WorkProcess() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "Understanding your brand, goals, target audience, and the vision for the project."
    },
    {
      number: "02",
      title: "Strategy & Concept",
      description: "Developing a creative direction, mood boards, and a solid plan before production begins."
    },
    {
      number: "03",
      title: "Creation",
      description: "The magic happens here—designing, editing, modeling, and bringing the concept to life."
    },
    {
      number: "04",
      title: "Review & Refine",
      description: "Sharing the progress with you to gather feedback and making precise adjustments."
    },
    {
      number: "05",
      title: "Final Delivery",
      description: "Providing the final high-quality files in all necessary formats for your immediate use."
    }
  ];

  return (
    <section className="relative w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24 z-30 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight text-center">
          Work Process
        </h2>
        
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors duration-500"
            >
              <div className="text-5xl font-bold text-white/20">
                {step.number}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
