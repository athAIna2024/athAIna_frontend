import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export const useStudysetStore = defineStore('studyset', () => {
    const route = useRoute();
    const searchResults = ref([]);
    const studySetId = ref(route.params.studySetId ? route.params.studySetId : null);
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

    return { searchResults, setSearchResults, studySetId, setStudySetId, studySetTitle, setStudySetTitle };
}, {

});