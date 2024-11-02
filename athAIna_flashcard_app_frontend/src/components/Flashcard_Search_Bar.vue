<script>
export default {
  name: 'Flashcard_Search_Bar',
  data() {
    return {
      input: ''
    }
  }
};
</script>

<template>
  <div class="">
  <input type="text" v-model="input" class="border border-AthMagenta border-2 rounded-lg p-2" placeholder="Search flashcards">
  </div>
</template>

<style scoped>
</style>