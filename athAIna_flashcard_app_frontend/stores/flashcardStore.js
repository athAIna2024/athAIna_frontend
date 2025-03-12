import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFlashcardStore = defineStore('flashcard', () => {
  const searchResults = ref({});

  const setSearchResults = (studySetId, results) => {
    searchResults.value[studySetId] = results;
  };

  const getSearchResults = (studySetId) => {
    return searchResults.value[studySetId] || [];
  };

  return {
    searchResults,
    setSearchResults,
    getSearchResults,
  };
});