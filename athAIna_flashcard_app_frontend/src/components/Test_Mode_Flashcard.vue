<script setup>

import { ref } from 'vue';
import { watch } from 'vue';

import { defineProps } from 'vue';
import { useTestModeStore} from "../../stores/testModeStore.js";

const testModeStore = useTestModeStore();
const question = ref(true);
const answer = ref(false);
const result = ref(false);
const learner_answer = ref(null);
const showAnswer = ref(false);
const showQuestion = ref(true);

const props = defineProps({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});


const submitAnswer = () => {
  displayAnswer();
};


const displayAnswer = () => {
  showAnswer.value = true;
  showQuestion.value = false;

  setTimeout(() => {
    transitionToNext();
  }, 1000); // To be adjusted to 6000 milliseconds, 1000 milliseconds is for testing purposes

};

const transitionToNext = () => {
  showAnswer.value = false;
  if (!showAnswer.value && testModeStore.currentQuestionIndex < testModeStore.numberOfQuestions) {
    const increment = testModeStore.currentQuestionIndex + 1;
    testModeStore.setCurrentQuestionIndex(increment);
    showQuestion.value = true;
  } else {

    // Shows the summary of score in 500 milliseconds
    showAnswer.value = true;
    showQuestion.value = false;
    setTimeout(() => {
      testModeStore.setIsTestCompleted(true);
    }, 500); // To be adjusted to 6000 milliseconds, 1000 milliseconds is for testing purposes
  }
};

</script>

<template>

<!--  <Transition name="fade">-->
    <div v-if="showQuestion" class="athAIna-border-outer p-1 my-4">
      <div class="athAIna-border-inner">
        <div class="text-athAIna-violet m-auto flex items-center justify-center h-96">
          {{ props.question }}
        </div>
        <div class="h-20">
          <div class="px-12 py-4 flex flex-row gap-10 justify-between ">
            <div class="athAIna-border-outer p-1 rounded-[20px] h-[40px]">
              <div class="athAIna-border-inner rounded-[15px] relative flex flex-row items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-orange ml-2 mr-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input type="text" v-model="learner_answer" placeholder="Enter Answer" class="text-[14px] text-athAIna-orange placeholder-athAIna-orange focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]">
              </div>
            </div>

            <button class="btn w-48" @click="submitAnswer"> Send </button>
          </div>
        </div>
      </div>
    </div>
<!--  </Transition>-->

  <Transition name="slide-fade">
    <div v-if="showAnswer" class="athAIna-border-outer p-1 my-4">
      <div class="athAIna-border-inner">
        <div class="px-10 py-8 flex items-center">
          <span class="text-athAIna-base">
            {{ props.question }}
          </span>
        </div>

        <div class="flex flex-col px-10 py-8 gap-y-4">
          <span class="text-athAIna-sm">
            Your answer
          </span>
          <span class="text-athAIna-green text-athAIna-base">
            insert learner answer
          </span>
        </div>

        <div class="m-6">
          <div class="athAIna-border-outer p-0.5">
          </div>
        </div>

        <div class="flex flex-col px-10 py-8 gap-y-4">
          <span class="text-athAIna-sm">
            Correct answer
          </span>
          <span class="text-athAIna-green text-athAIna-base">
            {{ props.answer }}
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style scoped>

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>