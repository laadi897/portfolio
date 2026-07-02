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
  const [images, setImages] = useState<HTMLImageElement[]>([]);
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
    // Preload images
    const preloadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const checkLoaded = () => {
      if (loadedCount >= FRAME_COUNT && isMounted) {
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
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
      img.onabort = handleComplete; // Catch browser aborted requests

      img.src = getFramePath(i);

      // Fix: If the image is instantly loaded from the browser cache, 
      // the 'onload' event might not fire. We must check 'complete'.
      if (img.complete) {
        handleComplete();
      }

      preloadedImages.push(img);
    }

    setImages(preloadedImages);

    // Root cause safety fallback: when flooding the browser with 120 concurrent requests,
    // some requests can silently hang in "Pending" forever without firing error or abort.
    // This timeout ensures the loading screen ALWAYS disappears.
    const fallbackTimeout = setTimeout(() => {
      if (isMounted) {
        setIsLoaded(true);
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimeout);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw the current frame when it changes
    const unsubscribe = frameIndex.on("change", (latest) => {
      const currentFrame = Math.round(latest);

      // Fix: Find the last successfully loaded frame if the current one is broken/evicted
      let validImg = null;
      for (let i = currentFrame; i >= 0; i--) {
        const img = images[i];
        if (img && img.complete && img.naturalWidth > 0) {
          validImg = img;
          break;
        }
      }

      if (validImg) {
        // Implement object-fit: cover logic
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = validImg.width / validImg.height;

        let renderWidth = canvas.width;
        let renderHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          // Canvas is wider than image
          renderHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - renderHeight) / 2;
        } else {
          // Image is wider than canvas
          renderWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - renderWidth) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(validImg, offsetX, offsetY, renderWidth, renderHeight);
      }
    });

    // Resize canvas to match window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Trigger a redraw on resize
      const currentFrame = Math.round(frameIndex.get());

      let validImg = null;
      for (let i = currentFrame; i >= 0; i--) {
        const img = images[i];
        if (img && img.complete && img.naturalWidth > 0) {
          validImg = img;
          break;
        }
      }

      if (validImg && ctx) {
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

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, images, frameIndex]);

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
