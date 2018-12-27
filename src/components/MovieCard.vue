<template>
  <div
    class="d-flex my-2 p-3 bg-white rounded shadow-sm justify-content-between align-items-center"
  >
    <div class="pr-2">
      <router-link :to="{ name: 'movie', params: { movie: name }}">
        <div class="font-weight-bold h6 mb-0">
          {{ title }}
          <span class="font-weight-light">({{ year }})</span>
        </div>
      </router-link>
      <div v-text="genreString"/>
    </div>

    <MovieFavourite :name="name"/>
  </div>
</template>

<script>
import MovieFavourite from '@/components/MovieFavourite';

export default {
  components: { MovieFavourite },
  props: {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    genres: {
      type: Array,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  computed: {
    genreString() {
      return this.genres.join(', ');
    },
  },
};
</script>
