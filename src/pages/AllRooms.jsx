"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Heart,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  ArrowLeft,
  Users,
  Bed,
  MapPin,
  Share,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react"
import PhotoGallery from "./PhotoGallery"
import Ac from "../assets/Facilities/AC.png"
import Kitchen from "../assets/Facilities/KITCHEN.png"
import Parking from "../assets/Facilities/PARK.png"
import Pool from "../assets/Facilities/p.png"
import Wifi from "../assets/Facilities/WIFI.png"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { API_BASE_URL } from "../config/api"
import Swal from 'sweetalert2'

// Custom CSS animations
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes searchStretch {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.02);
    }
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .animate-slideInLeft {
    animation: slideInLeft 0.5s ease-out forwards;
  }

  .animate-fadeIn {
    animation: fadeIn 0.4s ease-out forwards;
  }

  .animate-searchStretch {
    animation: searchStretch 0.3s ease-out forwards;
  }

  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #000000;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }

  .slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  .line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  /* Search bar focus effects */
  .search-bar:focus-within {
    transform: scale(1.02);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  /* Custom scrollbar for filter sidebar */
  .filter-sidebar::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  .filter-sidebar::-webkit-scrollbar-track {
    background: transparent;
  }

  .filter-sidebar::-webkit-scrollbar-thumb {
    background: transparent;
  }

  .filter-sidebar::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }

  /* Hide scrollbar for all elements */
  .hide-scrollbar {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
  }
  
  .hide-scrollbar::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

// Date range picker imports
import { DateRange } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

import anandvilla1 from "../assets/empireanandvilla/anandvilla1.jpg"
import anandvilla2 from "../assets/empireanandvilla/anandvilla2.jpg"
import anandvilla3 from "../assets/empireanandvilla/anandvilla3.jpg"
import anandvilla4 from "../assets/empireanandvilla/anandvilla4.jpg"
import anandvilla5 from "../assets/empireanandvilla/anandvilla5.jpg"
import anandvilla6 from "../assets/empireanandvilla/anandvilla6.jpg"
import anandvilla7 from "../assets/empireanandvilla/anandvilla7.jpg"
import anandvilla8 from "../assets/empireanandvilla/anandvilla8.jpg"
import anandvilla9 from "../assets/empireanandvilla/anandvilla9.jpg"
import anandvilla10 from "../assets/empireanandvilla/anandvilla10.jpg"
import anandvilla11 from "../assets/empireanandvilla/anandvilla11.jpg"
import anandvilla12 from "../assets/empireanandvilla/anandvilla12.jpg"
import anandvilla13 from "../assets/empireanandvilla/anandvilla13.jpg"
import anandvilla14 from "../assets/empireanandvilla/anandvilla14.jpg"
import anandvilla15 from "../assets/empireanandvilla/anandvilla15.jpg"
import anandvilla16 from "../assets/empireanandvilla/anandvilla16.jpg"

const imageImports = {
  "anandvilla1.jpg": anandvilla1,
  "anandvilla2.jpg": anandvilla2,
  "anandvilla3.jpg": anandvilla3,
  "anandvilla4.jpg": anandvilla4,
  "anandvilla5.jpg": anandvilla5,
  "anandvilla6.jpg": anandvilla6,
  "anandvilla7.jpg": anandvilla7,
  "anandvilla8.jpg": anandvilla8,
  "anandvilla9.jpg": anandvilla9,
  "anandvilla10.jpg": anandvilla10,
  "anandvilla11.jpg": anandvilla11,
  "anandvilla12.jpg": anandvilla12,
  "anandvilla13.jpg": anandvilla13,
  "anandvilla14.jpg": anandvilla14,
  "anandvilla15.jpg": anandvilla15,
  "anandvilla16.jpg": anandvilla16,
  // Also support .jpeg extension
  "anandvilla1.jpeg": anandvilla1,
  "anandvilla2.jpeg": anandvilla2,
  "anandvilla3.jpeg": anandvilla3,
  "anandvilla4.jpeg": anandvilla4,
  "anandvilla5.jpeg": anandvilla5,
  "anandvilla6.jpeg": anandvilla6,
  "anandvilla7.jpeg": anandvilla7,
  "anandvilla8.jpeg": anandvilla8,
  "anandvilla9.jpeg": anandvilla9,
  "anandvilla10.jpeg": anandvilla10,
  "anandvilla11.jpeg": anandvilla11,
  "anandvilla12.jpeg": anandvilla12,
  "anandvilla13.jpeg": anandvilla13,
  "anandvilla14.jpeg": anandvilla14,
  "anandvilla15.jpeg": anandvilla15,
  "anandvilla16.jpeg": anandvilla16,
}

export const empireAnandVillaImages = [
  anandvilla1,
  anandvilla2,
  anandvilla3,
  anandvilla4,
  anandvilla5,
  anandvilla6,
  anandvilla7,
  anandvilla8,
  anandvilla9,
  anandvilla10,
  anandvilla11,
  anandvilla12,
  anandvilla13,
  anandvilla14,
  anandvilla15,
  anandvilla16,
]

// Utility to shuffle images for each villa
function getRandomImages(imagesArr) {
  const arr = [...imagesArr]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const facilityIconMap = {
  "Private Pool": Pool,
  "Shared Pool": Pool,
  "Free Parking": Parking,
  AC: Ac,
  WiFi: Wifi,
  Kitchen: Kitchen,
  Microwave: Kitchen,
  Barbecue: Kitchen,
  Gym: Kitchen,
  "Pet Friendly": null,
}


// Main Component
const AllRooms = () => {
  const [villas, setVillas] = useState([])
  const [filteredVillas, setFilteredVillas] = useState([])
  const [favorites, setFavorites] = useState(new Set())
  const [sortBy, setSortBy] = useState("Recently Added")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedBedrooms, setSelectedBedrooms] = useState("Any")
  const [selectedBeds, setSelectedBeds] = useState("Any")
  const [selectedAmenities, setSelectedAmenities] = useState([])

  // UI states
  const [showPriceFilter, setShowPriceFilter] = useState(true)
  const [showTypeFilter, setShowTypeFilter] = useState(true)
  const [showRoomsFilter, setShowRoomsFilter] = useState(true)
  const [showAmenitiesFilter, setShowAmenitiesFilter] = useState(true)
  const [cardImageIndexes, setCardImageIndexes] = useState({})
  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/villas/`)
        if (!response.ok) throw new Error("Network response was not ok")
        const data = await response.json()

        // Map backend image references to random permutation of imported images
        const transformedData = data.map((villa, index) => {
          let images = villa.images || []
          if (images.length === 1 && images[0] === "empireAnandVillaImages") {
            images = getRandomImages(empireAnandVillaImages)
          }
          // Generate a unique ID based on villa name and index
          const generatedId = villa._id || `villa-${villa.name.toLowerCase().replace(/\s+/g, '-')}-${index}`
          return {
            id: generatedId,
            _id: villa._id,
            name: villa.name,
            location: villa.location,
            price: villa.price || 0,
            description: villa.description,
            images,
            guests: villa.guests || 0,
            bedrooms: villa.bedrooms || 0,
            bathrooms: villa.bathrooms || 0,
            rating: villa.rating || 4.5,
            amenities: villa.facilities?.map((f) => f.name) || [],
            type: villa.type || "VILLA",
          }
        })

        setVillas(transformedData)
        // Limit to only 6 villas
        setFilteredVillas(transformedData.slice(0, 6))
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchVillas()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [priceRange, selectedTypes, selectedBedrooms, selectedBeds, selectedAmenities, sortBy])

  const applyFilters = () => {
    const filtered = villas.filter((villa) => {
      // Price filter
      if (villa.price < priceRange[0] || villa.price > priceRange[1]) return false

      // Location filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(villa.location)) return false

      // Bedrooms filter
      if (selectedBedrooms !== "Any" && villa.bedrooms !== Number.parseInt(selectedBedrooms)) return false

      // Beds filter
      if (selectedBeds !== "Any" && villa.beds !== Number.parseInt(selectedBeds)) return false

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) => villa.amenities.includes(amenity))
        if (!hasAllAmenities) return false
      }

      return true
    })

    // Apply sorting
    if (sortBy === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "Rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    // Limit to only 6 villas
    const limitedVillas = filtered.slice(0, 6);
    setFilteredVillas(limitedVillas)
  }

  const clearFilters = () => {
    setPriceRange([0, 50000])
    setSelectedTypes([])
    setSelectedBedrooms("Any")
    setSelectedBeds("Any")
    setSelectedAmenities([])
  }

  const toggleFavorite = (villaId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(villaId)) {
      newFavorites.delete(villaId)
    } else {
      newFavorites.add(villaId)
    }
    setFavorites(newFavorites)
  }

  // Function to download all villa images
  const downloadVillaImages = async (villa) => {
    try {
      const images = villa.images || []
      if (images.length === 0) {
        Swal.fire({
          title: 'No Images',
          text: 'This villa has no images to download.',
          icon: 'warning',
          timer: 2000,
          showConfirmButton: false
        })
        return
      }

      // Show loading notification
      Swal.fire({
        title: 'Downloading Images...',
        text: `Preparing to download ${images.length} image(s) for ${villa.name}`,
        icon: 'info',
        timer: 2000,
        showConfirmButton: false
      })

      // Create a ZIP file or download all images in a folder-like structure
      const folderName = villa.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
      
      // Download each image with folder-like naming
      for (let i = 0; i < images.length; i++) {
        const imageUrl = images[i]
        const fileName = `${folderName}_${(i + 1).toString().padStart(2, '0')}.jpg`
        
        try {
          // Fetch the image as blob
          const response = await fetch(imageUrl)
          const blob = await response.blob()
          
          // Create a temporary anchor element to trigger download
          const link = document.createElement('a')
          const url = window.URL.createObjectURL(blob)
          link.href = url
          link.download = fileName
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
          
          // Small delay between downloads to avoid overwhelming the browser
          if (i < images.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 800))
          }
        } catch (error) {
          console.error(`Failed to download image ${i + 1}:`, error)
          // Try alternative download method
          try {
            const link = document.createElement('a')
            link.href = imageUrl
            link.download = fileName
            link.target = '_blank'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          } catch (fallbackError) {
            console.error(`Fallback download also failed for image ${i + 1}:`, fallbackError)
          }
        }
      }

      // Success notification
      setTimeout(() => {
        Swal.fire({
          title: 'Download Complete!',
          text: `Successfully downloaded ${images.length} image(s) for ${villa.name}`,
          icon: 'success',
          timer: 3000,
          showConfirmButton: false
        })
      }, 1500)

    } catch (error) {
      console.error('Error downloading villa images:', error)
      Swal.fire({
        title: 'Download Failed',
        text: 'There was an error downloading the images. Please try again.',
        icon: 'error',
        timer: 3000,
        showConfirmButton: false
      })
    }
  }

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  const handleViewVilla = (villa) => {
    // Navigate to villa detail page using React Router
    navigate(`/villa/${villa.id}`, { state: { villa } })
  }

  // Add a search handler with live search
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    
    if (!searchTerm.trim()) {
      // If empty search, show all villas
      setFilteredVillas(villas);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
 
      const response = await fetch(
        `${API_BASE_URL}/api/villas/search?location=${encodeURIComponent(searchTerm)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        const transformedData = data.map((villa, index) => {
          let images = villa.images || [];
          if (images.length === 1 && images[0] === "empireAnandVillaImages") {
            images = getRandomImages(empireAnandVillaImages);
          }
          const generatedId = villa._id || `villa-${villa.name.toLowerCase().replace(/\s+/g, '-')}-${index}`
          return {
            id: generatedId,
            _id: villa._id,
            name: villa.name,
            location: villa.location,
            price: villa.price || 0,
            description: villa.description,
            images,
            guests: villa.guests || 0,
            bedrooms: villa.bedrooms || 0,
            bathrooms: villa.bathrooms || 0,
            rating: villa.rating || 4.5,
            amenities: villa.facilities?.map((f) => f.name) || [],
            type: villa.type || "VILLA",
          };
        });
        setVillas(transformedData);
        // Limit to only 6 villas
        setFilteredVillas(transformedData.slice(0, 6));
      } else {
        // Fallback to local search if API fails
        performLocalSearch();
      }
    } catch (err) {
      // Fallback to local search on error
      performLocalSearch();
    } finally {
      setLoading(false);
    }
  };

  // Local search function
  const performLocalSearch = () => {
    const searchLower = searchTerm.toLowerCase().trim();
    const filtered = villas.filter((villa) => {
      return (
        villa.name.toLowerCase().includes(searchLower) ||
        villa.location.toLowerCase().includes(searchLower) ||
        villa.description?.toLowerCase().includes(searchLower) ||
        villa.amenities.some(amenity => amenity.toLowerCase().includes(searchLower))
      );
    });
    // Limit to only 6 villas
    setFilteredVillas(filtered.slice(0, 6));
  };

  // Live search effect
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.trim()) {
        performLocalSearch();
      } else {
        applyFilters(); // Apply current filters when search is empty
      }
    }, 300); // 300ms delay for better UX

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, villas]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading villas...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Error loading villas: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Show villa listing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Search Bar Only - Minimal Height */}
      
      {/* Main Content */}
      <div className="pt-32 pb-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filters - Enhanced Sticky */}
          <div className="w-full lg:w-80 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto 
            self-start transition-all duration-300 filter-sidebar hide-scrollbar">
            <div className="rounded-2xl shadow-lg p-6 border border-gray-200/50 
              backdrop-blur-sm hover:shadow-xl transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.95) 100%)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3 group">
                  <div className="p-3 bg-black rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </div>
                  <span className="text-gray-900 font-bold">
                    Filters
                  </span>
                </h2>
                
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black 
                    border border-gray-300 hover:border-black rounded-xl hover:bg-gray-50 
                    transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Clear All
                </button>
              </div>

              {/* Price Filter with Clean Design */}
              <div className="mb-6 group">
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-black 
                  hover:shadow-lg transition-all duration-300">
                  <button
                    onClick={() => setShowPriceFilter(!showPriceFilter)}
                    className="flex items-center justify-between w-full text-left font-semibold text-gray-900"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-black rounded-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <span className="text-lg">Price Per Night</span>
                    </div>
                    <div className={`transform transition-all duration-300 ${
                      showPriceFilter ? 'rotate-180' : ''
                    }`}>
                      <ChevronDown className="h-5 w-5 text-gray-600" />
                    </div>
                  </button>
                  
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    showPriceFilter ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-500">₹</span>
                          <input
                            type="number"
                            placeholder="0"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                            className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg text-sm
                              focus:border-black focus:ring-2 focus:ring-gray-200 transition-all duration-300
                              hover:border-gray-400 bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-500">₹</span>
                          <input
                            type="number"
                            placeholder="50,000"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 50000])}
                            className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg text-sm
                              focus:border-black focus:ring-2 focus:ring-gray-200 transition-all duration-300
                              hover:border-gray-400 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        step="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider 
                          accent-black hover:accent-gray-800 transition-all duration-300"
                        style={{
                          background: `linear-gradient(to right, #000000 0%, #000000 ${(priceRange[1]/50000)*100}%, #e5e7eb ${(priceRange[1]/50000)*100}%, #e5e7eb 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>₹0</span>
                        <span>₹50,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Destination Filter with Clean Design */}
              <div className="mb-6 group">
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-black 
                  hover:shadow-lg transition-all duration-300">
                  <button
                    onClick={() => setShowTypeFilter(!showTypeFilter)}
                    className="flex items-center justify-between w-full text-left font-semibold text-gray-900"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-black rounded-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-lg">Destination</span>
                    </div>
                    <div className={`transform transition-all duration-300 ${
                      showTypeFilter ? 'rotate-180' : ''
                    }`}>
                      <ChevronDown className="h-5 w-5 text-gray-600" />
                    </div>
                  </button>
                  
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    showTypeFilter ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="space-y-3">
                      <label className="flex items-center group cursor-pointer p-3 rounded-lg hover:bg-gray-50 
                        transition-all duration-300 border border-transparent hover:border-gray-200">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes("Pondicherry")}
                          onChange={() => handleTypeChange("Pondicherry")}
                          className="w-5 h-5 rounded border-2 border-gray-300 text-black 
                            focus:ring-gray-500 focus:ring-2 transition-all duration-200"
                        />
                        <div className="ml-3 flex items-center gap-3">
                          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">P</span>
                          </div>
                          <span className="text-sm font-medium group-hover:text-black transition-colors">
                            Pondicherry
                          </span>
                        </div>
                      </label>
                      
                      <label className="flex items-center group cursor-pointer p-3 rounded-lg hover:bg-gray-50 
                        transition-all duration-300 border border-transparent hover:border-gray-200">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes("Chennai")}
                          onChange={() => handleTypeChange("Chennai")}
                          className="w-5 h-5 rounded border-2 border-gray-300 text-black 
                            focus:ring-gray-500 focus:ring-2 transition-all duration-200"
                        />
                        <div className="ml-3 flex items-center gap-3">
                          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">C</span>
                          </div>
                          <span className="text-sm font-medium group-hover:text-black transition-colors">
                            Chennai
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={applyFilters}
                className="w-full bg-black text-white py-4 px-6 rounded-xl font-semibold 
                  hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] 
                  active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Villa Grid with Enhanced Design */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {filteredVillas &&
              filteredVillas.map((villa, idx) => {
                const images = villa.images || [];
                const currentImageIndex = cardImageIndexes[villa.id] || 0;

                const handlePrev = (e) => {
                  e.stopPropagation();
                  setCardImageIndexes((prev) => ({
                    ...prev,
                    [villa.id]: (currentImageIndex - 1 + images.length) % images.length,
                  }));
                };

                const handleNext = (e) => {
                  e.stopPropagation();
                  setCardImageIndexes((prev) => ({
                    ...prev,
                    [villa.id]: (currentImageIndex + 1) % images.length,
                  }));
                };

                // Enhanced staggered animation
                const animationDelay = `${idx * 0.15}s`;

                return (
                  <div
                    key={villa.id || villa._id}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl 
                      transition-all duration-500 cursor-pointer transform hover:-translate-y-2 
                      animate-fadeInUp group border border-gray-100/50 backdrop-blur-sm"
                    style={{ 
                      animationDelay,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(249,250,251,0.9) 100%)'
                    }}
                    onClick={() => handleViewVilla(villa)}
                  >
                    <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                      {images.length > 0 && (
                        <img
                          src={images[currentImageIndex]}
                          alt={`${villa.name} ${currentImageIndex + 1}`}
                          className="object-cover h-full w-full transform group-hover:scale-110 
                            transition-all duration-700 ease-out"
                        />
                      )}
                      
                      {/* Enhanced Navigation Buttons - No dots */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={handlePrev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md 
                              hover:bg-white/30 rounded-full p-3 shadow-lg transition-all duration-300 
                              opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 
                              hover:scale-110 active:scale-95"
                          >
                            <ChevronLeft className="h-5 w-5 text-white" />
                          </button>
                          <button
                            onClick={handleNext}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md 
                              hover:bg-white/30 rounded-full p-3 shadow-lg transition-all duration-300 
                              opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 
                              hover:scale-110 active:scale-95"
                          >
                            <ChevronRight className="h-5 w-5 text-white" />
                          </button>
                          
                          {/* Image counter instead of dots */}
                          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white 
                            px-3 py-1 rounded-full text-xs font-medium">
                            {currentImageIndex + 1} / {images.length}
                          </div>
                        </>
                      )}
                      

                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-xl text-gray-900 mb-2 hover:text-green-700 
                            transition-colors line-clamp-1 group-hover:text-green-600">
                            {villa.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate">{villa.location}</span>
                          </p>
                        </div>
                        
                        {/* Price in info section */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            ₹{villa.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">per night</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 
                          px-3 py-1.5 rounded-full text-xs font-medium text-blue-700 border border-blue-200/50">
                          <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {villa.guests} Guests
                        </span>
                        <span className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 
                          px-3 py-1.5 rounded-full text-xs font-medium text-green-700 border border-green-200/50">
                          <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          {villa.bedrooms} Bedrooms
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-semibold text-gray-700">{villa.rating}</span>
                        </div>
                        <motion.button 
                          className="text-lg font-light tracking-wider px-4 py-2 
                          bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl 
                          hover:from-amber-600 hover:to-yellow-600 transition-colors duration-300 
                          flex items-center group shadow-lg hover:shadow-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Empty state with animation */}
          {filteredVillas && filteredVillas.length === 0 && (
            <div className="text-center py-12 animate-fadeIn">
              <div className="mb-6 text-gray-400">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">No villas found matching your criteria.</p>
              <p className="text-gray-400 mb-6">Try adjusting your filters for better results.</p>
              <button 
                onClick={clearFilters} 
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700
                  transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default AllRooms