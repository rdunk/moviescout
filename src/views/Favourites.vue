<template>
  <div class="container">
    <div class="my-3">
      {{ headerString }}
      <router-link v-if="!favourites.length" :to="{ name: 'home'}">Click here to add some.</router-link>
    </div>

    <MovieList :movies="favourites"/>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList';

export default {
  components: {
    MovieList,
  },
  computed: {
    favourites() {
      return this.$store.getters['favourites'];
    },
    headerString() {
      const { length } = this.favourites;
      const favourite = length === 1 ? 'favourite' : 'favourites';
      return `You have ${length} ${favourite}.`;
    },
  },
};
</script>
