<template>
  <button
    :class="[$style.wrap, $style[size], {[$style.active]: active}]"
    @click.prevent="favourite"
  >
    <StarIcon :class="$style.icon" aria-hidden="true"/>
    <span class="sr-only">Add to Favourites</span>
  </button>
</template>

<script>
import { StarIcon } from 'vue-feather-icons';

export default {
  components: { StarIcon },
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'normal',
    },
  },
  computed: {
    active() {
      return this.$store.state.favourites.findIndex(f => f === this.name) > -1;
    },
  },
  methods: {
    favourite() {
      this.$store.commit('addOrRemoveFavourite', this.name);
    },
  },
};
</script>

<style lang="scss" module>
@import '@/styles/variables.scss';

.wrap {
  cursor: pointer;
  padding: 0;
  background: none;
  outline: 0;
  border: none;
  &.large {
    font-size: 1.5em;
  }
  .icon {
    width: 1.5em;
    height: 1.5em;
    stroke: #dddddd;
    fill: transparent;
    transition: 250ms ease all;
  }
  &:hover,
  &:focus {
    outline: 0;
    .icon {
      stroke: $primary;
    }
  }
  &.active {
    .icon {
      stroke: $primary;
      fill: $primary;
      transform: rotateY(180deg);
    }
  }
}
</style>

