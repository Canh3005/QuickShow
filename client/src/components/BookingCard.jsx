import timeFormat from "../lib/timeFormat";
import dateFormat from "../lib/dateFormat";

const BookingCard = ({ booking }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  return (
    <div className="bg-primary/10 rounded-lg p-4 mb-4 flex flex-row border border-primary/20 max-w-4xl">
      <img
        src={booking.show.movie.poster_path}
        alt={booking.show.movie.title}
        className="w-50 h-35 object-cover mr-4 rounded-lg"
      />
      <div className="flex flex-1 justify-between">
        <div className="flex flex-col justify-between gap-2">
          <div>
            <p className="font-bold text-2xl mb-2">
              {booking.show.movie.title}
            </p>
            <p className="text-gray-400 text-sm">
              {timeFormat(booking.show.movie.runtime)}
            </p>
          </div>
          <p className="text-gray-400 text-sm">
            {dateFormat(booking.show.showDateTime)}
          </p>
        </div>
        <div className="flex flex-col md:items-right md:text-right justify-between ml-4">
          <div className="flex gap-4 items-center justify-end">
            <p className="text-2xl font-semibold mb-3">
              {" "}
              {currency}
              {booking.amount}
            </p>
            {!booking.isPaid && (
              <button className="bg-primary text-sm py-2 px-4 rounded mb-3 rounded-full font-medium cursor-pointer hover:bg-primary-dull transition">
                Pay Now
              </button>
            )}
          </div>
          <div className="text-sm text-white">
            <p>
              <span className="text-gray-400">Total tickets:</span>{" "}
              {booking.bookedSeats.length}
            </p>
            <p>
              <span className="text-gray-400">Seat Numbers:</span>{" "}
              {booking.bookedSeats.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
