/* 
  Global Scripts
  Usage: <script src="script.js"></script>
  Dependencies: GSAP, ScrollTrigger, Lenis (CDN)
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Initialize Lenis Smooth Scroll ---
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Connect Lenis to GSAP ScrollTrigger
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // Animation Loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // --- 2. Navigation Logic ---
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      // Toggle Classes
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      
      // Stop/Start scrolling when menu is open
      if (mobileMenu.classList.contains('active')) {
        lenis.stop();
        document.body.style.overflow = 'hidden';
      } else {
        lenis.start();
        document.body.style.overflow = '';
      }
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        lenis.start();
        document.body.style.overflow = '';
      });
    });
  }
});