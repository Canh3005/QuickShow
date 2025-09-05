import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    posterPath: { type: String, required: true },
    backdropPath: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    originalLanguage: { type: String, required: true },
    tagline: { type: String, required: true },
    genres: { type: Array, required: true },
    casts: { type: Array, required: true },
    voteAverage: { type: Number, min: 0, max: 10, required: true },
    runtime: { type: Number, min: 0, required: true },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
