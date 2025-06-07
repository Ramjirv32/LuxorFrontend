import React from 'react'
import Title from './Title'
import { testimonials as defaultTestimonials } from '../assets/assets'
import StarRating from './StarRating'

// Change the prop name to avoid conflict or provide default value
const Testimonial = ({ testimonials = defaultTestimonials }) => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30'>
        <Title title="What Our Guests Say" subTitle="Discover why discerning travelers consistently choose for their exclusive and luxurious accommodations around the world..." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
            {testimonials && testimonials.map((testimonial, index) => (
                <div key={`testimonial-${index}`} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                            <h3 className="font-medium text-gray-800">{testimonial.name}</h3>
                            <StarRating rating={testimonial.rating} showNumber={true} />
                        </div>
                    </div>
                    <p className="text-gray-600">{testimonial.comment}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Testimonial