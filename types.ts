// Since we are loading these from CDN, we need to declare them to satisfy TypeScript
declare global {
  interface Window {
    Lenis: any;
    gsap: any;
    ScrollTrigger: any;
    lenisInstance?: any; // Global access to the Lenis instance
  }
}

// Export empty object to make this a module
export {};