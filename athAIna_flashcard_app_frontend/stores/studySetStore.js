import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export const useStudysetStore = defineStore('studyset', () => {
    const route = useRoute();
    const studySetId = ref(route.params.studySetId ? route.params.studySetId : null);
    const studySetTitle = ref(route.params.studySetTitle ? decodeURIComponent(route.params.studySetTitle) : null);


    const setStudySetId = (id) => {
        studySetId.value = id;
    };

    const setStudySetTitle = (title) => {
        studySetTitle.value = title;
    };

    const clear = () => {
        studySetId.value = null;
        studySetTitle.value = null;
    }

    return { studySetId, setStudySetId, studySetTitle, setStudySetTitle, clear };
}, {
    persist: true,
});