import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUsers, FaGift, FaHeart } from "react-icons/fa";
import villaImage from "../../assets/About/advantages-of-living-in-a-villa.jpg";

const SplitLayout = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-[600px] bg-white text-black">
      {/* Image side with overlay */}
      <div className="md:w-1/2 relative overflow-hidden max-h-[400px] md:max-h-none">
        <img
          src={villaImage}
          alt="Villa"
          className="
            w-full h-full object-cover
            brightness-90 grayscale-0
            transition-all duration-700 ease-in-out
            transform-gpu
            hover:brightness-100
            hover:scale-[1.05]
          "
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/70 via-white/40 to-transparent pointer-events-none z-10" />
      </div>

      {/* Text content side */}
      <div className="md:w-1/2 px-6 py-12 md:py-20 flex flex-col justify-center bg-white/90 space-y-14 backdrop-blur-sm">
        <ContentBlock
          icon={<FaUsers className="text-5xl text-black drop-shadow-lg mb-4 animate-float" />}
          title="WHO WE ARE"
          text="We are a team of dedicated professionals committed to excellence and innovation."
          aos="fade-left"
          delay={150}
        />
        <ContentBlock
          icon={<FaGift className="text-5xl text-black drop-shadow-lg mb-4 animate-float" />}
          title="WHAT WE OFFER"
          text="Offering bespoke services designed to meet your unique needs with perfection."
          aos="fade-left"
          delay={350}
        />
        <ContentBlock
          icon={<FaHeart className="text-5xl text-black drop-shadow-lg mb-4 animate-float" />}
          title="WHY GUESTS LOVE US"
          text="Our guests appreciate our attention to detail, warmth, and exceptional quality."
          aos="fade-left"
          delay={550}
        />
      </div>
    </div>
  );
};

const ContentBlock = ({ icon, title, text, aos, delay }) => {
  return (
    <div
      className="
        group rounded-2xl p-8 border border-black/10 bg-white/20 backdrop-blur-xl shadow-md
        transform-gpu transition duration-700 ease-in-out
        hover:scale-[1.05] hover:border-black/40 hover:shadow-lg hover:bg-white/30
        relative overflow-hidden
      "
      data-aos={aos}
      data-aos-delay={delay}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10 opacity-10 pointer-events-none" />
      <div className="flex flex-col items-center text-center z-10 relative">
        {icon}
        <h2 className="text-black font-serif text-2xl md:text-3xl uppercase mb-3 tracking-wider relative">
          {title}
          <span className="block h-1 w-12 bg-black mt-2 mx-auto rounded-full transition-all duration-300 group-hover:w-20" />
        </h2>
        <p className="text-gray-800 leading-relaxed max-w-md text-base font-light">{text}</p>
      </div>
    </div>
  );
};

export default SplitLayout;
