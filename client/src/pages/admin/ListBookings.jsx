import Title from "../../components/admin/Title";
import Loading from "../../components/Loading";
import { dummyBookingData } from "../../assets/assets";
import { useEffect, useState } from "react";
import dateFormat from "../../lib/dateFormat";
import BlurCircle from "../../components/BlurCircle";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const fetchBookings = async () => {
    try {
      setBookings(dummyBookingData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);
  return !loading ? (
    <>
      <Title text1="List" text2="Bookings" />
      <div className="relative flex flex-wrap gap-4 mt-10">
        <div className="rounded-lg overflow-hidden max-w-[1200px] w-full">
          <BlurCircle top='-100px' left='100px' />
          <table className="bg-primary/10 border border-primary/30 rounded-lg w-full">
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <thead>
              <tr className="bg-primary/20 text-white text-center">
                <th className="px-4 py-2 text-left">User Name</th>
                <th className="px-4 py-2">Movie Name</th>
                <th className="px-4 py-2">Show Time</th>
                <th className="px-4 py-2">Seats</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-primary/30 text-center"
                >
                  <td className="px-4 py-2 text-left">{booking.user.name}</td>
                  <td className="px-4 py-2">{booking.show.movie.title}</td>
                  <td className="px-4 py-2">{dateFormat(booking.show.showDateTime)}</td>
                  <td className="px-4 py-2">{booking.bookedSeats.join(", ")}</td>
                  <td className="px-4 py-2">{currency} {booking.amount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListBookings;
