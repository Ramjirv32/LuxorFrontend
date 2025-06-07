import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { useAuth } from '../context/AuthContext';

const BookingDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData, authToken } = useAuth();

  // Extract search parameters from the URL
  const searchParams = new URLSearchParams(location.search);
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests');

  useEffect(() => {
    if (!userData) {
      navigate('/');
      return;
    }
    
    if (id) {
      fetchBookingDetails();
    }
  }, [id, userData]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch booking details');
      }
      
      const data = await response.json();
      setBooking(data);
    } catch (error) {
      console.error('Error fetching booking details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
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

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-28 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="bg-red-50 p-6 rounded-xl text-red-700">
          <h2 className="text-2xl font-bold mb-4">Error Loading Booking Details</h2>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/my-bookings')} 
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            Return to My Bookings
          </button>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen pt-28 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="bg-yellow-50 p-6 rounded-xl text-yellow-700">
          <h2 className="text-2xl font-bold mb-4">Booking Not Found</h2>
          <p>We couldn't find this booking in your account.</p>
          <button 
            onClick={() => navigate('/my-bookings')} 
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            Return to My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-4 md:px-16 lg:px-24 xl:px-32 pb-16">
      <div className="flex flex-col items-start text-left mb-8">
        <h1 className="font-playfair text-4xl">Booking Details</h1>
        <p className="text-gray-500 mt-2">View details of your booking</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
        {/* Booking Status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-200">
          <div>
            <h2 className="font-playfair text-2xl mb-1">{booking.room.roomType}</h2>
            <p className="text-gray-600">{booking.hotel.name}, {booking.hotel.city}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusBadge(booking.status)}`}>
              {booking.status}
            </span>
          </div>
        </div>
        
        {/* Booking Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Stay Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Check-in</p>
                <p className="font-medium">{formatDate(booking.checkInDate)}</p>
                <p className="text-xs text-gray-500 mt-1">After 2:00 PM</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Check-out</p>
                <p className="font-medium">{formatDate(booking.checkOutDate)}</p>
                <p className="text-xs text-gray-500 mt-1">Before 11:00 AM</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Length of Stay</p>
              <p className="font-medium">
                {Math.ceil(
                  (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24)
                )}{" "}
                {Math.ceil(
                  (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24)
                ) === 1
                  ? "Night"
                  : "Nights"}
              </p>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Number of Guests</p>
              <p className="font-medium">{booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}</p>
            </div>
          </div>
          
          {/* Right column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Payment Method</p>
              <p className="font-medium">{booking.paymentMethod}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Payment Status</p>
              <p className={`font-medium ${booking.isPaid ? "text-green-600" : "text-orange-600"}`}>
                {booking.isPaid ? "Paid" : "Payment Due at Hotel"}
              </p>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Room Rate:</span>
                <span>₹{(booking.totalPrice / 1.18).toFixed(0).toLocaleString('en-IN')} × {Math.ceil(
                  (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24)
                )} night(s)</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Taxes & Fees (18%):</span>
                <span>₹{(booking.totalPrice - booking.totalPrice / 1.18).toFixed(0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-gray-200">
                <span>Total:</span>
                <span>₹{booking.totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact and Policies Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 pt-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Email:</span> {booking.userEmail}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-medium">Hotel Phone:</span> {booking.hotel.contact || 'Not available'}
            </p>
            
            <h3 className="text-xl font-semibold mb-4 mt-6">Need Help?</h3>
            <div className="flex gap-4">
              <button 
                onClick={() => window.location.href = `mailto:support@luxorstay.com?subject=Help with Booking ${booking._id}`}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition"
              >
                Email Support
              </button>
              <button 
                onClick={() => window.location.href = `https://wa.me/7904040739?text=I need help with my booking ${booking._id}`}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path>
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.127 17.14c-.272.386-.668.735-1.127 1.018-.46.284-.943.475-1.428.594-.485.12-.988.182-1.492.182-1.745 0-3.513-.542-5.015-1.56-1.502-1.017-2.78-2.428-3.694-4.03-.913-1.602-1.368-3.293-1.368-5.022 0-.516.074-1.041.223-1.56.149-.516.371-.993.668-1.418.297-.426.693-.783 1.14-1.052.446-.268.943-.409 1.428-.409.248 0 .47.05.668.149.198.099.371.223.52.372l1.189 1.761c.149.223.272.421.371.595.099.174.148.361.148.558 0 .174-.037.335-.111.484-.074.15-.185.298-.334.446l-.446.459c-.05.05-.074.111-.074.186 0 .074.025.148.074.223.05.074.111.148.186.223.347.546.791 1.051 1.313 1.499.223.198.446.383.669.558.223.174.446.323.669.446.074.05.148.074.223.074.074 0 .148-.025.223-.074l.446-.446c.149-.149.297-.26.446-.334.15-.074.298-.111.471-.111.198 0 .396.037.57.111.174.074.371.185.595.334l1.733 1.238c.149.099.272.223.371.372.099.148.149.297.149.445.001.49-.122.981-.346 1.367z"></path>
                </svg>
                WhatsApp Help
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Cancellation Policy</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Free cancellation up to 48 hours before check-in</li>
              <li>Cancellations within 48 hours of check-in are subject to a one-night charge</li>
              <li>No-shows will be charged the full booking amount</li>
            </ul>
            
            {booking.status === 'confirmed' && (
              <button 
                className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition"
                onClick={() => {
                  if (window.confirm('Are you sure you want to cancel this booking?')) {
                    // Handle cancellation
                    alert('This feature will be implemented soon');
                  }
                }}
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
        
        <div className="flex mt-8 pt-4 border-t border-gray-200">
          <button 
            onClick={() => navigate('/my-bookings')} 
            className="mr-4 px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            Back to My Bookings
          </button>
          <button 
            onClick={() => navigate(`/rooms/${booking.room._id}`)}
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            View Room Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;