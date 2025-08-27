import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import { Heart, PlayCircleIcon, StarIcon, ArrowRight } from 'lucide-react';
import timeFormat from '../lib/timeFormat';
import BlurCircle from '../components/BlurCircle';
import DateSelect from '../components/DateSelect';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  const fetchMovieDetails = async () => {
    const movie = dummyShowsData.find((movie) => movie._id === id);
    setMovie({
      show: movie,
      casts: movie.casts || [],
      dateTime: dummyDateTimeData || [],
    });
  }

  useEffect(() => {
    fetchMovieDetails();
  }, [id])
  return movie ? (
    <div className='my-40 mx-auto flex flex-col px-16 md:px-32 lg:px-60'>
      <div className='relative flex flex-row gap-10 items-center w-full py-10'>
        <BlurCircle top='0px' left='350px' />
        <img src={movie.show.poster_path} alt="" className='w-64 h-96 object-cover rounded-[20px]' />
        <div className='flex flex-col gap-4 w-2/3'>
          <p className='text-sm text-primary'>ENGLISH</p>
          <div className='text-3xl text-white font-bold'>{movie.show.title}</div>
          <div className='flex items-center gap-1 text-sm text-gray-400'>
            <StarIcon className='w-6 h-6 text-primary inline' fill='currentColor' />
            <span className='ml-2 text-lg text-gray-300'>{movie.show.vote_average.toFixed(1)} IMDb Rating</span>
          </div>
          <div className='text-sm text-gray-400'>{movie.show.overview}</div>
          <div className='flex items-center gap-2 text-sm text-gray-300'>
            <div>{timeFormat(movie.show.runtime)}</div>
            - <div>{movie.show.genres.slice(0, 2).map(genre => genre.name).join(" | ")}</div>
            - <div>{new Date(movie.show.release_date).getFullYear()}</div>
          </div>
          <div className='flex items-center gap-4 mt-4'>
            <div className='bg-gray-700 text-white py-3 px-5 rounded-md cursor-pointer hover:bg-gray-800 '>
              <PlayCircleIcon className='w-6 h-6 inline mr-2' />
              Watch Trailer</div>
            <a href='#dateSelect' className='bg-primary text-white py-3 px-5 rounded-md cursor-pointer hover:bg-primary-dull'>Buy Tickets</a>
            <button className='p-2.5 rounded-full bg-gray-700 hover:bg-gray-800'>
              <Heart className='w-6 h-6 cursor-pointer' />
            </button>
          </div>
        </div>
      </div>

      <p className='text-lg font-bold mt-20 mb-10 '>Your Favorite Cast</p>
      <div className='flex flex-row gap-10'>
        {movie.casts.slice(0, 7).map((cast, index) => (
          <div key={index} className='flex flex-col items-center gap-4'>
            <img src={cast.profile_path} alt={cast.name} className='w-30 h-30 object-cover rounded-full' />
            <div className='text-sm text-gray-300'>{cast.name}</div>
          </div>
        ))}
      </div>

      <DateSelect id={movie.show._id} dateTime={movie.dateTime} />

      <div className='max-w-full'>
        <div className='relative flex items-center justify-between pt-20 pb-10'>
          <BlurCircle top='50px' right='-80px' />
          <p className='text-lg font-bold'>You May Also Like</p>
          <button onClick={() => { navigate('/movies'); window.scrollTo(0, 0); }} className='group flex items-center gap-2 cursor-pointer hover:text-primary transition'>
            View All
            <ArrowRight className='group-hover:translate-x-1 transition duration-200 w-5 h-5' />
          </button>
        </div>

        <div className='flex flex-wrap gap-4 justify-center'>
          {dummyShowsData.slice(0, 4).map((movie, index) => (
            <div key={index} className='mb-8'>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        <div className='flex justify-center mt-10 mb-10'>
          <button onClick={() => { navigate('/movies'); scrollTo(0, 0); }} className='bg-primary text-white py-2 px-4 rounded-md cursor-pointer hover:bg-primary/80 '>Show more</button>
        </div>

      </div>

    </div>
  ) : (
    <Loading />
  )
}

export default MovieDetails
