import React from 'react'
import { assets } from '../assets/assets';
import { CalendarIcon, ClockIcon, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {

    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen max-w-full'>
            <img src={assets.marvelLogo} alt="" className="max-h-11 lg:h-11 mt-20" />

            <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>Guardians <br /> of the Galaxy</h1>

            <div className="flex items-center gap-4 text-gray-300">
                <span>Action | Adventure | Sci-fi</span>
                <div className='flex items-center gap-1'>
                    <CalendarIcon className='h-4.5 w-4.5' /> 2018
                </div>
                <div className='flex items-center gap-1'>
                    <ClockIcon className='h-4.5 w-4.5' /> 2h 8m
                </div>
            </div>
            <p className='max-w-md text-gray-300'>In a post-apocalyptic world, the Guardians must fight to protect the galaxy from a new threat. Two people meet in London and try to stop a conspiracy.</p>
            <button onClick={() => navigate('/movies')} className='flex items-center rounded-full bg-primary hover:bg-primary-dull text-white transition cursor-pointer px-6 py-2 font-medium gap-2 pr-4'>
                Explore Movies
                <ArrowRight className='w-5 h-5' />
            </button>

        </div>
    )
}

export default HeroSection
