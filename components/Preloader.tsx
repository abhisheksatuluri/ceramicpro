import React, { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [shouldAnimateExit, setShouldAnimateExit] = useState(false);

  useEffect(() => {
    // 1. Safety Timeout: Ensure preloader dismisses after 3s max (Mobile/Slow network safeguard)
    const safetyTimer = setTimeout(() => {
      setShouldAnimateExit(true);
    }, 3000);

    // 2. Real Load Event: Dismiss when content is ready (if faster than 3s)
    const handleLoad = () => {
      setShouldAnimateExit(true);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Perform the Exit Animation when ready
  useEffect(() => {
    if (shouldAnimateExit && containerRef.current && textRef.current) {
      const { gsap } = window;
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        onComplete: onComplete
      });

      // Text Fill/Reveal
      tl.to(textRef.current, {
        opacity: 1,
        // Faster text reveal on mobile (0.5s) vs desktop (1.2s)
        duration: isMobile ? 0.5 : 1.2,
        ease: "power2.out"
      })
      // Slight pause for impact
      .to({}, { duration: 0.2 })
      // Curtain Lift (Slide Up)
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "expo.inOut"
      });
    }
  }, [shouldAnimateExit, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center pointer-events-none"
    >
      <h1 
        ref={textRef}
        className="text-cp-white font-bold text-4xl md:text-6xl tracking-tightest opacity-0 select-none"
      >
        CERAMIC PRO
      </h1>
    </div>
  );
};

export default Preloader;