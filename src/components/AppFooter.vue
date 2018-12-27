<template>
  <footer :class="$style.footer">
    <div class="mt-4 p-3 bg-dark text-white small d-sm-flex justify-content-between">
      <div>
        &copy; {{ (new Date()).getFullYear()
        }} MovieScout
      </div>
      <div>
        MovieScout uses data from
        <a
          class="text-white"
          href="https://www.themoviedb.org/"
          target="_blank"
        >The Movie DB.</a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" module>
// Our #app div is flex container, so push the footer down
.footer {
  margin-top: auto;
}
</style>
