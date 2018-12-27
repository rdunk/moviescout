<template>
  <div class="row my-3 align-items-center">
    <div class="col-md-4 col-lg-6 mb-2 mb-md-0">Found {{ movies.length }} movies.</div>

    <div class="col-6 col-md-4 col-lg-3 ml-auto">
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <label class="input-group-text" for="genreSelect">Genre</label>
        </div>
        <select
          class="custom-select"
          id="genreSelect"
          :value="genre"
          @input="$emit('genre', $event.target.value)"
        >
          <option :value="null">All</option>
          <option v-for="genre of genres" :key="genre" :value="genre">{{ genre }}</option>
        </select>
      </div>
    </div>

    <div class="col-6 col-md-4 col-lg-3">
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <label class="input-group-text" for="sortSelect">Sort</label>
        </div>
        <select
          class="custom-select"
          id="sortSelect"
          :value="sort"
          @input="$emit('sort', $event.target.value)"
        >
          <option selected value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movies: {
      type: Array,
      required: true,
    },
    genre: {
      required: true,
      validator: prop => typeof prop === 'string' || prop === null,
    },
    sort: {
      type: String,
      required: true,
    },
  },
  computed: {
    genres() {
      return this.$store.getters['genres'];
    },
  },
};
</script>
