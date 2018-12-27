import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import slugify from '@sindresorhus/slugify';
import data from '@/data/MOCK_DATA.json';

Vue.use(Vuex);

// Make our raw data a little easier to work with
// 1. Rename the properties
// 2. Convert the string of genres to an array
const movies = data.map(movie => ({
  title: movie.movie_title,
  name: slugify(movie.movie_title),
  genres: movie.movie_genre.split('|'),
  year: movie.movie_year,
}));

// Helper function for sorting objects by a given key, with added reverse option
const sortBy = (k, reverse = false) => {
  const sortIndex = reverse ? -1 : 1;
  return (a, b) => (a[k] > b[k] ? sortIndex : b[k] > a[k] ? -sortIndex : 0);
};

export default new Vuex.Store({
  state: {
    movies,
    favourites: [],
  },
  getters: {
    // Use method style access to pass arguments
    // This way we don't duplicate state already in the URL in the store
    movie: ({ movies }) => name => {
      return movies.find(movie => movie.name === name);
    },
    // Use method style access to pass arguments
    movies: ({ movies }) => ({ sort, genre }) => {
      // Filter movies that match the genre if defined
      const filtered = genre
        ? movies.filter(movie => {
            return movie.genres.findIndex(g => g === genre) > -1;
          })
        : movies;
      const reverse = sort === 'desc';
      // Sort movies by title and then by year
      return filtered.sort(sortBy('title')).sort(sortBy('year', reverse));
    },
    genres({ movies }) {
      // Use a Set object to avoid duplicates
      const genreSet = movies.reduce((genres, movie) => {
        movie.genres.forEach(genre => {
          genres.add(genre);
        });
        return genres;
      }, new Set());
      // Create an array from the set
      const genreArray = Array.from(genreSet);
      // Array of strings, so this will sort alphabetically
      return genreArray.sort();
    },
    favourites({ movies, favourites }) {
      // Favourites are stored by name, so find their matching objects
      const favouriteMovies = favourites.map(f =>
        movies.find(m => m.name === f),
      );
      // Sort favourite movies by title
      return favouriteMovies.sort(sortBy('title'));
    },
  },
  mutations: {
    addOrRemoveFavourite({ favourites }, name) {
      const existing = favourites.findIndex(f => f === name);
      const alreadyFavourited = existing > -1;
      if (alreadyFavourited) {
        favourites.splice(existing, 1);
      } else {
        favourites.push(name);
      }
    },
  },
  plugins: [
    createPersistedState({
      paths: ['favourites'],
    }),
  ],
});
