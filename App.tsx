import React, { useState, useEffect } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Hero from './components/Hero';
import ContentBlock from './components/ContentBlock';
import FeaturesGrid from './components/FeaturesGrid';
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  // Initialize Smooth Scrolling (Lenis)
  useSmoothScroll();
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    if (isLoading) {
      if (window.lenisInstance) window.lenisInstance.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (window.lenisInstance) window.lenisInstance.start();
      document.body.style.overflow = '';
      
      // Refresh ScrollTrigger once content is revealed/stable
      setTimeout(() => {
        window.ScrollTrigger?.refresh();
      }, 500);
    }
  }, [isLoading]);

  return (
    <div className="bg-cp-black text-cp-white min-h-[100dvh] selection:bg-cp-blue selection:text-white">
      
      {/* Cinematic Preloader */}
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      {/* New Navigation System */}
      <Navigation />

      {/* 
        Standard Smooth Scroll Structure 
      */}
      <div id="smooth-wrapper" className="w-full overflow-hidden">
        <div id="smooth-content" className="w-full relative">
          
          <main>
            <Hero />
            
            <ContentBlock 
              index={1}
              title="Nano-Ceramic"
              description="A permanent bond that protects your vehicle's paintwork from damaging contaminants. Unlike waxes or sealants, Ceramic Pro offers lifetime protection with a high-gloss finish."
              image="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
              align="left"
            />
            
            <ContentBlock 
              index={2}
              title="Kavaca PPF"
              description="The most advanced self-healing paint protection film on the market. Protect your investment from rock chips, scratches, and road debris with invisible armor that heals instantly."
              image="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop"
              align="right"
            />

            <ContentBlock 
              index={3}
              title="Ultimate Ion"
              description="The next generation of surface protection. Harder, thicker, and more durable than any previous coating technology. Reserved for the most demanding automotive enthusiasts."
              image="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop"
              align="left"
            />
            
            <FeaturesGrid />

            <section className="h-[50dvh] flex items-center justify-center border-t border-cp-grey/10 bg-[#0a0a0a]">
              <div className="text-center px-4">
                <h3 className="text-xl md:text-2xl text-cp-white mb-4 font-light">Ready to protect your investment?</h3>
                <p className="text-cp-blue cursor-pointer text-base md:text-lg hover:underline tracking-wide uppercase">Book an Appointment</p>
              </div>
            </section>
          </main>

          <footer className="py-12 px-6 border-t border-cp-grey/10 text-center md:text-left bg-[#050505]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-cp-grey text-sm">
              <p>&copy; {new Date().getFullYear()} Ceramic Pro Vijayawada.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-cp-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-cp-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-cp-white transition-colors">Contact</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;