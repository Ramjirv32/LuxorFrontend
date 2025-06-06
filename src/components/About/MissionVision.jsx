import React, { useState } from 'react';

const MissionVision = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      title: 'Our Mission',
      text: 'To provide a serene and luxurious experience for our guests, surrounded by nature and comfort.',
      icon: '✦',
    },
    {
      title: 'Our Vision',
      text: 'To be the premier destination for relaxation and rejuvenation, where every guest feels at home.',
      icon: '✧',
    },
  ];

  return (
    <div className="flex justify-center items-center py-16 bg-light-gray">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl px-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`
              border border-silver-gray p-8 bg-pure-white rounded-sm shadow-md
              transition-all duration-500 ease-out
              hover:shadow-xl hover:border-dim-gray
              ${hoveredCard === idx ? 'z-10' : 'z-0'}
            `}
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              transform: hoveredCard === idx ? 'translateY(-5px)' : 'translateY(0)',
              transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseMove={(e) => {
              if (hoveredCard !== idx) return;

              const el = e.currentTarget;
              const rect = el.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;

              const rotateX = ((y - centerY) / centerY) * 5;
              const rotateY = ((centerX - x) / centerX) * 5;

              el.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
                scale(1.02)
              `;
            }}
            onMouseLeave={(e) => {
              setHoveredCard(null);
              const el = e.currentTarget;
              el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
              el.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
            }}
          >
            <div className="flex flex-col h-full relative overflow-hidden">
              {/* Decorative background element with pulse animation */}
              <div
                className={`absolute -top-10 -right-10 text-6xl opacity-5 transition-all duration-700 ease-in-out animate-pulseSlow`}
                style={{
                  transform: hoveredCard === idx ? 'rotate(15deg) scale(1.2)' : 'rotate(0) scale(1)',
                  color: 'var(--dim-gray)',
                }}
              >
                {card.icon}
              </div>

              <div
                className="mb-4 text-lg font-light tracking-wider"
                style={{ color: 'var(--silver-gray)' }}
              >
                {card.icon} <span className="ml-1">{idx === 0 ? 'MISSION' : 'VISION'}</span>
              </div>

              <h2
                className="text-3xl font-serif mb-4 transition-all duration-500"
                style={{
                  color: 'var(--charcoal)',
                  transform: hoveredCard === idx ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                {card.title}
              </h2>

              <div
                className="w-12 h-0.5 mb-6 transition-all duration-700 ease-out"
                style={{
                  width: hoveredCard === idx ? '60px' : '48px',
                  backgroundColor: hoveredCard === idx ? 'var(--dim-gray)' : 'var(--silver-gray)',
                }}
              />

              <p
                className="leading-relaxed transition-all duration-500"
                style={{
                  color: 'var(--dim-gray)',
                  opacity: hoveredCard === idx ? 1 : 0.9,
                  transform: hoveredCard === idx ? 'translateY(0)' : 'translateY(2px)',
                }}
              >
                {card.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionVision;
