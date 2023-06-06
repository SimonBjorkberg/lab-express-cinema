// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");
const Movie = require('./models/Movie.model')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const { default: mongoose } = require("mongoose");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// default value for title local
const projectName = "lab-express-cinema";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/movies", (req, res) => {
  Movie.find()
    .then((movies) => {
      res.render("movies", { movies });
    })
    .catch((err) => console.log(err));
});

app.get('/movie-info/:id', (req, res) => {
  const movieId = req.params.id;

    Movie.find({ _id: movieId }, (err, movie) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(movie[0])
      res.render('movie-info', { movie: movie[0]})
    }
  })
})

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
