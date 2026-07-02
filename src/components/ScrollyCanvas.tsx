"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

const FRAME_COUNT = 120;

const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/sequence/frame_${paddedIndex}_delay-0.033s.png`;
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const isMobileRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Framer motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0-1) to frame index (0 - 70)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    let isMounted = true;
    
    // Detect mobile device
    isMobileRef.current = window.innerWidth <= 768;
    
    // Only load the first 10 frames on mobile to unblock the UI quickly
    const targetLoadCount = isMobileRef.current ? 10 : FRAME_COUNT;
    let loadedCount = 0;

    const checkLoaded = () => {
      if (loadedCount >= targetLoadCount && isMounted) {
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < targetLoadCount; i++) {
      const img = new Image();

      const handleComplete = () => {
        img.onload = null;
        img.onerror = null;
        img.onabort = null;
        loadedCount++;
        checkLoaded();
      };

      img.onload = handleComplete;
      img.onerror = handleComplete;
      img.onabort = handleComplete; 

      img.src = getFramePath(i);

      if (img.complete) {
        handleComplete();
      }

      imagesRef.current[i] = img;
    }

    const fallbackTimeout = setTimeout(() => {
      if (isMounted) setIsLoaded(true);
    }, 5000);

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimeout);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = (targetFrame: number) => {
      let validImg = null;
      for (let i = targetFrame; i >= 0; i--) {
        const img = imagesRef.current[i];
        if (img && img.complete && img.naturalWidth > 0) {
          validImg = img;
          break;
        }
      }

      if (validImg) {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = validImg.width / validImg.height;

        let renderWidth = canvas.width;
        let renderHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          renderHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - renderHeight) / 2;
        } else {
          renderWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - renderWidth) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(validImg, offsetX, offsetY, renderWidth, renderHeight);
      }
    };

    const updateMobileWindow = (currentFrame: number) => {
      if (!isMobileRef.current) return;
      
      const WINDOW_START = Math.max(0, currentFrame - 10);
      const WINDOW_END = Math.min(FRAME_COUNT - 1, currentFrame + 15);

      for (let i = 0; i < FRAME_COUNT; i++) {
        if (i >= WINDOW_START && i <= WINDOW_END) {
          if (!imagesRef.current[i]) {
            const img = new Image();
            img.onload = () => {
              // Redraw in case this newly loaded image is needed for the current view
              const current = Math.round(frameIndex.get());
              drawFrame(current);
            };
            img.src = getFramePath(i);
            imagesRef.current[i] = img;
          }
        } else {
          const img = imagesRef.current[i];
          if (img) {
            img.src = ""; // Force browser to clear memory of decoded image on mobile
            imagesRef.current[i] = null;
          }
        }
      }
    };

    const unsubscribe = frameIndex.on("change", (latest) => {
      const currentFrame = Math.round(latest);
      updateMobileWindow(currentFrame);
      drawFrame(currentFrame);
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(Math.round(frameIndex.get()));
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, frameIndex]);

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
