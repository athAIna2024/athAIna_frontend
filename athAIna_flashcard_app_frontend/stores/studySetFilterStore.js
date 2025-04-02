import { defineStore } from 'pinia';
import { ref } from 'vue';
import {useStudySetSearchStore} from "./studySetSearchStore.js";

export const useStudySetFilterStore = defineStore('studySetFilter', () => {
    const filterResults = ref([]);
    const isFilterActive = ref(false);
    const studySetSearchStore = useStudySetSearchStore();

    const setFilterResults = (results) => {
        filterResults.value = results;
        isFilterActive.value = true;
        studySetSearchStore.clear(); // Clear search results when filter is applied
    };

    const getFilterResults = () => {
        return filterResults.value;
    };

    const getFilterActiveStatus = () => {
        return isFilterActive.value;
    }

    const clear = () => {
        filterResults.value = [];
        isFilterActive.value = false;
    };

    return { setFilterResults, getFilterResults, getFilterActiveStatus, clear };
});