import { StarIcon } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import timeFormat from '../lib/timeFormat';


const MovieCard = ({ movie }) => {

    const navigate = useNavigate();

    return (
        <div onClick={() => { navigate(`/movies/${movie.id}`); scrollTo(0, 0); }} className='flex flex-col justify-between bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden transition hover:-translate-y-2 duration-300 p-4 w-85 h-110 pb-6'>
            <img src={movie.backdrop_path} alt="" className='h-60 object-cover object-center rounded-lg mb-4' />
            <p className='text-lg font-semibold mb-2'>{movie.title}</p>
            <div className='flex text-sm text-gray-400 mb-4 gap-1'>
                <div>{new Date(movie.release_date).getFullYear()}</div>-<div>{movie.genres.slice(0, 2).map(genre => genre.name).join(", ")}</div>-<div>{timeFormat(movie.runtime)}</div>
            </div>
            <div className='flex justify-between items-center '>
                <button onClick={() => { navigate(`/movies/${movie.id}`); }} className='bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dull cursor-pointer'>Buy Ticket</button>
                <div className='flex items-center text-sm'>
                    <StarIcon className='w-5 h-5 text-primary inline' fill='currentColor' />
                    <span className='ml-1'>{movie.vote_average.toFixed(1)}</span>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
