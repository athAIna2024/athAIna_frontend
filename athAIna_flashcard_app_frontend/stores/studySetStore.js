import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// If local storage is used, we cannot have multiple tabs open with different data
// If we use route, there is a security risk of users accessing data they should not have access to
export const useStudysetStore = defineStore('studyset', () => {
    const route = useRoute();
    const searchResults = ref([]);
    const studySetId = ref(route.params.studySetId || null);
    const studySetTitle = ref(route.params.studySetTitle ? decodeURIComponent(route.params.studySetTitle) : null);

    const setSearchResults = (results) => {
        searchResults.value = results;
    };

    const setStudySetId = (id) => {
        studySetId.value = id;
    };

    const setStudySetTitle = (title) => {
        studySetTitle.value = title;
    };

    // Watch for changes in route params and update the store
    watch(() => route.params.studySetId, (newId) => {
        studySetId.value = newId;
    });

    watch(() => route.params.studySetTitle, (newTitle) => {
        studySetTitle.value = newTitle ? decodeURIComponent(newTitle) : null;
    });

    return { searchResults, setSearchResults, studySetId, setStudySetId, studySetTitle, setStudySetTitle };
});