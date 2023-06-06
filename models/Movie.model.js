const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  director: {
    type: String,
  },
  stars: {
    type: [String],
  },
  img: {
    type: String,
  },
  desc: {
    type: String,
  },
  showtimes: {
    type: [String],
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;