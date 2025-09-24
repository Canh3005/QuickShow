import express from 'express';
import bookingController from '../controllers/bookingController.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.post('/create', auth, bookingController.createBooking);
router.get('/seats/:showId', bookingController.getOccupiedSeats);

export default router;