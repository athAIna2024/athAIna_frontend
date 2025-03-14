<script setup>
import { ref } from "vue";
import { computed } from "vue";
import { onMounted } from "vue";
import Flashcard_Search_Bar from "@/components/Search_Bar.vue";
import Flashcard_Card from "@/components/Flashcard_Card.vue";
import AI_Flashcard from "@/views/flashcardapp/Generate_Flashcard_with_AI.vue";
import Pagination from "@/components/Pagination.vue";

import { useRouter } from "vue-router";
import { useTestModeStore } from "../../../stores/testModeStore.js";
import { useStudysetStore } from "../../../stores/studySetStore.js";
import { useFlashcardStore } from "../../../stores/flashcardStore.js";
import flashcardsDB from "@/views/flashcardapp/dexie.js";

import axios from "@/axios";
const testModeStore = useTestModeStore();
const studySetStore = useStudysetStore();
const flashcardStore = useFlashcardStore();
const router = useRouter();
const studySetTitle = studySetStore.studySetTitle;
const studySetId = Number(studySetStore.studySetId);
const isSuccessful = ref(false);
const message = ref("");
const flashcard_db = ref([]);

const isSuccessful_test = ref(false);
const message_test = ref("");

const itemsPerPage = 6;

const flashcardCounts = computed(() => {
  return flashcardStore.searchResults.length || flashcard_db.value.length;
});

const dropdownOptions = ref({
  ARTS: "Arts",
  BUS: "Business",
  GEO: "Geography",
  ENGR: "Engineering",
  HEALTH_MED: "Health and Medicine",
  HIST: "History",
  LAW_POL: "Law and Politics",
  LANG_CULT: "Languages and Cultures",
  MATH: "Mathematics",
  PHIL: "Philosophy",
  SCI: "Science",
  SOC_SCI: "Social Sciences",
  TECH: "Technology",
  WRIT_LIT: "Writing and Literature",
});

const input = ref("");
const currentPage = ref(1);

const modals = ref({
  deleteModal: false,
  learningMode: false,
  addFlashcard: false,
  takeTest: false,
});

const isAIFlashcardVisible = ref(false);

const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};

const openAI_Flashcard = () => {
  isAIFlashcardVisible.value = true;
};

const closeAI_Flashcard = () => {
  isAIFlashcardVisible.value = false;
};

const numberOfQuestions = ref(null);

const errors = ref({
  numberOfQuestions: false,
});

const errorMessage = ref({
  numberOfQuestions: null,
});

const randomizeTestUrl = "/test/randomize/";
const randomizeTestModeFlashcards = async () => {
  const numberOfQuestions = Number(testModeStore.numberOfQuestions);
  try {
    const response = await axios.get(`${randomizeTestUrl}`, {
      params: {
        studyset_id: studySetId,
        number_of_questions: numberOfQuestions,
      },
    });

    isSuccessful_test.value = response.data.successful;
    message_test.value = response.data.message;

    if (isSuccessful_test.value) {
      testModeStore.setTestModeQuestions(response.data.flashcard_ids);
    }
  } catch (error) {}
};
const redirectToTestMode = () => {
  if (
    numberOfQuestions.value <= 0 ||
    numberOfQuestions.value === null ||
    isNaN(numberOfQuestions.value)
  ) {
    errors.value.numberOfQuestions = true;
    errorMessage.value.numberOfQuestions =
      "You cannot test yourself with empty questions.";
  } else if (numberOfQuestions.value > flashcardCounts.value) {
    errors.value.numberOfQuestions = true;
    errorMessage.value.numberOfQuestions =
      "It is not possible to take more questions beyond the available flashcards.";
  } else {
    errors.value.numberOfQuestions = false;
    errorMessage.value.numberOfQuestions = null;
    testModeStore.setNumberOfQuestions(numberOfQuestions.value);
    toggleModal("takeTest");

    randomizeTestModeFlashcards();
    router.push({
      name: "Test_Mode",
      params: { studySetTitle: studySetTitle, studySetId: studySetId },
    });
  }
};

const redirectToReviewMode = async () => {
  const flashcards = await flashcardsDB.flashcards
    .where("studyset_id")
    .equals(studySetId)
    .toArray();
  const filteredFlashcards = flashcards.filter((f) => f.id !== studySetId);
  const randomFlashcard =
    filteredFlashcards[Math.floor(Math.random() * filteredFlashcards.length)];
  router.push(`/${studySetTitle}/${studySetId}/review/${randomFlashcard.id}`);
};

const fetchFlashcardsFromDb = async () => {
  try {
    flashcard_db.value = await flashcardsDB.flashcards
      .where("studyset_id")
      .equals(studySetId)
      .toArray();

    if (flashcard_db.value.length === 0) {
      isSuccessful.value = false;
      message.value = "There are no flashcards in this study set.";
    } else {
      isSuccessful.value = true;
      message.value = "Flashcards retrieved successfully.";
    }
  } catch (error) {
    isSuccessful.value = false;
    message.value = "An error occurred. Please try again later.";
  }
};

const currentFlashcards = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return flashcard_db.value.slice(startIndex, endIndex);
});

onMounted(() => {
  fetchFlashcardsFromDb();
  document.title = `${studySetTitle} - Flashcards`;
});

const navigateToLibraryPage = () => {
  router.push({ name: "Library_Page_Studyset" });
};
</script>

<template>
  {{ studySetId }}
  {{ studySetTitle }}
  <div class="m-4">
    <div class="athAIna-border-outer p-1 shadow-xl">
      <div class="athAIna-border-inner py-4">
        <div class="flex flex-col m-10">
          <div
            class="text-athAIna-lg text-center flex flex-row justify-between space-x-20 items-center"
          >
            <div class="flex flex-row space-x-6 items-center">
              <button @click="navigateToLibraryPage">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
              <h1 class="text-athAIna-violet font-semibold flex">
                {{ studySetTitle }}
              </h1>
            </div>

            <div class="flex flex-row justify-between space-x-6 items-center">
              <Flashcard_Search_Bar v-model="input" class="lg:visible lg:w-full w-0 invisible"/>
              <button
                class="relative btn w-30 lg:w-60 text-[16px] font-semibold"
                @click="toggleModal('learningMode')"
              >
                Learning Mode
              </button>
              <div
                v-if="modals.learningMode"
                class="absolute top-[230px] right-[315px] h-[150px] w-[235px] border-athAIna-orange border-[4px] rounded-3xl bg-athAIna-white flex flex-col justify-between p-5"
              >
                <button
                  @click="redirectToReviewMode"
                  class="text-athAIna-base border-athAIna-orange border-[3.5px] py-[10px] px-[30px] rounded-2xl text-sm"
                >
                  Review Mode
                </button>
                <button
                  class="text-athAIna-base bg-athAIna-orange py-[10px] px-[30px] rounded-2xl text-sm text-athAIna-white"
                  @click="toggleModal('takeTest')"
                >
                  Test Mode
                </button>
              </div>
              <button
                class="relative btn w-30 lg:w-60 text-[16px] font-semibold"
                @click="toggleModal('addFlashcard')"
              >
                Add Flashcard
              </button>
              <div
                v-if="modals.addFlashcard"
                class="absolute top-[230px] right-[47px] h-[150px] w-[240px] border-athAIna-orange border-[4px] rounded-3xl bg-athAIna-white flex flex-col justify-between p-5"
              >
                <router-link :to="{ name: 'Create_Flashcard_Manually' }">
                  <button
                    class="text-athAIna-base border-athAIna-orange border-[3.5px] py-[10px] px-[30px] rounded-2xl text-sm"
                  >
                    Create Manually
                  </button>
                </router-link>
                <button
                  @click="openAI_Flashcard"
                  class="text-athAIna-base bg-athAIna-orange py-[10px] px-[30px] rounded-2xl text-sm text-athAIna-white"
                >
                  Generate with AI
                </button>
              </div>
            </div>
          </div>

          <div class="mt-4 mb-6">
            <div
              class="w-full size-[1px] bg-gradient-to-r from-athAIna-yellow via-athAIna-orange to-athAIna-red mt-[12px]"
            ></div>
          </div>

          <div class="flex flex-row gap-2">
            <div class="text-[18px] font-semibold flex flex-row items-center">
              Flashcards
            </div>
            <div class="border-athAIna-violet border-2 rounded-full px-3 py-0">
              {{ flashcardCounts }}
            </div>
          </div>

          <div class="grid grid-cols-3 gap-12 mt-10 mb-12">
            <li
              class="list-none"
              v-for="(flashcard, index) in flashcardStore.searchResults.length
                ? flashcardStore.searchResults
                : currentFlashcards"
              :key="index"
            >
              <Flashcard_Card
                :flashcardId="flashcard.id"
                :question="flashcard.question"
                :answer="flashcard.answer"
                :image="flashcard.image"
              />
            </li>
            <div class="item error" v-if="!isSuccessful">
              <p>{{ message }}</p>
            </div>
            <div class="item error" v-if="flashcardCounts === 0">
              <p>{{ message }}</p>
            </div>
          </div>

          <div class="flex justify-center">
            <Pagination
              :total-items="flashcardCounts"
              :items-per-page="itemsPerPage"
              :current-page="currentPage"
              @update:currentPage="currentPage = $event"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <AI_Flashcard :is-visible="isAIFlashcardVisible" @close="closeAI_Flashcard" />
  <div
    v-if="modals.takeTest"
    class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40"
  >
    <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
      <div class="athAIna-border-inner p-4 text-center">
        <div class="flex flex-col p-2">
          <button @click="toggleModal('takeTest')" class="flex flex-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>

          <div class="flex flex-col space-y-4 p-6 items-center justify-between">
            <h1 class="text-athAIna-lg font-medium">
              Number of Questions to be Taken
            </h1>
            <div class="px-2">
              <input
                type="number"
                v-model="numberOfQuestions"
                class="text-athAIna-base font-medium text-athAIna-violet w-52 placeholder-athAIna-violet rounded-xl border-1 ring-2 ring-athAIna-violet border-athAIna-violet pl-4 focus: outline-none"
              />
            </div>
            <div
              :style="{
                visibility: errors.numberOfQuestions ? 'visible' : 'hidden',
              }"
              class="text-athAIna-red text-athAIna-base"
            >
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
