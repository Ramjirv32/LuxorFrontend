import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Star, Heart } from 'lucide-react'
import { API_BASE_URL } from '../config/api'
import { useNavigate } from "react-router-dom"

// Unsplash images to use randomly
const unsplashImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
];

function getRandomUnsplash() {
  return unsplashImages[Math.floor(Math.random() * unsplashImages.length)];
}

export const FeaturedDestination = () => {
  const [properties, setProperties] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  // Touch/swipe support
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  const nextSlide = () => {
    if (isTransitioning || properties.length === 0) return
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev === properties.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    if (isTransitioning || properties.length === 0) return
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev === 0 ? properties.length - 1 : prev - 1))
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 700)
    return () => clearTimeout(timer)
  }, [activeIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [properties.length])

  // Show hand swipe animation on first load
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  useEffect(() => {
    if (showSwipeHint) {
      const timer = setTimeout(() => setShowSwipeHint(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showSwipeHint])

  // Fetch properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/villas/`);
        if (!res.ok) throw new Error("Failed to load properties");
        let data = await res.json();
        // Map backend data to carousel property format
        data = data.map((villa, idx) => ({
          id: villa._id || idx,
          name: villa.name,
          location: villa.location,
          rating: villa.rating || (4.5 + Math.random() * 0.5).toFixed(1),
          guests: villa.guests || 8,
          rooms: villa.bedrooms || 3,
          baths: villa.bathrooms || villa.bedrooms || 3,
          price: villa.price ? `₹${villa.price.toLocaleString()}` : "₹12,000",
          image: getRandomUnsplash(),
          bestRated: Math.random() > 0.5,
          category: villa.location?.split(",")[1]?.trim() || "All"
        }));
        setProperties(data);
      } catch (err) {
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Handler for View Details button
  const handleViewDetails = (property) => {
    // Pass the property as state to /rooms
    navigate('/rooms', { state: { villa: property } });
  };

  return (
    <div className="max-w-7xl mx-auto relative">
      {/* Title with animation */}
      <motion.div 
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          Featured Properties
        </h1>
        <div className="flex justify-center">
          <motion.div 
            className="h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Loading and error states */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}

      {/* Carousel Container */}
      {!loading && !error && properties.length > 0 && (
        <div 
          className="relative overflow-hidden rounded-2xl shadow-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Hand swipe hint animation */}
          <AnimatePresence>
            {showSwipeHint && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="bg-black/70 text-white px-4 py-2 rounded-full flex items-center gap-2"
                  animate={{ 
                    x: [0, -50, 0], 
                    opacity: [0.9, 0.6, 0.9] 
                  }}
                  transition={{ 
                    repeat: 2, 
                    duration: 1.5,
                    repeatType: "reverse"  
                  }}
                >
                  <span className="text-lg">👆</span>
                  <span className="text-sm font-medium">Swipe to explore</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Crossfade Carousel */}
          <div className="relative h-[600px] sm:h-[600px] w-full">
            {properties.map((property, index) => (
              <AnimatePresence key={property.id}>
                {index === activeIndex && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="h-full w-full relative">
                      {/* Property Image with overlay */}
                      <motion.img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.7 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                      {/* Rating Badge */}
                      <motion.div 
                        className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="font-semibold text-sm">{property.rating}</span>
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                      
                      {/* Heart Button */}
                      <motion.button 
                        className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                      </motion.button>

                      {/* Property details - animated from bottom */}
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-6 text-white"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <motion.h3 
                          className="text-2xl font-bold mb-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          {property.name}
                        </motion.h3>
                        
                        <motion.div 
                          className="flex items-center gap-1.5 mb-3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{property.location}</span>
                        </motion.div>
                        
                        <motion.p 
                          className="text-sm text-gray-200 mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          Up to {property.guests} Guests • {property.rooms} Rooms • {property.baths} Baths
                        </motion.p>
                        
                        <motion.div 
                          className="flex items-center justify-between"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold">
                                {property.price}
                              </span>
                            </div>
                            <p className="text-xs text-gray-300 mt-0.5">Per Night + Taxes</p>
                          </div>
                          
                          <motion.button 
                            className="bg-white text-blue-600 font-medium px-4 py-2 rounded-lg shadow-md"
                            whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleViewDetails(property)}
                          >
                            View Details
                          </motion.button>
                        </motion.div>
                        
                        {/* Best Rated Badge */}
                        {property.bestRated && (
                          <motion.div 
                            className="absolute top-[-60px] right-0 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <Star className="w-3.5 h-3.5 fill-yellow-400" />
                            <span className="text-xs font-medium">Best Rated</span>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>
        </div>
      )}

      {/* Pagination Dots - Enhanced */}
      <div className="flex justify-center gap-2 mt-6">
        {properties.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="relative h-2 rounded-full transition-all"
            animate={{ 
              width: activeIndex === index ? "1.5rem" : "0.5rem",
              backgroundColor: activeIndex === index ? "#2563eb" : "#d1d5db" 
            }}
            transition={{ duration: 0.3 }}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: activeIndex === index ? "#2563eb" : "#9ca3af"
            }}
          >
            {activeIndex === index && (
              <motion.div 
                className="absolute inset-0 rounded-full bg-blue-400"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.5, 1.8],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default FeaturedDestination

// You can also keep the named export if you want
export const AnimatedCarousel = FeaturedDestination