<script>
export default {
  name: 'Flashcard_Card',
};
</script>

<template>
  <button class="border-athAIna-red border-4 rounded-lg m-4 p-6 py-16 w-96" @click="goFlashCard(flashcard.id)">
    <h1 class="">{{ question }}</h1>
    <div class="border border-athAIna-red border-t-2 border-0 mt-8 flex justify-end">
      <button @click="editFlashCard(flashcard)" class="p-2">Edit</button>
      <button @click="deleteFlashCard(flashcard)" class="p-2">Delete</button>
    </div>
  </button>
</template>

<style scoped>
</style>