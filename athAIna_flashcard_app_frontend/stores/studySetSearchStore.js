import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useStudySetSearchStore = defineStore('studySetSearch', () => {
    const searchResults = ref([]);

    const setSearchResults = (results) => {
        searchResults.value = results;
    };

    const getSearchResults = () => {
        return searchResults.value;
    }

    return { searchResults, setSearchResults, getSearchResults };
}, {

});