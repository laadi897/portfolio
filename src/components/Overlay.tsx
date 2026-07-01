"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section 1: Hero Content
  const heroOpacity = useTransform(scrollYProgress, [0.06, 0.18], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0.06, 0.18], [0, -100]);

  // Section 2: 25% to 55%
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.55], [50, -50]);

  // Section 3: 60% to 90%
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.8, 0.9], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.6, 0.9], [50, -50]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-20">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-auto"
        >
          <div className="text-center -translate-y-[80px] md:-translate-y-[120px]">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              Jaskaran.
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 font-light tracking-wide uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mb-8">
              Graphic Designer • Video Editor • 3D Artist
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors duration-300">
                Hire Me
              </button>
              <button className="px-8 py-3 rounded-full bg-white/10 text-white font-medium backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors duration-300">
                View My Work
              </button>
            </div>
          </div>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex items-center justify-start px-[10%] md:px-[15%]"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-white max-w-2xl leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            I help brands and content creators build a premium visual identity through graphic design, cinematic video editing, motion graphics, and high-quality 3D visuals.
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex items-center justify-end px-[10%] md:px-[15%]"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-white max-w-2xl leading-tight text-right drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            My goal is to create content that attracts attention, builds trust, and helps clients grow.
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
