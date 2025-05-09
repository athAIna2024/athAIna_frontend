<script setup>
import { ref, reactive } from "vue";
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
import {
  flashcardCreationModes,
  learningModes,
} from "@/components/constants/SubjectDropDownOptions.js";
import Basic_Dropdown from "@/components/Basic_Dropdown.vue";
import Warning_Message from "@/components/Warning_Message.vue";

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

const modals = reactive({
  deleteModal: false,
  learningMode: false,
  addFlashcard: false,
  takeTest: false,
});

// Add error message state
const errorModal = reactive({
  isVisible: false,
  header: "",
  message: "",
});

const isManualFlashcardVisible = ref(false);
const isAIFlashcardVisible = ref(false);
const isTestModeVisible = ref(false);
const isLibraryPageVisible = ref(true);

const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};

const openManual_Flashcard = () => {
  router.push({ name: "Create_Flashcard_Manually" });
};

const openAI_Flashcard = () => {
  isAIFlashcardVisible.value = true;
};

const closeAI_Flashcard = () => {
  isAIFlashcardVisible.value = false;
};

const warningModal = reactive({
  isVisible: false,
  header: "",
  message: "",
});

const closeWarningModal = () => {
  closeTest_Mode();
  warningModal.isVisible = false;
}
const openTest_Mode = () => {

  if (flashcard_db.value.length === 0) {
    isTestModeVisible.value = false;

    warningModal.isVisible = true;
    warningModal.header = "No Flashcards Available";
    warningModal.message =
      "There are no flashcards in this study set yet. Please add some flashcards before using Test Mode.";
  } else {
    isTestModeVisible.value = true;
  }
};

const closeTest_Mode = () => {
  isTestModeVisible.value = false;
};

// Function to close error modal
const closeErrorModal = () => {
  errorModal.isVisible = false;

};

const fetchFlashcardsFromDb = async () => {
  try {
    flashcard_db.value = await flashcardsDB.flashcards
      .filter((flashcard) => flashcard.studyset_id === studySetId)
      .sortBy("updated_at")
      .then((array) => array.reverse());

    // console.log(flashcard_db);

    if (flashcard_db.value.length === 0) {
      isSuccessful.value = false;
      message.value = "There are no flashcards in this study set.";
    } else {
      isSuccessful.value = true;
      message.value = "Flashcards retrieved successfully.";
    }
  } catch (error) {
    // console.log(error);
    isSuccessful.value = false;
    message.value = "An error occurred. Please try again later.";
  }
};

const flashcardCounts = ref(0);

const applyPagination = (data) => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

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

  // Check if there are any flashcards in the study set
  if (filteredFlashcards.length === 0) {
    // Show error message
    errorModal.isVisible = true;
    errorModal.header = "No Flashcards Available";
    errorModal.message =
      "There are no flashcards in this study set yet. Please add at least two (2) flashcards before using Review Mode.";
    return;
  }

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

const isLearningModeClicked = () => {
  modals.learningMode = !modals.learningMode;
  // console.log(modals.learningMode);
};

const handleLearningModeClick = (option) => {
  if (option === "Review") {
    // console.log("Review Mode selected");
    redirectToReviewMode();
  } else if (option === "Test") {
    // console.log("Test Mode selected");
    openTest_Mode();
  }
};

const handleAddFlashcardClick = (option) => {
  if (option === "Manual") {
    // console.log("Manual Mode selected");
    openManual_Flashcard();
  } else if (option === "AI-Generated") {
    // console.log("AI Mode selected");
    openAI_Flashcard();
  }
};

const isAddFlashcardClicked = () => {
  modals.addFlashcard = !modals.addFlashcard;
  // console.log(modals.addFlashcard);
};
</script>

<template>
  <transition appear name="fade">
    <div>
      <div class="m-4">
        <div class="athAIna-border-outer p-1 shadow-xl h-auto">
          <div class="athAIna-border-inner py-4 h-auto">
            <div class="flex flex-col m-10 min-h-screen">
              <div
                class="text-athAIna-lg text-center flex space-y-6 items-left flex-col justify-between md:flex-row md:space-y-0 md:items-center lg:flex-row lg:space-x-0"
              >
                <div
                  class="flex flex-row space-x-6 items-center mr-10 md:min-w-[250px]"
                >
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
                  <h1 class="text-athAIna-violet font-semibold flex mr-10">
                    {{ studySetTitle }}
                  </h1>
                </div>

                <div
                  class="flex flex-col justify-end min-w-auto md:flex-col md:w-full md:space-y-1 lg:flex-row lg:w-auto lg:space-x-4 lg:items-center"
                >
                  <Search_Bar
                    v-model="input"
                    class="mb-2 lg:mb-0 lg:w-full min-w-[300px] md:w-full"
                  />
                  <div
                    class="flex flex-row space-x-4 items-center sm:w-full md:w-full lg:w-auto justify-between"
                  >
                    <div
                      class="relative flex-col min-w-[180px] sm:w-full text-[16px] font-semibold md:w-full lg:w-[250px]"
                    >
                      <button
                        class="relative btn sm:w-full text-[16px] font-semibold md:w-full lg:w-[full]"
                        @click="isLearningModeClicked"
                      >
                        Learning Mode
                      </button>
                      <Basic_Dropdown
                        class="w-full"
                        v-if="modals.learningMode"
                        :items="learningModes"
                        :itemList="learningModes"
                        top="50px"
                        right="0px"
                        height="max-content"
                        width="full"
                        @itemClick="handleLearningModeClick"
                      >
                      </Basic_Dropdown>
                    </div>

                    <div
                      class="relative flex-col min-w-[180px] sm:w-full text-[16px] font-semibold md:w-full lg:w-[250px]"
                    >
                      <button
                        class="relative btn sm:w-full text-[16px] font-semibold md:w-full lg:w-full"
                        @click="isAddFlashcardClicked"
                      >
                        Add Flashcard
                      </button>
                      <Basic_Dropdown
                        class="w-full"
                        v-if="modals.addFlashcard"
                        :items="flashcardCreationModes"
                        :itemList="flashcardCreationModes"
                        top="50px"
                        right="0px"
                        height="max-content"
                        width="full"
                        @itemClick="handleAddFlashcardClick"
                      >
                      </Basic_Dropdown>
                    </div>

                    <!--                  <div-->
                    <!--                      v-if="modals.addFlashcard"-->
                    <!--                      class="absolute top-[230px] right-[47px] h-[150px] w-[240px] border-athAIna-orange border-[4px] rounded-3xl bg-athAIna-white flex flex-col justify-between p-5"-->
                    <!--                  >-->
                    <!--                    &lt;!&ndash;               CLEAN UP CODE ROUTER LINK SHOULD NOT BE USED INSTEAD USE @CLICK LOGIC&ndash;&gt;-->
                    <!--                    <router-link :to="{ name: 'Create_Flashcard_Manually' }">-->
                    <!--                      <button-->
                    <!--                          class="text-athAIna-base border-athAIna-orange border-[3.5px] py-[10px] px-[30px] rounded-2xl text-sm"-->
                    <!--                      >-->
                    <!--                        Create Manually-->
                    <!--                      </button>-->
                    <!--                    </router-link>-->

                    <!--                    <button-->
                    <!--                        @click="openAI_Flashcard"-->
                    <!--                        class="text-athAIna-base bg-athAIna-orange py-[10px] px-[30px] rounded-2xl text-sm text-athAIna-white"-->
                    <!--                    >-->
                    <!--                      Generate with AI-->
                    <!--                    </button>-->
                    <!--                  </div>-->
                  </div>
                </div>
              </div>

              <div class="mt-4 mb-6">
                <div
                  class="w-full size-[1px] bg-gradient-to-r from-athAIna-yellow via-athAIna-orange to-athAIna-red mt-[12px]"
                ></div>
              </div>

              <div class="flex flex-row gap-2">
                <div
                  class="text-[18px] font-semibold flex flex-row items-center"
                >
                  Flashcards
                </div>
                <div
                  class="border-athAIna-violet border-2 rounded-full px-3 py-0"
                >
                  {{ flashcardCounts }}
                </div>
              </div>

              <div
                class="grid lg:grid-cols-3 md:grid-cols-2 gap-12 mt-10 mb-12 flex-grow"
              >
                <div
                  class="list-none"
                  v-for="(flashcard, index) in currentFlashcards"
                  :key="index"
                >
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
      <AI_Flashcard
        :is-visible="isAIFlashcardVisible"
        @close="closeAI_Flashcard"
      />
      <Test_Mode_Number_Of_Questions_Prompt
        :is-visible="isTestModeVisible"
        @close="closeTest_Mode"
      />

      <!-- Error Message component -->
      <Warning_Message
        :is-visible="errorModal.isVisible"
        :warning-header="errorModal.header"
        :warning-message="errorModal.message"
        @close="closeErrorModal"
      />

      <Warning_Message
          :is-visible="warningModal.isVisible"
          :warning-header="warningModal.header"
          :warning-message="warningModal.message"
          @close="closeWarningModal"
        />
    </div>
  </transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
