"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin, Star, Heart } from "lucide-react"

const PropertyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState("All")

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
      image: "/placeholder.svg?height=300&width=400",
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
      image: "/placeholder.svg?height=300&width=400",
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
      image: "/placeholder.svg?height=300&width=400",
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
      image: "/placeholder.svg?height=300&width=400",
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
      image: "/placeholder.svg?height=300&width=400",
      bestRated: true,
    },
 
  ]

  const nextSlide = () => {
    // Maximum valid index is the total number of cards minus cards visible at once
    const maxIndex = properties.length + 1 - 4;
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? maxIndex : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? 0 : prevIndex - 1))
  }

  const navigateToHome = () => {
    // In a real app, you would use React Router or similar
    window.location.href = "/home"
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Trending This Season</h1>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
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
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border hover:bg-gray-50 transition-colors"
          style={{ marginLeft: "-20px" }}
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border hover:bg-gray-50 transition-colors"
          style={{ marginRight: "-20px" }}
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        {/* Cards Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / 4)}%)`,
              width: `${((properties.length + 1) * 100) / 4}%`, // +1 for explore more card
            }}
          >
            {/* Property Cards */}
            {properties.map((property) => (
              <div
                key={property.id}
                className="flex-shrink-0 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                style={{ width: `${100 / (properties.length + 1)}%` }} // +1 for explore more card
              >
                {/* Property Image */}
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.name}
                    className="w-full h-64 object-cover"
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-3 left-3 bg-white rounded-lg px-2 py-1 flex items-center gap-1 shadow-sm">
                    <span className="font-semibold text-sm">{property.rating}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </div>

                  {/* Heart Icon */}
                  <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm hover:bg-gray-50 transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>

                  {/* Best Rated Badge */}
                  {property.bestRated && (
                    <div className="absolute bottom-3 left-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      <span className="text-xs font-medium">Best Rated</span>
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{property.name}</h3>

                  <div className="flex items-center gap-1 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    Upto {property.guests} Guests • {property.rooms} Rooms • {property.baths} Baths
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">{property.price}</span>
                        {property.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">{property.originalPrice}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">For Per Night + Taxes</p>
                    </div>

                    <button className="bg-gray-900 text-white rounded-lg p-2 hover:bg-gray-800 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Explore More Card */}
            <div
              className="flex-shrink-0 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center"
              style={{ width: `${100 / (properties.length + 1)}%` }}
            >
              <button
                onClick={navigateToHome}
                className="flex flex-col items-center justify-center h-full w-full p-8 hover:bg-gray-50 transition-colors"
              >
                <div className="text-2xl font-bold text-gray-900 mb-4">EXPLORE MORE</div>
                <div className="bg-gray-900 text-white rounded-full p-3 hover:bg-gray-800 transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil((properties.length + 1) / 4) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 4)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / 4) === index ? "bg-gray-800" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PropertyCarousel
