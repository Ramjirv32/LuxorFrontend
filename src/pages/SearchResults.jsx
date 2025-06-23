"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const defaultImages = [
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


function getRandomImage() {
  return defaultImages[Math.floor(Math.random() * defaultImages.length)]
}

const SearchResults = () => {
  const location = useLocation()

  // Extract search parameters from the URL
  const searchParams = new URLSearchParams(location.search)
  const destination = searchParams.get("location")
  const checkIn = searchParams.get("checkIn")
  const checkOut = searchParams.get("checkOut")
  const adults = searchParams.get("adults")
  const children = searchParams.get("children")

  const [villas, setVillas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVillas = async () => {
      setLoading(true)
      setError(null)
      try {
     
        const villaRes = await fetch(
          `${API_BASE_URL}/api/villas/search?location=${encodeURIComponent(destination || "")}`,
        )
        let villaList = await villaRes.json()

        // Assign a random image from the defaultImages array if images are missing, empty, or contain "empireAnandVillaImages"
        villaList = villaList.map((villa) => {
          let images = []
          if (Array.isArray(villa.images) && villa.images.length > 0) {
            // If the backend image is a placeholder string, use a random image
            if (
              villa.images.length === 1 &&
              (villa.images[0] === "empireAnandVillaImages" || villa.images[0] === "" || villa.images[0] === null)
            ) {
              images = [getRandomImage()]
            } else {
              // Ensure that if an image URL from the backend is invalid or a placeholder, it's replaced
              images = villa.images.map((img) => (img === "empireAnandVillaImages" || !img ? getRandomImage() : img))
            }
          } else {
            images = [getRandomImage()] // If no images array or empty, use a random placeholder
          }
          return { ...villa, images }
        })

        // Fetch all bookings for the selected date range
        let bookedVillaIds = new Set()
        if (checkIn && checkOut) {
          const bookingRes = await fetch(`${API_BASE_URL}/api/bookings/search?checkIn=${checkIn}&checkOut=${checkOut}`)
          const bookings = await bookingRes.json()
          bookedVillaIds = new Set(bookings.map((b) => String(b.villaId)))
        }

        // Mark each villa as available or not
        const results = villaList.map((villa) => ({
          ...villa,
          isBooked: bookedVillaIds.has(String(villa._id)),
        }))

        setVillas(results)
      } catch (err) {
        setError("Failed to fetch villa search results.")
        console.error("Fetch error:", err) // Log the actual error for debugging
      } finally {
        setLoading(false)
      }
    }

    fetchVillas()
  }, [destination, checkIn, checkOut]) // Dependencies for useEffect [^1]

  // Calculate nights of stay
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const startDate = new Date(checkIn)
    const endDate = new Date(checkOut)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime()) // Use getTime() for reliable diff
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
  const nights = calculateNights()

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">
          Villas in {destination || "All Locations"}
          {checkIn && checkOut && (
            <>
              {" "}
              ({checkIn} to {checkOut})
            </>
          )}
        </h2>
        <div className="mb-4 text-gray-600">
          {adults && (
            <span>
              {Number.parseInt(adults) + Number.parseInt(children || "0")} Guest
              {Number.parseInt(adults) + Number.parseInt(children || "0") !== 1 ? "s" : ""},
            </span>
          )}{" "}
          {nights > 0 && (
            <span>
              {nights} Night{nights !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-6 rounded-xl my-8 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Error Loading Villas</h3>
            <p>{error}</p>
          </div>
        ) : villas.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl shadow-sm">
            <h2 className="text-2xl font-playfair font-semibold mb-3">No villas found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any available villas matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {villas.map((villa) => (
              <div key={villa._id} className="bg-white rounded-lg shadow p-6 flex flex-col">
                {/* Using <img> tag with placeholder SVG URLs */}
                <img
                  src={villa.images && villa.images.length > 0 ? villa.images[0] : getRandomImage()}
                  alt={villa.name}
                  className="w-full h-56 object-cover rounded mb-4"
                  style={{ background: "#eee" }}
                />
                <h3 className="text-xl font-semibold mb-2">{villa.name}</h3>
                <div className="text-gray-600 mb-2">{villa.location}</div>
                <div className="mb-2">₹ {villa.price} per night</div>
                <div className="mb-2">
                  {villa.isBooked ? (
                    <span className="text-red-600 font-semibold">Booked for selected dates</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Available</span>
                  )}
                </div>
                <div className="text-gray-500 text-sm">{villa.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults
