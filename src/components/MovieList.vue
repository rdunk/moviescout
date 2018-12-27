<template>
  <div class="my-3" role="list">
    <MovieCard
      v-for="movie of movies"
      :key="movie.name"
      :title="movie.title"
      :name="movie.name"
      :genres="movie.genres"
      :year="movie.year"
      role="listitem"
    />
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard';

export default {
  components: {
    MovieCard,
  },
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
};
</script>
