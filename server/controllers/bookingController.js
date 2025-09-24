import Show from "../models/Show.js";
import bookingService from "../services/bookingService.js";

const checkSeatAvailability = async (showId, selectedSeats) => {
    try {
        const show = await Show.findById(showId);
        if (!show) {
            throw new Error("Show not found");
        }
        const occupiedSeats = show.occupiedSeats || {};
        const isAvailable = selectedSeats.some(seat => occupiedSeats[seat]);
        return !isAvailable;
    } catch (error) {
        console.error("Error checking seat availability:", error);
        throw new Error("Error checking seat availability");
    }
};

const createBooking = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { showId, selectedSeats } = req.body;

        const isAvailable = await checkSeatAvailability(showId, selectedSeats);
        if (!isAvailable) {
            throw new Error("Selected seats are not available");
        }
        const booking = await bookingService.createBooking(userId, showId, selectedSeats);
        return res.status(201).json(booking);
    } catch (error) {
        console.error("Error creating booking:", error);
        return res.status(500).json({ message: error.message || "Error creating booking" });
    }
};

const getOccupiedSeats = async (req, res) => {
    try {
        const { showId } = req.params;
        const occupiedSeats = await bookingService.getOccupiedSeats(showId);
        return res.status(200).json({ occupiedSeats });
    } catch (error) {
        console.error("Error fetching occupied seats:", error);
        return res.status(500).json({ message: error.message || "Error fetching occupied seats" });
    }
};

const bookingController = {
    checkSeatAvailability,
    createBooking,
    getOccupiedSeats
};

export default bookingController;