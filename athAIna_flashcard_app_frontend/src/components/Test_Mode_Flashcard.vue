<script setup>

import { ref } from 'vue';
import { computed } from 'vue';

import { defineProps } from 'vue';
import { useTestModeStore} from "../../stores/testModeStore.js";
import { useStudysetStore } from "../../stores/studySetStore.js";
import {testModeDB} from "@/views/flashcardapp/dexie.js";
import axios from '@/axios';
import {useRoute} from "vue-router";
import { useUserStore} from "../../stores/userStore.js";

const userStore = useUserStore();
const learnerId = userStore.getUserID();

const ai_validation_url = 'test/validate_learner_answer/';
const save_test_results_url = 'test/save/'
const save_test_batch_url = 'test/save_batch/'
const isSuccessful = ref(false);
const message = ref(null);

const isSuccessful_save = ref(false);
const message_save = ref(null);

const isSuccessful_save_batch = ref(false);
const message_save_batch = ref(null);

const testModeStore = useTestModeStore();
const studySetStore = useStudysetStore();
const learner_answer = ref(null);
const showAnswer = ref(false);
const showQuestion = ref(true);

const batchId = testModeStore.batchId; // Originally has ref but for testing atm it is gonna removed
const batch_pk = ref(null); // Primary Key of the batch

const test_score_url = 'report/save/';
const questionLength = testModeStore.numberOfQuestions;
const correctAnswersCount = ref(0);
const studySetId = studySetStore.studySetId; // It is set to Test Mode vue template
const isSuccessful_save_score = ref(false);
const message_save_score = ref(null);

const emit = defineEmits(['showScore']);

const is_correct = ref(false);

const answerClass = computed(() => {
  return is_correct.value ? 'text-athAIna-green' : 'text-athAIna-red';
});


const props = defineProps({
  question: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
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
    batch_id: batchId,
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
        emit('showScore')
      }

    }
  } catch (error) {
    console.error("Error during transition:", error);
  }
};

const saveTestResults = async () => {
  try {
    // Ensure saveTestBatch completes successfully before proceeding
    await saveTestBatch();

    if (!batch_pk.value) {
      throw new Error('Batch primary key is not set.');
    }

    const testResults = await testModeDB.test_field.where('batch_id').equals(batchId).toArray();
    correctAnswersCount.value = testResults.filter(result => result.is_correct).length;
    console.log("Correct Answers Count", correctAnswersCount.value);

    const cleanTestResults = testResults.map((result) => {
      return {
        flashcard_instance: Number(result.flashcard_id), // Convert to number
        batch: Number(batch_pk.value), // Convert to number
        created_at: new Date(result.created_at).toISOString(), // Convert to ISO string
        learner_answer: String(result.learner_answer).trim(), // Convert to string and trim whitespace
        is_correct: Boolean(result.is_correct), // Convert to boolean
        corrected_at: new Date(result.corrected_at).toISOString() // Convert to ISO string
      };
    });
    console.log("Clean Test Results", cleanTestResults);

    const request = await axios.post(save_test_results_url, cleanTestResults);

    console.log(request.data);

    isSuccessful_save.value = request.data.successful;
    message_save.value = request.data.message;
    console.log("Did it save successfully?", isSuccessful_save.value);


    await saveTestScore();

  } catch (error) {
    isSuccessful_save.value = false;
    message_save.value = error.message;
    console.error("Failed to save the data", error);
  }
};

const saveTestBatch = async () => {
  try {
    const request = await axios.post(save_test_batch_url, {
      batch_id: batchId,
    });

    console.log("SAVE BATCH ID", request.data.data.id);

    batch_pk.value = request.data.data.id;
    testModeStore.setBatchPk(batch_pk.value);

    isSuccessful_save_batch.value = request.data.successful;
    message_save_batch.value = request.data.message;

  } catch (error) {
    isSuccessful_save_batch.value = false;
    message_save_batch.value = error.message;
  }
};

// Have to move probably at test mode flashcard because batch Pk was set there.
const saveTestScore = async () => {

  try {
    const newTestScore = {
      user_id: Number(learnerId),
      batch: batch_pk.value,
      studyset_instance: studySetId,
      score: correctAnswersCount.value,
      number_of_questions: questionLength,
      submitted_at: new Date().toISOString(),
    };

    console.log("Saving test score for report", newTestScore);
    const request = await axios.post(test_score_url, newTestScore);

    console.log(request.data);

    isSuccessful_save_score.value = request.data.successful;
    message_save_score.value = request.data.message;

    if (isSuccessful_save_score.value) {
      console.log("Test score saved successfully");
      console.log(request.data);
    } else {
      console.error("Error saving test score:", message_save_score.value);
    }
  } catch (error) {
    isSuccessful_save_score.value = false;
    message_save_score.value = error.message;
    console.error("Failed to save the data", error);
  }
};

const isValidImage = computed(() => {
  return (
      typeof props.image === "string" &&
      props.image.trim() !== "" &&
      props.image.startsWith("http")
  );
});

</script>

<template>

<!--  <Transition name="fade">-->
    <div v-if="showQuestion" class="athAIna-border-outer p-1 my-4 h-[500px]">
      <div class="athAIna-border-inner h-[491px]">
        <div class="flex lg:flex-row items-center justify-center p-10 md:flex-col-reverse sm:flex-col-reverse flex-col-reverse h-[400px]">
          <div class="text-athAIna-violet m-auto mx-16 h-auto w-full flex items-center justify-center flex-wrap break-words overflow-hidden break-all">
            {{ props.question }}
          </div>
          <div v-if="isValidImage"
               class="flex w-full h-auto justify-center align-middle items-center lg:h-auto">
            <img
                :src="props.image"
                alt="Flashcard Image"
                class="sm:max-w-sm lg:max-w-sm rounded-lg items-center align-middle justify-center h-1/2"
            />
          </div>
        </div>

        <div class="h-20">
          <div class="px-12 py-4 flex flex-row gap-10 justify-between ">
            <div class="athAIna-border-outer p-1 rounded-[20px] h-[40px]">
              <div class="athAIna-border-inner rounded-[15px] relative flex flex-row items-center">
                <input type="text" v-model="learner_answer" placeholder="Enter Answer" class="text-[14px] text-athAIna-orange placeholder-athAIna-orange focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[20px]">
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
      <div class="athAIna-border-inner p-6">
        <div class="">
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
            {{ learner_answer ? learner_answer : 'You did not provide an answer.' }}
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