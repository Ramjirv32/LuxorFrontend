import React, { useEffect, useRef } from 'react';
import { FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa';
// In PersonalIntro.jsx
import owner from '../../assets/About/owner.jpg';

// Custom hook for fade-in on scroll with delay
const useScrollFade = (ref, delay = 0) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        setTimeout(() => {
          el.style.opacity = 1;
          el.style.transform = 'translateX(0) scale(1)';
        }, delay);
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // initial check
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, delay]);
};

const TeamMember = ({ member, side, delay }) => {
  const ref = useRef(null);
  useScrollFade(ref, delay);
  const isLeft = side === 'left';

  return (
    <div
      ref={ref}
      className={`relative bg-black bg-opacity-80 text-white p-8 rounded-xl shadow-lg cursor-pointer 
        transform transition-all duration-900 ease-out opacity-0 scale-95 translate-x-[-50px] 
        flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      style={{
        transitionProperty:
          'opacity, transform, letter-spacing, color, background-color, box-shadow, font-weight, background-position',
        backgroundImage:
          'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)',
        backgroundSize: '200% 100%',
        backgroundPosition: '200% 0',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        transitionDuration: '600ms',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundPositionX = '0%';
        e.currentTarget.style.color = '#111111'; // Darker black for better contrast
        e.currentTarget.style.backgroundColor = 'white';
        e.currentTarget.style.boxShadow = '0 0 35px 8px rgba(255,255,255,0.4)';
        e.currentTarget.style.fontWeight = '600';
        e.currentTarget.style.letterSpacing = '0.2em';
        
        // Find and modify text elements for better visibility
        const h3 = e.currentTarget.querySelector('h3');
        const paragraphs = e.currentTarget.querySelectorAll('p');
        
        if (h3) {
          h3.style.textShadow = '0 1px 2px rgba(0,0,0,0.1)';
          h3.style.transform = 'scale(1.05)';
          h3.style.color = '#000000';
        }
        
        paragraphs.forEach(p => {
          p.style.color = '#222222';
          p.style.textShadow = '0 1px 1px rgba(255,255,255,0.7)';
        });
        
        // Keep the icons container with its own styling
        const iconsContainer = e.currentTarget.querySelector('.social-icons');
        if (iconsContainer) {
          iconsContainer.style.color = 'inherit'; // Reset to default behavior
          iconsContainer.classList.add('icons-on-light-bg');
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundPositionX = '200%';
        e.currentTarget.style.color = 'white';
        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)';
        e.currentTarget.style.boxShadow = '0 0 15px rgba(0,0,0,0.5)';
        e.currentTarget.style.fontWeight = 'normal';
        e.currentTarget.style.letterSpacing = 'normal';
        
        // Reset text elements
        const h3 = e.currentTarget.querySelector('h3');
        const paragraphs = e.currentTarget.querySelectorAll('p');
        
        if (h3) {
          h3.style.textShadow = 'none';
          h3.style.transform = 'scale(1)';
          h3.style.color = '';
        }
        
        paragraphs.forEach(p => {
          p.style.color = '';
          p.style.textShadow = 'none';
        });
        
        // Reset the icons container
        const iconsContainer = e.currentTarget.querySelector('.social-icons');
        if (iconsContainer) {
          iconsContainer.classList.remove('icons-on-light-bg');
        }
      }}
    >
      {/* Image container with enhanced glow effect */}
      <div
        className="flex-shrink-0 relative rounded-full overflow-hidden grayscale filter transition duration-700
          hover:grayscale-0 hover:scale-110 hover:brightness-125 shadow-[0_0_12px_rgba(255,255,255,0.25)] 
          hover:shadow-[0_0_30px_12px_rgba(255,255,255,0.5)] w-32 h-32"
        style={{ transitionProperty: 'filter, transform, box-shadow' }}
      >
        <img
          src={member.photo}
          alt={`${member.name} photo`}
          className="w-full h-full object-cover rounded-full"
          draggable={false}
        />
        
        {/* Add light reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>
      </div>

      {/* Text container with enhanced visibility */}
      <div className="relative max-w-xs">
        {/* Decorative background glow that appears on hover */}
        <div className="absolute -inset-4 bg-white/5 rounded-lg blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
        
        <svg
          className="absolute inset-0 w-full h-full stroke-current stroke-[0.2] opacity-15 pointer-events-none"
          fill="none"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle cx="50" cy="50" r="48" />
          <line x1="10" y1="90" x2="90" y2="10" />
        </svg>

        <h3 className="relative text-3xl font-sans tracking-wide mb-2 transition-all duration-700">
          {member.name}
        </h3>
        <p className="relative text-sm font-thin italic mb-4">{member.role}</p>
        <p className="relative text-gray-300 font-extralight leading-relaxed mb-6">
          {member.funFact}
        </p>

        {/* Contact icons with enhanced hover effects - add special class */}
        <div className="social-icons flex gap-5 text-gray-400 transition-colors duration-500">
          <FaEnvelope className="cursor-pointer hover:text-blue-500 hover:scale-125 transition-all duration-300" size={20} title="Email" />
          <FaPhone className="cursor-pointer hover:text-green-500 hover:scale-125 transition-all duration-300" size={20} title="Phone" />
          <FaLinkedin className="cursor-pointer hover:text-blue-700 hover:scale-125 transition-all duration-300" size={20} title="LinkedIn" />
        </div>
      </div>
      
      {/* Add a style tag to handle the icon colors when card is hovered */}
      <style jsx>{`
        .icons-on-light-bg {
          color: #555 !important;
        }
        .icons-on-light-bg svg:hover.hover\\:text-blue-500 {
          color: #3b82f6 !important;
        }
        .icons-on-light-bg svg:hover.hover\\:text-green-500 {
          color: #22c55e !important;
        }
        .icons-on-light-bg svg:hover.hover\\:text-blue-700 {
          color: #1d4ed8 !important;
        }
      `}</style>
    </div>
  );
};

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Villa Manager',
      funFact: 'Loves hiking and nature photography.',
      photo: owner,
    },
    {
      name: 'Jane Smith',
      role: 'Head Chef',
      funFact: 'Has a passion for Italian cuisine.',
      photo: owner,
    },
    {
      name: 'Emily Johnson',
      role: 'Housekeeper',
      funFact: 'Enjoys gardening and floral arrangements.',
      photo: owner,
    },
    {
      name: 'Michael Brown',
      role: 'Concierge',
      funFact: 'Avid traveler and culture enthusiast.',
      photo: owner,
    },
  ];

  return (
    <section
      className="relative min-h-screen overflow-hidden p-12"
      style={{
        background: `linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(30,30,30,0.7) 100%)`,
        animation: 'backgroundShift 40s ease-in-out infinite alternate',
      }}
    >
      <h2 className="relative max-w-7xl mx-auto text-center text-white font-extrabold text-5xl tracking-widest mb-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">
        Meet The Team
      </h2>

      {/* Abstract morphing shape with enhanced glow */}
      <svg
        className="absolute top-0 left-0 w-[350px] h-[350px] opacity-15 animate-[morph_30s_ease-in-out_infinite]"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.25))' }}
      >
        <path
          fill="white"
          d="M43.7,-66.8C57.2,-58.5,66.5,-46.4,69.7,-33.4C72.9,-20.4,70.9,-6.5,68.8,6.3C66.7,19.2,64.6,31.8,57.4,42.2C50.2,52.7,37.8,60.9,24.3,63.7C10.9,66.5,-3.6,64,-17.9,58.6C-32.3,53.3,-46.4,45.1,-52.3,33.7C-58.3,22.3,-56.1,7.7,-56.5,-7.7C-56.9,-23.2,-59.8,-39.4,-52.8,-48.5C-45.8,-57.7,-28.8,-59.9,-14.6,-66.3C-0.3,-72.6,11.5,-83.2,23.5,-82.3C35.6,-81.3,47.8,-69.9,43.7,-66.8Z"
          transform="translate(100 100)"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto flex flex-col gap-24">
        {teamMembers.map((member, i) => (
          <TeamMember
            key={i}
            member={member}
            side={i % 2 === 0 ? 'left' : 'right'}
            delay={i * 150}
          />
        ))}
      </div>

      <style>{`
        @keyframes morph {
          0%, 100% {
            d: path("M43.7,-66.8C57.2,-58.5,66.5,-46.4,69.7,-33.4C72.9,-20.4,70.9,-6.5,68.8,6.3C66.7,19.2,64.6,31.8,57.4,42.2C50.2,52.7,37.8,60.9,24.3,63.7C10.9,66.5,-3.6,64,-17.9,58.6C-32.3,53.3,-46.4,45.1,-52.3,33.7C-58.3,22.3,-56.1,7.7,-56.5,-7.7C-56.9,-23.2,-59.8,-39.4,-52.8,-48.5C-45.8,-57.7,-28.8,-59.9,-14.6,-66.3C-0.3,-72.6,11.5,-83.2,23.5,-82.3C35.6,-81.3,47.8,-69.9,43.7,-66.8Z");
          }
          50% {
            d: path("M61.9,-58.2C72.8,-44.8,68.9,-22.4,62.3,-7.5C55.7,7.4,46.3,14.8,41.1,23.8C35.9,32.9,34.9,43.7,26.8,50.3C18.8,56.8,3.6,59.1,-9.5,59.1C-22.6,59.1,-33.7,56.8,-44.4,50.8C-55,44.9,-65.3,35.3,-65.6,24.1C-65.9,12.9,-56.2,0,-51.7,-13.8C-47.2,-27.7,-47.9,-42.5,-40.6,-53.8C-33.3,-65.1,-18,-72.9,0.2,-73.1C18.4,-73.3,39.5,-66,53.2,-52.4C66.9,-38.9,73.1,-19.4,72.4,-0.4C71.7,18.6,64.2,37.1,51.5,44.9C38.8,52.7,20.9,49.7,5.9,46.4C-9,43.2,-21,39.6,-33.9,32.9C-46.9,26.2,-60.9,16.3,-68.6,0.7C-76.3,-14.9,-77.7,-36.3,-67.2,-51.3C-56.7,-66.3,-34.1,-74.8,-14.7,-70.8C4.7,-66.9,21,-50.4,39.1,-38.6C57.1,-26.9,76.8,-19.9,83.1,-6.8C89.4,6.4,82.4,26,70.5,37.9C58.6,49.9,41.8,54.3,26.4,62.7C11,71.1,-2.9,83.5,-19.5,84.2C-36.1,84.9,-55.3,73.9,-65.8,58.2C-76.4,42.5,-78.3,22.1,-75.6,4.3C-72.9,-13.4,-65.6,-28.6,-55.9,-40.7C-46.2,-52.8,-34.2,-61.8,-20.8,-64.5C-7.3,-67.2,7.5,-63.5,19,-55.9C30.6,-48.3,38.9,-36.7,47.1,-24.7Z");
          }
        }
        
        @keyframes backgroundShift {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </section>
  );
};

export default TeamSection;