<script>
export default {
  name: "Delete_Confirmation.vue",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Modal Title",
    },
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  watch: {
    isVisible(newValue) {
      if (newValue) {
        document.title = `${this.title}`;
      } else {
        document.title = `Library – athAIna`
      }
    },
  }
}
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-athAIna-black bg-opacity-50 z-50">
    <div class="athAIna-border-outer flex flex-col w-80 p-1 m-2">
      <div class="flex flex-col justify-between space-y-3 items-center athAIna-border-inner p-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="green" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <p> Flashcard Deleted </p>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>