// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const Movie = require("../models/Movie.model");
const movies = require("../seeds/movies.seed");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-express-cinema";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .then(() => Movie.deleteMany())
  .then(() => {
    movies.forEach((movie) => {
      Movie.create({
        title: movie.title,
        director: movie.director,
        stars: movie.stars,
        img: movie.image,
        desc: movie.description,
        showtimes: movie.showtimes,
      });
    });
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
