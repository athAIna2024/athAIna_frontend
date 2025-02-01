import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStudysetStore = defineStore('studyset', () => {
    const searchResults = ref([]);
    const studySetId = ref(null);
    const setSearchResults = (results) => {
        searchResults.value = results;
    };
    const setStudySetId = (id) => {
        studySetId.value = id;
    }

    return { searchResults, setSearchResults, setStudySetId, studySetId };
});

