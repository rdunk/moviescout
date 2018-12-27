<template>
  <div v-if="isLoading" class="container mt-3 mb-3 text-center" aria-busy="true">
    Fetching data for
    <span class="font-weight-bold" v-text="movie.title"/>...
  </div>

  <div v-else class="container" :key="movie.name" aria-busy="false" aria-live="polite">
    <main class="bg-white rounded shadow-sm mt-3 mb-3" :class="$style.card">
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <img class="img-fluid" alt="Movie Poster" :src="poster">
        </div>

        <div class="col-md-6 col-lg-8">
          <div class="p-3 pl-md-0">
            <h1 class="h3 font-weight-bold mb-0">
              {{ movie.title }}
              <span class="font-weight-light">({{ movie.year}})</span>
            </h1>
            <ul class="list-inline">
              <li
                v-for="genre of movie.genres"
                :key="genre"
                :class="$style.genre"
                class="list-inline-item"
              >
                <router-link
                  :to="{ name: 'home', query: { genre } }"
                  class="text-black"
                  v-text="genre"
                />
              </li>
            </ul>
            <div class="d-flex align-items-center mt-3 mb-3">
              <MovieRating class="mr-2" :rating="rating"/>
              <MovieFavourite :name="movie.name" size="large"/>
            </div>
            <div>
              <p v-text="overview"/>
              <h6>More {{ recommendedGenre }} movies</h6>
              <ul class="list-unstyled mb-1">
                <li v-for="recommendedMovie of recommendedMovies" :key="recommendedMovie.name">
                  <router-link
                    :to="{ name: 'movie', params: { movie: recommendedMovie.name }}"
                  >{{ recommendedMovie.title }} ({{ recommendedMovie.year }})</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script>
import axios from 'axios';
import sample from 'lodash/sample';
import sampleSize from 'lodash/sampleSize';
import MovieFavourite from '@/components/MovieFavourite';
import MovieRating from '@/components/MovieRating';
import posterPlaceholder from '@/data/poster-placeholder';

// This is for demonstration purposes only!
const apiKey = '5fda2b2f64a75910c6c7870f59c56ac1';

export default {
  components: {
    MovieFavourite,
    MovieRating,
  },
  data() {
    return {
      movie: null,
      movieData: null,
    };
  },
  // We have to fetch some of our data asynchronously
  // So call fetchData on initial mount ...
  async beforeMount() {
    const { movie } = this.$route.params;
    await this.fetchData(movie);
  },
  // ... and when we switch between movies
  async beforeRouteUpdate(to, from, next) {
    const { movie } = to.params;
    await this.fetchData(movie);
    next();
  },
  computed: {
    // If movieData is null, we are loading
    // If false, the request failed
    isLoading() {
      return this.movieData === null;
    },
    overview() {
      return this.movieData && this.movieData.overview
        ? this.movieData.overview
        : 'We couldn’t find this movie’s poster, overview or rating, but you can still add it to your favourites.';
    },
    rating() {
      return this.movieData ? this.movieData.vote_average : 0;
    },
    poster() {
      return this.movieData && this.movieData.poster_path
        ? `https://image.tmdb.org/t/p/w500${this.movieData.poster_path}`
        : posterPlaceholder;
    },
    // Get a random genre
    recommendedGenre() {
      return sample(this.movie.genres);
    },
    // ... and find some random movies with the same genre to recommend
    recommendedMovies() {
      const movies = this.$store.state.movies.filter(m =>
        m.genres.findIndex(g => g === this.recommendedGenre > 1),
      );
      return sampleSize(movies, 3);
    },
  },
  methods: {
    async fetchData(movie) {
      this.movie = this.$store.getters['movie'](movie);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${
        this.movie.title
      }`;
      // Asynchronously fetch the movie data from our API
      try {
        const response = await axios.get(url);
        const { results } = response.data;
        this.movieData = results.length ? results[0] : false;
      } catch {
        this.movieData = false;
      }
    },
  },
};
</script>

<style lang="scss" module>
.card {
  overflow: hidden;
}

.genre {
  &:after {
    content: ',';
  }
  &:last-child:after {
    content: '';
  }
}
</style>
