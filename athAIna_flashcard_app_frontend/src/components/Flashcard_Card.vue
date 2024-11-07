<script>
export default {
  name: 'Flashcard_Card',
  props: {
    flashcard: Object
  },
};
</script>

<template>
  <div class="athAIna-border-inner">
  <div class="athAIna-border-inner border-4 rounded-lg m-4 p-6 py-16 w-96" @click="goFlashCard()">
    <h1 class="">{{ flashcard.question }}</h1>
    <div class="athAIna-border-outer">
    <div class="athAIna-border-inner border-t-2 border-0 mt-8 flex justify-end">
      <router-link to="/edit_flashcard:id" class="text-athAIna-red">
        <button class="p-2">Edit</button>
      </router-link>
      <router-link to="delete_flashcard:id" class="text-athAIna-red">
        <button class="p-2">Delete</button>
      </router-link>
    </div>
      </div>
  </div></div>
</template>

<style scoped>
</style>