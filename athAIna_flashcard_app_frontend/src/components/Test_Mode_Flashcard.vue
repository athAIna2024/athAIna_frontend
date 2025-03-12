<script setup>

import { ref } from 'vue';
import { computed } from 'vue';

import { defineProps } from 'vue';
import { useTestModeStore} from "../../stores/testModeStore.js";
import {testModeDB} from "@/views/flashcardapp/dexie.js";
import axios from '@/axios';

const ai_validation_url = 'test/validate_learner_answer/';
const save_test_results_url = 'test/save/'
const isSuccessful = ref(false);
const message = ref(null);

const isSuccessful_save = ref(false);
const message_save = ref(null);

const testModeStore = useTestModeStore();
const learner_answer = ref(null);
const showAnswer = ref(false);
const showQuestion = ref(true);
const batchId = ref(testModeStore.batchId);

const is_correct = ref(false);
const answerClass = computed(() => {
  return is_correct.value ? 'text-athAIna-green' : 'text-athAIna-red';
});

const props = defineProps({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  flashcardId: {
    type: Number,
    required: true,
  }
});


const submitAnswer = async () => {
  is_correct.value = await validateAnswer();

  const newTestField = {
    flashcard_id: props.flashcardId,
    batch_id: batchId.value,
    created_at: testModeStore.created_at,
    learner_answer: learner_answer.value,
    is_correct: is_correct.value,
    corrected_at: new Date(),
  }

  try
  {
    await testModeDB.test_field.add(newTestField);
  } catch (error) {
    console.error(error);
  }


  displayAnswer();

};


const validateAnswer = async (correctAnswer) => {
  if (!learner_answer.value) {
    return false;
  } else {
    if (learner_answer.value.toLowerCase() === props.answer.toLowerCase()) {
      return true;
    } else {
      return await validateLearnAnswerWithAi();
    }
  }
}

const validateLearnAnswerWithAi = async () => {
  try {
    const response = await axios.get(`${ai_validation_url}${Number(props.flashcardId)}/`, {
      params: {
        learner_answer: learner_answer.value
      }
    });

    isSuccessful.value = response.data.successful;

    if (isSuccessful.value) {
      if (response.data.is_correct) {
        return true;
      } else {
        return false;
      }
    } else {
      isSuccessful.value = false;
      message.value = response.data.message;
    }
  } catch (error) {
    console.error("Error", error);
    isSuccessful.value = false;
    message.value = error.message;
  }
};

const displayAnswer = () => {
  showAnswer.value = true;
  showQuestion.value = false;
};

const transitionToNext = () => {
  try {
    showAnswer.value = false;
    if (testModeStore.currentQuestionIndex + 1 < testModeStore.numberOfQuestions) {
      const increment = testModeStore.currentQuestionIndex + 1;
      testModeStore.setCurrentQuestionIndex(increment);

      learner_answer.value = null; // Reset the learner's answer
      showQuestion.value = true;
    } else {
      // Shows the summary of score in 500 milliseconds
      showAnswer.value = true;
      showQuestion.value = false;
      testModeStore.setIsTestCompleted(true);

      if (testModeStore.isTestCompleted) {
        console.log("Test Completed");
        saveTestResults();
      }

    }
  } catch (error) {
    console.error("Error during transition:", error);
  }
};

const saveTestResults = async () => {
  try {
    const testResults = await testModeDB.test_field.where('batch_id').equals(batchId.value).toArray();

    const cleanTestResults = testResults.map((result) => {
      return {
        flashcard_instance: Number(result.flashcard_id), // Convert to number
        batch_id: result.batch_id, // Keep as string since it's a UUID
        created_at: new Date(result.created_at).toISOString(), // Convert to ISO string
        learner_answer: String(result.learner_answer).trim(), // Convert to string and trim whitespace
        is_correct: Boolean(result.is_correct), // Convert to boolean
        corrected_at: new Date(result.corrected_at).toISOString() // Convert to ISO string
      };
    });
    console.log("Clean Test Results", cleanTestResults);

    const request = await axios.post(save_test_results_url, cleanTestResults);

    isSuccessful_save.value = request.data.successful;
    message_save.value = request.data.message;
    console.log("Did it save successfully?", isSuccessful_save.value);

  } catch (error) {
    isSuccessful_save.value = false;
    message_save.value = error.message;
    console.error("Failed to save the data", error);
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
          <span :class="[answerClass, 'text-athAIna-base']">
            {{ learner_answer || 'You did not provide an answer' }}
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

        <div class="px-10 py-8 flex items-center justify-end">
          <button class="btn w-48" @click="transitionToNext">Next</button>
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