import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video Optimization Logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if user is on mobile (simple width check)
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobile: Save data/battery. Don't auto-load.
      video.preload = "none";
      
      // Only play when in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Attempt to play, handle abort errors gracefully
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(video);
      
      return () => observer.disconnect();
    } else {
      // Desktop: Standard autoplay behavior
      video.play().catch(() => {});
    }
  }, []);

  // GSAP Text Animation
  useEffect(() => {
    const { gsap } = window;
    
    if (headlineRef.current && subtitleRef.current && gsap) {
      gsap.set([headlineRef.current, subtitleRef.current], {
        autoAlpha: 1, 
        y: 100,
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      });
      
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      
      // Delayed slightly to allow preloader to lift
      tl.to([subtitleRef.current, headlineRef.current], {
        y: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        stagger: 0.2,
        delay: 0.8 
      });
    }
  }, []);

  return (
    <section className="h-[100dvh] w-full relative overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center">
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          ref={videoRef}
          className="hero-video w-full h-full object-cover opacity-80"
          muted 
          loop 
          playsInline
          poster="" 
          // Note: autoPlay is removed to allow JS control for mobile optimization
        >
          <source src="https://videos.pexels.com/video-files/5725964/5725964-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[90vw] text-center px-4 mix-blend-screen">
        <p 
          ref={subtitleRef} 
          className="text-cp-white font-medium tracking-[0.2em] uppercase text-xs md:text-base mb-4 md:mb-6 opacity-0"
        >
          Ceramic Pro Vijayawada
        </p>
        <h1 
          ref={headlineRef} 
          className="text-cp-white font-bold leading-[0.9] opacity-0"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)' }}
        >
          PERFECTION<br />PROTECTED
        </h1>
      </div>
      
    </section>
  );
};

export default Hero;