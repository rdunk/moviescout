<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-primary fixed-top">
    <div class="container d-flex justify-content-between align-items-center">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        <FilmIcon/>
        <span class="font-weight-bold">&thinsp;MovieScout</span>
      </router-link>
      <ul class="navbar-nav justify-content-center">
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" to="/favourites">Favourites</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { FilmIcon } from 'vue-feather-icons';

export default {
  components: {
    FilmIcon,
  },
};
</script>
