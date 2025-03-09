import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTestModeStore = defineStore('testMode', () => {
    const numberOfQuestions = ref(null);
    const currentQuestionIndex = ref(0);
    const testModeQuestions = ref([]);
    const isTestCompleted = ref(false);
    const batchId = ref(null);

    const setNumberOfQuestions = (num) => {
        numberOfQuestions.value = num;
    }

    const setCurrentQuestionIndex = (index) => {
        currentQuestionIndex.value = index;
    }

    const setTestModeQuestions = (questions) => {
        testModeQuestions.value = questions;
    }

    const setIsTestCompleted = (bool) => {
        isTestCompleted.value = bool;
    }

    const setBatchId = (id) => {
        batchId.value = id;
    }

    return { numberOfQuestions,
        setNumberOfQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        testModeQuestions,
        setTestModeQuestions,
        isTestCompleted,
        setIsTestCompleted,
        batchId,
        setBatchId
    };
}, {
    persist: true
});