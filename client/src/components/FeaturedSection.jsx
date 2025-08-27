import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import { dummyShowsData } from '../assets/assets'
import MovieCard from './MovieCard'

const FeaturedSection = () => {

    const navigate = useNavigate();

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden max-w-full'>
            <div className='relative flex items-center justify-between pt-20 pb-10'>
                <BlurCircle top='50px' right='-80px' />
                <p className='text-lg font-medium'>Now Showing</p>
                <button onClick={() => navigate('/movies')} className='group flex items-center gap-2 cursor-pointer hover:text-primary transition'>
                    View All
                    <ArrowRight className='group-hover:translate-x-1 transition duration-200 w-5 h-5' />
                </button>
            </div>

            <div className='flex flex-wrap gap-10 justify-center'>
                {dummyShowsData.slice(0, 8).map((movie, index) => (
                    <div key={index} className='mb-8'>
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>

            <div className='flex justify-center mt-10 mb-10'>
                <button onClick={() => { navigate('/movies'); scrollTo(0, 0); }} className='bg-primary text-white py-2 px-4 rounded-md cursor-pointer hover:bg-primary/80 '>Show more</button>
            </div>

        </div>
    )
}

export default FeaturedSection
