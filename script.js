/* 
  Global Scripts
  Usage: <script src="script.js"></script>
  Dependencies: GSAP, ScrollTrigger, Lenis (CDN)
*/

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM Loaded. Initializing scripts...");

  // --- 1. Initialize Lenis Smooth Scroll ---
  let lenis;
  try {
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
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
      console.log("Lenis initialized.");
    } else {
      console.warn("Lenis not defined. Smooth scroll disabled.");
    }
  } catch (e) {
    console.error("Lenis initialization failed:", e);
  }

  // --- 2. Navigation Logic ---
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');

  console.log("Navigation elements:", { hamburger, mobileMenu, totalLinks: mobileLinks.length });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', (e) => {
      console.log("Hamburger clicked!");
      e.preventDefault(); // Prevent accidental unwanted behaviors
      e.stopPropagation(); // Stop bubbling

      // Toggle Classes
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');

      // Stop/Start scrolling when menu is open
      if (mobileMenu.classList.contains('active')) {
        if (lenis) lenis.stop();
        document.body.style.overflow = 'hidden';
      } else {
        if (lenis) lenis.start();
        document.body.style.overflow = '';
      }
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        console.log("Link clicked, closing menu.");
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        if (lenis) lenis.start();
        document.body.style.overflow = '';
      });
    });
  } else {
    console.error("Hamburger or Mobile Menu element not found!");
  }
});