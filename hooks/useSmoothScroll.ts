import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    const { Lenis, gsap, ScrollTrigger } = window;

    if (!Lenis || !gsap || !ScrollTrigger) {
      console.warn('GSAP or Lenis not loaded via CDN');
      return;
    }

    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with Apple-style inertia
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Expose instance globally for Preloader control
    window.lenisInstance = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis' RAF to GSAP's Ticker for perfect synchronization
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing to prevent stuttering during heavy scroll
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.lenisInstance = undefined;
    };
  }, []);
};