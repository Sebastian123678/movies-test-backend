const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Genre.belongsToMany(Movie, { through: "GenresMovies" })
Movie.belongsToMany(Genre, { through: "GenresMovies" })

Movie.belongsToMany(Actor, { through: "MoviesActors" })
Actor.belongsToMany(Movie, { through: "MoviesActors" })

Director.belongsToMany(Movie, { through: "DirectorsMovies" })
Movie.belongsToMany(Director, { through: "DirectorsMovies" })

