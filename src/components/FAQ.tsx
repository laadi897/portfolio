export default function FAQ() {
  const faqs = [
    {
      question: "What is your typical turnaround time?",
      answer: "Turnaround times vary depending on the scope and complexity of the project. A standard graphic design task might take 2-3 days, while a cinematic video or complex 3D animation could take several weeks. I always establish clear timelines during our initial consultation."
    },
    {
      question: "Do you offer revisions?",
      answer: "Yes, I want to ensure you are 100% satisfied with the final product. Every project includes a set number of revision rounds, which we will agree upon before starting."
    },
    {
      question: "What files will I receive upon completion?",
      answer: "You will receive all finalized high-resolution files (MP4, PNG, JPG, etc.) as well as any agreed-upon source files (PSD, AEP, BLEND) depending on the project requirements and contract terms."
    },
    {
      question: "How do we get started?",
      answer: "Simply reach out via the contact section below! We will schedule a brief discovery call to discuss your vision, goals, and how we can work together to bring your ideas to life."
    }
  ];

  return (
    <section className="relative w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24 z-30 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold text-white mb-4">{faq.question}</h3>
              <p className="text-neutral-400 font-light leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
