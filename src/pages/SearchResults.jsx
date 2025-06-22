import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { assets, facilityIcons } from '../assets/assets';
import { API_BASE_URL } from '../config/api';

// Direct imports of images to ensure they work
import roomImg11 from '../assets/roomImg11.png';
 // Use your actual location icon

const CheckBox = ({label, selected = false, onChange = () => {}}) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)}/>
      <span className='font-light select-none'>{label}</span>
    </label>
  );
};

function parseQuery(queryString) {
  const params = new URLSearchParams(queryString);
  return {
    location: params.get("location") || "",
    checkIn: params.get("checkIn") || "",
    checkOut: params.get("checkOut") || "",
    adults: params.get("adults") || "",
    children: params.get("children") || "",
  };
}

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const hotelImage = roomImg11; // Use this image for all hotels
  
  // Extract search parameters from the URL
  const searchParams = new URLSearchParams(location.search);
  const destination = searchParams.get('location');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests');
  
  // Calculate nights of stay
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const nights = calculateNights();
  
  // Additional filters
  const [filters, setFilters] = useState({
    amenities: [],
    priceRange: [],
    cities: []
  });
  
  // Update these filter options to match the seeded data
const amenitiesOptions = [
  "Air Conditioning",
  "Free WiFi", 
  "Room Service",
  "Free Breakfast",
  "Swimming Pool",
  "Mini Bar",
  "Mountain View",
  "Ocean View"
];

const cityOptions = [
  "Chennai",
  "Pondicherry" 
];

const priceRanges = [
  '4,500 to 8,000',
  '8,000 to 12,000',
  '12,000 to 15,000',
  'Above 15,000',
];
  
  // Local search params for refine search form
  const [localSearchParams, setLocalSearchParams] = useState({
    destination: destination || '',
    checkIn: checkIn || '',
    checkOut: checkOut || '',
    guests: guests || 1
  });

  const [filteredHotels, setFilteredHotels] = useState([]);
  
  useEffect(() => {
    fetchSearchResults();
  }, [location.search]);
  
  const fetchSearchResults = async () => {
    if (!destination || !checkIn || !checkOut || !guests) {
      setError('Missing search parameters');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      
      const response = await fetch(
        `${API_BASE_URL}/api/searchbar?${new URLSearchParams({
          location: destination,
          checkIn,
          checkOut,
          guests
        }).toString()}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to search for properties');
      }
      
      const data = await response.json();
      console.log("Search results:", data);
      
      setSearchResults(data.hotels || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching search results:', err);
      setError(err.message);
      setLoading(false);
    }
  };
  
  // Replace the problematic viewHotelDetails function with this improved version
const viewHotelDetails = async (hotelId) => {
  console.log("Clicked on hotel with ID:", hotelId);
  try {
    // Directly fetch rooms for this hotel from the API endpoint
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/rooms`);
    const data = await response.json();
    
    console.log("Hotel rooms API response:", data);
    
    if (response.ok && data && data.length > 0) {
      // Get the ID of the first room
      const roomId = data[0]._id;
      console.log("Selected room ID:", roomId);
      
      // Navigate to room details with search parameters
      navigate(`/rooms/${roomId}?checkIn=${checkIn || ''}&checkOut=${checkOut || ''}&guests=${guests || 1}`);
    } else {
      alert("No available rooms found for this hotel. Please try another hotel.");
    }
  } catch (error) {
    console.error("Error navigating to room details:", error);
    alert("Error loading room details. Please try again.");
  }
};
  
  const handleSearchUpdate = (e) => {
    e.preventDefault();
    navigate(`/search-results?location=${localSearchParams.destination}&checkIn=${localSearchParams.checkIn}&checkOut=${localSearchParams.checkOut}&guests=${localSearchParams.guests}`);
  };
  
  const handleAmenityChange = (selected, amenity) => {
    setFilters(prev => {
      if (selected) {
        return { ...prev, amenities: [...prev.amenities, amenity] };
      } else {
        return { ...prev, amenities: prev.amenities.filter(a => a !== amenity) };
      }
    });
  };
  
  
  const handleCityChange = (selected, city) => {
    setFilters(prev => {
      if (selected) {
        return { ...prev, cities: [...prev.cities, city] };
      } else {
        return { ...prev, cities: prev.cities.filter(c => c !== city) };
      }
    });
  };
  
  const handlePriceRangeChange = (selected, range) => {
    setFilters(prev => {
      if (selected) {
        return { ...prev, priceRange: [...prev.priceRange, range] };
      } else {
        return { ...prev, priceRange: prev.priceRange.filter(r => r !== range) };
      }
    });
  };
  
  const handleClearFilters = () => {
    setFilters({
      amenities: [],
      priceRange: [],
      cities: []
    });
  };
  
  // Apply client-side filtering based on selected filters
  const getFilteredHotels = () => {
    let filteredHotels = [...searchResults];
    
    // If we have any active filters, apply them
    if (filters.amenities.length > 0 || filters.priceRange.length > 0 || filters.cities.length > 0) {
      filteredHotels = filteredHotels.filter(hotel => {
        // Filter by city
        if (filters.cities.length > 0) {
          if (!filters.cities.includes(hotel.hotel.city)) {
            return false;
          }
        }
        
        // For demonstration - you'll need to adjust this based on your actual data structure
        // Filter by amenities (assuming hotel has common amenities)
        if (filters.amenities.length > 0) {
          const hotelAmenities = hotel.commonAmenities || [];
          const hasAllAmenities = filters.amenities.every(amenity => 
            hotelAmenities.includes(amenity)
          );
          if (!hasAllAmenities) return false;
        }
        
        // Filter by average price range
        if (filters.priceRange.length > 0) {
          // Check if this hotel's price range overlaps with any selected price range filter
          const hotelHasMatchingPrice = hotel.rooms.some(room => {
            // Convert room price to number by removing commas
            const roomPrice = parseInt(room.pricePerNight.replace(/,/g, ''));
            
            // Check if this room's price falls within any of the selected price ranges
            return filters.priceRange.some(range => {
              // Parse the price range
              if (range.includes('Above')) {
                // For "Above X" format
                const minPrice = parseInt(range.split('Above ')[1].replace(/,/g, ''));
                return roomPrice > minPrice;
              } else {
                // For "X to Y" format
                const [minStr, maxStr] = range.replace('₹ ', '').split(' to ');
                const minPrice = parseInt(minStr.replace(/,/g, ''));
                const maxPrice = parseInt(maxStr.replace(/,/g, ''));
                return roomPrice >= minPrice && roomPrice <= maxPrice;
              }
            });
          });
          
          if (!hotelHasMatchingPrice) return false;
        }
        
        return true;
      });
    }
    
    return filteredHotels;
  };

  useEffect(() => {
    setFilteredHotels(getFilteredHotels());
  }, [searchResults, filters]);
  
  const totalHotels = filteredHotels.length;
  const totalRooms = filteredHotels.reduce((acc, hotel) => acc + hotel.totalRooms, 0);
  
  // Villa search state
  const [villas, setVillas] = useState([]);
  const [query, setQuery] = useState({});
  
  useEffect(() => {
    const q = parseQuery(location.search);
    setQuery(q);

    const fetchVillas = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch villas filtered by location
        const villaRes = await fetch(
          `${API_BASE_URL}/api/villas/search?location=${encodeURIComponent(q.location)}`
        );
        const villaList = await villaRes.json();

        // Fetch all bookings for the selected date range
        const bookingRes = await fetch(
          `${API_BASE_URL}/api/bookings/search?checkIn=${q.checkIn}&checkOut=${q.checkOut}`
        );
        const bookings = await bookingRes.json();

        // Build a set of booked villa IDs for the date range
        const bookedVillaIds = new Set(bookings.map((b) => String(b.villaId)));

        // Mark each villa as available or not
        const results = villaList.map((villa) => ({
          ...villa,
          isBooked: bookedVillaIds.has(String(villa._id)),
        }));

        setVillas(results);
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    if (q.location && q.checkIn && q.checkOut) {
      fetchVillas();
    } else {
      setLoading(false);
    }
  }, [location.search]);
  
  return (
    <div className='pt-24 md:pt-28'>
      {/* Refine search bar */}
   
      
      {/* Main content with sidebar filter layout */}
      <div className="container mx-auto px-4 md:px-16 lg:px-24 xl:px-32 py-8">
        <div className='flex flex-col-reverse lg:flex-row items-start justify-between'>
          {/* Main content area */}
          <div className="w-full lg:w-3/4 lg:pr-8">
            <div className='flex flex-col items-start text-left mb-8'>
              <h1 className='font-playfair text-3xl'>Search Results</h1>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {destination}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                  <img src={assets.calenderIcon} alt="calendar" className="w-4 h-4 mr-1" />
                  {new Date(checkIn).toLocaleDateString()} - {new Date(checkOut).toLocaleDateString()}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {guests} {parseInt(guests) === 1 ? 'Guest' : 'Guests'}, {nights} {nights === 1 ? 'Night' : 'Nights'}
                </span>
              </div>
              <p className='text-sm text-gray-500/90 mt-3'>
                {totalHotels} hotels with {totalRooms} available rooms found in {destination}
              </p>
              
            
              <div className="w-full mt-4 mb-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search hotel name..."
                    className="w-full md:w-1/2 border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    onChange={(e) => {
                      const searchTerm = e.target.value.toLowerCase();
                      if (!searchTerm) {
                        // Reset to original filtered results
                        setFilteredHotels(getFilteredHotels());
                      } else {
                        // Filter by hotel name
                        setFilteredHotels(
                          getFilteredHotels().filter(hotel => 
                            hotel.hotel.name.toLowerCase().includes(searchTerm)
                          )
                        );
                      }
                    }}
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Search results */}
            {loading ? (
              <div className="flex justify-center items-center py-24">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-700 p-6 rounded-xl my-8 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Error Loading Results</h3>
                <p>{error}</p>
              </div>
            ) : filteredHotels.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-xl shadow-sm">
                <h2 className="text-2xl font-playfair font-semibold mb-3">No properties found</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">We couldn't find any available hotels matching your search criteria.</p>
                <button 
                  onClick={handleClearFilters}
                  className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div>
                {/* Hotel Results - Hotel card style instead of room style */}
                {filteredHotels.map(hotel => (
                  <div key={hotel.hotel.id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-200 last:pb-30 last:border-0'>
                    {/* Use the same image for all hotels */}
                    <div className="md:w-2/5">
                      <img 
                        onClick={() => viewHotelDetails(hotel.hotel.id)} 
                        src={hotelImage} 
                        alt={hotel.hotel.name} 
                        title='View Hotel Details' 
                        className='w-full h-64 rounded-xl shadow-lg object-cover cursor-pointer'
                      />
                    </div>
                    
                    <div className='md:w-3/5 flex flex-col gap-2'>
                      <p className='text-gray-500'>{hotel.hotel.city}</p>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <p 
                          onClick={() => viewHotelDetails(hotel.hotel.id)}
                          className='text-gray-800 text-2xl font-playfair cursor-pointer'
                        >
                          {hotel.hotel.name}
                        </p>
                        <span className="text-xs py-1 px-3 text-white bg-orange-500 rounded-full w-fit mt-1 sm:mt-0">
                          {hotel.totalRooms} Available Rooms
                        </span>
                      </div>
                      <div className='flex items-center'>
                        <StarRating />
                        <p className='ml-2'>200+ reviews</p>
                      </div>
                      <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{hotel.hotel.address}</span>
                      </div>
                      
                      {/* Show Available Room Types */}
                      <div className='mt-3 mb-4'>
                        <p className='text-sm text-gray-700 font-medium mb-2'>Available Room Types:</p>
                        <div className='flex flex-wrap gap-2'>
                          {hotel.rooms.map((room, index) => (
                            <span key={index} className='bg-gray-100 text-sm px-3 py-1 rounded-full'>
                              {room.roomType}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Summary of amenities */}
                      <p className="text-gray-600 text-sm mb-4">
                        Experience luxury and comfort at {hotel.hotel.name}, 
                        located in the beautiful {hotel.hotel.city}. 
                        {hotel.totalRooms} rooms available for your stay.
                      </p>
                      
                      {/* Price range and booking button */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-auto">
                        <div>
                          {hotel.rooms.length > 0 && (
                            <>
                              <p className='text-xl font-medium text-gray-700'>
                                ₹{Math.min(...hotel.rooms.map(r => parseInt(r.pricePerNight.replace(/,/g, ''))))} - 
                                ₹{Math.max(...hotel.rooms.map(r => parseInt(r.pricePerNight.replace(/,/g, ''))))}
                                <span className="text-sm font-normal"> /night</span>
                              </p>
                              <p className="text-orange-500 text-xs mt-1">
                                {hotel.rooms.length} room types available
                              </p>
                            </>
                          )}
                        </div>
                        <button 
                          onClick={() => viewHotelDetails(hotel.hotel.id)}
                          className="mt-3 sm:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition duration-300"
                        >
                          View Hotel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Sidebar filters - adapted for hotel filtering */}
          <div className='bg-white w-full lg:w-1/4 border border-gray-200 text-gray-600 max-lg:mb-8 lg:mt-16'>
            <div className={`flex items-center justify-between px-5 py-2.5 lg:border-b border-gray-200 ${openFilters && "border-b"}`}>
              <p className='text-base font-medium text-gray-800'>FILTERS</p>
              <div className='text-xs cursor-pointer'>
                <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>
                  {openFilters ? 'HIDE' : 'SHOW'}
                </span>
                <span onClick={handleClearFilters} className='hidden lg:block'>CLEAR</span>
              </div>
            </div>

            <div className={`${openFilters ? 'h-auto' : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
              <div className='px-5 pt-5'>
                <p className='font-medium text-gray-800 pb-2'>City</p>
                {cityOptions.map((city, index) => (
                  <CheckBox 
                    key={index} 
                    label={city}
                    selected={filters.cities.includes(city)}
                    onChange={(selected, type) => handleCityChange(selected, type)}
                  />
                ))}
              </div>

              <div className='px-5 pt-5'>
                <p className='font-medium text-gray-800 pb-2'>Price Range</p>
                {priceRanges.map((range, index) => (
                  <CheckBox 
                    key={index} 
                    label={`₹ ${range}`}
                    selected={filters.priceRange.includes(`₹ ${range}`)}
                    onChange={(selected, range) => handlePriceRangeChange(selected, range)}
                  />
                ))}
              </div>

              <div className='px-5 pt-5 pb-7'>
                <p className='font-medium text-gray-800 pb-2'>Amenities</p>
                {amenitiesOptions.map((amenity, index) => (
                  <CheckBox 
                    key={index} 
                    label={amenity}
                    selected={filters.amenities.includes(amenity)}
                    onChange={(selected, amenity) => handleAmenityChange(selected, amenity)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Villa search results - new section */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">
          Villas in {query.location} ({query.checkIn} to {query.checkOut})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {villas.map((villa) => (
            <div key={villa._id} className="bg-white rounded-lg shadow p-6 flex flex-col">
              <img
                src={Array.isArray(villa.images) && villa.images.length > 0 ? villa.images[0] : "/placeholder.svg"}
                alt={villa.name}
                className="w-full h-56 object-cover rounded mb-4"
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
      </div>
    </div>
  );
};

export default SearchResults;