import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useStudysetStore = defineStore('studyset', () => {
    const searchResults = ref([]);
    const studySetId = ref(localStorage.getItem('studySetId') || null);

    const setSearchResults = (results) => {
        searchResults.value = results;
    };

    const setStudySetId = (id) => {
        studySetId.value = id;
    };

    // Watch for changes in studySetId and update localStorage
    watch(studySetId, (newId) => {
        localStorage.setItem('studySetId', newId);
    });

    return { searchResults, setSearchResults, studySetId, setStudySetId };
});