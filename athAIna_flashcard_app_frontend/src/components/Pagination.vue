<script>
export default {
  name: 'Pagination',
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    pages() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('update:currentPage', page);
      }
    }
  }
}
</script>

<template>
  <div class="pagination flex justify-center mt-4 mb-6">
    <!-- Previous Button -->
    <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage <= 1"
        class="px-4 py-2 bg-gray-300 rounded-l-md"
    >
      Prev
    </button>

    <!-- Page Numbers -->
    <span
        v-for="page in pages"
        :key="page"
        @click="goToPage(page)"
        :class="{'bg-blue-500 text-white': page === currentPage, 'cursor-pointer': page !== currentPage}"
        class="px-4 py-2 mx-1 rounded-md"
    >
      {{ page }}
    </span>

    <!-- Next Button -->
    <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="px-4 py-2 bg-gray-300 rounded-r-md"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.pagination span {
  cursor: pointer;
}
.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>