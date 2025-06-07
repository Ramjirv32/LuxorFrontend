"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaUtensils, FaWifi, FaSwimmingPool, FaStar } from "react-icons/fa"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom"
import backgroundVideo from "../assets/About/v.mp4"

// Helper for navbar height detection
const useNavbarHeight = () => {
  const [navbarHeight, setNavbarHeight] = useState(0)
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar =
        document.querySelector("header nav") || document.querySelector("header") || document.querySelector("nav")

      if (navbar) {
        setNavbarHeight(navbar.offsetHeight)
      } else {
        setNavbarHeight(80) // Default height if navbar not found
      }
    }

    setTimeout(updateNavbarHeight, 100)
    window.addEventListener("resize", updateNavbarHeight)
    return () => window.removeEventListener("resize", updateNavbarHeight)
  }, [])
  return navbarHeight
}

const Hero = () => {
  const navbarHeight = useNavbarHeight()
  const navigate = useNavigate()
  const videoRef = useRef(null)

  // Booking form state
  const [searchParams, setSearchParams] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showTableReservation, setShowTableReservation] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // DatePicker z-index management
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setSearchParams((prev) => ({
      ...prev,
      [id]: id === "guests" ? Number.parseInt(value, 10) : value,
    }))
  }

  const handleDateChange = (date, field) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: date ? date.toISOString().split("T")[0] : "",
    }))
  }

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!searchParams.destination || !searchParams.checkIn || !searchParams.checkOut || !searchParams.guests) {
      setError("Please fill in all search fields")
      return
    }
    // Validate dates: checkOut must be after checkIn
    if (new Date(searchParams.checkIn) >= new Date(searchParams.checkOut)) {
      setError("Check-out date must be after check-in date.")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const formattedDestination =
        searchParams.destination.charAt(0).toUpperCase() + searchParams.destination.slice(1).toLowerCase()

      navigate(
        `/search-results?location=${formattedDestination}&checkIn=${searchParams.checkIn}&checkOut=${searchParams.checkOut}&guests=${searchParams.guests}`,
      )
    } catch (err) {
      console.error("Search error:", err)
      setError(err.message || "Error searching for properties")
    } finally {
      setLoading(false)
    }
  }

  // Handle video loaded event
  const handleVideoLoaded = () => {
    setVideoLoaded(true)
  }

  // Handle mobile devices better
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (videoRef.current) {
      if (isMobile) {
        // Mobile optimizations
        videoRef.current.setAttribute('playsinline', '')
        videoRef.current.setAttribute('muted', '')
        videoRef.current.setAttribute('loop', '')
        videoRef.current.play().catch(err => console.log('Auto-play prevented:', err))
        setVideoLoaded(true)
      }
    }
  }, [])

  // Amenities for the left side
  const amenities = [
    { icon: <FaWifi className="w-5 h-5" />, name: "Free WiFi" },
    { icon: <FaSwimmingPool className="w-5 h-5" />, name: "Swimming Pool" },
    { icon: <FaStar className="w-5 h-5" />, name: "5-Star Service" },
  ]

  // Destination options for the dropdown
  const locations = ["Chennai", "Pondicherry", "Goa", "Kerala"]

  // Custom date picker styles to fix z-index issues
  const datePickerWrapperStyles = {
    position: "relative",
    zIndex: datePickerOpen ? 1000 : 1,
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        minHeight: `calc(100vh - ${navbarHeight}px)`,
        marginTop: `${navbarHeight}px`,
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      {/* Video Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: videoLoaded ? 1 : 0 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40 z-10" />
        <motion.div
          className="w-full h-full"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onLoadedData={handleVideoLoaded}
            poster="/placeholder-luxury-villa.jpg"
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </motion.div>

      {/* Loading overlay that fades out when video is ready */}
      {!videoLoaded && (
        <motion.div
          className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: videoLoaded ? 0 : 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="text-[#49B9FF] text-xl mb-6 font-light tracking-wider"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [0.98, 1, 0.98]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading Luxury Experience...
          </motion.div>
          
          <motion.div
            className="w-24 h-1 bg-[#49B9FF]/30 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#49B9FF] to-[#2276E3]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex items-center h-full w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left side - Text Content */}
            <motion.div
              className="lg:w-1/2 text-white w-full max-w-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.p
                className="text-lg font-light mb-2 text-[#49B9FF] tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Welcome to Luxor Villa
              </motion.p>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Your Kingdom of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0E6CA] to-white">Comfort</span>
              </motion.h1>
              <motion.p
                className="text-lg mb-8 text-gray-200 max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Experience unparalleled luxury in our exclusive villas, where every detail is crafted for your ultimate
                relaxation and pleasure.
              </motion.p>
              {/* Feature highlights */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {amenities.map((amenity, i) => (
                  <motion.div
                    key={i}
                    className="p-3 rounded-lg bg-black/30 backdrop-blur-sm flex flex-col items-center text-center transition-all"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(73, 185, 255, 0.15)",
                    }}
                  >
                    <div className="text-[#49B9FF] text-2xl mb-2">{amenity.icon}</div>
                    <div className="text-white text-sm font-medium">{amenity.name}</div>
                  </motion.div>
                ))}
              </motion.div>
              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-[#49B9FF] to-[#2276E3] text-white rounded-full font-semibold text-lg tracking-wide"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(73, 185, 255, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    <span>Discover More</span>
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.button>

                <motion.button
                  className="px-8 py-3 border-2 border-white/40 bg-black/20 text-white rounded-full font-semibold text-lg backdrop-blur-sm"
                  whileHover={{
                    scale: 1.03,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(73, 185, 255, 0.7)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    <span>Take a Tour</span>
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right side - Booking Form */}
            <motion.div
              className="lg:w-1/2 mt-8 lg:mt-0 w-full max-w-md mx-auto lg:max-w-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="backdrop-blur-lg bg-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">Book Your Stay</h3>
                  <button
                    className="text-[#49B9FF] hover:text-white text-sm flex items-center gap-1 transition-colors"
                  >
                    View Amenities
                    <span>→</span>
                  </button>
                </div>

                <form onSubmit={handleSearch} className="space-y-6">
                  {/* Check-in and Check-out */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div style={datePickerWrapperStyles}>
                      <label htmlFor="checkIn" className="block text-white text-sm font-medium mb-1">
                        <FaCalendarAlt className="inline mr-2" /> Check-in
                      </label>
                      <DatePicker
                        id="checkIn"
                        selected={searchParams.checkIn ? new Date(searchParams.checkIn) : null}
                        onChange={(date) => handleDateChange(date, "checkIn")}
                        onCalendarOpen={() => setDatePickerOpen(true)}
                        onCalendarClose={() => setDatePickerOpen(false)}
                        className="w-full p-3 bg-white/10 text-white backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-[#49B9FF] focus:border-transparent placeholder-gray-400"
                        placeholderText="Select date"
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        popperClassName="z-[1000]"
                        popperPlacement="bottom-start"
                        required
                      />
                    </div>

                    <div style={datePickerWrapperStyles}>
                      <label htmlFor="checkOut" className="block text-white text-sm font-medium mb-1">
                        <FaCalendarAlt className="inline mr-2" /> Check-out
                      </label>
                      <DatePicker
                        id="checkOut"
                        selected={searchParams.checkOut ? new Date(searchParams.checkOut) : null}
                        onChange={(date) => handleDateChange(date, "checkOut")}
                        onCalendarOpen={() => setDatePickerOpen(true)}
                        onCalendarClose={() => setDatePickerOpen(false)}
                        className="w-full p-3 bg-white/10 text-white backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-[#49B9FF] focus:border-transparent placeholder-gray-400"
                        placeholderText="Select date"
                        dateFormat="yyyy-MM-dd"
                        minDate={
                          searchParams.checkIn
                            ? new Date(new Date(searchParams.checkIn).getTime() + 86400000)
                            : new Date(new Date().getTime() + 86400000)
                        }
                        popperClassName="z-[1000]"
                        popperPlacement="bottom-start"
                        required
                      />
                    </div>
                  </div>

                  {/* Guests and Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="guests" className="block text-white text-sm font-medium mb-1">
                        <FaUsers className="inline mr-2" /> Guests
                      </label>
                      <select
                        id="guests"
                        value={searchParams.guests}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-white/10 text-white backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-[#49B9FF] focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num} className="bg-gray-800 text-white">
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="destination" className="block text-white text-sm font-medium mb-1">
                        <FaMapMarkerAlt className="inline mr-2" /> Location
                      </label>
                      <select
                        id="destination"
                        value={searchParams.destination}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-white/10 text-white backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-[#49B9FF] focus:border-transparent"
                        required
                      >
                        <option value="" disabled className="bg-gray-800 text-gray-400">
                          Select location
                        </option>
                        {locations.map((loc) => (
                          <option key={loc} value={loc} className="bg-gray-800 text-white">
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Table Reservation Toggle */}
                  <div className="flex items-center p-3 rounded-lg">
                    <input
                      type="checkbox"
                      id="tableReservation"
                      checked={showTableReservation}
                      onChange={() => setShowTableReservation(!showTableReservation)}
                      className="w-5 h-5 text-[#49B9FF] bg-white/10 border-white/30 rounded focus:ring-[#49B9FF] focus:ring-offset-0 focus:ring-offset-black/20"
                    />
                    <label htmlFor="tableReservation" className="ml-2 text-white flex items-center cursor-pointer">
                      <FaUtensils className="mr-2" />
                      <span>Add Table Reservation</span>
                    </label>
                  </div>

                  {/* Error message */}
                  {error && (
                    <motion.div
                      className="bg-red-500/80 text-white px-4 py-2 rounded-md text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Book Now Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#49B9FF] to-[#2276E3] text-white font-bold rounded-lg relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:from-[#2276E3] hover:to-[#49B9FF]"
                    disabled={loading}
                    style={{ letterSpacing: "0.05em" }}
                  >
                    <span className="relative z-10">
                      {loading ? (
                        <span className="flex items-center justify-center">
                          Searching...
                          <svg
                            className="animate-spin ml-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                      ) : (
                        "Search"
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Video control overlay */}
      <motion.div 
        className="absolute bottom-5 right-5 z-30 opacity-0 hover:opacity-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button 
          className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-full border border-white/20"
          whileHover={{ 
            scale: 1.1, 
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
            }
          }}
        >
          {videoRef.current?.paused ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default Hero
