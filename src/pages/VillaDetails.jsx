"use client"

import { useState, useEffect, useRef } from "react"
import {
  Heart,
  ChevronDown,
  Plus,
  Minus,
  ArrowLeft,
  Users,
  Bed,
  MapPin,
  Share,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Star,
  Wifi,
  Car,
  Coffee,
  Waves,
  Shield,
  Check,
  Snowflake,
  Utensils,
  Dumbbell,
  PawPrint,
  Flame,
  Zap,
  Home,
} from "lucide-react"
import PhotoGallery from "./PhotoGallery"
// import Kitchen from "../assets/Facilities/KITCHEN.png"
// import Parking from "../assets/Facilities/PARK.png"
// import Pool from "../assets/Facilities/p.png"
// import Wifi from "../assets/Facilities/WIFI.png"
// Remove Clerk import
import { useAuth } from "../context/AuthContext"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { API_BASE_URL } from "../config/api"
import Swal from "sweetalert2"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

// Amrith Palace Images
import AP1 from "/AmrithPalace/AP1.jpg"
import AP2 from "/AmrithPalace/AP2.jpg"
import AP3 from "/AmrithPalace/AP3.jpg"
import AP4 from "/AmrithPalace/AP4.jpg"
import AP5 from "/AmrithPalace/AP5.jpg"
import AP6 from "/AmrithPalace/AP6.jpg"
import AP7 from "/AmrithPalace/AP7.jpg"
import AP8 from "/AmrithPalace/AP8.jpg"
import AP9 from "/AmrithPalace/AP9.jpg"
import AP10 from "/AmrithPalace/AP10.jpg"
import AP11 from "/AmrithPalace/AP11.jpg"
import AP12 from "/AmrithPalace/AP12.jpg"
import AP13 from "/AmrithPalace/AP13.jpg"
import AP14 from "/AmrithPalace/AP14.jpg"
import AP15 from "/AmrithPalace/AP15.jpg"
import AP16 from "/AmrithPalace/AP16.jpg"
import AP17 from "/AmrithPalace/AP17.jpg"
import AP18 from "/AmrithPalace/AP18.jpg"
import AP19 from "/AmrithPalace/AP19.jpg"
import AP20 from "/AmrithPalace/AP20.jpg"
import AP21 from "/AmrithPalace/AP21.jpg"
import AP22 from "/AmrithPalace/AP22.jpg"
import AP23 from "/AmrithPalace/AP23.jpg"
import AP24 from "/AmrithPalace/AP24.jpg"
import AP25 from "/AmrithPalace/AP25.jpg"
import AP26 from "/AmrithPalace/AP26.jpg"
import AP27 from "/AmrithPalace/AP27.jpg"
import AP28 from "/AmrithPalace/AP28.jpg"
import AP29 from "/AmrithPalace/AP29.jpg"
import AP30 from "/AmrithPalace/AP30.jpg"

// East Coast Villa Images
import EC1 from "/eastcoastvilla/EC1.jpg"
import EC2 from "/eastcoastvilla/EC2.jpg"
import EC3 from "/eastcoastvilla/EC3.jpg"
import EC4 from "/eastcoastvilla/EC4.jpg"
import EC5 from "/eastcoastvilla/EC5.jpg"
import EC6 from "/eastcoastvilla/EC6.jpg"
import EC7 from "/eastcoastvilla/EC7.jpg"
import EC8 from "/eastcoastvilla/EC8.jpg"
import EC9 from "/eastcoastvilla/EC9.jpg"
import EC10 from "/eastcoastvilla/EC10.jpg"
import EC11 from "/eastcoastvilla/EC11.jpg"
import EC12 from "/eastcoastvilla/EC12.jpg"
import EC13 from "/eastcoastvilla/EC13.jpg"
import EC14 from "/eastcoastvilla/EC14.jpg"
import EC15 from "/eastcoastvilla/EC15.jpg"

// Empire Anand Villa Samudra Images
import anandvilla1 from "/empireanandvillasamudra/anandvilla1.jpg"
import anandvilla2 from "/empireanandvillasamudra/anandvilla2.jpg"
import anandvilla3 from "/empireanandvillasamudra/anandvilla3.jpg"
import anandvilla4 from "/empireanandvillasamudra/anandvilla4.jpg"
import anandvilla5 from "/empireanandvillasamudra/anandvilla5.jpg"
import anandvilla6 from "/empireanandvillasamudra/anandvilla6.jpg"
import anandvilla7 from "/empireanandvillasamudra/anandvilla7.jpg"
import anandvilla8 from "/empireanandvillasamudra/anandvilla8.jpg"
import anandvilla9 from "/empireanandvillasamudra/anandvilla9.jpg"
import anandvilla10 from "/empireanandvillasamudra/anandvilla10.jpg"
import anandvilla11 from "/empireanandvillasamudra/anandvilla11.jpg"
import anandvilla12 from "/empireanandvillasamudra/anandvilla12.jpg"
import anandvilla13 from "/empireanandvillasamudra/anandvilla13.jpg"
import anandvilla14 from "/empireanandvillasamudra/anandvilla14.jpg"
import anandvilla15 from "/empireanandvillasamudra/anandvilla15.jpg"
import anandvilla16 from "/empireanandvillasamudra/anandvilla16.jpg"

// Ram Water Villa Images
import RW1 from "/ramwatervilla/RW1.jpg"
import RW2 from "/ramwatervilla/RW2.jpg"
import RW3 from "/ramwatervilla/RW3.jpg"
import RW4 from "/ramwatervilla/RW4.jpg"
import RW5 from "/ramwatervilla/RW5.jpg"
import RW6 from "/ramwatervilla/RW6.jpg"
import RW7 from "/ramwatervilla/RW7.jpg"
import RW8 from "/ramwatervilla/RW8.jpg"
import RW9 from "/ramwatervilla/RW9.jpg"
import RW10 from "/ramwatervilla/RW10.jpg"
import RW11 from "/ramwatervilla/RW11.jpg"
// import RW12 from "/ramwatervilla/RW12.jpg"
import RW13 from "/ramwatervilla/RW13.jpg"
import RW14 from "/ramwatervilla/RW14.jpg"
import RW15 from "/ramwatervilla/RW15.jpg"
import RW16 from "/ramwatervilla/RW16.jpg"
import RW17 from "/ramwatervilla/RW17.jpg"
import RW18 from "/ramwatervilla/RW18.jpg"
import RW19 from "/ramwatervilla/RW19.jpg"

// Villa image collections
const villaImageCollections = {
  "Amrith Palace": [
    AP1,
    AP2,
    AP3,
    AP4,
    AP5,
    AP6,
    AP7,
    AP8,
    AP9,
    AP10,
    AP11,
    AP12,
    AP13,
    AP14,
    AP15,
    AP16,
    AP17,
    AP18,
    AP19,
    AP20,
    AP21,
    AP22,
    AP23,
    AP24,
    AP25,
    AP26,
    AP27,
    AP28,
    AP29,
    AP30,
  ],
  "East Coast Villa": [EC1, EC2, EC3, EC4, EC5, EC6, EC7, EC8, EC9, EC10, EC11, EC12, EC13, EC14, EC15],
  "Ram Water Villa": [
    RW1,
    RW2,
    RW3,
    RW4,
    RW5,
    RW6,
    RW7,
    RW8,
    RW9,
    RW10,
    RW11,
    RW13,
    RW14,
    RW15,
    RW16,
    RW17,
    RW18,
    RW19,
  ],
  "Empire Anand Villa Samudra": [
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
  ],
}

// Create array for Empire Anand Villa Samudra images
export const empireAnandVillaSamudraImages = [
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

// Enhanced facility icon mapping with lucide-react icons
const facilityIconMap = {
  "Private Pool": Waves,
  "Shared Pool": Waves,
  Pool: Waves,
  "Free Parking": Car,
  Parking: Car,
  AC: Snowflake,
  "Air Conditioning": Snowflake,
  WiFi: Wifi,
  "Free WiFi": Wifi,
  Kitchen: Utensils,
  Kitchenette: Utensils,
  Microwave: Zap,
  Barbecue: Flame,
  BBQ: Flame,
  Gym: Dumbbell,
  "Fitness Center": Dumbbell,
  "Pet Friendly": PawPrint,
  "Pets Allowed": PawPrint,
  "Coffee Maker": Coffee,
  "Free Breakfast": Coffee,
  Security: Shield,
  "24/7 Security": Shield,
  General: Home,
}

const VillaDetail = () => {
  const { id } = useParams() // Get villa ID from URL
  const location = useLocation() // Get villa data from React Router state
  const [villa, setVilla] = useState(location.state?.villa || null)
  const [loading, setLoading] = useState(!location.state?.villa)
  const [error, setError] = useState(null)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false)
  const [showThingsToKnow, setShowThingsToKnow] = useState(false)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [showGuestDropdown, setShowGuestDropdown] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSaved, setIsSaved] = useState(false)
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date())
  const [bookingStep, setBookingStep] = useState(1) // 1: Dates, 2: Guests, 3: Contact, 4: Payment, 5: Success
  const [guestDetails, setGuestDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  // Remove isSignedIn and user from Clerk
  const { userData, authToken } = useAuth()
  const isSignedIn = !!authToken && !!userData // Update isSignedIn check based on authToken
  const navigate = useNavigate()
  const [bookingLoading, setBookingLoading] = useState(false)
  const isBookingInProgress = useRef(false)

  // Date range picker state
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ])
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [totalDays, setTotalDays] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    if (dateRange[0].startDate && dateRange[0].endDate) {
      const startDate = dateRange[0].startDate
      const endDate = dateRange[0].endDate
      const timeDiff = endDate.getTime() - startDate.getTime()
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

      setCheckInDate(startDate.toISOString().split("T")[0])
      setCheckOutDate(endDate.toISOString().split("T")[0])
      setTotalDays(daysDiff)
      // Removed automatic amount calculation - user can see amount only at booking time
    } else {
      setTotalDays(0)
      setTotalAmount(0)
    }
  }, [dateRange, villa?.price])

  // Navigation functions
  const nextImage = () => {
    if (!villa || !villa.images || villa.images.length === 0) return
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % villa.images.length)
  }

  const prevImage = () => {
    if (!villa || !villa.images || villa.images.length === 0) return
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + villa.images.length) % villa.images.length)
  }

  // Handle more photos click
  const handleMorePhotosClick = () => {
    setShowPhotoGallery(true)
  }

  // Handle close photo gallery
  const handleClosePhotoGallery = () => {
    setShowPhotoGallery(false)
  }

  // Fetch villa data function (extracted for reusability)
  const fetchVillaDetails = async () => {
    try {
      setLoading(true)
      console.log("Fetching villa with ID:", id) // Debug log
      const response = await fetch(`${API_BASE_URL}/api/villas/${id}`)
      console.log("API Response status:", response.status) // Debug log
      if (!response.ok) {
        const errorText = await response.text()
        console.log("API Error response:", errorText)
        throw new Error(`Villa not found (${response.status}): ${errorText}`)
      }
      const data = await response.json()
      // Transform the data like in AllRooms
      let images = data.images || []
      if (images.length === 1 && images[0] === "empireAnandVillaImages") {
        images = getRandomImages(empireAnandVillaSamudraImages)
      }
      const transformedVilla = {
        id: data._id,
        name: data.name,
        location: data.location,
        price: data.price || 0,
        description: data.description,
        images,
        guests: data.guests || 0,
        bedrooms: data.bedrooms || 0,
        bathrooms: data.bathrooms || 0,
        rating: data.rating || 4.5,
        amenities: data.facilities?.map((f) => f.name) || [],
        type: data.type || "VILLA",
      }
      console.log("Fetched villa data:", transformedVilla) // Debug log
      setVilla(transformedVilla)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  // Fetch villa data based on ID from URL only if not provided via state
  useEffect(() => {
    // If we already have villa data from navigation state, no need to fetch
    if (location.state?.villa) {
      setVilla(location.state.villa)
      setLoading(false)
      return
    }
    if (id) {
      fetchVillaDetails()
    }
  }, [id, location.state])

  // Cleanup effect to prevent memory leaks and reset state
  useEffect(() => {
    return () => {
      // Reset booking state when component unmounts
      isBookingInProgress.current = false
      setBookingLoading(false)
    }
  }, [])

  // Test API connection (for debugging)
  const testAPIConnection = async () => {
    try {
      console.log("Testing API connection to:", API_BASE_URL)
      const response = await fetch(`${API_BASE_URL}/api/test`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      console.log("API Test Response:", {
        ok: response.ok,
        status: response.status,
        url: response.url,
      })
    } catch (error) {
      console.error("API Test Error:", error)
    }
  }

  // Test API on component mount (for debugging)
  useEffect(() => {
    testAPIConnection()
  }, [])

  // Function to completely reset booking form
  const resetBookingForm = () => {
    console.log("Resetting booking form...") // Debug log
    setBookingStep(1)
    setCheckInDate("")
    setCheckOutDate("")
    setAdults(1)
    setChildren(0)
    setInfants(0)
    setDateRange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ])
    setTotalDays(0)
    setTotalAmount(0)
    setGuestDetails({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    })
    setBookingLoading(false)
    isBookingInProgress.current = false
  }

  const handleBookNow = async () => {
    // Debug: Log authentication state
    console.log("Authentication State:", {
      isSignedIn,
      userData,
      hasAuthToken: !!authToken,
    })

    // Prevent duplicate bookings
    if (bookingLoading || isBookingInProgress.current) {
      return
    }

    if (!isSignedIn) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please log in to book this villa.",
        confirmButtonColor: "#16a34a",
      }).then(() => {
        navigate("/sign-in")
      })
      return
    }

    if (!checkInDate || !checkOutDate) {
      Swal.fire({
        icon: "warning",
        title: "Missing Dates",
        text: "Please select check-in and check-out dates.",
        confirmButtonColor: "#16a34a",
      })
      return
    }

    const villaId = villa._id || villa.id
    if (!villaId || villaId.length < 12) {
      Swal.fire({
        icon: "error",
        title: "Invalid Villa",
        text: "Invalid villa. Please try again from the main villa list.",
        confirmButtonColor: "#16a34a",
      })
      return
    }

    setBookingLoading(true)
    isBookingInProgress.current = true

    try {
      const bookingData = {
        villaId,
        villaName: villa.name,
        email: userData?.email,
        guestName: userData?.name || userData?.firstName || "Guest",
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: adults + children,
        infants: infants,
        totalAmount: Math.round(
          totalDays * villa.price +
            totalDays * villa.price * 0.05 +
            (totalDays * villa.price + totalDays * villa.price * 0.05) * 0.18,
        ),
        totalDays: totalDays,
      }

      console.log("Booking Data being sent:", bookingData) // Debug log
      console.log("API URL:", `${API_BASE_URL}/api/bookings/create`) // Debug log

      // Check authentication
      if (!userData || !authToken) {
        console.log("No authentication data available") // Debug log

        Swal.fire({
          icon: "warning",
          title: "Authentication Required",
          text: "Please log in to complete your booking.",
          confirmButtonColor: "#16a34a",
        }).then(() => {
          navigate("/sign-in")
        })
        setBookingLoading(false)
        isBookingInProgress.current = false
        return
      }

      // Prepare headers with auth token
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      }

      console.log("Using auth token for booking request") // Debug log

      const response = await fetch(`${API_BASE_URL}/api/bookings/create`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(bookingData),
      })

      console.log("Raw Response:", response) // Debug log
      console.log("Response status:", response.status) // Debug log
      console.log("Response headers:", Object.fromEntries(response.headers.entries())) // Debug log

      const data = await response.json()
      console.log("Booking API Response:", {
        ok: response.ok,
        status: response.status,
        data: data,
      }) // Enhanced debug log

      if (response.ok && data.success) {
        console.log("Booking successful, starting redirect process...") // Debug log

        // Reset all booking form data immediately
        resetBookingForm()

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Booking Confirmed! 🎉",
          text: "Your booking has been successfully confirmed!",
          confirmButtonColor: "#16a34a",
          confirmButtonText: "Go to Homepage",
        }).then(() => {
          console.log("User clicked OK, redirecting...") // Debug log

          // Simple redirect - just navigate to homepage
          navigate("/", { replace: true })
        })
      } else {
        console.error("Booking failed:", {
          status: response.status,
          statusText: response.statusText,
          data: data,
        }) // Enhanced error log

        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          html: `
            <div>
              <p>${data.error || data.message || "Booking failed. Please try again."}</p>
              <br>
              <small style="color: #666;">
                Error Code: ${response.status}<br>
                ${data.details ? `Details: ${data.details}` : ""}
              </small>
            </div>
          `,
          confirmButtonColor: "#16a34a",
        })
        setBookingLoading(false)
        isBookingInProgress.current = false
      }
    } catch (err) {
      console.error("Booking error caught:", err) // Enhanced error log

      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        html: `
          <div>
            <p>Network error or server is unavailable.</p>
            <br>
            <small style="color: #666;">
              Error: ${err.message}<br>
              Please check your internet connection and try again.
            </small>
          </div>
        `,
        confirmButtonColor: "#16a34a",
      })
      setBookingLoading(false)
      isBookingInProgress.current = false
    }
  }

  const facilities =
    villa?.amenities?.map((amenity) => ({
      name: amenity,
      icon: facilityIconMap[amenity] || facilityIconMap["General"] || Home,
    })) || []

  // Define city variable for breadcrumb
  const city = villa?.location || "Destinations"

  // Animation styles for enhanced UI
  const animationStyles = `
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
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }
    
    .animate-fadeInUp {
      animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .animate-slideInRight {
      animation: slideInRight 0.6s ease-out forwards;
    }
    
    .animate-pulse {
      animation: pulse 2s infinite;
    }
    
    .booking-button {
      transition: all 0.3s ease;
    }
    
    .booking-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
  `

  // Inject animation styles
  useEffect(() => {
    const styleSheet = document.createElement("style")
    styleSheet.textContent = animationStyles
    document.head.appendChild(styleSheet)

    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet)
      }
    }
  }, [])

  // Keyboard event listener for ESC key to close photo gallery
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showPhotoGallery) {
        handleClosePhotoGallery()
      }
    }
    if (showPhotoGallery) {
      document.addEventListener("keydown", handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"
      document.body.classList.add("modal-open")
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = "unset"
      document.body.classList.remove("modal-open")
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      // Cleanup: always re-enable body scroll
      document.body.style.overflow = "unset"
      document.body.classList.remove("modal-open")
    }
  }, [showPhotoGallery])

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 rounded-xl bg-white shadow-xl">
          <div className="relative mx-auto mb-8 w-24 h-24">
            <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-green-600 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-r-4 border-l-4 border-gray-200 animate-ping opacity-60"></div>
          </div>
          <p className="text-xl text-gray-700 mb-2 font-semibold">Loading Villa</p>
          <p className="text-gray-500">Fetching details for your dream stay...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 rounded-xl bg-white shadow-xl max-w-md">
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-xl text-gray-700 mb-2 font-semibold">Unable to Load Villa Details</p>
          <p className="text-gray-500 mb-6">We encountered a problem while fetching villa data.</p>
          <div className="bg-gray-50 p-4 rounded-lg text-left mb-6 overflow-auto max-h-32">
            <p className="text-sm text-red-600 font-mono">{error}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/rooms")}
              className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Back to Villas
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-200 text-gray-800 px-5 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Return the component JSX (main content)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 pt-16 sm:pt-20 md:pt-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Enhanced Responsive Header */}
      <div className="glass-effect border-b border-gray-200/50 sticky top-0 sm:top-16 z-40 transition-all duration-500 shadow-lg animate-slideInDown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600 order-2 sm:order-1 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => navigate("/rooms")}
                className="flex items-center gap-2 hover:text-gray-800 transition-all duration-300 hover:transform hover:scale-105 group px-2 py-1 rounded-lg hover:bg-gray-100 whitespace-nowrap"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <span className="text-gray-400 hidden sm:inline">|</span>
              <button
                onClick={() => navigate("/")}
                className="hover:text-gray-800 transition-colors duration-300 px-2 py-1 rounded-lg hover:bg-gray-100 hidden sm:inline whitespace-nowrap"
              >
                Home
              </button>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 hidden sm:block" />
              <button
                onClick={() => navigate("/rooms")}
                className="hover:text-gray-800 transition-colors duration-300 px-2 py-1 rounded-lg hover:bg-gray-100 hidden md:inline whitespace-nowrap"
              >
                {city}
              </button>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 hidden md:block" />
              <span className="text-gray-900 font-medium truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">
                {villa.name}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 sm:gap-4 order-1 sm:order-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:transform hover:scale-110 group px-3 py-2 rounded-xl hover:bg-gray-100"
              >
                <Heart
                  className={`h-4 w-4 transition-all duration-300 ${isSaved ? "fill-red-500 text-red-500 scale-110" : "group-hover:scale-110"}`}
                />
                <span className="text-sm sm:text-base">Save</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:transform hover:scale-110 group px-3 py-2 rounded-xl hover:bg-gray-100">
                <Share className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm sm:text-base">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Responsive Photo Gallery - Improved Layout */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-fadeInUp transition-all duration-700 scroll-animate"
        id="photo-gallery-section"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 h-auto lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-[1.01]">
          {/* Main Image - Larger and more prominent */}
          <div className="col-span-1 lg:col-span-2 relative group h-80 lg:h-full">
            <img
              src={villa.images[currentImageIndex] || villa.images[0]}
              alt={villa.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Navigation Arrows - Enhanced for better visibility */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm z-10 border border-gray-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm z-10 border border-gray-200"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>

            {/* Image Counter - Better styling */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm font-medium">
              {currentImageIndex + 1} / {villa.images.length}
            </div>
          </div>

          {/* Secondary Images Grid - Better organization */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-3 h-80 lg:h-full">
            {villa.images.slice(1, 5).map((image, index) => (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                  index === 2 || index === 3 ? "h-full" : "h-full"
                }`}
                onClick={() => setCurrentImageIndex(index + 1)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${villa.name} - Image ${index + 2}`}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Overlay for last image if more photos available */}
                {index === 3 && villa.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300 group-hover:bg-black/40">
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold mb-1">+{villa.images.length - 5}</div>
                      <div className="text-sm opacity-90">More Photos</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* View All Photos Button - Enhanced */}
        <button
          onClick={handleMorePhotosClick}
          className="mt-6 flex items-center gap-3 px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105 mx-auto text-gray-700 hover:text-gray-900 font-medium"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          View All {villa.images.length} Photos
        </button>

        {/* Simple Photo Gallery Overlay - Clean Design */}
        {showPhotoGallery && (
          <div className="fixed inset-0 z-50">
            <PhotoGallery
              images={villa.images}
              villaName={villa.name}
              isOpen={showPhotoGallery}
              onClose={handleClosePhotoGallery}
            />
          </div>
        )}
      </div>

      {/* Enhanced Main Content Section - Increased booking form width */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 animate-stagger">
        <div className="lg:col-span-2 space-y-6 sm:space-y-8 order-2 lg:order-1 lg:pr-6 xl:pr-8">
          {/* Villa Title and Location */}
          <div className="scroll-animate">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 leading-tight gradient-text">
              {villa.name}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-600 text-base sm:text-lg font-medium">{villa.location}</span>
              </div>
              <button className="text-emerald-600 hover:text-emerald-700 font-semibold underline transition-all duration-300 hover:scale-105 transform text-sm sm:text-base w-fit bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full">
                📍 View on Map
              </button>
            </div>

            {/* Rating Section */}
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${i < Math.floor(villa.rating || 4.5) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-gray-700 font-semibold ml-2">{villa.rating || 4.5}</span>
                <span className="text-gray-500 text-sm">({Math.floor(Math.random() * 50) + 20} reviews)</span>
              </div>
            </div>
          </div>

          {/* Enhanced Villa Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 scroll-animate">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 sm:p-6 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-200 rounded-full">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-700" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-700">{villa.guests}</div>
                  <div className="text-sm sm:text-base text-emerald-600 font-medium">Guests</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-200 rounded-full">
                  <div className="text-xl sm:text-2xl">🏠</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-blue-700">{villa.bedrooms}</div>
                  <div className="text-sm sm:text-base text-blue-600 font-medium">Bedrooms</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-200 rounded-full">
                  <Bed className="h-5 w-5 sm:h-6 sm:w-6 text-purple-700" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-purple-700">
                    {villa.bathrooms || villa.bedrooms}
                  </div>
                  <div className="text-sm sm:text-base text-purple-600 font-medium">Bathrooms</div>
                </div>
              </div>
            </div>
          </div>

          {/* Villa Info Header - Responsive */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 lg:gap-8 text-gray-600 text-xs sm:text-sm mb-8 sm:mb-10 animate-slideInLeft">
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 px-3 sm:px-4 py-2 rounded-xl">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="font-medium">{villa.guests} Guests</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 px-3 sm:px-4 py-2 rounded-xl">
              <div className="h-4 w-4 sm:h-5 sm:w-5 text-green-600">🏠</div>
              <span className="font-medium">{villa.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 px-3 sm:px-4 py-2 rounded-xl">
              <Bed className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="font-medium">{villa.bathrooms || villa.bedrooms} Bathrooms</span>
            </div>
          </div>

          {/* Overview Section */}
          <div className="mb-10 animate-fadeInUp">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Overview</h2>
            <div className="text-gray-700 leading-relaxed text-lg">
              <p className="mb-6">
                {showFullDescription ? villa.description : villa.description?.substring(0, 200) + "..."}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-green-600 hover:text-green-700 font-semibold underline transition-all duration-300 hover:scale-105 transform"
              >
                {showFullDescription ? "Read less" : "Read more"}
              </button>
            </div>
          </div>

          {/* Enhanced Facilities Section with Icons */}
          <div className="mb-10 animate-fadeInUp">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">What this place offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility, index) => {
                const IconComponent = facility.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 hover:bg-gray-50 transition-all duration-300 border-2 border-gray-100 hover:border-green-200 hover:shadow-lg transform hover:scale-105 group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center shadow-sm border border-green-100 group-hover:bg-green-100 transition-colors duration-300">
                        <IconComponent className="w-7 h-7 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base">{facility.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Available</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <button className="mt-8 text-green-600 hover:text-green-700 font-semibold underline transition-all duration-300 hover:scale-105 transform">
              Show all {facilities.length} amenities
            </button>
          </div>

          <div className="mb-10 animate-fadeInUp">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">Where you'll be</h2>
            <div className="rounded-2xl overflow-hidden h-80 shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.2313083493!2d79.92235835!3d13.048160899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
            <div className="flex items-center gap-3 mt-4 text-gray-600">
              <MapPin className="h-5 w-5 text-green-600" />
              <span className="font-medium">{villa.location}</span>
              <span className="text-sm">• Exact location provided after booking</span>
            </div>
          </div>

          {/* Cancellation Policy Section */}
          <div className="border-t-2 border-gray-100 pt-10 mb-10 animate-fadeInUp">
            <button
              onClick={() => setShowCancellationPolicy(!showCancellationPolicy)}
              className="flex items-center justify-between w-full text-left group hover:bg-gray-50 p-4 rounded-xl transition-all duration-300"
            >
              <h2 className="text-3xl font-semibold text-gray-900">Cancellation Policy</h2>
              <div
                className={`transform transition-transform duration-300 ${showCancellationPolicy ? "rotate-180" : ""}`}
              >
                <ChevronDown className="h-6 w-6 text-gray-500 group-hover:text-gray-700" />
              </div>
            </button>
            {showCancellationPolicy && (
              <div className="mt-8 animate-slideInDown">
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  In case of cancellation made during the below mentioned period before the check in by the Guests, the
                  following amount shall be deducted from the total Booking Amount:
                </p>
                <div className="overflow-hidden rounded-2xl border-2 border-gray-200 shadow-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-green-100 to-green-50">
                        <th className="px-6 py-4 text-left font-semibold text-gray-900 text-lg">Criteria</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-900 text-lg">Cancellation Policy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <td className="px-6 py-4 text-gray-700 font-medium">If Travel is Within 15 Days</td>
                        <td className="px-6 py-4 text-gray-700">
                          Booking Is Non-Refundable and No Refund Will be applicable
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 text-gray-700 font-medium">If Travel is Within 15-30 Days</td>
                        <td className="px-6 py-4 text-gray-700">
                          50% of the Total Booking amount will be charged as a Cancellation penalty and the rest be
                          refunded back
                        </td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <td className="px-6 py-4 text-gray-700 font-medium">If Travel is after 30 Days</td>
                        <td className="px-6 py-4 text-gray-700">
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
          <div className="border-t-2 border-gray-100 pt-10 animate-fadeInUp">
            <button
              onClick={() => setShowThingsToKnow(!showThingsToKnow)}
              className="flex items-center justify-between w-full text-left group hover:bg-gray-50 p-4 rounded-xl transition-all duration-300"
            >
              <h2 className="text-3xl font-semibold text-gray-900">Things To Know</h2>
              <div className={`transform transition-transform duration-300 ${showThingsToKnow ? "rotate-180" : ""}`}>
                <ChevronDown className="h-6 w-6 text-gray-500 group-hover:text-gray-700" />
              </div>
            </button>
            {showThingsToKnow && (
              <div className="mt-8 animate-slideInDown">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-lg leading-relaxed">
                      Security deposit of INR 20,000/- will be collected at the time of booking and refunded within 72
                      hours of checkout. Any damages or unpaid dues will be deducted from this deposit.
                    </span>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-lg leading-relaxed">
                      Check-in time is 2:00 PM and check-out time is 11:00 AM.
                    </span>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-lg leading-relaxed">Smoking is not allowed inside the property.</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Timeline Booking Sidebar - Increased Width */}
        <div className="lg:col-span-1 order-1 lg:order-2 flex justify-center">
          <div className="lg:sticky lg:top-24 lg:max-h-[85vh] transition-all duration-700 ease-out animate-slideInRight w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
            <div className="bg-white/98 border-2 border-gray-200/50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-5 xl:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm mb-6 lg:mb-0 sticky-booking-box lg:max-h-[80vh] lg:overflow-y-auto">
              {/* Timeline Progress Indicator - Made Sticky */}
              <div className="sticky-stepper">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center timeline-step">
                      <div
                        className={`
                        w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold transition-all duration-500 step-transition
                        ${
                          bookingStep > step
                            ? "step-completed"
                            : bookingStep === step
                              ? "step-active"
                              : "bg-gray-200 text-gray-400"
                        }
                      `}
                      >
                        {bookingStep > step ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          step
                        )}
                      </div>
                      {step < 3 && (
                        <div
                          className={`
                          w-6 sm:w-8 lg:w-6 xl:w-8 h-1 transition-all duration-500 timeline-connector
                          ${bookingStep > step ? "bg-green-600" : "bg-gray-200"}
                        `}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {bookingStep === 1 && "📅 Select Your Dates"}
                    {bookingStep === 2 && "👥 Choose Guests"}
                    {bookingStep === 3 && "✅ Confirm Booking"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Step {bookingStep} of 3 -{" "}
                    {bookingStep === 1
                      ? "When would you like to stay?"
                      : bookingStep === 2
                        ? "How many guests will be joining?"
                        : bookingStep === 3
                          ? "Review and complete your booking"
                          : "Thank you for choosing us!"}
                  </p>

                  {/* User Authentication Status */}
                  {isSignedIn && userData && (
                    <div className="mt-2 flex items-center justify-center text-xs text-green-600 bg-green-50 rounded-full px-3 py-1">
                      <Check className="h-3 w-3 mr-1" />
                      Logged in as {userData.name || userData.email || "Authenticated User"}
                    </div>
                  )}
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="booking-form-content">
                {/* Price Header - Always Visible */}
                <div className="mb-6 text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-100">
                  <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Starting from</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    ₹ {villa.price.toLocaleString()}
                    <span className="text-xs sm:text-sm font-normal text-gray-600 ml-1">/ night</span>
                  </div>
                  <div className="text-xs text-gray-500">Min. stay: 1 night</div>
                </div>

                {/* Step 1: Date Selection */}
                {bookingStep === 1 && (
                  <div className="animate-fadeInUp space-y-4">
                    {/* Date Input Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-white border-2 border-gray-200 rounded-xl p-3 sm:p-4 hover:border-green-300 transition-all duration-300 min-h-[4rem] touch-manipulation">
                        <div className="text-xs text-gray-500 mb-1 font-medium">Check-in</div>
                        <div className="font-semibold text-gray-800 flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                          {checkInDate ? (
                            <div className="flex flex-col">
                              <span className="text-green-700 text-sm">
                                {new Date(checkInDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(checkInDate).toLocaleDateString("en-IN", { weekday: "short" })}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">Select date</span>
                          )}
                        </div>
                      </div>

                      <div className="bg-white border-2 border-gray-200 rounded-xl p-3 sm:p-4 hover:border-green-300 transition-all duration-300 min-h-[4rem] touch-manipulation">
                        <div className="text-xs text-gray-500 mb-1 font-medium">Check-out</div>
                        <div className="font-semibold text-gray-800 flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-green-600" />
                          {checkOutDate ? (
                            <div className="flex flex-col">
                              <span className="text-green-700 text-sm">
                                {new Date(checkOutDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(checkOutDate).toLocaleDateString("en-IN", { weekday: "short" })}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">Select date</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Calendar with Larger Date Boxes */}
                    <div className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-green-300 transition-all duration-300 shadow-inner bg-white">
                      <div className="custom-calendar p-4">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                          <button
                            className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-all duration-200 hover:scale-110"
                            onClick={() => {
                              const newDate = new Date(currentCalendarMonth)
                              newDate.setMonth(newDate.getMonth() - 1)
                              setCurrentCalendarMonth(newDate)
                            }}
                          >
                            <ChevronLeft className="h-5 w-5 text-green-600" />
                          </button>
                          <h3 className="text-lg font-bold text-gray-900">
                            {currentCalendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                          </h3>
                          <button
                            className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-all duration-200 hover:scale-110"
                            onClick={() => {
                              const newDate = new Date(currentCalendarMonth)
                              newDate.setMonth(newDate.getMonth() + 1)
                              setCurrentCalendarMonth(newDate)
                            }}
                          >
                            <ChevronRight className="h-5 w-5 text-green-600" />
                          </button>
                        </div>

                        {/* Week Days Header */}
                        <div className="grid grid-cols-7 gap-3 mb-3">
                          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Calendar Grid with Cleaner Date Boxes */}
                        <div className="grid grid-cols-7 gap-2">
                          {(() => {
                            const year = currentCalendarMonth.getFullYear()
                            const month = currentCalendarMonth.getMonth()
                            const firstDayOfMonth = new Date(year, month, 1)
                            const startDate = new Date(firstDayOfMonth)
                            startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay())

                            const days = []
                            for (let i = 0; i < 42; i++) {
                              const currentDate = new Date(startDate)
                              currentDate.setDate(startDate.getDate() + i)
                              days.push(currentDate)
                            }

                            return days.map((currentDate, index) => {
                              const today = new Date()
                              const isCurrentMonth = currentDate.getMonth() === month
                              const isToday = currentDate.toDateString() === today.toDateString()
                              const isPast = currentDate < today && !isToday
                              const isSelected =
                                checkInDate &&
                                checkOutDate &&
                                currentDate >= new Date(checkInDate) &&
                                currentDate <= new Date(checkOutDate)
                              const isCheckIn =
                                checkInDate && currentDate.toDateString() === new Date(checkInDate).toDateString()
                              const isCheckOut =
                                checkOutDate && currentDate.toDateString() === new Date(checkOutDate).toDateString()

                              return (
                                <div
                                  key={`${currentDate.getTime()}-${index}`}
                                  className={`
                                    ${isCurrentMonth ? "" : "opacity-40"}
                                    ${isPast ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
                                    ${isSelected ? "bg-green-200 text-green-900" : ""}
                                    ${isCheckIn ? "bg-green-600 text-white font-bold border-2 border-green-700" : ""}
                                    ${isCheckOut ? "bg-blue-600 text-white font-bold border-2 border-blue-700" : ""}
                                    flex flex-col items-center justify-center rounded-lg cursor-pointer min-h-[40px] sm:min-h-[48px] transition-all duration-200 select-none
                                  `}
                                  onClick={() => {
                                    if (isPast) return
                                    const dateStr = currentDate.toISOString().split("T")[0]
                                    if (!checkInDate || (checkInDate && checkOutDate)) {
                                      setCheckInDate(dateStr)
                                      setCheckOutDate("")
                                      setDateRange([
                                        {
                                          startDate: currentDate,
                                          endDate: null,
                                          key: "selection",
                                        },
                                      ])
                                    } else if (checkInDate && !checkOutDate) {
                                      if (currentDate > new Date(checkInDate)) {
                                        setCheckOutDate(dateStr)
                                        setDateRange([
                                          {
                                            startDate: new Date(checkInDate),
                                            endDate: currentDate,
                                            key: "selection",
                                          },
                                        ])
                                      }
                                    }
                                  }}
                                >
                                  {/* Date Number Only */}
                                  <div
                                    className="text-lg font-bold"
                                    style={{
                                      color:
                                        isCheckIn || isCheckOut
                                          ? "white"
                                          : isToday && !isCheckIn && !isCheckOut
                                            ? "#16a34a"
                                            : "#111827",
                                    }}
                                  >
                                    {currentDate.getDate()}
                                  </div>
                                </div>
                              )
                            })
                          })()}
                        </div>

                        {/* Price Information Below Calendar */}
                        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">Base Rate</span>
                            </div>
                            <span className="text-green-600 font-bold">₹{villa.price.toLocaleString()}/night</span>
                          </div>
                          <div className="text-xs text-gray-500 text-center">
                            Final pricing may vary based on dates and seasonality
                          </div>
                        </div>

                        {/* Selected Dates Summary */}
                        {checkInDate && checkOutDate && (
                          <div className="mt-4 pt-3 border-t border-gray-100 bg-green-50 rounded-lg p-3">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                <span className="font-medium text-gray-700">Selected Dates</span>
                              </div>
                              <span className="text-green-600 font-bold">
                                {totalDays} night{totalDays > 1 ? "s" : ""}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mt-2 font-medium">
                              {new Date(checkInDate).toLocaleDateString("en-IN", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                              })}{" "}
                              →{" "}
                              {new Date(checkOutDate).toLocaleDateString("en-IN", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Guest Selection */}
                {bookingStep === 2 && (
                  <div className="animate-fadeInUp space-y-4">
                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18  8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        How many guests?
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">Maximum {villa.guests} guests allowed</p>

                      {/* Adults */}
                      <div className="guest-counter flex items-center justify-between mb-4 p-4 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Adults
                          </div>
                          <div className="text-sm text-gray-500">Age 13+</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:bg-green-100 hover:border-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            disabled={adults <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <div className="w-12 text-center">
                            <span className="text-xl font-bold text-green-700">{adults}</span>
                          </div>
                          <button
                            type="button"
                            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:bg-green-100 hover:border-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => setAdults(adults + 1)}
                            disabled={adults + children >= villa.guests}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="guest-counter flex items-center justify-between mb-4 p-4 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 2a4 4 0 100 8 4 4 0 000-8zM8 14a2 2 0 00-2 2v1a1 1 0 001 1h6a1 1 0 001-1v-1a2 2 0 00-2-2H8z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Children
                          </div>
                          <div className="text-sm text-gray-500">Age 3–12</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:bg-green-100 hover:border-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            disabled={children <= 0}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <div className="w-12 text-center">
                            <span className="text-xl font-bold text-green-700">{children}</span>
                          </div>
                          <button
                            type="button"
                            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:bg-green-100 hover:border-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => setChildren(adults + children < villa.guests ? children + 1 : children)}
                            disabled={adults + children >= villa.guests}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="guest-counter flex items-center justify-between p-4 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 2a4 4 0 100 8 4 4 0 000-8zM4 13a6 6 0 1112 0v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Infants
                          </div>
                          <div className="text-sm text-gray-500">Under 2 (don't count toward guest limit)</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:bg-green-100 hover:border-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => setInfants(Math.max(0, infants - 1))}
                            disabled={infants <= 0}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <div className="w-12 text-center">
                            <span className="text-xl font-bold text-green-700">{infants}</span>
                          </div>
                          <button
                            type="button"
                            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:bg-green-100 hover:border-green-400 transition-all duration-300"
                            onClick={() => setInfants(infants + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Guest Summary */}
                      <div className="mt-4 pt-3 border-t border-green-200 bg-white rounded-lg p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700">Total Guests</span>
                          <span className="text-green-600 font-bold">
                            {adults + children} guest{adults + children > 1 ? "s" : ""}
                            {infants > 0 ? ` + ${infants} infant${infants > 1 ? "s" : ""}` : ""}
                          </span>
                        </div>
                        {adults + children < villa.guests && (
                          <div className="text-xs text-gray-500 mt-1">
                            You can add {villa.guests - (adults + children)} more guest
                            {villa.guests - (adults + children) > 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirm Booking */}
                {bookingStep === 3 && (
                  <div className="animate-fadeInUp space-y-4">
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                      <h4 className="font-semibold text-gray-900 mb-3">Booking Summary</h4>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dates:</span>
                          <span className="font-medium">
                            {checkInDate &&
                              checkOutDate &&
                              `${new Date(checkInDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" })} - ${new Date(checkOutDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Guests:</span>
                          <span className="font-medium">
                            {adults + children} Adults/Children{infants > 0 ? `, ${infants} Infants` : ""}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Booked by:</span>
                          <span className="font-medium">{userData?.name || userData?.email || "Guest User"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Price Breakdown */}
                {totalDays > 0 && bookingStep === 3 && (
                  <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-100">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          ₹{villa.price.toLocaleString()} × {totalDays} nights
                        </span>
                        <span className="font-semibold">₹{(totalDays * villa.price).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service fee (5%)</span>
                        <span className="font-semibold">
                          ₹{Math.round(totalDays * villa.price * 0.05).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">GST (18%)</span>
                        <span className="font-semibold">
                          ₹
                          {Math.round(
                            (totalDays * villa.price + totalDays * villa.price * 0.05) * 0.18,
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="border-t border-green-200 pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-900">Total Amount</span>
                          <span className="text-xl font-bold text-green-700">
                            ₹
                            {Math.round(
                              totalDays * villa.price +
                                totalDays * villa.price * 0.05 +
                                (totalDays * villa.price + totalDays * villa.price * 0.05) * 0.18,
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  {bookingStep > 1 && (
                    <button
                      onClick={() => {
                        setBookingStep(bookingStep - 1)
                      }}
                      className="flex-1 px-4 py-3 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group min-h-[48px]"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (bookingStep < 3) {
                        setBookingStep(bookingStep + 1)
                      } else {
                        handleBookNow()
                      }
                    }}
                    disabled={bookingLoading}
                    className={`booking-button flex-1 py-4 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group min-h-[48px] sm:min-h-[52px] ${
                      bookingLoading
                        ? "booking-loading"
                        : "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
                    }`}
                  >
                    {bookingLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        {bookingStep === 3 ? (
                          <>
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Confirm Booking
                          </>
                        ) : (
                          <>
                            Continue
                            <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </>
                    )}
                  </button>
                </div>

                {/* Step Helper Text */}
                <div className="text-center text-xs text-gray-500 mt-3 space-y-1">
                  {bookingStep === 1 && (
                    <p className="flex items-center justify-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Select your check-in and check-out dates
                    </p>
                  )}
                  {bookingStep === 2 && (
                    <p className="flex items-center justify-center">
                      <Users className="h-4 w-4 mr-1" />
                      Choose the number of guests for your stay
                    </p>
                  )}
                  {bookingStep === 3 && (
                    <p className="flex items-center justify-center text-green-600 font-medium">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Review your booking details and confirm
                    </p>
                  )}

                  {/* Success Step */}
                  {bookingStep === 5 && (
                    <div className="text-center animate-fadeIn">
                      <div className="mb-6">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-green-600 mb-2">Booking Confirmed!</h3>
                        <p className="text-gray-600 mb-4">🎉 Your reservation has been successfully processed.</p>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                          <p className="text-sm text-green-800">
                            📧 Confirmation details sent to your email
                            <br />🏡 Welcome to {villa.name}!
                          </p>
                        </div>
                        <div className="flex items-center justify-center text-sm text-gray-500">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-500 border-t-transparent mr-2"></div>
                          Redirecting to homepage...
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VillaDetail
