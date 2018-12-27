<template>
  <nav aria-label="Movies List Paginations" v-if="totalPages > 1">
    <ul class="pagination justify-content-center justify-content-md-start">
      <li class="page-item" :class="{'disabled' : isFirstPage }">
        <a
          v-if="!isFirstPage"
          class="page-link"
          :href="`?${queryParameter}=${page - 1}`"
          @click.prevent="$emit('page', page - 1)"
        >
          <span aria-hidden="true">&lsaquo;</span>
          <span class="sr-only">Previous</span>
        </a>
        <span v-else class="page-link">
          <span aria-hidden="true">&lsaquo;</span>
          <span class="sr-only">Previous</span>
        </span>
      </li>

      <li
        v-for="number of totalPages"
        :key="number"
        :class="['page-item', {'active': number === page}]"
      >
        <a
          class="page-link"
          :href="`?${queryParameter}=${number}`"
          @click.prevent="$emit('page', number)"
        >{{ number }}</a>
      </li>

      <li class="page-item" :class="{'disabled' : isLastPage }">
        <a
          v-if="!isLastPage"
          class="page-link"
          :href="`?${queryParameter}=${page + 1}`"
          @click.prevent="$emit('page', page + 1)"
        >
          <span aria-hidden="true">&rsaquo;</span>
          <span class="sr-only">Next</span>
        </a>
        <span v-else class="page-link">
          <span aria-hidden="true">&rsaquo;</span>
          <span class="sr-only">Next</span>
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    queryParameter: {
      type: String,
      default: 'page',
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage, 1);
    },
    isFirstPage() {
      return this.page <= 1;
    },
    isLastPage() {
      return this.page >= this.totalPages;
    },
  },
};
</script>
