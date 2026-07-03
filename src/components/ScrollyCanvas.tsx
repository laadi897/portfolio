"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const rAFRef = useRef<number | null>(null);

  // Framer motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    let isMounted = true;
    const video = document.createElement("video");
    
    // Configure video for optimal mobile scrubbing
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.crossOrigin = "anonymous";
    video.src = "/final-video.mp4";
    // Disabling controls is default when not specified, but we enforce it
    video.controls = false;
    
    videoRef.current = video;

    const handleLoaded = () => {
      if (isMounted) setIsLoaded(true);
    };

    video.addEventListener("canplaythrough", handleLoaded);
    video.addEventListener("loadedmetadata", handleLoaded);

    // Fallback timer
    const fallbackTimeout = setTimeout(() => {
      if (isMounted) setIsLoaded(true);
    }, 5000);

    video.load();

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimeout);
      video.removeEventListener("canplaythrough", handleLoaded);
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeAttribute("src");
      video.load();
      videoRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;
    
    if (!ctx) return;

    const drawFrame = () => {
      if (video.videoWidth === 0 || video.videoHeight === 0) return;

      const canvasRatio = canvas.width / canvas.height;
      const videoRatio = video.videoWidth / video.videoHeight;

      let renderWidth = canvas.width;
      let renderHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > videoRatio) {
        renderHeight = canvas.width / videoRatio;
        offsetY = (canvas.height - renderHeight) / 2;
      } else {
        renderWidth = canvas.height * videoRatio;
        offsetX = (canvas.width - renderWidth) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, offsetX, offsetY, renderWidth, renderHeight);
    };

    const requestDraw = () => {
      if (rAFRef.current === null) {
        rAFRef.current = requestAnimationFrame(() => {
          rAFRef.current = null;
          drawFrame();
        });
      }
    };

    // Listen to video events to draw
    const handleSeeked = () => requestDraw();
    video.addEventListener("seeked", handleSeeked);
    
    // Also draw immediately on first setup
    requestDraw();

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (!video.duration || isNaN(video.duration)) return;
      
      const targetTime = latest * video.duration;
      video.currentTime = targetTime;
      // Request an immediate draw for smooth immediate response
      requestDraw();
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      requestDraw();
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      video.removeEventListener("seeked", handleSeeked);
      if (rAFRef.current !== null) {
        cancelAnimationFrame(rAFRef.current);
      }
    };
  }, [isLoaded, scrollYProgress]);

  return (
    <div ref={containerRef} className="h-[500vh] w-full relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white z-20">
            <div className="animate-pulse text-sm font-medium tracking-widest uppercase">
              Loading Experience...
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 opacity-70" />
      </div>
    </div>
  );
}
