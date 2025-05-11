import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import LuxuryVillaFeatures from '../components/LuxuryVillaFeatures'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <>
        <Hero/>
        <FeaturedDestination />
        <ExclusiveOffers />
        <LuxuryVillaFeatures />
        <Testimonial />
        <NewsLetter />
    </>
  )
}

export default Home