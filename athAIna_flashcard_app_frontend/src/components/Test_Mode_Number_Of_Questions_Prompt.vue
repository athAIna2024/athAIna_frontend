<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTestModeStore} from "../../stores/testModeStore.js";
import { useStudysetStore} from "../../stores/studySetStore.js";
import axios from '@/axios';
import studySetDb from "@/views/studysetapp/dexie.js";
import { v4 as uuidv4 } from 'uuid';
import Loading_Modal from "@/components/Loading_Modal.vue";

const props = defineProps({
  isVisible: Boolean,
});
const flashcardCounts = ref(0);

const router = useRouter();
const testModeStore = useTestModeStore();
const studySetStore = useStudysetStore();

const studySetTitle = studySetStore.getStudySetTitle();
const studySetId = studySetStore.getStudySetId();

const fetchFlashcardCounts = async () => {
  console.log(studySetId);
  const flashcard = await studySetDb.studysets.get(Number(studySetId));
  flashcardCounts.value = flashcard ? flashcard.flashcard_count : 0;
  console.log("FLASHCARD COUNTS FROM INDEXEDDB: ", flashcardCounts.value);
};

const isSuccessful_test = ref(false);
const message_test = ref('');
const emit = defineEmits(['close']);

const numberOfQuestions = ref(null);

const errors = ref({
  numberOfQuestions: false,
});

const errorMessage = ref({
  numberOfQuestions: null,
});

const randomizeTestUrl = '/test/randomize/'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const isLoading = ref(false);

const randomizeTestModeFlashcards = async () => {

  const numberOfQuestions = Number(testModeStore.numberOfQuestions);
  try {
    const response = await axios.get(`${randomizeTestUrl}`,{
      params: {
        studyset_id: Number(studySetId),
        number_of_questions: numberOfQuestions
      }
    });

    isSuccessful_test.value = response.data.successful;
    message_test.value = response.data.message;

    testModeStore.setTestModeQuestions(response.data.flashcard_ids);


  } catch (error) {
    isSuccessful_test.value = false;
    message_test.value = "An error occurred while randomizing flashcards for test mode.";
  }
};


const redirectToTestMode = async () => {
  await fetchFlashcardCounts();

  if (numberOfQuestions.value <= 0 || numberOfQuestions.value === null || isNaN(numberOfQuestions.value)) {
    errors.value.numberOfQuestions = true;
    errorMessage.value.numberOfQuestions = "You cannot test yourself with empty questions.";
  } else if (numberOfQuestions.value > flashcardCounts.value) {
    errors.value.numberOfQuestions = true;
    errorMessage.value.numberOfQuestions = "It is not possible to take more questions beyond the available flashcards.";
  } else {
    errors.value.numberOfQuestions = false;
    errorMessage.value.numberOfQuestions = null;
    testModeStore.setNumberOfQuestions(numberOfQuestions.value);

    emit('close');
  }

  await randomizeTestQuestions();
}

const randomizeTestQuestions = async () => {
  // Loading animation for test mode
  isLoading.value = true;
  const minimumLoadingTime = 500; // Minimum loading time in milliseconds
  const startTime = Date.now();

  try {
    await randomizeTestModeFlashcards();

    if (isSuccessful_test.value) {
      const newUuid = uuidv4();
      testModeStore.setBatchId(newUuid);

      if (testModeStore.isTestCompleted) {
        testModeStore.setCurrentQuestionIndex(0);
        testModeStore.setIsTestCompleted(false);
        testModeStore.setCreatedAt(null);
      }

      testModeStore.setCreatedAt(new Date());
    }
  } catch (error) {
    console.error("An error occurred while randomizing test mode flashcards:", error);
  } finally {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = minimumLoadingTime - elapsedTime;

    if (remainingTime > 0) {
      await delay(remainingTime);
    }
    isLoading.value = false;

    await router.push({ name: 'Test_Mode', params: { studySetTitle: studySetTitle, studySetId: studySetId, batchId: testModeStore.batchId } });
    router.go(0); // Refresh the page (alternative for location.reload);
  }
};

</script>
<template>
  <Loading_Modal
      :loadingMessage="'Please wait for a couple of seconds'"
      :loadingHeader="'Preparing test questions...'"
      :condition="isSuccessful_test"
      :isVisible="isLoading"
  />

  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-50">
    <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
      <div class="athAIna-border-inner p-4 text-center">
        <div class="flex flex-col p-2">
          <button @click="emit('close')" class="flex flex-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>

          <div class="flex flex-col space-y-4 p-6 items-center justify-between">
            <h1 class="text-athAIna-lg font-medium">Number of Questions to be Taken</h1>
            <div class="px-2">
              <input type="number" v-model="numberOfQuestions" class="text-athAIna-base font-medium text-athAIna-violet w-52 placeholder-athAIna-violet rounded-xl border-1 ring-2 ring-athAIna-violet border-athAIna-violet pl-4 focus: outline-none" />
            </div>
            <div :style="{ visibility: errors.numberOfQuestions ? 'visible' : 'hidden' }" class="text-athAIna-red text-athAIna-base">
              {{ errorMessage.numberOfQuestions }}
            </div>

            <button class="btn w-48" @click="redirectToTestMode">
              Take a Test
            </button>
          </div>
        </div>


      </div>
    </div>
  </div>

</template>
<style scoped>
</style>