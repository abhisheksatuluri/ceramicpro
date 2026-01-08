import React, { useRef } from 'react';

const features = [
  { 
    title: "9H Hardness", 
    desc: "Military-grade scratch resistance that forms a permanent bond with your factory clear coat, exceeding 9H hardness on the pencil scale." 
  },
  { 
    title: "Hydrophobic", 
    desc: "Advanced nanotechnology creates a surface so smooth that water and contaminants simply bead up and roll off, keeping your car cleaner for longer." 
  },
  { 
    title: "UV Resistance", 
    desc: "Prevents paint oxidation and fading. Our coatings reflect UV rays, ensuring your vehicle's color remains vibrant under the harsh sun." 
  },
  { 
    title: "High Gloss", 
    desc: "Enhances the depth and clarity of your vehicle's paint, creating a wet-look mirror finish that lasts for years, not months." 
  }
];

const FeatureCard: React.FC<{ title: string; desc: string }> = ({ title, desc }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-end p-8 md:p-12 min-h-[250px] md:min-h-[400px] bg-[#0f0f0f] border border-white/5 overflow-hidden rounded-2xl md:rounded-3xl
      /* Mobile Pulse Animation (Applied via custom style below to avoid tailwind config changes) */
      mobile-pulse-border
      /* Desktop Hover Styles */
      md:hover:border-white/20 transition-colors duration-500"
    >
      {/* Desktop Glow Effect: Only visible on md+ screens */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-medium text-cp-white mb-3 md:mb-4 tracking-tight">{title}</h3>
        <p className="text-sm md:text-base text-cp-grey leading-relaxed max-w-sm">{desc}</p>
      </div>
    </div>
  );
};

const FeaturesGrid: React.FC = () => {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 bg-[#050505] relative z-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl text-cp-white font-bold mb-12 md:mb-16 tracking-tightest">
          Engineered Performance
        </h2>
        
        {/* Grid Layout: 1 col Mobile, 2 col Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </div>
      
      {/* Encapsulated Styles for Mobile Pulse */}
      <style>{`
        @media (max-width: 767px) {
          .mobile-pulse-border {
            animation: borderPulse 4s ease-in-out infinite;
          }
        }
        @keyframes borderPulse {
          0%, 100% { border-color: rgba(255, 255, 255, 0.05); }
          50% { border-color: rgba(255, 255, 255, 0.2); }
        }
      `}</style>
    </section>
  );
};

export default FeaturesGrid;