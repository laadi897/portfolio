import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Jaskaran transformed our brand identity. The visuals were stunning and exactly what we were looking for to elevate our online presence.",
      name: "Client Name",
      role: "CEO, Brand XYZ"
    },
    {
      quote: "The cinematic video editing for our event was breathtaking. Every transition and color grade was perfectly executed.",
      name: "Client Name",
      role: "Event Director"
    },
    {
      quote: "Highly recommend for any 3D design work. The product visualization exceeded our expectations and helped us secure new investors.",
      name: "Client Name",
      role: "Founder, Tech Startup"
    }
  ];

  return (
    <section className="relative w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24 z-30 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight text-center">
          What Clients Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <Quote size={32} className="text-white/20 mb-6" />
                <p className="text-neutral-300 font-light leading-relaxed mb-8 italic">
                  &quot;{t.quote}&quot;
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">{t.name}</h4>
                <p className="text-neutral-500 text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
