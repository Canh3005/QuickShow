import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedSection from '../components/FeaturedSection'
import TrailerSection from '../components/TrailerSection'

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <>
        <HeroSection />
        <FeaturedSection />
        <TrailerSection />
      </>
    </div>
  )
}

export default Home
