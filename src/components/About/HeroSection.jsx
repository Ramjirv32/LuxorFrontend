import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import backgroundVideo from '../../assets/About/v.mp4';

const HeroSection = () => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true, easing: 'ease-out-cubic' });
    setTimeout(() => setIsLoaded(true), 200);

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10 * -1;
      const rotateY = ((x - centerX) / centerX) * 10;

      setTilt({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
      setTilt({ rotateX: 0, rotateY: 0 });
    };

    const node = containerRef.current;
    if (node) {
      node.addEventListener('mousemove', handleMouseMove);
      node.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (node) {
        node.removeEventListener('mousemove', handleMouseMove);
        node.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const floatingStyle = {
    animation: 'floatUpDown 6s ease-in-out infinite',
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden cursor-pointer select-none bg-black"
      style={{ perspective: '1400px' }}
    >
      {/* Video Background - vibrant color */}
      <video
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={backgroundVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          transform: `rotateX(${tilt.rotateX / 3}deg) rotateY(${tilt.rotateY / 3}deg) scale(1.05)`,
          willChange: 'transform',
          filter: 'brightness(1.05) saturate(1.1)',
          transformOrigin: 'center center',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Black & white overlays with dimming */}
      <div
        className="absolute inset-0 z-40 pointer-events-none"
        style={{
          filter: 'grayscale(100%) brightness(0.7)',
          transition: 'filter 0.3s ease',
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(15,15,20,0.85))',
            transform: `translateX(${tilt.rotateY * 1.2}px) translateY(${tilt.rotateX * 1.2}px)`,
            transition: 'transform 0.25s ease-out',
            zIndex: 20,
          }}
        />

        {/* Subtle shimmer/glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), transparent 70%)',
            transform: `translateX(${-tilt.rotateY * 2}px) translateY(${-tilt.rotateX * 2}px)`,
            transition: 'transform 0.25s ease-out',
            zIndex: 30,
            mixBlendMode: 'screen',
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 z-40"></div>
      </div>

      {/* Content (text and button) - full color & bright */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-50"
        data-aos="fade-up"
        data-aos-delay="300"
        style={{ pointerEvents: 'auto' }}
      >
        <h1
          className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-wide leading-tight drop-shadow-lg"
          style={floatingStyle}
        >
          <span className="block font-light">Experience</span>
          <span className="block font-extrabold mt-2">Luxury Living</span>
        </h1>

        <p className="mt-6 max-w-xl text-gray-100 text-lg sm:text-xl md:text-2xl drop-shadow-md">
          Step inside your dream villa with panoramic views and serene ambiance.
        </p>

        <button
          className="mt-10 px-8 py-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900
              rounded-full text-white font-semibold uppercase tracking-widest shadow-lg
              hover:from-gray-900 hover:via-gray-700 hover:to-gray-800 transition-all duration-300"
          onClick={() => alert('Explore Villas')}
        >
          Explore Now
        </button>
      </div>

      {/* Floating animation keyframes */}
      <style>
        {`
          @keyframes floatUpDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
