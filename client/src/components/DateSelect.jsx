import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import BlurCircle from './BlurCircle';
import { useNavigate } from 'react-router-dom';

const DateSelect = ({ dateTime, id }) => {

    const [select, setSelect] = useState(false);
    const navigate = useNavigate();

    const handleBooking = () => {
        if (!select) {
            toast.error("Please select a date first!");
            return;
        }
        navigate(`/movies/${id}/${select}`);
    }

    return (
        <div id='dateSelect' className='pt-10'>
            <div id='dateSelect' className='relative flex flex-col justify-center my-40 bg-primary/10 p-10 rounded-lg border border-primary/20 mx-20 pt-8'>
                <BlurCircle top='-100px' left='-100px' />
                <BlurCircle bottom='-100px' right='-100px' />
                <p className='text-lg font-bold text-white'>Choose Date</p>
                <div className='flex flex-row items-center justify-between mt-6 mr-10'>
                    <div className='flex items-center justify-center gap-4 '>
                        <ChevronLeftIcon className='w-10 h-10 text-primary cursor-pointer' />
                        {Object.keys(dateTime).map((date, index) => (
                            <span key={index} onClick={() => setSelect(date)} className={`mx-2 text-white p-4 border border-primary/20 rounded-lg flex flex-col items-center w-20 h-20 hover:bg-primary transition cursor-pointer ${select === date ? 'bg-primary' : ''}`}>
                                {new Date(date).getDate()}
                                <div>{new Date(date).toLocaleString('default', { month: 'long' })}</div>
                            </span>
                        ))}
                        <ChevronRightIcon className='w-10 h-10 text-primary cursor-pointer' />
                    </div>
                    <button onClick={() => handleBooking()} className='bg-primary text-white py-4 px-10 rounded-lg cursor-pointer hover:bg-primary-dull'>Book Now</button>
                </div>
            </div>
        </div>
    )
}

export default DateSelect
