import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTestModeStore = defineStore('testMode', () => {
    const numberOfQuestions = ref(null);
    const currentQuestionIndex = ref(0);

    const setNumberOfQuestions = (num) => {
        numberOfQuestions.value = num;
    }

    const setCurrentQuestionIndex = (index) => {
        currentQuestionIndex.value = index;
    }
    return { numberOfQuestions,
        setNumberOfQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex };
}, {
    persist: true
});