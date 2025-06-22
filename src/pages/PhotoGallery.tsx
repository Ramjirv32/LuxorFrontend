"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Bookmark, Share2 } from "lucide-react"
// import {Plus} from "lucide-react"
import {


Plus
} from "lucide-react"
import anandvilla1 from "../assets/empireanandvilla/anandvilla1.jpg"
import anandvilla2 from "../assets/empireanandvilla/anandvilla2.jpg"
import anandvilla3 from "../assets/empireanandvilla/anandvilla3.jpg"
import anandvilla4 from "../assets/empireanandvilla/anandvilla4.jpg"
import anandvilla5 from "../assets/empireanandvilla/anandvilla5.jpg"
import anandvilla6 from "../assets/empireanandvilla/anandvilla6.jpg"
import anandvilla7 from "../assets/empireanandvilla/anandvilla7.jpg"
import anandvilla8 from "../assets/empireanandvilla/anandvilla8.jpg"
import anandvilla9 from "../assets/empireanandvilla/anandvilla9.jpg"
import anandvilla10 from "../assets/empireanandvilla/anandvilla10.jpg"
import anandvilla11 from "../assets/empireanandvilla/anandvilla11.jpg"
import anandvilla12 from "../assets/empireanandvilla/anandvilla12.jpg"
import anandvilla13 from "../assets/empireanandvilla/anandvilla13.jpg"
import anandvilla14 from "../assets/empireanandvilla/anandvilla14.jpg"
import anandvilla15 from "../assets/empireanandvilla/anandvilla15.jpg"
import anandvilla16 from "../assets/empireanandvilla/anandvilla16.jpg"

// Create an array of 25 images using the 16 imported images, repeating as needed
const galleryImages = [
  anandvilla1, anandvilla2, anandvilla3, anandvilla4, anandvilla5, anandvilla6, anandvilla7, anandvilla8,
  anandvilla9, anandvilla10, anandvilla11, anandvilla12, anandvilla13, anandvilla14, anandvilla15, anandvilla16,
  anandvilla1, anandvilla2, anandvilla3, anandvilla4, anandvilla5, anandvilla6, anandvilla7, anandvilla8, anandvilla9
]

// PhotoGallery Component
const PhotoGallery = ({ images, villaName, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      // Show loading for 3 seconds
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  // Use galleryImages (25 images) instead of props.images
  const imagesToShow = galleryImages

  // Helper to chunk images into [1,3,1,3,...] pattern
  const getGalleryRows = (imgs) => {
    const rows = []
    let i = 0
    let big = true
    while (i < imgs.length) {
      if (big) {
        rows.push([imgs[i]])
        i += 1
      } else {
        rows.push(imgs.slice(i, i + 3))
        i += 3
      }
      big = !big
    }
    return rows
  }

  const galleryRows = getGalleryRows(imagesToShow)

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
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
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Bookmark className="h-5 w-5" />
              <span className="font-medium">Save</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Share2 className="h-5 w-5" />
              <span className="font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - Centered with max width */}
      <div className="flex-1 overflow-y-auto">
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
                      />
                      {selectedImageIndex === rowIdx * 4 && (
                        <div className="absolute inset-0 bg-green-500/10"></div>
                      )}
                    </div>
                  ) : (
                    // Three small images
                    row.map((img, idx) => {
                      // Calculate the global image index
                      const imgIdx = rowIdx * 4 - 3 + idx
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
                          />
                          {selectedImageIndex === imgIdx && (
                            <div className="absolute inset-0 bg-green-500/10"></div>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              ))}
              {/* Image counter */}
              <div className="text-center text-gray-500 text-sm">
                {selectedImageIndex + 1} of {imagesToShow.length} photos
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// HomePage Component (uses PhotoGallery)
export default function HomePage() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  return (
    <div className="">
      <button
        onClick={() => setIsGalleryOpen(true)}
        className="px-8 py-4 text-white rounded-xl shadow-lg  transition-colors font-medium"
      >
            <Plus className="h-6 w-6 mx-auto mt-6 " /> More Photos
      </button>

      <PhotoGallery

        images={galleryImages}
        villaName="Anand Villa"
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  )
}
