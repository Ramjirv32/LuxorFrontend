import React from 'react';
import { FaHome, FaUsers, FaTools, FaAward } from 'react-icons/fa';

const milestones = [
  {
    date: '2020',
    text: 'Villa Established',
    icon: <FaHome size={28} />,
    bgImage:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // house-themed
  },
  {
    date: '2021',
    text: 'First Guests Arrived',
    icon: <FaUsers size={28} />,
    bgImage:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80', // people-themed
  },
  {
    date: '2022',
    text: 'Renovation Completed',
    icon: <FaTools size={28} />,
    bgImage:
      'https://images.unsplash.com/photo-1581091870624-1e3e64a1b80d?auto=format&fit=crop&w=800&q=80', // tools-themed
  },
  {
    date: '2023',
    text: 'Awarded Best Villa',
    icon: <FaAward size={28} />,
    bgImage:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', // award-themed
  },
];

const Timeline = () => {
  return (
    <div className="relative py-20 min-h-screen bg-white overflow-hidden select-none">
      <h2 className="relative text-4xl font-serif text-black text-center mb-20 tracking-wide drop-shadow-sm z-10">
        Our Journey
      </h2>

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 h-full w-[3px] bg-black bg-opacity-10 rounded"></div>

        {milestones.map((m, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={i}
              className={`mb-20 flex justify-between items-center w-full relative ${
                isLeft ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Content box with background image */}
              <div
                className={`w-5/12 p-8 rounded-[2.5rem] border border-black border-opacity-10 shadow-md backdrop-blur-sm
                  text-${isLeft ? 'right' : 'left'} relative cursor-pointer
                  transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-black/20`}
                style={{
                  backgroundImage: `url(${m.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                }}
              >
                {/* Overlay for subtle text readability */}
                <div className="absolute inset-0 bg-white bg-opacity-30 rounded-[2.5rem] pointer-events-none"></div>

                {/* Text content */}
                <div className="relative z-10">
                  <p className="text-gray-700 text-sm font-mono mb-3">{m.date}</p>
                  <p className="text-black font-semibold text-xl leading-relaxed">{m.text}</p>
                </div>
              </div>

              {/* Icon circle */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 rounded-full w-16 h-16 flex items-center justify-center
                bg-black bg-opacity-10 backdrop-blur-sm shadow-md transition-transform duration-500 ease-in-out hover:scale-125 cursor-pointer"
              >
                <div className="text-black z-10 drop-shadow-sm">{m.icon}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
