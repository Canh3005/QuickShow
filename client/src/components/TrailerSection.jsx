import { useState } from 'react';
import { dummyTrailers } from '../assets/assets';
import ReactPlayer from 'react-player';
import BlurCircle from './BlurCircle';
import { PlayCircleIcon } from 'lucide-react';

const TrailerSection = () => {

    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 max-w-full'>
            <p className='text-xl font-semibold mb-4 mx-auto'>Trailers</p>
            <div className='relative'>
                <BlurCircle top='-100px' right='-60px' />
                <ReactPlayer
                    src={currentTrailer.videoUrl} controls={true} height='540px' width='960px' className='mx-auto max-w-full rounded-lg'
                />
            </div>
            <div className='group flex flex-wrap gap-4 justify-center mt-8'>
                {dummyTrailers.map((trailer, index) => (
                    <div key={index} onClick={() => setCurrentTrailer(trailer)} className='relative hover:-translate-y-1 transition-transform duration-300 cursor-pointer h-25 rounded-lg overflow-hidden not-hover:opacity-50'>
                        <img src={trailer.image} alt={trailer.title} className='h-25' />
                        <PlayCircleIcon strokeWidth={1.6} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10' />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrailerSection
