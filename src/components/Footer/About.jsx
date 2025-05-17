import React from 'react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-semibold text-center">About Us</h1>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover the story behind our luxury villa booking service and our commitment to exceptional experiences.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/images/about-us.jpg" 
              alt="Luxury villa exterior" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2015, our villa booking platform was born from a passion for exceptional travel experiences and a desire to make luxury accommodations accessible to discerning travelers worldwide.
            </p>
            <p className="text-gray-700 mb-4">
              What began as a small collection of handpicked properties has grown into a curated portfolio of the world's most stunning villas, each selected for its unique character, prime location, and outstanding amenities.
            </p>
            <p className="text-gray-700">
              Our team of travel enthusiasts personally visits and vets each property to ensure it meets our exacting standards, guaranteeing that every stay booked through our platform delivers the exceptional experience our clients expect.
            </p>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-center mb-12">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Exceptional Quality</h3>
              <p className="text-gray-700">
                We are committed to offering only the finest properties, each one meeting our strict criteria for luxury, comfort, and unique character.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Personalized Service</h3>
              <p className="text-gray-700">
                We believe in tailoring each experience to our clients' needs, providing concierge services and personalized recommendations.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Transparency & Trust</h3>
              <p className="text-gray-700">
                We operate with complete transparency, providing accurate information and honest reviews to help our clients make informed decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Sarah Johnson", role: "Founder & CEO", image: "/images/team1.jpg" },
              { name: "Michael Chen", role: "Head of Property Curation", image: "/images/team2.jpg" },
              { name: "Elena Rodriguez", role: "Customer Experience Director", image: "/images/team3.jpg" },
              { name: "David Kim", role: "Chief Technology Officer", image: "/images/team4.jpg" }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src={member.image || "/placeholder.svg"} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;