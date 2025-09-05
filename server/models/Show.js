import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: { type: String, required: true, ref: "Movie" },
    showDateTime: { type: Date, required: true },
    showPrice: { type: Number, min: 0, required: true },
    occupiedSeats: { type: Object, default: {} },
  },
  {
    // Enable empty objects
    minimize: false,
  }
);

const Show = mongoose.model("Show", showSchema);

export default Show;
