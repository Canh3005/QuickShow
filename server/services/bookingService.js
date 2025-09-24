import Show from "../models/Show.js";
import Booking from "../models/Booking.js";

const createBooking = async (userId, showId, selectedSeats) => {
    const showData = await Show.findById(showId).populate('movie');
    if(!showData){
        throw new Error("Show not found");
    }
    // create booking
    const booking = await Booking.create({
        user: userId,
        show: showId,
        bookedSeats: selectedSeats,
        amount: showData.showPrice * selectedSeats.length()
    })

    // update show
    selectedSeats.map((seat) => {
        showData.occupiedSeats[seat] = userId;
    })

    showData.markModified('occupiedSeats');
    await showData.save();
    return booking;
}

const getOccupiedSeats = async (showId) => {
    const show = await Show.findById(showId);
    if (!show) {
        throw new Error("Show not found");
    }
    const occupiedSeats = Object.keys(show.occupiedSeats);
    return occupiedSeats;
};

const bookingService = {
    createBooking,
    getOccupiedSeats
}

export default bookingService;