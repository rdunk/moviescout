<template>
  <main class="container">
    <MoviesHeader :movies="movies" :sort="sort" @sort="onSort" :genre="genre" @genre="onGenre"/>

    <MovieList :movies="paginatedMovies"/>

    <AppPagination
      :page="page"
      @page="onPage"
      :total-items="movies.length"
      :per-page="itemsPerPage"
    />
  </main>
</template>

<script>
import AppPagination from '@/components/AppPagination';
import MoviesHeader from '@/components/MoviesHeader';
import MovieList from '@/components/MovieList';

export default {
  components: {
    AppPagination,
    MoviesHeader,
    MovieList,
  },
  data() {
    return {
      genre: null,
      itemsPerPage: 10,
      page: 1,
      sort: 'desc',
    };
  },
  created() {
    this.setDataFromQuery(this.$route.query);
  },
  watch: {
    $route({ query }) {
      this.setDataFromQuery(query);
    },
  },
  computed: {
    genres() {
      return this.$store.getters['genres'];
    },
    movies() {
      const { sort, genre } = this;
      return this.$store.getters['movies']({ sort, genre });
    },
    numberOfPages() {
      return Math.ceil(this.movies.length / this.itemsPerPage, 1);
    },
    paginatedMovies() {
      const { page, movies } = this;
      let firstIndex = 0;
      if (page) {
        firstIndex = (page - 1) * this.itemsPerPage;
      }
      const lastIndex = firstIndex + 10;
      return movies.slice(firstIndex, lastIndex);
    },
  },
  methods: {
    onGenre(genre) {
      const query = { ...this.$route.query };
      delete query.page;
      if (genre) {
        query.genre = genre;
      } else {
        delete query.genre;
      }
      this.$router.push({ query });
    },
    onPage(page) {
      const query = { ...this.$route.query };
      if (page) {
        query.page = page;
      } else {
        query.page = 1;
      }
      this.$router.push({ query });
    },
    onSort(sort) {
      const query = { ...this.$route.query, sort };
      delete query.page;
      this.$router.push({ query });
    },
    setDataFromQuery({ page, sort, genre }) {
      this.setGenre(genre);
      this.setPage(page);
      this.setSort(sort);
    },
    setGenre(genre) {
      // Only allow setting of a genre that exists in the store
      const match = this.genres.find(g => g === genre);
      this.genre = match || null;
    },
    setPage(page) {
      page = page || 1;
      const minPage = 1;
      const maxPage = this.numberOfPages;
      this.page = Math.min(Math.max(page, minPage), maxPage);
    },
    setSort(sort) {
      if (sort === 'asc') {
        this.sort = sort;
      } else {
        this.sort = 'desc';
      }
    },
  },
};
</script>
