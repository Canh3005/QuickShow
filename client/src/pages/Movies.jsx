import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import Loading from '../components/Loading'

const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <div className='relative px-6 md:px-16 lg:px-36 py-10 my-40 mx-20 '>
      <BlurCircle top='-100px' left='-50px' />
      <BlurCircle bottom='-50px' right='-50px' />
      <div className='text-2xl font-bold'>Now Showing</div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10'>
        {dummyShowsData.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default Movies
