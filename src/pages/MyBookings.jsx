import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { useAuth } from '../context/AuthContext';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { userData, authToken } = useAuth();

  useEffect(() => {
    if (!userData) {
      navigate('/');
      return;
    }
    fetchBookings();
  }, [userData]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/bookings?userId=${userData.id}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
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
          <h2 className="text-2xl font-bold mb-4">Error Loading Bookings</h2>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/')} 
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-4 md:px-16 lg:px-24 xl:px-32 pb-16">
      <div className="flex flex-col items-start text-left mb-8">
        <h1 className="font-playfair text-4xl">My Bookings</h1>
        <p className="text-gray-500 mt-2">View and manage your bookings</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <h2 className="text-2xl font-medium mb-4">No bookings found</h2>
          <p className="text-gray-600 mb-6">You haven't made any bookings yet.</p>
          <button 
            onClick={() => navigate('/rooms')} 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition duration-300"
          >
            Browse Rooms
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h2 className="font-playfair text-2xl">{booking.room.roomType}</h2>
                  <p className="text-gray-600">{booking.hotel.name}, {booking.hotel.city}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusBadge(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="font-medium">{formatDate(booking.checkInDate)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="font-medium">{formatDate(booking.checkOutDate)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="font-medium">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium">{booking.paymentMethod}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium text-xl">₹{booking.totalPrice.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <p className={`font-medium ${booking.isPaid ? 'text-green-600' : 'text-orange-600'}`}>
                    {booking.isPaid ? 'Paid' : 'Payment Due at Hotel'}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex gap-4 flex-wrap">
                <button 
                  onClick={() => navigate(`/rooms/${booking.room._id}`)} 
                  className="bg-transparent border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50 transition duration-300"
                >
                  View Room
                </button>
                {booking.status === 'pending' && (
                  <button 
                    className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded hover:bg-red-100 transition duration-300"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;