import React, { useState } from 'react';
import { assets, cities } from '../assets/assets';
import { API_BASE_URL } from '../config/api';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSearchParams({
      ...searchParams,
      [id === 'destinationInput' ? 'destination' : id === 'checkIn' ? 'checkIn' : id === 'checkOut' ? 'checkOut' : 'guests']: value
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchParams.destination || !searchParams.checkIn || !searchParams.checkOut || !searchParams.guests) {
      setError('Please fill in all search fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Format destination for consistency
      const formattedDestination = searchParams.destination.charAt(0).toUpperCase() + 
                                searchParams.destination.slice(1).toLowerCase();
      
      // Instead of fetching data and showing a modal, navigate to search results page
      navigate(`/search-results?location=${formattedDestination}&checkIn=${searchParams.checkIn}&checkOut=${searchParams.checkOut}&guests=${searchParams.guests}`);
      
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Error searching for properties');
    } finally {
      setLoading(false);
    }
  };

  // Calculate total available rooms
  const totalRooms = searchResults.reduce((total, hotel) => total + hotel.totalRooms, 0);

  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen relative'>
      <p className='bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20'>The Ultimate Luxury Experience</p>
      <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading[56px] font-bold md:font-extrabold max-w-xl mt-4'>Your Kingdom Of Comfort</h1>
      <p className='max-w-130 mt-2 text-sm md:text-base'>Unparalleled Luxury and comfort await at the world's most exclusive rooms and resorts... Start Your Journey Today.</p>
      
      {error && (
        <div className="bg-red-500/80 text-white px-4 py-2 rounded-md mt-4 animate-pulse">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSearch} className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>
        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className='h-4' />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input 
            list='destinations' 
            id="destinationInput" 
            type="text" 
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" 
            placeholder="Type here"
            value={searchParams.destination}
            onChange={handleInputChange}
            required 
          />
          <datalist id='destinations'>
            <option value="Chennai" />
            <option value="Pondicherry" />
          </datalist>
        </div>

        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className='h-4' />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input 
            id="checkIn" 
            type="date" 
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            value={searchParams.checkIn}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className='h-4' />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input 
            id="checkOut" 
            type="date" 
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            value={searchParams.checkOut}
            onChange={handleInputChange}
            min={searchParams.checkIn || new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
          <label htmlFor="guests">Guests</label>
          <input 
            id="guests" 
            type="number" 
            min={1} 
            max={4} 
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16" 
            placeholder="0"
            value={searchParams.guests}
            onChange={handleInputChange}
            required
          />
        </div>

        <button 
          type="submit"
          className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1'
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
          ) : (
            <img src={assets.searchIcon} alt="searchIcon" className='h-7' />
          )}
          <span>{loading ? 'Searching...' : 'Search'}</span>
        </button>
      </form>

      {/* Search Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto text-gray-800">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-playfair font-bold">
                {totalRooms} Available {totalRooms === 1 ? 'Villa' : 'Villas'}
              </h2>
              <button 
                onClick={() => setShowResults(false)}
                className="text-gray-500 hover:text-black text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-4 text-sm">
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {searchParams.destination}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {new Date(searchParams.checkIn).toLocaleDateString()} - {new Date(searchParams.checkOut).toLocaleDateString()}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {searchParams.guests} {parseInt(searchParams.guests) === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              
              {searchResults.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-xl">No available villas for your search criteria</p>
                  <p className="text-gray-500 mt-2">Try adjusting your dates or destination</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {searchResults.map(hotel => (
                    <div key={hotel.hotel.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 border-b">
                        <h3 className="text-xl font-bold">{hotel.hotel.name}</h3>
                        <p className="text-gray-600">{hotel.hotel.address}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 divide-y">
                        {hotel.rooms.map(room => (
                          <div key={room.id} className="flex flex-col md:flex-row p-4">
                            <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                              <img 
                                src={`/src/assets/${room.images[0]}`} 
                                alt={room.roomType} 
                                className="h-48 w-full object-cover rounded"
                                onError={(e) => {
                                  e.target.src = '/src/assets/roomImg11.png'; // Fallback image
                                }}
                              />
                            </div>
                            <div className="md:w-2/3 flex flex-col">
                              <div>
                                <h4 className="text-lg font-semibold">{room.roomType}</h4>
                                <div className="mt-2">
                                  <ul className="flex flex-wrap gap-2 text-sm">
                                    {room.amenities.map(amenity => (
                                      <li key={amenity} className="bg-gray-100 px-2 py-1 rounded">
                                        {amenity}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="mt-auto pt-4 flex justify-between items-end">
                                <div>
                                  <p className="text-lg font-bold">₹{room.pricePerNight}</p>
                                  <p className="text-sm text-gray-500">per night</p>
                                </div>
                                <a 
                                  href={`/rooms/${room.id}?checkIn=${searchParams.checkIn}&checkOut=${searchParams.checkOut}&guests=${searchParams.guests}`}
                                  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
                                >
                                  View Details
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;