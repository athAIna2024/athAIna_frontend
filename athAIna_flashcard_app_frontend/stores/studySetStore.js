import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export const useStudysetStore = defineStore('studyset', () => {
    const route = useRoute();
    const searchResults = ref([]);
    const studySetId = ref(null);
    const studySetTitle = ref(null);

    const setSearchResults = (results) => {
        searchResults.value = results;
    };

    const setStudySetId = (id) => {
        studySetId.value = id;
    };

    const setStudySetTitle = (title) => {
        studySetTitle.value = title;
    };

    const getStudySetId = () => {
        return studySetId.value;
    }

    // Watch for changes in route params and update the store if not already set
    watch(() => route.params.studySetId, (newId) => {
        if (!studySetId.value) {
            studySetId.value = newId;
        }
    });

    watch(() => route.params.studySetTitle, (newTitle) => {
        if (!studySetTitle.value) {
            studySetTitle.value = newTitle ? decodeURIComponent(newTitle) : null;
        }
    });

    return { searchResults, setSearchResults, studySetId, setStudySetId, studySetTitle, setStudySetTitle, getStudySetId };
}, {
    persist: true,
});