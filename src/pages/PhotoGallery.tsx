import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PhotoGallery = ({ images, villaName, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Show loading for 3 seconds
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center mt-24">
      <div className="w-full h-full max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 text-white">
          <div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">{villaName}</span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {isLoading ? (
          // Loading State
          <div className="flex items-center justify-center h-96">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-lg">Loading photos...</p>
            </div>
          </div>
        ) : (
          // Photo Gallery
          <div className="h-full overflow-y-auto">
            {/* Main Selected Image */}
            <div className="mb-8">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <img
                  src={images[selectedImageIndex] || "/placeholder.svg"}
                  alt={`${villaName} ${selectedImageIndex + 1}`}
                  className="w-full h-96 object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
                    selectedImageIndex === index 
                      ? 'ring-4 ring-white transform scale-105' 
                      : 'hover:transform hover:scale-105'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${villaName} ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  {selectedImageIndex === index && (
                    <div className="absolute inset-0 bg-white/20"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
