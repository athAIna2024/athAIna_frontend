import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFlashcardStore = defineStore('flashcard', () => {
  const searchResults = ref([]);
  const setSearchResults = (results) => {
    searchResults.value = results;
  };

  return {
    searchResults,
    setSearchResults,
  };
});