import React, { useState, useEffect } from 'react';
import { Heart, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';

// Import villa images
import anandvilla1 from '../assets/empireanandvilla/anandvilla1.jpg';
import anandvilla2 from '../assets/empireanandvilla/anandvilla2.jpg';
import anandvilla3 from '../assets/empireanandvilla/anandvilla3.jpg';
import anandvilla4 from '../assets/empireanandvilla/anandvilla4.jpg';
import anandvilla5 from '../assets/empireanandvilla/anandvilla5.jpg';
import anandvilla6 from '../assets/empireanandvilla/anandvilla6.jpg';
import anandvilla7 from '../assets/empireanandvilla/anandvilla7.jpg';
import anandvilla8 from '../assets/empireanandvilla/anandvilla8.jpg';
import anandvilla9 from '../assets/empireanandvilla/anandvilla9.jpg';
import anandvilla10 from '../assets/empireanandvilla/anandvilla10.jpg';
import anandvilla11 from '../assets/empireanandvilla/anandvilla11.jpg';
import anandvilla12 from '../assets/empireanandvilla/anandvilla12.jpg';
import anandvilla13 from '../assets/empireanandvilla/anandvilla13.jpg';
import anandvilla14 from '../assets/empireanandvilla/anandvilla14.jpg';
import anandvilla15 from '../assets/empireanandvilla/anandvilla15.jpg';
import anandvilla16 from '../assets/empireanandvilla/anandvilla16.jpg';

export const empireAnandVillaImages = [
  anandvilla1, anandvilla2, anandvilla3, anandvilla4,
  anandvilla5, anandvilla6, anandvilla7, anandvilla8,
  anandvilla9, anandvilla10, anandvilla11, anandvilla12,
  anandvilla13, anandvilla14, anandvilla15, anandvilla16
];

// JSON data for villas
const villasData = [
  {
    id: 1,
    name: "Villa Kaia",
    location: "Saligao Goa, India",
    guests: 8,
    bedrooms: 4,
    beds: 4,
    price: 14800,
    type: "VILLA",
    amenities: ["Private Pool", "Pet Friendly"],
    rating: 4.8,
    image: anandvilla1
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
    image: anandvilla2
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
    image: anandvilla3
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
    image: anandvilla4
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
    image: anandvilla5
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
    image: anandvilla6
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
    image: anandvilla7
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
    image: anandvilla8
  },
  {
    id: 9,
    name: "Villa Tranquil",
    location: "Assagao Goa, India",
    guests: 9,
    bedrooms: 4,
    beds: 5,
    price: 21000,
    type: "VILLA",
    amenities: ["Private Pool"],
    rating: 4.7,
    image: anandvilla9
  },
  {
    id: 10,
    name: "Beachside Villa",
    location: "Vagator Goa, India",
    guests: 11,
    bedrooms: 5,
    beds: 6,
    price: 28500,
    type: "VILLA",
    amenities: ["Private Pool", "Pet Friendly"],
    rating: 4.9,
    image: anandvilla10
  },
  {
    id: 11,
    name: "Garden Apartment",
    location: "Panaji Goa, India",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    price: 5500,
    type: "APARTMENT",
    amenities: ["Shared Pool"],
    rating: 4.2,
    image: anandvilla11
  },
  {
    id: 12,
    name: "Villa Bliss",
    location: "Reis Magos Goa, India",
    guests: 7,
    bedrooms: 3,
    beds: 4,
    price: 16800,
    type: "VILLA",
    amenities: ["Private Pool", "Pet Friendly"],
    rating: 4.8,
    image: anandvilla12
  },
  {
    id: 13,
    name: "Luxury Penthouse",
    location: "Dona Paula Goa, India",
    guests: 6,
    bedrooms: 3,
    beds: 3,
    price: 19500,
    type: "APARTMENT",
    amenities: ["Private Pool", "Shared Pool"],
    rating: 4.6,
    image: anandvilla13
  },
  {
    id: 14,
    name: "Villa Harmony",
    location: "Aldona Goa, India",
    guests: 8,
    bedrooms: 4,
    beds: 4,
    price: 22500,
    type: "VILLA",
    amenities: ["Private Pool"],
    rating: 4.7,
    image: anandvilla14
  },
  {
    id: 15,
    name: "Riverside Apartment",
    location: "Old Goa, India",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    price: 6800,
    type: "APARTMENT",
    amenities: ["Shared Pool", "Pet Friendly"],
    rating: 4.4,
    image: anandvilla15
  },
  {
    id: 16,
    name: "Villa Grandeur",
    location: "Nerul Goa, India",
    guests: 14,
    bedrooms: 6,
    beds: 8,
    price: 45000,
    type: "VILLA",
    amenities: ["Private Pool", "Pet Friendly"],
    rating: 4.9,
    image: anandvilla16
  }
];

const AllRooms = () => {
  const [villas, setVillas] = useState(villasData);
  const [filteredVillas, setFilteredVillas] = useState(villasData);
  const [favorites, setFavorites] = useState(new Set());
  const [sortBy, setSortBy] = useState('Recently Added');
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedTypes, setSelectedTypes] = useState(['VILLA']);
  const [selectedBedrooms, setSelectedBedrooms] = useState('Any');
  const [selectedBeds, setSelectedBeds] = useState('Any');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  
  // UI states
  const [showPriceFilter, setShowPriceFilter] = useState(true);
  const [showTypeFilter, setShowTypeFilter] = useState(true);
  const [showRoomsFilter, setShowRoomsFilter] = useState(true);
  const [showAmenitiesFilter, setShowAmenitiesFilter] = useState(true);

  useEffect(() => {
    applyFilters();
  }, [priceRange, selectedTypes, selectedBedrooms, selectedBeds, selectedAmenities, sortBy]);

  const applyFilters = () => {
    let filtered = villasData.filter(villa => {
      // Price filter
      if (villa.price < priceRange[0] || villa.price > priceRange[1]) return false;
      
      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(villa.type)) return false;
      
      // Bedrooms filter
      if (selectedBedrooms !== 'Any' && villa.bedrooms !== parseInt(selectedBedrooms)) return false;
      
      // Beds filter
      if (selectedBeds !== 'Any' && villa.beds !== parseInt(selectedBeds)) return false;
      
      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity => 
          villa.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }
      
      return true;
    });

    // Apply sorting
    if (sortBy === 'Price: Low to High') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredVillas(filtered);
  };

  const clearFilters = () => {
    setPriceRange([0, 50000]);
    setSelectedTypes(['VILLA']);
    setSelectedBedrooms('Any');
    setSelectedBeds('Any');
    setSelectedAmenities([]);
  };

  const toggleFavorite = (villaId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(villaId)) {
      newFavorites.delete(villaId);
    } else {
      newFavorites.add(villaId);
    }
    setFavorites(newFavorites);
  };

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    
    <div className="min-h-screen bg-none mt-[50px]">
      {/* Header */}
      {/* <div className='w-full'></div> */}
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

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-8">
        {/* Sidebar Filters */}
        <div className="w-80 bg-white rounded-lg shadow-sm p-6 h-fit">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
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
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="₹ 50,000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])}
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
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
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
                    checked={selectedTypes.includes('VILLA')}
                    onChange={() => handleTypeChange('VILLA')}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm">VILLA</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes('APARTMENT')}
                    onChange={() => handleTypeChange('APARTMENT')}
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
                      onClick={() => setSelectedBedrooms(selectedBedrooms === 'Any' ? '1' : (parseInt(selectedBedrooms) - 1).toString())}
                      className="p-1 border border-gray-300 rounded-full hover:bg-gray-50"
                      disabled={selectedBedrooms === 'Any' || selectedBedrooms === '1'}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-4 py-1 border border-gray-300 rounded-md min-w-[60px] text-center text-sm">
                      {selectedBedrooms}
                    </span>
                    <button
                      onClick={() => setSelectedBedrooms(selectedBedrooms === 'Any' ? '1' : (parseInt(selectedBedrooms) + 1).toString())}
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
                      onClick={() => setSelectedBeds(selectedBeds === 'Any' ? '1' : (parseInt(selectedBeds) - 1).toString())}
                      className="p-1 border border-gray-300 rounded-full hover:bg-gray-50"
                      disabled={selectedBeds === 'Any' || selectedBeds === '1'}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-4 py-1 border border-gray-300 rounded-md min-w-[60px] text-center text-sm">
                      {selectedBeds}
                    </span>
                    <button
                      onClick={() => setSelectedBeds(selectedBeds === 'Any' ? '1' : (parseInt(selectedBeds) + 1).toString())}
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
                    checked={selectedAmenities.includes('Private Pool')}
                    onChange={() => handleAmenityChange('Private Pool')}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm">Private Pool</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes('Shared Pool')}
                    onChange={() => handleAmenityChange('Shared Pool')}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm">Shared Pool</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes('Pet Friendly')}
                    onChange={() => handleAmenityChange('Pet Friendly')}
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
              <div key={villa.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={villa.image || "/placeholder.svg"}
                    alt={villa.name}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(villa.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.has(villa.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
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
              <button
                onClick={clearFilters}
                className="mt-4 text-green-600 hover:text-green-700 font-medium underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllRooms;