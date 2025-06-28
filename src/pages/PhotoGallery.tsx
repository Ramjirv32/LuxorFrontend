"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Bookmark, Share2, X, ArrowDown } from "lucide-react"

// Interface for component props
interface PhotoGalleryProps {
  images: string[];  // This will receive the villa's actual fetched images
  villaName?: string;
  isOpen: boolean;
  onClose: () => void;
}

// PhotoGallery Component
const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images, villaName = "Villa", isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' or 'split'

  // Reset selected image index when images change
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [images]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Shorter loading time for better UX
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Use the images passed in via props
  const imagesToShow = Array.isArray(images) && images.length > 0 ? images : ["/placeholder.svg"];

  // Helper to chunk images into [1,3,1,3,...] pattern
  const getGalleryRows = (imgs: string[]) => {
    if (!Array.isArray(imgs) || imgs.length === 0) return [];
    const rows = [];
    let i = 0;
    let big = true;
    while (i < imgs.length) {
      if (big) {
        rows.push([imgs[i]]);
        i += 1;
      } else {
        const remainingImages = imgs.slice(i, i + 3);
        if (remainingImages.length > 0) {
          rows.push(remainingImages);
        }
        i += 3;
      }
      big = !big;
    }
    return rows;
  };

  const galleryRows = getGalleryRows(imagesToShow);

  return (
    <div className={`fixed inset-0 bg-white z-50 flex flex-col ${viewMode === 'split' ? 'h-[50vh]' : ''}`}>
      {/* Header */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
          <div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
          </div>
          <div className="text-center flex-1">
            <h2 className="font-semibold text-gray-900">{villaName} Photos</h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode(viewMode === 'gallery' ? 'split' : 'gallery')}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-all duration-300"
              title={viewMode === 'gallery' ? "Show villa details below" : "Full gallery view"}
            >
              <ArrowDown className={`h-5 w-5 transform transition-transform ${viewMode === 'split' ? 'rotate-180' : ''}`} />
            </button>
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="h-5 w-5" />
              <span className="font-medium">Close</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content Area - Centered with max width */}
      <div className="max-h-[70vh] overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          {isLoading ? (
            // Loading State
            <div className="flex items-center justify-center h-[60vh]">
              <div className="text-center text-gray-900">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-lg font-medium">Loading photos...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Alternating Gallery Rows */}
              {galleryRows.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className={`flex gap-4 ${row.length === 1 ? "" : "justify-between"}`}
                >
                  {row.length === 1 ? (
                    // Big image
                    <div
                      className={`flex-1 relative cursor-pointer bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 group ${
                        selectedImageIndex === rowIdx * 4 ? "ring-4 ring-green-500" : ""
                      }`}
                      style={{ minHeight: "320px", maxHeight: "400px" }}
                      onClick={() => setSelectedImageIndex(rowIdx * 4)}
                    >
                      <img
                        src={row[0] || "/placeholder.svg"}
                        alt={`${villaName} ${rowIdx * 4 + 1}`}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "/placeholder.svg";
                        }}
                      />
                      {selectedImageIndex === rowIdx * 4 && (
                        <div className="absolute inset-0 bg-green-500/10"></div>
                      )}
                    </div>
                  ) : (
                    // Three small images
                    row.map((img, idx) => {
                      // Calculate the global image index
                      const imgIdx = rowIdx * 4 - 3 + idx;
                      return (
                        <div
                          key={imgIdx}
                          className={`flex-1 relative cursor-pointer bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 group ${
                            selectedImageIndex === imgIdx ? "ring-4 ring-green-500" : ""
                          }`}
                          style={{ minHeight: "120px", maxHeight: "160px" }}
                          onClick={() => setSelectedImageIndex(imgIdx)}
                        >
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`${villaName} ${imgIdx + 1}`}
                            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-200"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = "/placeholder.svg";
                            }}
                          />
                          {selectedImageIndex === imgIdx && (
                            <div className="absolute inset-0 bg-green-500/10"></div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              ))}
              
              {/* Image counter */}
              <div className="text-center text-gray-500 text-sm">
                {selectedImageIndex + 1} of {imagesToShow.length} photos
              </div>

              {/* No images message */}
              {imagesToShow.length <= 1 && imagesToShow[0] === "/placeholder.svg" && (
                <div className="text-center py-10">
                  <p className="text-gray-500">No photos available for this property.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer with continue button */}
      <div className="bg-white p-4 text-center border-t border-gray-200">
        <button
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
        >
          Continue to Villa Details
        </button>
      </div>

      {/* Bottom action bar */}
      {viewMode === 'split' && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-center backdrop-blur-sm">
          Scroll down to see villa details
        </div>
      )}
    </div>
  );
};

// Only export the PhotoGallery component
export default PhotoGallery;
// HomePage Component (uses PhotoGallery)
