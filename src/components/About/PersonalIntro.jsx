import React, { useState, useEffect, useRef } from 'react';
// In PersonalIntro.jsx
import owner from  '../../assets/About/owner.jpg'; // Adjust the path as necessary
const PersonalIntro = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const componentRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => {
            if (componentRef.current) {
                observer.unobserve(componentRef.current);
            }
        };
    }, []);

    return (
        <div 
            ref={componentRef}
            className="relative flex flex-col md:flex-row items-center bg-white py-16 px-8 overflow-hidden"
        >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-5 transform -translate-x-1/2 -translate-y-1/2">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#2C2C2C" d="M42.8,-57.2C55.9,-49.4,67.2,-37.5,73.8,-22.6C80.4,-7.7,82.3,10.3,76.5,25.3C70.7,40.2,57.2,52.2,42.3,59.7C27.4,67.3,11.2,70.3,-3.4,74.8C-18,79.3,-31,85.3,-44.2,81.5C-57.4,77.8,-70.7,64.2,-75.6,48.2C-80.6,32.1,-77.3,13.6,-74.2,-4.2C-71,-21.9,-68,-38.9,-58.1,-48.7C-48.2,-58.4,-31.3,-60.9,-16.3,-66.9C-1.2,-72.9,12.8,-82.3,25.8,-78.8C38.9,-75.3,50.2,-58.8,54.8,-48.8C59.4,-38.7,56.5,-35.2,56.4,-28.8C56.4,-22.4,59.2,-13.2,62,-3.4L66.3,3.3L53.2,9.8Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="absolute bottom-0 right-0 w-40 h-40 opacity-5 transform translate-x-1/4 translate-y-1/4">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#2C2C2C" d="M39.9,-65.7C51.1,-58.5,59.2,-46.4,63.8,-33.4C68.4,-20.4,69.3,-6.5,66.9,6.4C64.5,19.3,58.7,31.3,50.3,40.8C41.9,50.4,31,57.5,18.5,62.9C6,68.4,-8,72.2,-21.1,69.9C-34.2,67.5,-46.3,59,-54.6,47.6C-63,36.3,-67.5,22,-72.3,5.9C-77.1,-10.3,-82.2,-28.2,-76.3,-40.2C-70.4,-52.3,-53.6,-58.4,-38.6,-63.5C-23.6,-68.6,-10.4,-72.7,2.5,-76.8C15.3,-80.9,28.7,-73,39.9,-65.7Z" transform="translate(100 100)" />
                </svg>
            </div>

            {/* Photo section with animation */}
            <div 
                className={`md:w-1/2 mb-8 md:mb-0 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                style={{ transitionDelay: '200ms' }}
            >
                <div className="relative mx-auto max-w-xs overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-tr from-silverGray/20 to-transparent z-10 mix-blend-overlay"></div>
                    <div 
                        className="relative overflow-hidden rounded-full border-4 border-lightGray transition-transform duration-700 ease-out transform hover:scale-105"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img 
                            src= {owner}
                            alt="Villa Owner" 
                            className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000" 
                        />
                        <div className={`absolute inset-0 bg-charcoal/10 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}></div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 p-3 bg-white rounded-full shadow-md z-20 transform rotate-12 transition-all duration-500 hover:rotate-0">
                        <span className="text-2xl">✦</span>
                    </div>
                </div>
            </div>

            {/* Text content with animations */}
            <div 
                className={`md:w-1/2 md:pl-12 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                style={{ transitionDelay: '400ms' }}
            >
                <div className="relative">
                    <span className="absolute -left-4 text-4xl text-silverGray opacity-20">❝</span>
                    <h2 className="text-3xl font-serif text-charcoal mb-6 relative inline-block">
                        About Me
                        <div className={`h-0.5 bg-silverGray absolute bottom-0 left-0 transition-all duration-1000 ease-out ${isVisible ? 'w-full' : 'w-0'}`} style={{ transitionDelay: '800ms' }}></div>
                    </h2>
                </div>
                
                <p className={`text-charcoal text-lg leading-relaxed mb-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
                    "Welcome to our villa, a place where comfort meets elegance. 
                    I have dedicated my life to creating a serene escape for our guests."
                </p>
                
                <div className={`relative transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '800ms' }}>
                    <p className="text-dimGray italic text-lg border-l-2 border-silverGray pl-4 py-1">
                        "Your experience is our priority."
                    </p>
                    <div className="flex items-center mt-8">
                        <div className="w-10 h-10 rounded-full bg-lightGray flex items-center justify-center mr-4 shadow-sm">
                            <span className="text-charcoal">✦</span>
                        </div>
                        <span className="text-dimGray">Villa Owner & Host</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalIntro;