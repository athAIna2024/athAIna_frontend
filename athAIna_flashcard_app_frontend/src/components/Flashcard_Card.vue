<script>
export default {
  name: 'Flashcard_Card',
  props: {
    flashcard: Object
  },
};
</script>

<template>
  <button class="border-athAIna-red border-4 rounded-lg m-4 p-6 py-16 w-96" @click="goFlashCard()">
    <h1 class="">{{ flashcard.question }}</h1>
    <div class="border-athAIna-red border-t-2 border-0 mt-8 flex justify-end">
      <button class="p-2">Edit</button>
      <button class="p-2">Delete</button>
    </div>
  </button>
</template>

<style scoped>
</style>