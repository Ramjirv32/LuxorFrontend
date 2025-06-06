import React, { useRef, useEffect, useState } from 'react';
import villaImage from '../../assets/About/advantages-of-living-in-a-villa.jpg';
import villaVideo from '../../assets/About/Villa Vela - Ultra Modern House in La Reserva de Sotogrande, Spain _ Cinematic Video by Drumelia.mp4';

const Gallery = () => {
  const [isInView, setIsInView] = useState(false);
  const galleryRef = useRef(null);
  const videoRefs = useRef([]);

  // Sample media items
  const mediaItems = [
    { type: 'image', src: villaImage, alt: 'Villa exterior' },
    { type: 'video', src: villaVideo, alt: 'Villa tour' },
    { type: 'image', src: villaImage, alt: 'Garden view' },
    { type: 'image', src: villaImage, alt: 'Master bedroom' },
    { type: 'video', src: villaVideo, alt: 'Pool area' },
    { type: 'image', src: villaImage, alt: 'Dining space' },
  ];

  // Intersection Observer for fade-in effect
  useEffect(() => {
    const options = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsInView(true);
      });
    }, options);

    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => {
      if (galleryRef.current) observer.unobserve(galleryRef.current);
    };
  }, []);

  // Play/pause toggle on button click
  const toggleVideoPlay = (index) => {
    const video = videoRefs.current[index];
    console.log('Toggle play video at index:', index, video);
    if (!video) return;
    if (video.paused) {
      video.play().catch(e => console.log('Play error:', e));
    } else {
      video.pause();
    }
  };

  // Optional: play/pause on hover for testing
  const handleMouseEnter = (index) => {
    const video = videoRefs.current[index];
    if (video && video.paused) {
      video.play().catch(e => console.log('Play error on hover:', e));
    }
  };
  const handleMouseLeave = (index) => {
    const video = videoRefs.current[index];
    if (video && !video.paused) {
      video.pause();
    }
  };

  return (
    <div 
      ref={galleryRef}
      className="bg-white p-8 md:p-12 rounded-xl shadow-md overflow-hidden"
    >
      <h2 className="text-3xl font-serif text-charcoal mb-8 text-center relative">
        <span className="inline-block border-b-2 border-silverGray pb-2">Our Gallery</span>
      </h2>
      
      <div 
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-transform duration-1000 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
        style={{
          transform: isInView ? 'translateY(0)' : 'translateY(60px)',
          transition: 'transform 0.8s ease-out, opacity 1.2s ease-out',
        }}
      >
        {mediaItems.map((item, index) => (
          <div 
            key={index} 
            className="gallery-item h-64 md:h-80 overflow-hidden rounded-lg shadow-md transition-all duration-500 hover:shadow-xl group relative"
            style={{
              transform: `translateY(${isInView ? 0 : 30 * (index % 3)}px)`,
              transitionDelay: `${index * 100}ms`,
              transitionProperty: 'transform, box-shadow',
              transitionDuration: '800ms',
            }}
          >
            {item.type === 'image' ? (
              <img 
                src={item.src} 
                alt={item.alt} 
                className="w-full h-full object-cover transition-all duration-700 ease-in-out filter grayscale group-hover:grayscale-0 transform group-hover:scale-105"
              />
            ) : (
              <div 
                className="relative w-full h-full cursor-pointer group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <video
                  ref={(el) => videoRefs.current[index] = el}
                  src={item.src}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700 ease-in-out"
                  muted
                  loop
                  playsInline
                  controls // Remove this line once you confirm videos play properly
                />
                {/* Play button overlay */}
                <button
                  onClick={() => toggleVideoPlay(index)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                             bg-black bg-opacity-40 rounded-full p-4 flex items-center justify-center
                             opacity-80 group-hover:opacity-100 transition-opacity duration-500
                             hover:bg-opacity-60 animate-pulseSlow"
                  aria-label="Play/Pause video"
                  type="button"
                >
                  {/* Play icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-6.586-3.79A1 1 0 007 8.308v7.384a1 1 0 001.166.98l6.586-1.683a1 1 0 00.752-.948v-1.673a1 1 0 00-.752-.98z" />
                  </svg>
                </button>
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-charcoal/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="text-pureWhite text-sm">{item.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
