import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

const getNowPlayingShows = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: {
          // eslint-disable-next-line no-undef
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing shows:", error);
    throw error;
  }
};

const addShow = async ({ movieId, showsInput, showPrice }) => {
  try {
    let movie = await Movie.findOne({ _id: movieId });
    if (!movie) {
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            // eslint-disable-next-line no-undef
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            // eslint-disable-next-line no-undef
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          },
        }),
      ]);

      const movieApiData = movieDetailsResponse.data;
      const creditsData = movieCreditsResponse.data;

      const movieDetails = {
        _id: movieApiData.id,
        title: movieApiData.title,
        overview: movieApiData.overview,
        posterPath: movieApiData.poster_path,
        backdropPath: movieApiData.backdrop_path,
        releaseDate: movieApiData.release_date,
        genres: movieApiData.genres,
        cast: creditsData.cast,
        originalLanguage: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        voteAverage: movieApiData.vote_average,
        runtime: movieApiData.runtime || 0,
      };

      movie = await Movie.create(movieDetails);
    }

    const showsToCreate = [];
    showsInput.forEach((show) => {
      const showDate = show.date;
      show.times.forEach((time) => {
        const showDateTime = new Date(`${showDate}T${time}`);
        showsToCreate.push({
          movie: movie._id,
          showDateTime,
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    if (showsToCreate.length === 0) {
      throw new Error("No shows to add");
    } else {
      const newShows = await Show.insertMany(showsToCreate);
      return newShows;
    }
  } catch (error) {
    console.error("Error adding new show:", error);
    throw error;
  }
};

const getAllShows = async () => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } }).populate('movie');
    const movies = new Set(shows.map(show => show.movie));
    return { movies: Array.from(movies) };
  } catch (error) {
    console.error("Error fetching all shows:", error);
    throw error;
  }
};

const getShow = async (movieId) => {
  try {
    const shows = await Show.find({ movie: movieId, showDateTime: { $gte: new Date() } }).populate('movie');
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error("Movie not found");
    }
    const dateTime = {};
    shows.forEach(show => {
      const date = show.showDateTime.toISOString().split('T')[0];
      if(!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({ time: show.showDateTime, showId: show._id });
    });
    return { movie, dateTime };
  } catch (error) {
    console.error("Error fetching show by ID:", error);
    throw error;
  }
};

const showService = {
  getNowPlayingShows,
  addShow,
  getAllShows,
  getShow,
};

export default showService;