import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { API_BASE_URL } from '../config/api';
import hotelFrontImage from '../assets/empireanandvilla/Front1.png';
import { empireAnandVillaImages } from '../assets/empireanandvilla';

const AllRooms = () => {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [hotelRooms, setHotelRooms] = useState([]);
    const [roomsLoading, setRoomsLoading] = useState(false);

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/hotels`);
                if (!response.ok) throw new Error('Failed to fetch hotels');
                const data = await response.json();
                setHotels(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch hotels:", error);
                setHotels([]);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    const fetchRoomsForHotel = async (hotelId) => {
        setRoomsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/rooms?hotelId=${hotelId}`);
            if (!response.ok) throw new Error('Failed to fetch rooms for the hotel');
            const data = await response.json();
            setHotelRooms(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(`Failed to fetch rooms for hotel ${hotelId}:`, error);
            setHotelRooms([]);
        } finally {
            setRoomsLoading(false);
        }
    };

    const handleViewRooms = (hotel) => {
        setSelectedHotel(hotel);
        fetchRoomsForHotel(hotel._id);
    };

    const handleBackToVillas = () => {
        setSelectedHotel(null);
        setHotelRooms([]);
    };
    
    const viewRoomDetails = (roomId) => {
        navigate(`/rooms/${roomId}`);
    };

    const renderHotelList = () => (
        <>
            <h1 className='text-4xl font-bold text-gray-800 mb-8 text-center font-serif'>Explore Our Villas</h1>
            {loading ? (
                <p className='text-center text-gray-500'>Loading villas...</p>
            ) : hotels.length === 0 ? (
                <p className='text-center text-gray-500'>No villas found.</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {hotels.map(hotel => (
                        <div key={hotel._id} className='w-full bg-white rounded-lg shadow-2xl overflow-hidden group'>
                            <div className='relative overflow-hidden'>
                                <img 
                                    src={hotelFrontImage}
                                    alt={hotel.name} 
                                    className='w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
                            </div>
                            <div className='p-6'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <h3 className='text-2xl font-bold text-gray-800 font-serif'>{hotel.name}</h3>
                                        <p className='text-md text-gray-600 mt-1'>{hotel.address}</p>
                                    </div>
                                    {hotel.rating && <StarRating rating={hotel.rating} />}
                                </div>
                                <button
                                    onClick={() => handleViewRooms(hotel)}
                                    className='mt-6 w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg'
                                >
                                    View Available Rooms
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );

    const renderRoomList = () => (
        <>
            <div className='flex items-center justify-between mb-8'>
                 <h1 className='text-3xl font-bold text-gray-800'>Rooms in {selectedHotel.name}</h1>
                 <button
                    onClick={handleBackToVillas}
                    className='bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors'
                >
                    &larr; Back to Villas
                </button>
            </div>
            {roomsLoading ? (
                <p className='text-center text-gray-500'>Loading rooms...</p>
            ) : hotelRooms.length === 0 ? (
                <p className='text-center text-gray-500'>No rooms found for this villa.</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {hotelRooms.map((room, index) => (
                        <div 
                            key={room._id} 
                            className='w-full cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300'
                            onClick={() => viewRoomDetails(room._id)}
                        >
                            <div className='relative'>
                                <img 
                                    src={empireAnandVillaImages[index % empireAnandVillaImages.length]} 
                                    alt={room.name} 
                                    className='w-full h-64 object-cover'
                                />
                            </div>
                            <div className='p-5'>
                                 <h3 className='text-xl font-bold text-gray-800 truncate'>{room.name}</h3>
                                 <p className='text-md text-gray-600 mt-1'>{room.roomType}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            {selectedHotel ? renderRoomList() : renderHotelList()}
        </div>
    );
};

export default AllRooms;