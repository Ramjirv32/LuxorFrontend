"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, MapPin, Star, Heart } from "lucide-react"
import roomImg11 from '../assets/roomImg11.png'
import roomImg12 from '../assets/roomImg12.png'
import roomImg13 from '../assets/roomImg13.png'
import roomImg14 from '../assets/roomImg14.png'
import roomImg21 from '../assets/roomImg21.png'
import roomImg22 from '../assets/roomImg22.png'

const PropertyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState("All")
  const [visibleCards, setVisibleCards] = useState(4)
  
  // Updated breakpoints to show 2 cards on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(2) // Changed from 1 to 2 for mobile
      } else if (window.innerWidth < 768) {
        setVisibleCards(2)
      } else if (window.innerWidth < 1024) {
        setVisibleCards(3)
      } else {
        setVisibleCards(4)
      }
    }
    
    // Initial calculation
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filters = ["All", "Lonavala", "Alibaug", "Coorg", "Explore more"]

  // 15 property cards
  const properties = [
    {
      id: 1,
      name: "Mehta Mansion",
      location: "Lonavala, Maharashtra",
      rating: 4.8,
      guests: 27,
      rooms: 9,
      baths: 10,
      price: "₹36,976",
      image: roomImg11,
      bestRated: true,
    },
    {
      id: 2,
      name: "Ashore By Vista",
      location: "Morjim, Goa",
      rating: 5.0,
      guests: 20,
      rooms: 6,
      baths: 8,
      price: "₹64,927",
      originalPrice: "₹86,977",
      image: roomImg12,
      bestRated: true,
    },
    {
      id: 3,
      name: "Magnolia Villa",
      location: "Alibaug, Maharashtra",
      rating: 4.6,
      guests: 14,
      rooms: 5,
      baths: 6,
      price: "₹48,758",
      image: roomImg13,
      bestRated: true,
    },
    {
      id: 4,
      name: "The Rain",
      location: "Alleppey, Kerala",
      rating: 4.7,
      guests: 12,
      rooms: 4,
      baths: 5,
      price: "₹44,545",
      image: roomImg14,
      bestRated: true,
    },
    {
      id: 5,
      name: "Shalom Villa",
      location: "Alleppey, Kerala",
      rating: 4.6,
      guests: 12,
      rooms: 4,
      baths: 4,
      price: "₹29,058",
      image: roomImg21,
      bestRated: true,
    },
 
  ]

  // Fixed the navigation logic for proper sliding
  const nextSlide = () => {
    const maxIndex = Math.max(0, properties.length - visibleCards);
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const navigateToHome = () => {
    // In a real app, you would use React Router or similar
    window.location.href = "/home"
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Trending This Season</h1>

      {/* Filter Buttons - already responsive with flex-wrap */}
      <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg border transition-colors ${
              activeFilter === filter
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="relative">
        {/* Navigation Arrows - improved for mobile */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 sm:p-2 shadow-lg border transition-colors ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}
          style={{ marginLeft: "-10px" }}
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIndex >= properties.length - visibleCards}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 sm:p-2 shadow-lg border transition-colors ${
            currentIndex >= properties.length - visibleCards ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}
          style={{ marginRight: "-10px" }}
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>

        {/* Cards Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-3 sm:gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              width: `${((properties.length + 1) * 100) / visibleCards}%`,
            }}
          >
            {/* Property Cards */}
            {properties.map((property) => (
              <div
                key={property.id}
                className="flex-shrink-0 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                style={{ width: `calc(${100 / visibleCards}% - ${(visibleCards - 1) * 12 / visibleCards}px)` }}
              >
                {/* Property Image */}
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.name}
                    className="w-full h-48 sm:h-64 object-cover"
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-white rounded-lg px-2 py-0.5 sm:py-1 flex items-center gap-1 shadow-sm">
                    <span className="font-semibold text-xs sm:text-sm">{property.rating}</span>
                    <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                  </div>

                  {/* Heart Icon */}
                  <button className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white rounded-full p-1 sm:p-2 shadow-sm hover:bg-gray-50 transition-colors">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  </button>

                  {/* Best Rated Badge */}
                  {property.bestRated && (
                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-black bg-opacity-75 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex items-center gap-1">
                      <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-white" />
                      <span className="text-xs font-medium">Best Rated</span>
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">{property.name}</h3>

                  <div className="flex items-center gap-1 text-gray-600 mb-1 sm:mb-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">{property.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    Upto {property.guests} Guests • {property.rooms} Rooms • {property.baths} Baths
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-base sm:text-xl font-bold text-gray-900">{property.price}</span>
                        {property.originalPrice && (
                          <span className="text-xs sm:text-sm text-gray-500 line-through">{property.originalPrice}</span>
                        )}
                      </div>
                      <p className="text-2xs sm:text-xs text-gray-500">For Per Night + Taxes</p>
                    </div>

                    <button className="bg-gray-900 text-white rounded-lg p-1 sm:p-2 hover:bg-gray-800 transition-colors">
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Explore More Card */}
            <div
              className="flex-shrink-0 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center"
              style={{ width: `calc(${100 / visibleCards}% - ${(visibleCards - 1) * 12 / visibleCards}px)` }}
            >
              <button
                onClick={navigateToHome}
                className="flex flex-col items-center justify-center h-full w-full p-4 sm:p-8 hover:bg-gray-50 transition-colors"
              >
                <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">EXPLORE MORE</div>
                <div className="bg-gray-900 text-white rounded-full p-2 sm:p-3 hover:bg-gray-800 transition-colors">
                  <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Pagination Dots - made more touch-friendly */}
        <div className="flex justify-center gap-3 mt-5 sm:mt-6">
          {Array.from({ length: Math.ceil((properties.length + 1) / visibleCards) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * visibleCards)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${
                Math.floor(currentIndex / visibleCards) === index ? "bg-gray-800" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PropertyCarousel
