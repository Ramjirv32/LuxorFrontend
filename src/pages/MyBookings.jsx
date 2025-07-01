import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Users, CheckCircle, Clock, AlertCircle, CreditCard, Home } from 'lucide-react';

// Import villa images - same imports as in AllRooms.jsx
// Amrith Palace Images
import AP1 from "/AmrithPalace/AP8.jpg"
// East Coast Villa Images
import EC1 from "/eastcoastvilla/EC1.jpg"
// Empire Anand Villa Samudra Images
import anandvilla1 from "/empireanandvillasamudra/anandvilla1.jpg"
// Ram Water Villa Images
import RW1 from "/ramwatervilla/RW1.jpg"

// Villa image mapping for each villa type
const villaImageMap = {
  "Amrith Palace": AP1,
  "East Coast Villa": EC1,
  "Empire Anand Villa Samudra": anandvilla1,
  "Ram Water Villa": RW1,
  "default": AP1  // Default image if no match found
};

// Helper function to find the appropriate villa image
const getVillaImage = (villaName) => {
  if (!villaName) return villaImageMap.default;
  
  // Direct match
  if (villaImageMap[villaName]) {
    return villaImageMap[villaName];
  }
  
  // Case insensitive partial match
  const lowerName = villaName.toLowerCase();
  if (lowerName.includes('amrith') || lowerName.includes('palace')) {
    return villaImageMap["Amrith Palace"];
  } else if (lowerName.includes('east') || lowerName.includes('coast')) {
    return villaImageMap["East Coast Villa"];
  } else if (lowerName.includes('empire') || lowerName.includes('anand') || lowerName.includes('samudra')) {
    return villaImageMap["Empire Anand Villa Samudra"];
  } else if (lowerName.includes('ram') || lowerName.includes('water')) {
    return villaImageMap["Ram Water Villa"];
  }
  
  return villaImageMap.default;
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { userData, authToken } = useAuth();

  useEffect(() => {
    // Check for authentication
    if (!authToken) {
      console.log("No auth token found, redirecting to sign-in");
      navigate('/sign-in');
      return;
    }
    fetchBookings();
  }, [authToken, navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      console.log("Attempting to fetch bookings for user:", userData?.email);
      
      if (!userData?.email) {
        console.warn("User email not found in auth context");
      }
      
      // Add detailed logging for debugging
      console.log("Using auth token:", authToken ? `${authToken.substring(0, 15)}...` : "No token");
      
      // Try the endpoint specifically for user bookings
      const response = await fetch(`${API_BASE_URL}/api/bookings/user-bookings`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("API Response status:", response.status);
      
      if (!response.ok) {
        // Log detailed error information
        const errorText = await response.text();
        console.error("Error response:", errorText);
        
        if (response.status === 401) {
          // Handle unauthorized error specifically
          throw new Error("Session expired. Please log in again.");
        } else {
          throw new Error(`Failed to fetch bookings (${response.status}): ${response.statusText}`);
        }
      }
      
      const data = await response.json();
      console.log("Bookings data received:", data);
      
      // Check if data is an array or has a bookings property
      const bookingsArray = Array.isArray(data) ? data : (data.bookings || []);
      
      if (bookingsArray.length === 0) {
        console.log("No bookings found for user");
      }
      
      // Transform the booking data to match the expected structure for rendering
      const transformedBookings = bookingsArray.map(booking => ({
        _id: booking._id || booking.id || 'unknown-id',
        status: booking.status || 'confirmed',
        checkInDate: booking.checkIn,
        checkOutDate: booking.checkOut,
        guests: booking.guests || 0,
        totalPrice: booking.totalAmount || 0,
        isPaid: booking.isPaid || false,
        paymentMethod: booking.paymentMethod || 'Online Payment',
        room: {
          _id: booking.villaId || 'unknown-villa',
          roomType: booking.villaName || 'Luxury Villa'
        },
        hotel: {
          name: booking.villaName || 'Luxor Villa',
          city: booking.location || 'Premium Location',
          image: getVillaImage(booking.villaName) // Add image to each booking
        }
      }));
      
      console.log("Transformed bookings:", transformedBookings);
      setBookings(transformedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(error.message || "Failed to load your bookings");
      
      if (error.message?.includes("Session expired")) {
        // Handle auth errors with a friendlier message
        setTimeout(() => {
          navigate('/sign-in');
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge color based on booking status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get status icon based on booking status
  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  // Enhanced loading state with more feedback
  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mb-4"></div>
        <p className="text-gray-500">Loading your booking details...</p>
      </div>
    );
  }

  // Enhanced error state with retry button
  if (error) {
    return (
      <div className="min-h-screen pt-28 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="bg-red-50 p-6 rounded-xl text-red-700">
          <h2 className="text-2xl font-bold mb-4">Error Loading Bookings</h2>
          <p className="mb-4">{error}</p>
          <div className="flex gap-4">
            <button 
              onClick={fetchBookings} 
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
            >
              Retry
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-4 md:px-16 lg:px-24 xl:px-32 pb-16 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="flex flex-col items-start text-left mb-8">
        <h1 className="font-playfair text-4xl">My Bookings</h1>
        <p className="text-gray-500 mt-2">View and manage your vacation stays</p>
      </div>

      {bookings.length === 0 && !loading ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <Calendar className="h-10 w-10 text-orange-500" />
          </div>
          <h2 className="text-2xl font-medium mb-4">No bookings found</h2>
          <p className="text-gray-600 mb-6">You haven't made any bookings yet.</p>
          <button 
            onClick={() => navigate('/rooms')} 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition duration-300"
          >
            Browse Villas
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
              <div className="md:flex">
                {/* Villa Image */}
                <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                  <img 
                    src={booking.hotel.image || getVillaImage(booking.hotel.name)} 
                    alt={booking.hotel.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 m-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium capitalize ${getStatusBadge(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </div>
                </div>
                
                {/* Booking Details */}
                <div className="md:w-2/3 p-6">
                  <div className="md:flex justify-between items-start">
                    <div>
                      <h2 className="font-playfair text-2xl font-bold mb-2">{booking.room.roomType}</h2>
                      <p className="text-gray-600 flex items-center mb-3">
                        <MapPin className="h-4 w-4 mr-1 text-orange-500" />
                        {booking.hotel.city}
                      </p>
                    </div>
                 
                  </div>
                  
                  {/* Booking Information Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Calendar className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p className="font-medium">{formatDate(booking.checkInDate)}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                      <div className="bg-red-100 p-2 rounded-lg">
                        <Calendar className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Check-out</p>
                        <p className="font-medium">{formatDate(booking.checkOutDate)}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Guests</p>
                        <p className="font-medium">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Info & Actions */}
                  <div className="mt-6 pt-5 border-t border-gray-200 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600">{booking.paymentMethod}</span>
                    </div>
                    
                    <div className="flex gap-3 w-full md:w-auto">
                      <button 
                        onClick={() => navigate(`/booking/${booking._id}`, { 
                          state: { 
                            bookingId: booking._id,
                            villaName: booking.hotel.name,
                            villaImage: booking.hotel.image || getVillaImage(booking.hotel.name) 
                          }
                        })} 
                        className="flex-1 md:flex-none bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        View Details
                      </button>
                      
                      {booking.status === 'pending' && (
                        <button className="flex-1 md:flex-none bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-300">
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;