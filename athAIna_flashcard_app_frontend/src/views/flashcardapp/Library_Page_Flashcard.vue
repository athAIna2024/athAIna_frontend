<script setup>
import { ref } from "vue";
import { computed } from "vue";
import { onMounted } from "vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import Search_Bar from "@/components/Search_Bar.vue";
import Flashcard_Card from "@/components/Flashcard_Card.vue";
import AI_Flashcard from "@/views/flashcardapp/Generate_Flashcard_with_AI.vue";
import Pagination from "@/components/Pagination.vue";
import { useRouter } from "vue-router";
import { onBeforeRouteLeave } from "vue-router";
import { useStudysetStore } from "../../../stores/studySetStore.js";
import { useFlashcardSearchStore } from "../../../stores/flashcardSearchStore.js";
import flashcardsDB from "@/views/flashcardapp/dexie.js";

import Test_Mode_Number_Of_Questions_Prompt from "@/components/Test_Mode_Number_Of_Questions_Prompt.vue";

const route = useRoute();

const studySetStore = useStudysetStore();
const flashcardSearchStore = useFlashcardSearchStore();
const router = useRouter();

// Remove ref since they are declared as reactive in pinia store
const studySetTitleFromStore = ref(studySetStore.studySetTitle);
const studySetIdFromStore = ref(studySetStore.studySetId);

// const studySetTitle = studySetTitleFromStore.value;
// const studySetId = studySetIdFromStore.value;

const studySetTitle = studySetStore.studySetTitle;
const studySetId = Number(studySetStore.studySetId);

const isSuccessful = ref(false);
const message = ref("");
const flashcard_db = ref([]);

const itemsPerPage = 6;

const input = ref("");
const currentPage = ref(1);

const modals = ref({
  deleteModal: false,
  learningMode: false,
  addFlashcard: false,
  takeTest: false,
});

const isAIFlashcardVisible = ref(false);
const isTestModeVisible = ref(false);

const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};

const openAI_Flashcard = () => {
  isAIFlashcardVisible.value = true;
};

const closeAI_Flashcard = () => {
  isAIFlashcardVisible.value = false;
};

const openTest_Mode = () => {
  isTestModeVisible.value = true;
};

const closeTest_Mode = () => {
  isTestModeVisible.value = false;
};

const fetchFlashcardsFromDb = async () => {
  try {
    flashcard_db.value = await flashcardsDB.flashcards
      .filter((flashcard) => flashcard.studyset_id === studySetId)
      .sortBy("updated_at")
      .then((array) => array.reverse());

    console.log(flashcard_db);

    if (flashcard_db.value.length === 0) {
      isSuccessful.value = false;
      message.value = "There are no flashcards in this study set.";
    } else {
      isSuccessful.value = true;
      message.value = "Flashcards retrieved successfully.";
    }
  } catch (error) {
    console.log(error);
    isSuccessful.value = false;
    message.value = "An error occurred. Please try again later.";
  }
};

const flashcardCounts = ref(0);

const applyPagination = (data) => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
}

const currentFlashcards = computed(() => {
  const searchResults = flashcardSearchStore.getSearchResults(studySetId);

  if (searchResults.length > 0) {
    flashcardCounts.value = searchResults.length;
    return applyPagination(searchResults);
  } else {
    flashcardCounts.value = flashcard_db.value.length;
    return applyPagination(flashcard_db.value);
  }

});


const navigateToLibraryPage = () => {
  router.push({ name: "Library_Page_Studyset" });
};

const redirectToReviewMode = async () => {
  const flashcards = await flashcardsDB.flashcards
    .where("studyset_id")
    .equals(studySetId)
    .toArray();
  const filteredFlashcards = flashcards.filter((f) => f.id !== studySetId);
  const randomFlashcard =
    filteredFlashcards[Math.floor(Math.random() * filteredFlashcards.length)];
  await router.push({
    name: "Review_Mode",
    params: {
      studySetTitle: studySetTitle,
      studySetId: studySetId,
      id: randomFlashcard.id,
    },
  });
};

onMounted(() => {
  fetchFlashcardsFromDb();
  document.title = `${studySetTitle} - Flashcards`;
});
</script>

<template>
  <transition appear name="fade">
    <div>
      <div class="m-4">
        <div class="athAIna-border-outer p-1 shadow-xl h-auto">
          <div class="athAIna-border-inner py-4 h-auto">
            <div class="flex flex-col m-10 justify-between min-h-screen">
              <div
                  class="text-athAIna-lg text-center flex flex-row justify-between space-x-6 items-center"
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

                <div class="flex flex-row justify-between gap-x-6 items-center">
                  <Search_Bar v-model="input" />
                  <button
                      class="relative btn w-[300px] px-0 mx-0 text-[16px] font-semibold"
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
                        @click="openTest_Mode"
                    >
                      Test Mode
                    </button>
                  </div>
                  <button
                      class="relative btn w-[300px] px-0 text-[16px] font-semibold"
                      @click="toggleModal('addFlashcard')"
                  >
                    Add Flashcard
                  </button>
                  <div
                      v-if="modals.addFlashcard"
                      class="absolute top-[230px] right-[47px] h-[150px] w-[240px] border-athAIna-orange border-[4px] rounded-3xl bg-athAIna-white flex flex-col justify-between p-5"
                  >
                    <!--               CLEAN UP CODE ROUTER LINK SHOULD NOT BE USED INSTEAD USE @CLICK LOGIC-->
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

              <div class="grid grid-cols-3 gap-12 mt-10 mb-12 flex-grow">
                <div class="list-none" v-for="(flashcard, index) in currentFlashcards" :key="index">
                  <Flashcard_Card
                      :flashcardId="flashcard.id"
                      :question="flashcard.question"
                      :answer="flashcard.answer"
                      :image="flashcard.image"
                  />
                </div>
                <div class="item error" v-if="!isSuccessful">
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
      <Test_Mode_Number_Of_Questions_Prompt
          :is-visible="isTestModeVisible"
          @close="closeTest_Mode"
      />
    </div>
  </transition>


</template>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>