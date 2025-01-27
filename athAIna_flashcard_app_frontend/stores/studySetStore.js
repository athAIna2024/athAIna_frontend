import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStudysetStore = defineStore('studyset', () => {
    const searchResults = ref([]);

    const setSearchResults = (results) => {
        searchResults.value = results;
    };

    return { searchResults, setSearchResults };
});