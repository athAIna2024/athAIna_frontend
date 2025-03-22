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

  const clear = () => {
    searchResults.value = {};
  };

  return {
    searchResults,
    setSearchResults,
    getSearchResults,
    clear,
  };
});

