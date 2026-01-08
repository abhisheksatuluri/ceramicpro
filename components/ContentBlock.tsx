import React, { useEffect, useRef } from 'react';

interface ContentBlockProps {
  title: string;
  description: string;
  image: string;
  align?: 'left' | 'right';
  index: number;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ title, description, image, align = 'left', index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = window;
    
    if (containerRef.current && imageRef.current && contentRef.current && gsap && ScrollTrigger) {
      const mm = gsap.matchMedia();

      // Desktop: Sticky Stacking Effect
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%", // Pin for 100% of viewport height (effectively waiting for next slide)
          pin: true,
          pinSpacing: false, // Allows the next section to slide OVER this one
          scrub: true,
          // Optional: Add a slight scale down or fade for depth as it gets covered
          onUpdate: (self: any) => {
            // Simple depth effect: Darken slightly as it stays pinned
            gsap.set(imageRef.current, { filter: `brightness(${1 - self.progress * 0.5})` });
          }
        });

        // Text Entrance for Desktop
        gsap.fromTo(contentRef.current, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Mobile: Parallax Effect (No Pinning)
      mm.add("(max-width: 1023px)", () => {
        // Simple parallax on the background image
        // Scale image up slightly first so we have room to move it
        gsap.set(imageRef.current, { scale: 1.2 });
        
        gsap.to(imageRef.current, {
          yPercent: 20, // Move image slightly slower than scroll
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        // Text Entrance for Mobile
        gsap.fromTo(contentRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      return () => mm.revert();
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      // Mobile: 80dvh, Desktop: 100dvh for proper stacking
      // z-index ensures later items stack ON TOP of earlier ones
      className="relative w-full min-h-[80dvh] lg:h-[100dvh] flex flex-col justify-center overflow-hidden"
      style={{ zIndex: index }}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <img 
          ref={imageRef}
          src={image} 
          alt={title}
          className="w-full h-full object-cover origin-center" 
        />
        {/* Dark Dimming Layer: Heavier on mobile for readability */}
        <div className="absolute inset-0 bg-black/60 lg:bg-black/40 transition-colors duration-500" />
      </div>

      {/* Content Layer */}
      <div 
        ref={contentRef}
        className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col 
          items-center text-center lg:items-start lg:text-left
          ${align === 'right' ? 'lg:items-end lg:text-right' : ''}
        `}
      >
        <span className="text-cp-blue text-xs md:text-sm font-mono mb-2 md:mb-4 uppercase tracking-widest">
          0{index} / Service
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-7xl text-cp-white font-bold tracking-tightest mb-4 md:mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-lg lg:max-w-xl text-shadow-sm">
          {description}
        </p>
        
        <button className="mt-8 md:mt-12 px-8 py-3 border border-white/30 backdrop-blur-sm rounded-full text-white text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300">
          Discover More
        </button>
      </div>
    </div>
  );
};

export default ContentBlock;