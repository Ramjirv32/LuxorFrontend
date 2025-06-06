import React from "react";

const testimonials = [
  {
    quote: "This villa is a hidden gem! The ambiance is simply magical.",
    author: "Jane Doe",
    role: "Travel Blogger",
    awards: ["Best Stay 2022", "Top 10 Villas in Europe"],
  },
  {
    quote: "An unforgettable experience! The service was impeccable.",
    author: "John Smith",
    role: "Luxury Traveler",
    awards: ["Traveler's Choice 2023"],
  },
  {
    quote: "A perfect getaway! I can't wait to return.",
    author: "Emily Johnson",
    role: "Frequent Visitor",
    awards: [],
  },
];

// Duplicate the testimonials array to create the infinite loop effect
const doubleTestimonials = [...testimonials, ...testimonials];

const styleSheet = `
@keyframes scrollLeft {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes pulseSlow {
  0%, 100% {
    opacity: 0.08;
    transform: scale(1);
  }
  50% {
    opacity: 0.12;
    transform: scale(1.05);
  }
}

@keyframes floatAround {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, -10px);
  }
  50% {
    transform: translate(-10px, 10px);
  }
  75% {
    transform: translate(10px, 10px);
  }
}
`;

const Testimonials = () => {
  return (
    <>
      <style>{styleSheet}</style>
      <section className="relative min-h-[300px] bg-white flex flex-col items-center justify-center py-20 px-6 overflow-hidden select-none">
        {/* Background animated geometric shapes */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 800 600"
        >
          <g
            stroke="#000"
            strokeWidth="0.6"
            fill="none"
            strokeDasharray="8 5"
            style={{ animation: "pulseSlow 6s ease-in-out infinite" }}
          >
            <circle
              cx="150"
              cy="150"
              r="100"
              style={{ animation: "floatAround 10s ease-in-out infinite" }}
            />
            <circle
              cx="650"
              cy="450"
              r="140"
              style={{ animation: "floatAround 14s ease-in-out infinite", animationDelay: "2s" }}
            />
            <line x1="0" y1="300" x2="800" y2="300" />
            <line x1="400" y1="0" x2="400" y2="600" />
          </g>
        </svg>

        <h2 className="z-10 text-5xl font-serif text-black mb-12 tracking-wide transition-all duration-700 ease-in-out">
          What Our Guests Say
        </h2>

        {/* Carousel container with overflow hidden */}
        <div
          className="relative z-10 w-full max-w-7xl overflow-hidden"
          style={{ userSelect: "none" }}
        >
          {/* Scrolling wrapper that moves left infinitely */}
          <div
            className="flex space-x-10"
            style={{
              width: "200%", // since we have double testimonials side by side
              animation: "scrollLeft 30s linear infinite",
            }}
            // Pause animation on hover for readability
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = "running";
            }}
          >
            {doubleTestimonials.map((t, i) => (
              <article
                key={i}
                className="relative bg-black bg-opacity-80 text-white rounded-3xl p-8 flex-shrink-0 w-[320px] cursor-pointer transform transition duration-600 ease-in-out
                hover:bg-opacity-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                style={{
                  clipPath:
                    i % 3 === 0
                      ? "polygon(0 0, 100% 0, 90% 100%, 0% 100%)"
                      : i % 3 === 1
                      ? "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)"
                      : "polygon(0 0, 90% 0, 100% 100%, 10% 100%)",
                }}
              >
                <p className="italic text-lg font-serif mb-6 leading-relaxed transition-all duration-500 ease-in-out">
                  “{t.quote}”
                </p>
                <div className="text-sm font-sans tracking-wide mb-4">
                  <p className="font-bold">{t.author}</p>
                  <p className="opacity-70">{t.role}</p>
                </div>

                {t.awards.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {t.awards.map((award, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold uppercase px-3 py-1 border border-white rounded-full tracking-widest cursor-default
                        transition-shadow duration-400 hover:shadow-[0_0_12px_rgba(0,0,0,0.8)] hover:text-black hover:bg-white"
                      >
                        {award}
                      </span>
                    ))}
                  </div>
                )}

                {/* subtle transparent overlay pattern */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none transition-opacity duration-700"
                  style={{
                    backgroundImage:
                      "repeating-radial-gradient(circle at center, rgba(0,0,0,0.08) 0, transparent 18px)",
                  }}
                ></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
