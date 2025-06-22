"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"
import PhotoGallery from "./PhotoGallery"
import Ac from "../assets/Facilities/AC.png"
import Kitchen from "../assets/Facilities/KITCHEN.png"
// import Microwave from "../assets/Facilities/MICROWAVE.png"
import Parking from "../assets/Facilities/PARK.png"
import Pool from "../assets/Facilities/p.png"
import Wifi from "../assets/Facilities/WIFI.png"


// Import villa images
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

const villasData = [
  {
    id: 1,
    name: "Villa Kaia",
    location: "Saligao Goa, India",
    guests: 8,
    bedrooms: 4,
    beds: 4,
    price: 15300,
    type: "VILLA",
    amenities: ["Private Pool", "Pet Friendly"],
    rating: 4.8,
    image: anandvilla1,
    description:
      "Located in the peaceful village of Saligao, Villa Kaia an elegant 4-bedroom retreat offers a perfect Goan escape with comfort and style.",
    fullDescription:
      "Located in the peaceful village of Saligao, Villa Kaia an elegant 4-bedroom retreat offers a perfect Goan escape with comfort and style. This stunning property features modern amenities, spacious rooms, and beautiful outdoor spaces perfect for relaxation and entertainment.",
    facilities: [
      { name: "Private Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
      { name: "Kitchen", image: Kitchen },
      { name: "Microwave", image: Kitchen }, // Use Kitchen or correct import if available
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 2,
    name: "Villa Scapes",
    location: "Siolim Goa, India",
    guests: 7,
    bedrooms: 3,
    beds: 3,
    price: 9900,
    type: "VILLA",
    amenities: ["Private Pool"],
    rating: 4.6,
    image: anandvilla2,
    description: "A beautiful villa in Siolim offering stunning views and modern amenities for a perfect getaway.",
    fullDescription:
      "A beautiful villa in Siolim offering stunning views and modern amenities for a perfect getaway. This property combines traditional Goan architecture with contemporary comfort.",
    facilities: [
      { name: "Private Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
      { name: "Kitchen", image: Kitchen },
      { name: "Microwave", image: Kitchen },
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 3,
    name: "Villa Dahlia",
    location: "Arpora Goa, India",
    guests: 10,
    bedrooms: 4,
    beds: 5,
    price: 24999,
    type: "VILLA",
    amenities: ["Private Pool", "Shared Pool"],
    rating: 4.9,
    image: anandvilla3,
    description: "Luxurious villa in Arpora with premium amenities and spacious accommodation for large groups.",
    fullDescription:
      "Luxurious villa in Arpora with premium amenities and spacious accommodation for large groups. Features include multiple pools, elegant interiors, and beautiful outdoor spaces.",
    facilities: [
      { name: "Private Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
      { name: "Kitchen", image: Kitchen },
      { name: "Microwave", image: Kitchen },
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 4,
    name: "Villa Serenity",
    location: "Candolim Goa, India",
    guests: 6,
    bedrooms: 3,
    beds: 3,
    price: 12500,
    type: "VILLA",
    amenities: ["Private Pool", "Pet Friendly"],
    rating: 4.7,
    image: anandvilla4,
    description: "Peaceful retreat in Candolim offering tranquility and modern comfort.",
    fullDescription:
      "Peaceful retreat in Candolim offering tranquility and modern comfort. Perfect for families and groups seeking a serene vacation experience.",
    facilities: [
      { name: "Private Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
      { name: "Kitchen", image: Kitchen },
      { name: "Microwave", image: Kitchen },
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 5,
    name: "Ocean View Apartment",
    location: "Baga Goa, India",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    price: 8500,
    type: "APARTMENT",
    amenities: ["Shared Pool"],
    rating: 4.4,
    image: anandvilla5,
    description: "Modern apartment with ocean views in the heart of Baga.",
    fullDescription:
      "Modern apartment with ocean views in the heart of Baga. Close to beaches, restaurants, and nightlife.",
    facilities: [
      { name: "Shared Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
      { name: "Kitchen", image: Kitchen },
      { name: "Microwave", image: Kitchen },
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 6,
    name: "Villa Paradise",
    location: "Anjuna Goa, India",
    guests: 12,
    bedrooms: 5,
    beds: 6,
    price: 32000,
    type: "VILLA",
    amenities: ["Private Pool", "Pet Friendly"],
    rating: 4.8,
    image: anandvilla6,
    description: "Expansive villa in Anjuna perfect for large groups and celebrations.",
    fullDescription:
      "Expansive villa in Anjuna perfect for large groups and celebrations. Features multiple bedrooms, entertainment areas, and beautiful gardens.",
    facilities: [
      { name: "Private Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
      { name: "Kitchen", image: Kitchen },
      { name: "Microwave", image: Kitchen },
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 7,
    name: "Coastal Retreat",
    location: "Morjim Goa, India",
    guests: 8,
    bedrooms: 4,
    beds: 4,
    price: 18500,
    type: "VILLA",
    amenities: ["Private Pool"],
    rating: 4.6,
    image: anandvilla7,
    description: "Beachfront villa in Morjim with stunning coastal views.",
    fullDescription: "Beachfront villa in Morjim with stunning coastal views and direct beach access.",
    facilities: [
      { name: "Private Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
      { name: "Kitchen", image: Kitchen },
      { name: "Microwave", image: Kitchen },
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 8,
    name: "Sunset Apartment",
    location: "Calangute Goa, India",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    price: 7200,
    type: "APARTMENT",
    amenities: ["Shared Pool", "Pet Friendly"],
    rating: 4.3,
    image: anandvilla8,
    description: "Cozy apartment with sunset views in Calangute.",
    fullDescription: "Cozy apartment with sunset views in Calangute, perfect for couples and small families.",
    facilities: [
      { name: "Shared Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
      { name: "Kitchen", image: Kitchen },
      { name: "Microwave", image: Kitchen },
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 9,
    name: "Casa Sol",
    location: "Assagao Goa, India",
    guests: 9,
    bedrooms: 4,
    beds: 5,
    price: 17800,
    type: "VILLA",
    amenities: ["Private Pool", "Pet Friendly"],
    rating: 4.7,
    image: anandvilla9,
    description: "Traditional Goan villa with lush gardens and a private pool.",
    fullDescription:
      "Traditional Goan villa in Assagao with lush gardens, private pool, and classic interiors. Ideal for families.",
    facilities: [
      { name: "Private Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
      { name: "Kitchen", image: Kitchen },
      { name: "Microwave", image: Kitchen },
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 10,
    name: "Lagoon Residence",
    location: "Nerul Goa, India",
    guests: 6,
    bedrooms: 3,
    beds: 3,
    price: 14250,
    type: "VILLA",
    amenities: ["Private Pool", "Shared Pool"],
    rating: 4.5,
    image: anandvilla10,
    description: "Modern villa on the lagoon with tranquil poolside views.",
    fullDescription: "Modern villa on the Nerul lagoon with tranquil poolside views, a blend of luxury and nature.",
    facilities: [
      { name: "Private Pool", image: Pool },
      { name: "Shared Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 11,
    name: "Palm Grove Apartment",
    location: "Vagator Goa, India",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    price: 8700,
    type: "APARTMENT",
    amenities: ["Shared Pool"],
    rating: 4.2,
    image: anandvilla11,
    description: "Apartment surrounded by palm trees, close to Vagator beach.",
    fullDescription:
      "Apartment surrounded by palm trees, close to Vagator beach, with a shared pool and modern facilities.",
    facilities: [
      { name: "Shared Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
      { name: "Kitchen", image: Kitchen },
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 12,
    name: "Blue Haven Villa",
    location: "Mapusa Goa, India",
    guests: 14,
    bedrooms: 6,
    beds: 8,
    price: 35500,
    type: "VILLA",
    amenities: ["Private Pool", "Pet Friendly"],
    rating: 4.9,
    image: anandvilla12,
    description: "Large villa with private pool and garden, ideal for big groups.",
    fullDescription:
      "Large villa with private pool and a spacious garden in Mapusa, ideal for family gatherings and celebrations.",
    facilities: [
      { name: "Private Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
      { name: "Kitchen", image: Kitchen },
      { name: "Microwave", image: Kitchen },
      { name: "Barbecue", image: "/microwave.png" },
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 13,
    name: "Hilltop Mansion",
    location: "Porvorim Goa, India",
    guests: 15,
    bedrooms: 7,
    beds: 9,
    price: 42000,
    type: "VILLA",
    amenities: ["Private Pool", "Pet Friendly"],
    rating: 4.8,
    image: anandvilla13,
    description: "Luxury mansion on a hilltop with panoramic views and infinity pool.",
    fullDescription:
      "Luxury mansion on a hilltop with panoramic views, infinity pool, and premium amenities for a lavish stay.",
    facilities: [
      { name: "Private Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
      { name: "Kitchen", image: Kitchen },
      { name: "Microwave", image: Kitchen },
      { name: "Gym", image: "/microwave.png" },
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 14,
    name: "Sunshine Studio",
    location: "Colva Goa, India",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    price: 5400,
    type: "STUDIO",
    amenities: ["Shared Pool"],
    rating: 4.0,
    image: anandvilla14,
    description: "Bright and airy studio apartment near Colva beach.",
    fullDescription: "Bright and airy studio apartment near Colva beach, perfect for couples or solo travelers.",
    facilities: [
      { name: "Shared Pool", image: Pool },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
      { name: "Kitchen", image: Kitchen },
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 15,
    name: "Gardenia Villa",
    location: "Panjim Goa, India",
    guests: 8,
    bedrooms: 4,
    beds: 4,
    price: 16200,
    type: "VILLA",
    amenities: ["Private Pool", "Pet Friendly"],
    rating: 4.5,
    image: anandvilla15,
    description: "Elegant villa in Panjim with lush garden and private pool.",
    fullDescription:
      "Elegant villa in Panjim with lush garden, private pool, and all modern comforts for a relaxing holiday.",
    facilities: [
      { name: "Private Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
      { name: "Kitchen", image: Kitchen },
      { name: "Barbecue", image: "/microwave.png" },
    ],
    images: empireAnandVillaImages,
  },
  {
    id: 16,
    name: "Coral Bay Apartment",
    location: "Morjim Goa, India",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    price: 6900,
    type: "APARTMENT",
    amenities: ["Shared Pool"],
    rating: 4.1,
    image: anandvilla16,
    description: "Cozy apartment with pool access close to Morjim beach.",
    fullDescription: "Cozy apartment with pool access and walking distance to Morjim beach, ideal for small families.",
    facilities: [
      { name: "Shared Pool", image: Pool },
      { name: "Free Parking", image: Parking },
      { name: "AC", image: Ac },
      { name: "WiFi", image: Wifi },
    ],
    images: empireAnandVillaImages,
  },
]

// Villa Detail Component
const VillaDetail = ({ villa, onBack }) => {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false)
  const [showThingsToKnow, setShowThingsToKnow] = useState(false)
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  // Replace guests state with detailed guest counts
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [showGuestDropdown, setShowGuestDropdown] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSaved, setIsSaved] = useState(false)
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)

  const locationParts = villa.location.split(" ")
  const city = locationParts[0]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % villa.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + villa.images.length) % villa.images.length)
  }

  const handleMorePhotosClick = () => {
    setShowPhotoGallery(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <button onClick={onBack} className="flex items-center gap-2 hover:text-gray-800 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              <span className="text-gray-400">|</span>
              <button className="hover:text-gray-800 transition-colors">Home</button>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <button className="hover:text-gray-800 transition-colors">{city}</button>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{villa.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                <span>Save</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-2 h-96 rounded-lg overflow-hidden">
          {/* Main Image */}
          <div className="col-span-2 relative">
            <img
              src={villa.images[currentImageIndex] || villa.image}
              alt={villa.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Thumbnail Grid */}
          <div className="col-span-2 grid grid-cols-2 gap-2">
            {villa.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${villa.name} ${index + 2}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setCurrentImageIndex(index + 1)}
                />
                {index === 3 && villa.images.length > 5 && (
                  <div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white cursor-pointer hover:bg-black/60 transition-colors"
                    onClick={handleMorePhotosClick}
                  >
                    <div className="text-center">
               

                      <PhotoGallery
        images={villa.images}
        villaName={villa.name}
        isOpen={showPhotoGallery}
        onClose={() => setShowPhotoGallery(false)}
      />
                     
      
                      
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Villa Title and Info */}
        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{villa.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-gray-600">{villa.location}</span>
              <button className="text-green-600 hover:text-green-700 font-medium underline">View on Map</button>
            </div>

            {/* Villa Info Header */}
            <div className="flex items-center gap-6 text-gray-600 text-sm mb-8">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-600" />
                <span>{villa.guests} Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 text-green-600">🏠</div>
                <span>{villa.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-green-600" />
                <span>{villa.beds} Beds</span>
              </div>
            </div>

            {/* Overview Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">{showFullDescription ? villa.fullDescription : villa.description}</p>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-green-600 hover:text-green-700 font-medium underline"
                >
                  {showFullDescription ? "Read less" : "Read more"}
                </button>
              </div>
            </div>

            {/* Enhanced Facilities Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {villa.facilities.map((facility, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200">
                        <img
                          src={facility.image || "/placeholder.svg"}
                          alt={facility.name}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">{facility.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">Available</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 text-green-600 hover:text-green-700 font-medium underline">
                View all amenities
              </button>
            </div>

            {/* Location Section with Chennai Map */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Location</h2>
              <div className="rounded-lg overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.2313083493!2d79.92235835!3d13.048160899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Chennai Location Map"
                ></iframe>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                {villa.location} - Interactive map showing Chennai area
              </p>
            </div>

            {/* Cancellation Policy Section */}
            <div className="border-t pt-8 mb-8">
              <button
                onClick={() => setShowCancellationPolicy(!showCancellationPolicy)}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="text-2xl font-semibold text-gray-900">Cancellation Policy</h2>
                {showCancellationPolicy ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {showCancellationPolicy && (
                <div className="mt-6">
                  <p className="text-gray-700 mb-6">
                    In case of cancellation made during the below mentioned period before the check in by the Guests,
                    the following amount shall be deducted from the total Booking Amount:
                  </p>

                  <div className="overflow-hidden rounded-lg border">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-green-100">
                          <th className="px-4 py-3 text-left font-medium text-gray-900">Criteria</th>
                          <th className="px-4 py-3 text-left font-medium text-gray-900">Cancellation Policy</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 text-gray-700">If Travel is Within 15 Days</td>
                          <td className="px-4 py-3 text-gray-700">
                            Booking Is Non-Refundable and No Refund Will be applicable
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-gray-700">If Travel is Within 15-30 Days</td>
                          <td className="px-4 py-3 text-gray-700">
                            50% of the Total Booking amount will be charged as a Cancellation penalty and the rest be
                            refunded back
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 text-gray-700">If Travel is after 30 Days</td>
                          <td className="px-4 py-3 text-gray-700">
                            25% of the Total Booking amount will be charged as a Cancellation penalty and the rest be
                            refunded back
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Things To Know Section */}
            <div className="border-t pt-8">
              <button
                onClick={() => setShowThingsToKnow(!showThingsToKnow)}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="text-2xl font-semibold text-gray-900">Things To Know</h2>
                {showThingsToKnow ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {showThingsToKnow && (
                <div className="mt-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Security deposit of INR 20,000/- will be collected at the time of booking and refunded within 72
                        hours of checkout. Any damages or unpaid dues will be deducted from this deposit.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Check-in time is 2:00 PM and check-out time is 11:00 AM.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Smoking is not allowed inside the property.</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="mb-6">
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Starts from</div>
                    <div className="text-2xl font-bold text-gray-900">
                      ₹ {villa.price.toLocaleString()}
                      <span className="text-sm font-normal text-gray-600 ml-1">per Night</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Enjoy our property with a minimum stay of 1 Days.</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">CHECK IN</label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Select Date"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">CHECK OUT</label>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Select Date"
                      />
                    </div>
                  </div>

                  {/* Guests Dropdown */}
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Guests</label>
                    <button
                      type="button"
                      onClick={() => setShowGuestDropdown((v) => !v)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-left focus:outline-none focus:ring-2 focus:ring-green-500 flex justify-between items-center"
                    >
                      {adults + children > 0
                        ? `${adults + children} Guest${adults + children > 1 ? "s" : ""}${infants > 0 ? `, ${infants} Infant${infants > 1 ? "s" : ""}` : ""}`
                        : "Select Guests"}
                      <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
                    </button>
                    {showGuestDropdown && (
                      <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                        {/* Adults */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="font-medium text-gray-900">Adults</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                              onClick={() => setAdults(Math.max(1, adults - 1))}
                              disabled={adults <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-6 text-center">{adults}</span>
                            <button
                              type="button"
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                              onClick={() => setAdults(adults + 1)}
                              disabled={adults + children >= villa.guests}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        {/* Children */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="font-medium text-gray-900">Children</div>
                            <div className="text-xs text-gray-500">Age 3–12 years</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                              onClick={() => setChildren(Math.max(0, children - 1))}
                              disabled={children <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-6 text-center">{children}</span>
                            <button
                              type="button"
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                              onClick={() => setChildren(adults + children < villa.guests ? children + 1 : children)}
                              disabled={adults + children >= villa.guests}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        {/* Infants */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="font-medium text-gray-900">Infants</div>
                            <div className="text-xs text-gray-500">Age Under 2</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                              onClick={() => setInfants(Math.max(0, infants - 1))}
                              disabled={infants <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-6 text-center">{infants}</span>
                            <button
                              type="button"
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                              onClick={() => setInfants(infants + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                          onClick={() => setShowGuestDropdown(false)}
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors mb-4">
                  Book Now
                </button>

                <p className="text-center text-sm text-gray-600">Don't worry, you won't be charged yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {/* Photo Gallery Modal */}
      <PhotoGallery
        images={villa.images}
        villaName={villa.name}
        isOpen={showPhotoGallery}
        onClose={() => setShowPhotoGallery(false)}
      />
    </div>
  )
}

// Main Component
const AllRooms = () => {
  const [villas, setVillas] = useState(villasData)
  const [filteredVillas, setFilteredVillas] = useState(villasData)
  const [favorites, setFavorites] = useState(new Set())
  const [sortBy, setSortBy] = useState("Recently Added")
  const [selectedVilla, setSelectedVilla] = useState(null)
  const [currentView, setCurrentView] = useState("list") // 'list' or 'detail'

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedTypes, setSelectedTypes] = useState(["VILLA"])
  const [selectedBedrooms, setSelectedBedrooms] = useState("Any")
  const [selectedBeds, setSelectedBeds] = useState("Any")
  const [selectedAmenities, setSelectedAmenities] = useState([])

  // UI states
  const [showPriceFilter, setShowPriceFilter] = useState(true)
  const [showTypeFilter, setShowTypeFilter] = useState(true)
  const [showRoomsFilter, setShowRoomsFilter] = useState(true)
  const [showAmenitiesFilter, setShowAmenitiesFilter] = useState(true)

  useEffect(() => {
    if (currentView === "list") {
      applyFilters()
    }
  }, [priceRange, selectedTypes, selectedBedrooms, selectedBeds, selectedAmenities, sortBy, currentView])

  const applyFilters = () => {
    const filtered = villasData.filter((villa) => {
      // Price filter
      if (villa.price < priceRange[0] || villa.price > priceRange[1]) return false

      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(villa.type)) return false

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

    setFilteredVillas(filtered)
  }

  const clearFilters = () => {
    setPriceRange([0, 50000])
    setSelectedTypes(["VILLA"])
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
    setSelectedVilla(villa)
    setCurrentView("detail")
  }

  const handleBackToList = () => {
    setSelectedVilla(null)
    setCurrentView("list")
  }

  // Show villa detail page
  if (currentView === "detail" && selectedVilla) {
    return <VillaDetail villa={selectedVilla} onBack={handleBackToList} />
  }

  // Show villa listing page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Luxury Villas by Hireavilla</h1>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Recently Added</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
            <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-8 mt-[100px]">
        {/* Sidebar Filters */}
        <div className="w-80 bg-white rounded-lg shadow-sm p-6 h-fit">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter
            </h2>
            <button
              onClick={clearFilters}
              className="text-green-600 hover:text-green-700 text-sm font-medium underline"
            >
              Clear Selection
            </button>
          </div>

          {/* Price Filter */}
          <div className="mb-6">
            <button
              onClick={() => setShowPriceFilter(!showPriceFilter)}
              className="flex items-center justify-between w-full py-2 text-left font-medium"
            >
              Price Per Night
              {showPriceFilter ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {showPriceFilter && (
              <div className="mt-4">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="₹ 0"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="₹ 50,000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 50000])}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            )}
          </div>

          {/* Type Filter */}
          <div className="mb-6">
            <button
              onClick={() => setShowTypeFilter(!showTypeFilter)}
              className="flex items-center justify-between w-full py-2 text-left font-medium"
            >
              Type
              {showTypeFilter ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {showTypeFilter && (
              <div className="mt-4 space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes("VILLA")}
                    onChange={() => handleTypeChange("VILLA")}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm">VILLA</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes("APARTMENT")}
                    onChange={() => handleTypeChange("APARTMENT")}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm">APARTMENT</span>
                </label>
              </div>
            )}
          </div>

          {/* Rooms & Beds Filter */}
          <div className="mb-6">
            <button
              onClick={() => setShowRoomsFilter(!showRoomsFilter)}
              className="flex items-center justify-between w-full py-2 text-left font-medium"
            >
              Rooms & Beds
              {showRoomsFilter ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {showRoomsFilter && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSelectedBedrooms(
                          selectedBedrooms === "Any" ? "1" : (Number.parseInt(selectedBedrooms) - 1).toString(),
                        )
                      }
                      className="p-1 border border-gray-300 rounded-full hover:bg-gray-50"
                      disabled={selectedBedrooms === "Any" || selectedBedrooms === "1"}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-4 py-1 border border-gray-300 rounded-md min-w-[60px] text-center text-sm">
                      {selectedBedrooms}
                    </span>
                    <button
                      onClick={() =>
                        setSelectedBedrooms(
                          selectedBedrooms === "Any" ? "1" : (Number.parseInt(selectedBedrooms) + 1).toString(),
                        )
                      }
                      className="p-1 border border-gray-300 rounded-full hover:bg-gray-50"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beds</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSelectedBeds(selectedBeds === "Any" ? "1" : (Number.parseInt(selectedBeds) - 1).toString())
                      }
                      className="p-1 border border-gray-300 rounded-full hover:bg-gray-50"
                      disabled={selectedBeds === "Any" || selectedBeds === "1"}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-4 py-1 border border-gray-300 rounded-md min-w-[60px] text-center text-sm">
                      {selectedBeds}
                    </span>
                    <button
                      onClick={() =>
                        setSelectedBeds(selectedBeds === "Any" ? "1" : (Number.parseInt(selectedBeds) + 1).toString())
                      }
                      className="p-1 border border-gray-300 rounded-full hover:bg-gray-50"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Amenities Filter */}
          <div className="mb-6">
            <button
              onClick={() => setShowAmenitiesFilter(!showAmenitiesFilter)}
              className="flex items-center justify-between w-full py-2 text-left font-medium"
            >
              Amenities & Features
              {showAmenitiesFilter ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {showAmenitiesFilter && (
              <div className="mt-4 space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes("Private Pool")}
                    onChange={() => handleAmenityChange("Private Pool")}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm">Private Pool</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes("Shared Pool")}
                    onChange={() => handleAmenityChange("Shared Pool")}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm">Shared Pool</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes("Pet Friendly")}
                    onChange={() => handleAmenityChange("Pet Friendly")}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm">Pet Friendly</span>
                </label>
              </div>
            )}
          </div>

          <button
            onClick={applyFilters}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Show Results
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVillas.map((villa) => (
              <div
                key={villa.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleViewVilla(villa)}
              >
                <div className="relative">
                  <img src={villa.image || "/placeholder.svg"} alt={villa.name} className="w-full h-64 object-cover" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(villa.id)
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${favorites.has(villa.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{villa.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{villa.location}</p>
                  <p className="text-gray-600 text-sm mb-3">
                    {villa.guests} Guests | {villa.bedrooms} Bedrooms
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-900">₹ {villa.price.toLocaleString()}</span>
                      <span className="text-gray-600 text-sm ml-1">Per Night</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">{villa.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVillas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No villas found matching your criteria.</p>
              <button onClick={clearFilters} className="mt-4 text-green-600 hover:text-green-700 font-medium underline">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllRooms
