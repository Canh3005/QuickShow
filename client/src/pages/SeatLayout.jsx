import { useNavigate } from "react-router-dom"
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import { assets } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

const SeatLayout = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [movie, setMovie] = useState(null);
  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]];

  const getMovie = () => {
    const show = dummyShowsData.find((movie) => movie._id === id);
    setMovie({
      show,
      dateTime: dummyDateTimeData,
    })
    return movie;
  }

  useEffect(() => {
    getMovie();
  }, [id]);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      toast.error("Please select a time first!");
      return;
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      toast.error("You can select a maximum of 5 seats!");
      return;
    }
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  }

  const renderSeats = (row, col) => {
    return (
      <div className='flex gap-2 '>
        {Array.from({ length: col }, (_, index) => {
          const seatId = `${row}${index + 1}`;
          return (
            <div
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`w-8 h-8 border border-primary/50 rounded-md text-gray-400 text-sm p-1 items-center flex justify-center cursor-pointer ${selectedSeats.includes(seatId) ? 'bg-primary text-white' : 'hover:bg-primary/20 transition'}`}
            >{seatId}</div>
          );
        })}
      </div>
    )

  }

  return movie ? (
    <div className='flex flex-col md:flex-row my-20 mx-auto flex px-6 md:px-16 lg:px-40 md:pt-32 md:pb-40'>
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-8 h-max md:sticky md:top-30 pr-8'>
        <p className='pl-8 text-xl'>Available Timings</p>
        <div className='flex flex-col gap-4 mt-6'>
          {movie.dateTime[date].map((item, index) => (
            <div onClick={() => setSelectedTime(item.time)} key={index} className={`flex items-center px-8 p-2 rounded-r-lg ${selectedTime === item.time ? 'bg-primary text-white' : 'hover:bg-primary/20 cursor-pointer transition'} w-5/6`}>
              <ClockIcon className='w-6 h-6 inline mr-2' />
              {console.log(item.time)}
              <div>{isoTimeFormat(item.time)}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Seat Layouts */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle bottom='-100px' right='50px' />
        <p className='text-2xl font-bold'>Select Your Seat</p>
        <img src={assets.screenImage} alt="screen" className='mt-8' />
        <p className="text-gray-400 text-sm mb-25">SCREEN SIDE</p>
        <div className='flex flex-col items-center justify-center gap-4'>
          <div className='flex flex-col gap-2 '>
            {groupRows[0].map((row) => renderSeats(row, 9))}
          </div>
          <div className='grid grid-cols-2 gap-12 mt-8'>
            {groupRows.slice(1).map((group) => (
              <div key={group.join('-')} className='flex flex-col gap-2'>
                {group.map((row) => renderSeats(row, 9))}
              </div>
            ))}
          </div>
        </div>

            <button onClick={() => navigate("/my-bookings")} className='bg-primary text-white py-4 px-6 rounded-full flex items-center mt-25 hover:bg-primary-dull transition cursor-pointer pl-8'>
              Proceed to Checkout
              <ArrowRightIcon className='inline w-6 h-6 ml-2' />
            </button>

      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout
