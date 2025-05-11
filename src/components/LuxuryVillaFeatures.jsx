import React from 'react';
import { Home, MapPin, Star, ArrowRight } from 'lucide-react';

const LuxuryVillaFeatures = () => {
  const features = [
    {
      icon: 'Home',
      title: 'Luxury Accommodations',
      description: 'Experience unparalleled comfort in our meticulously designed villas with premium amenities and elegant interiors.'
    },
    {
      icon: 'Map',
      title: 'Prime Locations',
      description: 'Our properties are situated in the most scenic and exclusive destinations, offering breathtaking views and convenience.'
    },
    {
      icon: 'Star',
      title: 'Five-Star Experience',
      description: 'Enjoy personalized service, gourmet dining options, and exclusive amenities that define a truly luxurious stay.'
    }
  ];

  return (
    <>
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                  {feature.icon === 'Home' && <Home className="w-8 h-8" />}
                  {feature.icon === 'Map' && <MapPin className="w-8 h-8" />}
                  {feature.icon === 'Star' && <Star className="w-8 h-8" />}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-200">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Luxury Living?
            </h2>
            <p className="text-gray-400 mb-8">
              Join thousands of guests who choose our luxury villas for unforgettable stays in stunning locations
            </p>
            <button className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg rounded-full transition-colors duration-300 flex items-center justify-center mx-auto">
              Book Your Villa <ArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-aos="fade-up">
            Why Choose Our Luxury Villas?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {[
              { title: "Private Retreats", description: "Enjoy exclusive access to your own sanctuary with complete privacy." },
              { title: "Personalized Service", description: "Experience attentive, tailored service from our dedicated staff." },
              { title: "Premium Amenities", description: "From infinity pools to gourmet kitchens, enjoy the finest amenities." },
              { title: "Memorable Experiences", description: "Create lifelong memories with curated experiences and activities." }
            ].map((item, index) => (
              <div 
                key={item.title}
                className=" border border-white/10 rounded-lg p-6 "
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LuxuryVillaFeatures;