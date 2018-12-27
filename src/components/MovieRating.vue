<template>
  <div :class="$style.wrap">
    <svg :width="`${width}em`" :height="`${width}em`">
      <circle
        :class="$style.circle"
        stroke="#e5d0fb"
        :stroke-width="`${strokeWidth}em`"
        fill="transparent"
        :r="`${radius}em`"
        cx="50%"
        cy="50%"
      ></circle>
      <circle
        :class="$style.circle"
        stroke="#7413dc"
        :stroke-width="`${strokeWidth}em`"
        :stroke-dasharray="`${circumference}em ${circumference}em`"
        :stroke-dashoffset="`${progress}em`"
        fill="transparent"
        :r="`${radius}em`"
        cx="50%"
        cy="50%"
      ></circle>
    </svg>
    <small :class="$style.rating">{{ rating * 10 }}%</small>
  </div>
</template>


<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      default: 2.75,
    },
    strokeWidth: {
      type: Number,
      default: 0.35,
    },
  },
  computed: {
    radius() {
      return (this.width - this.strokeWidth) / 2;
    },
    circumference() {
      return this.radius * 2 * Math.PI;
    },
    progress() {
      return this.circumference - (this.rating / 10) * this.circumference;
    },
  },
};
</script>

<style lang="scss" module>
.wrap {
  position: relative;
  display: inline-block;
}

.circle {
  transition: 0.35s stroke-dashoffset;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.rating {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
