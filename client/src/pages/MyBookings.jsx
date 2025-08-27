import { dummyBookingData } from "../assets/assets";
import BookingCard from "../components/BookingCard";
import BlurCircle from "../components/BlurCircle";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

const MyBookings = () => {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyBookings = async () => {
    setMyBookings(dummyBookingData);
    setLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  return !loading ? (
    <div className="relative px-6 md:px-16 lg:px-36 py-10 my-40 mx-20 ">
      <BlurCircle top="-50px" left="100px" />
      <div className="text-2xl font-bold">Your Bookings</div>
      <div className="flex flex-col gap-5 mt-10">
        <BlurCircle bottom="-50px" right="200px" />
        {myBookings.map((booking, index) => (
          <BookingCard key={index} booking={booking} />
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyBookings;
