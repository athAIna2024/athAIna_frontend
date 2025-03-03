<script setup>
import { ref } from "vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStudysetStore } from "../../stores/studySetStore.js";
import Update_Flashcard from "@/views/flashcardapp/Update_Flashcard.vue";
import Delete_Flashcard from "@/views/flashcardapp/Delete_Flashcard.vue";
import AI_Flashcard from "@/views/flashcardapp/Generate_Flashcard_with_AI.vue";

const store = useStudysetStore();
const studySetName = store.studySetTitle;
const studySetId = store.studySetId;
const router = useRouter();
const props = defineProps({
  flashcardId: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

const isUpdateModalVisible = ref(false);
const isDeleteModalVisible = ref(false);
const isAIFlashcardVisible = ref(false);

const openUpdateModal = () => {
  isUpdateModalVisible.value = true;
};

const closeUpdateModal = () => {
  isUpdateModalVisible.value = false;
};

const openDeleteModal = () => {
  isDeleteModalVisible.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalVisible.value = false;
};

const openAI_Flashcard = () => {
  isAIFlashcardVisible.value = true;
};

const closeAI_Flashcard = () => {
  isAIFlashcardVisible.value = false;
};

const navigateToUpdateFlashcard = () => {
  router.push({
    name: "Update_Flashcard",
    params: {
      flashcardId: props.flashcardId,
      studySetTitle: studySetName,
      studySetId: studySetId,
    },
  });
};
</script>

<template>
  <div class="athAIna-border-outer p-1 shadow-md">
    <div class="athAIna-border-inner">
      <div class="p-[15px]">
        <div class="flex flex-col">
          <div
            class="flex items-center text-center justify-center text-athAIna-violet text-athAIna-base mb-5 h-20 py-14"
          >
            <!-- <img :src="props.image" class="w-20 h-20 rounded-full" alt="Flashcard Image" /> -->

            <router-link
              :to="{ name: 'Review_Mode', params: { id: props.flashcardId } }"
            >
              <div v-if="question.length > 100">
                {{ question.substring(0, 100) + "..." }}
              </div>
              <div v-else>
                {{ question }}
              </div>
            </router-link>
          </div>

          <hr class="bg-athAIna-violet h-0.5 my-2" />

          <div class="flex flex-row justify-end">
            <button @click="navigateToUpdateFlashcard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
            <button class="" @click="openDeleteModal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Delete_Flashcard
    :flashcardId="props.flashcardId"
    :is-visible="isDeleteModalVisible"
    @close="closeDeleteModal"
  />
</template>

<style scoped></style>
