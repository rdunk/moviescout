<template>
  <div id="app" aria-busy="false">
    <AppHeader/>
    <router-view/>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style lang="scss">
// Expose our base styles globally
@import '@/styles/base.scss';
</style>
