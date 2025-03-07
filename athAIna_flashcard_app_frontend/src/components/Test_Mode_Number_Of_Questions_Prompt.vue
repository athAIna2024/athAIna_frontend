<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useTestModeStore} from "../../stores/testModeStore.js";
import axios from '@/axios';

const props = defineProps({
  isVisible: Boolean,
  flashcardCounts: {
    type: Number,
    default: 0,
  },
  studySetId: {
    type: Number,
    default: 0,
  },
  studySetTitle: {
    type: String,
    default: '',
  }
});

const router = useRouter();
const testModeStore = useTestModeStore();
const studySetTitle = computed(() => props.studySetTitle);
const studySetId = computed(() => props.studySetId);
const flashcardCounts = computed(() => props.flashcardCounts);

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
const randomizeTestModeFlashcards = async () => {

  console.log("STUDY SET TITLE", studySetTitle.value);
  console.log("STUDY SET ID", studySetId.value);
  const numberOfQuestions = Number(testModeStore.numberOfQuestions);
  try {
    const response = await axios.get(`${randomizeTestUrl}`,{
      params: {
        studyset_id: Number(studySetId.value),
        number_of_questions: numberOfQuestions
      }
    });

    isSuccessful_test.value = response.data.successful;
    message_test.value = response.data.message;

    console.log("FLASHCARD IDS: ", response.data.flashcard_ids);
    testModeStore.setTestModeQuestions(response.data.flashcard_ids);


  } catch (error) {
    isSuccessful_test.value = false;
    message_test.value = "An error occurred while randomizing flashcards for test mode.";
  }
};
const redirectToTestMode = async () => {

  console.log("FLASHCARD COUNTS: ", flashcardCounts.value);
  console.log("NUMBER OF QUESTIONS: ", numberOfQuestions.value);
  if (numberOfQuestions.value <= 0 || numberOfQuestions.value === null || isNaN(numberOfQuestions.value)) {
    errors.value.numberOfQuestions = true;
    errorMessage.value.numberOfQuestions = "You cannot test yourself with empty questions."
  } else if (numberOfQuestions.value > flashcardCounts.value) {
    errors.value.numberOfQuestions = true;
    errorMessage.value.numberOfQuestions = "It is not possible to take more questions beyond the available flashcards."
  } else {
    errors.value.numberOfQuestions = false;
    errorMessage.value.numberOfQuestions = null;
    testModeStore.setNumberOfQuestions(numberOfQuestions.value);

    emit('close');

    await randomizeTestModeFlashcards();

    if (isSuccessful_test.value) {
      await router.push({name: 'Test_Mode', params: {studySetTitle: studySetTitle.value, studySetId: studySetId.value}});
    }
  }
};

</script>
<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40">
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