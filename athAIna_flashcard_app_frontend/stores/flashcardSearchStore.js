import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFlashcardSearchStore = defineStore('flashcardSearch', () => {
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

