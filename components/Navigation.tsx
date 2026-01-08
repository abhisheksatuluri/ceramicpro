import React, { useState } from 'react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    
    // Handle Scroll Locking in React
    if (newState) {
      if (window.lenisInstance) window.lenisInstance.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (window.lenisInstance) window.lenisInstance.start();
      document.body.style.overflow = '';
    }
  };

  return (
    <>
      {/* Desktop Navigation (Capsule) */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[90] hidden lg:flex items-center gap-8 px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full transition-all duration-300">
        <div className="font-semibold text-cp-white pr-6 border-r border-white/10">CP. Vijayawada</div>
        <a href="#" className="text-sm font-medium text-cp-white hover:text-cp-blue transition-colors">Home</a>
        <a href="#" className="text-sm font-medium text-cp-grey hover:text-cp-white transition-colors">Ceramic Pro</a>
        <a href="#" className="text-sm font-medium text-cp-grey hover:text-cp-white transition-colors">Kavaca PPF</a>
        <a href="#" className="text-sm font-medium text-cp-grey hover:text-cp-white transition-colors">Gallery</a>
        <a href="#" className="text-sm font-medium text-cp-grey hover:text-cp-white transition-colors">Contact</a>
      </nav>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-[100] lg:hidden mix-blend-difference">
        <div className="text-xl font-bold text-cp-white">CP.</div>
        
        {/* Hamburger Icon */}
        <button 
          onClick={toggleMenu} 
          className="relative w-[30px] h-[20px] flex flex-col justify-between z-[101] group"
        >
          <span className={`block w-full h-[2px] bg-white transition-all duration-300 ${isOpen ? 'translate-y-[9px] rotate-45' : ''}`} />
          <span className={`block w-full h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-full h-[2px] bg-white transition-all duration-300 ${isOpen ? '-translate-y-[9px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      <div className={`fixed inset-0 bg-cp-black z-[99] flex flex-col justify-center items-center transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center gap-6">
          {['Home', 'Ceramic Pro', 'Kavaca PPF', 'Gallery', 'Contact'].map((item, i) => (
            <a 
              key={item}
              href="#" 
              className={`text-4xl md:text-5xl font-bold text-cp-white hover:text-cp-blue transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${100 + i * 100}ms` }}
              onClick={toggleMenu}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navigation;