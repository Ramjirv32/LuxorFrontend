import React from 'react';

const CallToAction = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 bg-white transform transition-all duration-700 hover:scale-[1.02]">
            <h2 className="text-3xl font-serif text-charcoal mb-8 transition-all duration-500 ease-in-out hover:tracking-wider">
                Ready to Experience Luxury?
            </h2>
            <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-jetBlack text-pureWhite py-3 px-6 rounded-sm 
                    transition-all duration-500 ease-in-out transform hover:scale-105
                    hover:bg-transparent hover:text-jetBlack border-2 border-transparent hover:border-jetBlack
                    shadow-md hover:shadow-xl relative overflow-hidden group">
                    <span className="relative z-10">Book Your Stay</span>
                    <span className="absolute inset-0 bg-pureWhite transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </button>
                <button className="bg-pureWhite border-2 border-jetBlack text-charcoal py-3 px-6 rounded-sm
                    transition-all duration-500 ease-in-out transform hover:scale-105 hover:bg-lightGray
                    shadow-sm hover:shadow-lg hover:translate-y-[-2px]">
                    Contact Us
                </button>
            </div>
        </div>
    );
};

export default CallToAction;