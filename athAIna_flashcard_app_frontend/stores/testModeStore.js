import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTestModeStore = defineStore('testMode', () => {
    const numberOfQuestions = ref(null);
    const currentQuestionIndex = ref(0);
    const testModeQuestions = ref([]);

    const setNumberOfQuestions = (num) => {
        numberOfQuestions.value = num;
    }

    const setCurrentQuestionIndex = (index) => {
        currentQuestionIndex.value = index;
    }

    const setTestModeQuestions = (questions) => {
        testModeQuestions.value = questions;
    }

    return { numberOfQuestions,
        setNumberOfQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        testModeQuestions,
        setTestModeQuestions
    };
}, {
    persist: true
});