import Vue from 'vue';
import Router from 'vue-router';
import Movies from './views/Movies.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Movies,
    },
    { path: '/movies', redirect: '/' },
    {
      path: '/movies/:movie',
      name: 'movie',
      component: () =>
        import(/* webpackChunkName: "movie" */ './views/Movie.vue'),
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: () =>
        import(/* webpackChunkName: "favourites" */ './views/Favourites.vue'),
    },
  ],
});
