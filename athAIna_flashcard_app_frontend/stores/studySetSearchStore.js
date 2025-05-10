import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useStudySetFilterStore } from './studySetFilterStore.js';

export const useStudySetSearchStore = defineStore('studySetSearch', () => {
    const searchResults = ref([]);
    const isSearchActive = ref(false);
    const studySetFilterStore = useStudySetFilterStore();

    const setSearchResults = (results) => {
        searchResults.value = results;
        isSearchActive.value = true;
        studySetFilterStore.clear(); // Clear filter results when search is performed
    };

    const getSearchResults = () => {
        return searchResults.value;
    };

    const getSearchActiveStatus = () => {
        return isSearchActive.value;
    };

    const clear = () => {
        searchResults.value = [];
        isSearchActive.value = false;
    };

    return { getSearchActiveStatus, setSearchResults, getSearchResults, clear };
});