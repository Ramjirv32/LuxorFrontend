import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FiHome, FiUsers } from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";

const stats = [
  { title: "Villa Offers", value: 50, suffix: "+", icon: <FiHome /> },
  { title: "Happy Members", value: 1200, suffix: "+", icon: <FiUsers /> },
  { title: "Organization Tie-ups", value: 30, suffix: "+", icon: <FaHandshake /> },
];

const StatsCounter = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full bg-white py-16 px-4 flex flex-col items-center"
    >
      <h2 className="text-black text-5xl font-serif mb-12 tracking-wide">
        Our Stats
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="
              relative 
              bg-black bg-opacity-80 
              border border-white/20 
              rounded-3xl p-10 
              text-white shadow-lg
              transition-transform transition-shadow transition-border duration-700 ease-in-out
              hover:scale-105 
              hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] 
              hover:border-white 
              hover:bg-opacity-100
            "
          >
            <div className="text-6xl mb-6 drop-shadow-md text-white">
              {stat.icon}
            </div>
            <div className="text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              {inView ? (
                <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
              ) : (
                `0${stat.suffix}`
              )}
            </div>
            <p className="mt-3 text-lg font-medium tracking-wide text-gray-300">
              {stat.title}
            </p>

            {/* subtle transparent overlay pattern */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none transition-opacity duration-700"
              style={{
                backgroundImage:
                  "repeating-radial-gradient(circle at center, rgba(255,255,255,0.08) 0, transparent 18px)",
              }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;
