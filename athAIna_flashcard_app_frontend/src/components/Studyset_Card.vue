<script setup>
import Update_Studyset from "@/views/studysetapp/Update_Studyset.vue";
import Delete_Studyset from "@/views/studysetapp/Delete_Studyset.vue";
import {useStudysetStore} from "../../stores/studySetStore.js";
import {defineProps} from 'vue';
import {useRouter} from 'vue-router';
import { ref } from 'vue';
import Loading_Modal from "@/components/Loading_Modal.vue";

import axios from "@/axios.js";
import flashcardsDB from "@/views/flashcardapp/dexie.js";

const router = useRouter();
const flashcard_url = "/flashcard/";
const flashcard_result = ref([]);
const flashcardCounts_backend = ref(0);
const isSuccessful = ref(false);
const message = ref("");

const store = useStudysetStore();
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
  },
  subject: {
    type: String,
    required: true
  },
  flashcardCount: {
    type: Number,
    required: true,
    default: 0,
  },
  studySetId: {
    type: Number,
    required: true
  }
});

const isUpdateModalVisible = ref(false);
const isDeleteModalVisible = ref(false);

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

const isLoading = ref(false);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchFlashcards = async (id) => {

  isLoading.value = true;
  const minimumLoadingTime = 500; // Minimum loading time in milliseconds
  const startTime = Date.now();

  try {

    const response = await axios.get(flashcard_url, {
      params: { studyset_id: id }
    });

    if (response.data.data.length > 0) {

      flashcard_result.value = response.data.data.map(flashcard => {
        return {
          id: Number(flashcard.id),
          question: String(flashcard.question),
          answer: String(flashcard.answer),
          image: String(flashcard.image),
          studyset_id: Number(flashcard.studyset_instance),
          created_at: Date(flashcard.created_at),
          updated_at: Date(flashcard.updated_at),
          is_ai_generated: Boolean(flashcard.is_ai_generated),
        };
      });

      flashcardCounts_backend.value = flashcard_result.value.length;


      const serializableFlashcards = flashcard_result.value.map(flashcard => {
        return {
          id: flashcard.id,
          question: flashcard.question,
          answer: flashcard.answer,
          image: flashcard.image,
          studyset_id: flashcard.studyset_id,
          created_at: flashcard.created_at,
          updated_at: flashcard.updated_at,
          is_ai_generated: flashcard.is_ai_generated,
        };
      });

      await flashcardsDB.flashcards.bulkPut(serializableFlashcards);

      isSuccessful.value = response.data.successful;
      message.value = response.data.message;

    } else {
      flashcard_result.value = [];
    }
    return flashcard_result;

  } catch (error) {
    if (error.response && error.response.status === 400) {
      isSuccessful.value = error.response.data.successful;
      message.value = error.response.data.message;
    } else {
      isSuccessful.value = false;
      message.value = "An error occurred. Please try again later.";
    }
    flashcard_result.value = [];

    return flashcard_result;
  } finally {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = minimumLoadingTime - elapsedTime;

    if (remainingTime > 0) {
      await delay(remainingTime);
    }
    isLoading.value = false;
  }
}


const fetchFlashcardsIfNotExisting = async (id) => {
  try {
    const studySet = await flashcardsDB.flashcards.where('studyset_id').equals(Number(id)).toArray();
    if (studySet.length === 0) {
      await fetchFlashcards(Number(id));
    }
  } catch (error) {
    console.error("An error occurred while fetching flashcards:", error);
  }
};

const navigateToLibraryPageFlashcard = async () => {
  // Fetch flashcards if they do not exist
  await fetchFlashcardsIfNotExisting(props.studySetId);

  // Store the props details in the store
  store.setStudySetId(props.studySetId);
  store.setStudySetTitle(props.title);

  // Navigate to the Library Page Flashcard
  router.push({ name: 'Library_Page_Flashcard', params: { studySetTitle: props.title, studySetId: props.studySetId } });

};

const refreshLibrary =  () => {
  location.reload();
};
</script>

<template>
  <Loading_Modal
      :loadingMessage="'Please wait for a couple of seconds'"
      :loadingHeader="'Fetching flashcards...'"
      :condition="isSuccessful"
      :isVisible="isLoading"
  />

  <div class="p-[5px] shadow-md bg-gradient-to-br rounded-[20px] from-athAIna-yellow via-athAIna-orange to-athAIna-red">
    <div class="flex flex-col bg-athAIna-white rounded-[15px] p-[15px]">
        <div @click="navigateToLibraryPageFlashcard" class="text-[20px] font-semibold hover:cursor-pointer"> {{ title }}</div>
      <div class="text-[16px] text-athAIna-orange"> {{ subject }} </div>
      <div class="text-[14px] mt-[12px]">
        {{ description }}
      </div>
      <div class="flex flex-row justify-between mt-[18px]">
        <div>
          <span class="font-bold"> {{ flashcardCount }} </span>
          <span>{{ flashcardCount > 1 ? ' flashcards' : ' flashcard' }}</span>
        </div>
        <div class="flex flex-row">
          <svg @click="openUpdateModal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="hover:cursor-pointer size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          <svg @click="openDeleteModal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 hover:cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </div>
      </div>
    </div>
  </div>

  <Update_Studyset
      :isVisible="isUpdateModalVisible"
      :studySetId="studySetId"
      title="Update Studyset – athAIna"
      @close="closeUpdateModal"
      @refreshLibrary="refreshLibrary"
  />

  <Delete_Studyset
    :isVisible="isDeleteModalVisible"
    :studySetId="studySetId"
    title="Delete Studyset – athAIna"
    @close="closeDeleteModal"
  />

</template>


<style scoped>
</style>