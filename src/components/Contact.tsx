import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section className="relative w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24 z-30 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
          Let's Work Together
        </h2>
        <p className="text-xl text-neutral-400 font-light mb-12 max-w-2xl mx-auto">
          Ready to take your visual identity to the next level? Get in touch and let's discuss how we can bring your creative vision to life.
        </p>
        
        <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl mb-12">
          <form className="flex flex-col gap-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-neutral-400 ml-1">Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-neutral-400 ml-1">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-400 ml-1">Message</label>
              <textarea 
                rows={5}
                placeholder="Tell me about your project..." 
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
              ></textarea>
            </div>
            <button 
              type="button"
              className="mt-4 px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-colors duration-300 w-full md:w-auto md:self-end"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="flex justify-center gap-6">
          <a href="#" className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
            <Mail size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
