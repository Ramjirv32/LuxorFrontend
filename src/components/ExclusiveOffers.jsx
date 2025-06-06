import React, { useState } from 'react'
import Title from './Title'
import { assets, exclusiveOffers } from '../assets/assets'
import { motion } from 'framer-motion'

const ExclusiveOffers = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30'>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className='flex flex-col md:flex-row items-center justify-between w-full'
      >
        <Title align='left' title='Exclusive Offers' subTitle='Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories' />
        
        <motion.button 
          className='group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          View All Offers In LuxorStay
          <motion.img 
            src={assets.arrowIcon} 
            alt="arrow-icon" 
            initial={{ x: 0 }}
            animate={{ x: 3 }}
            transition={{ 
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.8 
            }}
            className='group-hover:translate-x-1 transition-all' 
          />
        </motion.button>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full'
      >
        {exclusiveOffers.map((item, index) => (
          <motion.div 
            key={item._id} 
            variants={cardVariants}
            onHoverStart={() => setHoveredCard(item._id)}
            onHoverEnd={() => setHoveredCard(null)}
            whileHover={{ y: -8, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)" }}
            className='group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg bg-cover bg-center overflow-hidden h-[300px]' 
            style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url(${item.image})`}}
          >
            <motion.div
              className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent'
              initial={{ opacity: 0.6 }}
              animate={{ 
                opacity: hoveredCard === item._id ? 0.8 : 0.6 
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.p 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full z-10'
            >
              {item.priceOff}% OFF
            </motion.p>

            <motion.div
              className='relative z-10 w-full'
              animate={{ 
                y: hoveredCard === item._id ? -5 : 0 
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.p 
                className='text-2xl font-medium font-playfair'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                {item.title}
              </motion.p>
              <motion.p
                initial={{ opacity: 0.8 }}
                animate={{ 
                  opacity: hoveredCard === item._id ? 1 : 0.8 
                }}
              >
                {item.description}
              </motion.p>
              <motion.p
                className='text-xs text-white/70 mt-3'
                animate={{ 
                  opacity: hoveredCard === item._id ? 0.9 : 0.7 
                }}
              >
                Expires {item.expiryDate}
              </motion.p>
            </motion.div>

            <motion.button 
              className='flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5 z-10'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              animate={{
                x: hoveredCard === item._id ? 3 : 0
              }}
            >
              View Offers
              <motion.img 
                className='invert' 
                src={assets.arrowIcon} 
                alt="arrow-icon"
                animate={{
                  x: hoveredCard === item._id ? [0, 5, 0] : 0
                }}
                transition={{ 
                  duration: 0.8,
                  repeat: hoveredCard === item._id ? Infinity : 0,
                  repeatType: "loop"
                }}
              />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div> 
  )
}

export default ExclusiveOffers