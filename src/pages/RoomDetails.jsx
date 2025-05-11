import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData } from '../assets/assets'
import StarRating from '../components/StarRating'
import { getImageByFilename } from '../utils/imageMapping'
import roomImg11 from '../assets/roomImg11.png'
import { API_BASE_URL } from '../config/api';

const RoomDetails = () => {
    const {id} = useParams()
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [checkInDate, setCheckInDate] = useState('')
    const [checkOutDate, setCheckOutDate] = useState('')
    const [guests, setGuests] = useState(1)
    const fallbackImage = roomImg11;

    useEffect(() => {
        fetchRoomDetails();
    }, [id]);

    const fetchRoomDetails = async () => {
        try {
            console.log(`Fetching room details for ID: ${id}`);
            const response = await fetch(`${API_BASE_URL}/api/rooms/${id}`);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Failed to fetch room details. Status: ${response.status}. Message: ${errorData.message || 'Unknown error'}`);
            }
            
            const roomData = await response.json();
            console.log('Room data received:', roomData);
            
            if (!roomData || !roomData.hotel) {
                throw new Error('Invalid room data structure');
            }
            
            setRoom(roomData);
            
            // Set main image from the first image filename
            if (roomData.images && roomData.images.length > 0) {
                const imageUrl = getImageByFilename(roomData.images[0]) || fallbackImage;
                console.log(`Setting main image: ${roomData.images[0]} -> ${imageUrl}`);
                setMainImage(imageUrl);
            } else {
                setMainImage(fallbackImage);
            }
            
        } catch (error) {
            console.error('Error fetching room details:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const setMainImageSafely = (imageName) => {
        const mappedImage = getImageByFilename(imageName);
        return mappedImage || fallbackImage;
    };

    const handleBookNow = () => {
        if (!checkInDate || !checkOutDate) {
            alert('Please select check-in and check-out dates');
            return;
        }
        
        // Calculate total days
        const start = new Date(checkInDate);
        const end = new Date(checkOutDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 1) {
            alert('Please select at least 1 day of stay');
            return;
        }
        
        // Extract numeric price from string (removes commas)
        const priceString = room.pricePerNight.replace(/,/g, '');
        const price = parseFloat(priceString);
        const totalPrice = price * diffDays;
        
        alert(`Your booking request has been received!
        Check-in: ${checkInDate}
        Check-out: ${checkOutDate}
        Guests: ${guests}
        Total Price: ₹${totalPrice.toLocaleString()}`);
        
        // Here you would typically call an API to create a booking
    };

    if (loading) {
        return <div className="py-28 text-center">Loading room details...</div>;
    }

    if (error) {
        return (
            <div className="py-28 px-4 md:px-16 lg:px-24 xl:px-32 text-center">
                <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Room</h2>
                <p className="mb-4">{error}</p>
                <p className="text-gray-600">Room ID: {id}</p>
                <button 
                    onClick={() => window.location.href='/rooms'}
                    className="mt-4 bg-primary hover:bg-primary-dull text-white py-2 px-4 rounded"
                >
                    Return to All Rooms
                </button>
            </div>
        );
    }

    if (!room) {
        return <div className="py-28 text-center">Room not found. Please check the room ID.</div>;
    }

    return (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            {/* Room Details */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                <h1 className='text-3xl md:tetx-4xl font-playfair'>{room.hotel.name} <span className='font-inter text-sm'>{room.roomType}</span></h1>
                <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
            </div>
            
            {/* Room Rating */}
            <div className='flex items-center gap-1 mt-2'>
                <StarRating />
                <p className='ml-2'>200+ reviews</p>
            </div>

            {/* Room Address */}
            <div className='flex itmes-center gap-1 text-gray-500 mt-2'>
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
            </div>

            {/* Room Image */}
            <div className='flex flex-col lg:flex-row mt-6 gap-6'>
                <div className='lg:w-1/2 w-full'>
                    <img src={mainImage} alt="Room Image" className='w-full rounded-xl shadow-lg object-cover' />
                </div>
                <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                    {room?.images.length > 1 && room.images.map((image, index) => (
                        <img 
                            onClick={() => setMainImage(setMainImageSafely(image))}
                            key={index} 
                            src={setMainImageSafely(image)} 
                            alt="Room Image" 
                            className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === setMainImageSafely(image) && 'outline-3 outline-orange-500'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Room Highlights */}
            <div className='flex flex-col md:flex-row md:justify-between mt-10'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                        {room.amenities.map((item, index) => (
                            <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                                <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                                <p className='text-xs'>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <p className='text-2xl font-medium'> ₹{room.pricePerNight}/night</p>
            </div>

            {/* Room Description */}
            <div className='mt-8'>
                <h2 className='text-2xl font-playfair mb-3'>Room Overview</h2>
                <p className='text-gray-600 mb-6'>
                    Experience the epitome of luxury in our {room.roomType} room at {room.hotel.name}. 
                    This exquisite accommodation offers a perfect blend of comfort, elegance, and modern amenities. 
                    Located in the beautiful area of {room.hotel.city}, our room provides a peaceful retreat 
                    with stunning views and proximity to local attractions.
                </p>

                <h3 className='text-xl font-playfair mb-2 mt-8'>Key Features</h3>
                <ul className='list-disc pl-5 text-gray-600 mb-6'>
                    <li>Spacious {room.roomType} layout with premium furnishings</li>
                    <li>High-speed WiFi and modern entertainment system</li>
                    <li>Luxurious bathroom with premium toiletries</li>
                    <li>Daily housekeeping service</li>
                    {room.amenities.includes('Free Breakfast') && <li>Complimentary breakfast at our gourmet restaurant</li>}
                    {room.amenities.includes('Pool Access') && <li>Access to our exclusive swimming pool</li>}
                </ul>
            </div>

            {/* Booking Section */}
            <div className='mt-10 bg-gray-50 p-6 rounded-xl shadow-sm'>
                <h2 className='text-2xl font-playfair mb-4'>Book This Room</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <label className='block text-gray-700 mb-2'>Check-in Date</label>
                        <input 
                            type="date" 
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className='w-full border border-gray-300 rounded p-2'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 mb-2'>Check-out Date</label>
                        <input 
                            type="date" 
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            min={checkInDate || new Date().toISOString().split('T')[0]}
                            className='w-full border border-gray-300 rounded p-2'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 mb-2'>Guests</label>
                        <select 
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            className='w-full border border-gray-300 rounded p-2'
                        >
                            {[1, 2, 3, 4].map(num => (
                                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex items-end'>
                        <button 
                            onClick={handleBookNow}
                            className='w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition duration-300'
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Hotel Policies */}
            <div className='mt-12'>
                <h2 className='text-2xl font-playfair mb-3'>Hotel Policies</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <h3 className='font-medium mb-2'>Check-in & Check-out</h3>
                        <p className='text-sm text-gray-600'>Check-in: 2:00 PM - 12:00 AM</p>
                        <p className='text-sm text-gray-600'>Check-out: Until 12:00 PM</p>
                    </div>
                    <div>
                        <h3 className='font-medium mb-2'>Cancellation Policy</h3>
                        <p className='text-sm text-gray-600'>Free cancellation up to 24 hours before check-in.</p>
                    </div>
                    <div>
                        <h3 className='font-medium mb-2'>Children & Extra Beds</h3>
                        <p className='text-sm text-gray-600'>Children of all ages are welcome. Children above 12 years are considered adults.</p>
                    </div>
                    <div>
                        <h3 className='font-medium mb-2'>Payment Methods</h3>
                        <p className='text-sm text-gray-600'>Credit cards, debit cards, and cash payments are accepted.</p>
                    </div>
                </div>
            </div>

            {/* Similar Rooms Recommendations */}
            <div className='mt-12'>
                <h2 className='text-2xl font-playfair mb-5'>You May Also Like</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {/* Placeholder for similar room recommendations */}
                    <div className='border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                        <img src={fallbackImage} alt="Similar Room" className='w-full h-48 object-cover' />
                        <div className='p-4'>
                            <h3 className='text-lg font-medium'>Luxury Suite</h3>
                            <p className='text-gray-600 text-sm mb-3'>Premium amenities with ocean view</p>
                            <p className='font-medium'>₹18,000/night</p>
                        </div>
                    </div>
                    <div className='border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                        <img src={fallbackImage} alt="Similar Room" className='w-full h-48 object-cover' />
                        <div className='p-4'>
                            <h3 className='text-lg font-medium'>Family Suite</h3>
                            <p className='text-gray-600 text-sm mb-3'>Spacious suite for the whole family</p>
                            <p className='font-medium'>₹22,000/night</p>
                        </div>
                    </div>
                    <div className='border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                        <img src={fallbackImage} alt="Similar Room" className='w-full h-48 object-cover' />
                        <div className='p-4'>
                            <h3 className='text-lg font-medium'>Royal Suite</h3>
                            <p className='text-gray-600 text-sm mb-3'>Our most exclusive accommodation</p>
                            <p className='font-medium'>₹30,000/night</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomDetails