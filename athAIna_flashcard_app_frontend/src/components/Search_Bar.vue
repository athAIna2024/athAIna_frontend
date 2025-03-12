<script setup>
import { ref } from 'vue';
import flashcardsDB from "@/views/flashcardapp/dexie.js";
import { useFlashcardStore} from "../../stores/flashcardStore.js";
import { useStudysetStore} from "../../stores/studySetStore.js";

const flashcardStore = useFlashcardStore();
const studySetStore = useStudysetStore();

const studySetId = Number(studySetStore.studySetId);

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const searchResults = ref([]);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};

const handleKeyPress = async (event) => {
  emit('update:modelValue', event.target.value);
  searchResults.value = await searchFlashcards(event.target.value);
  flashcardStore.setSearchResults(studySetId, searchResults.value);
};

const searchFlashcards = async (query) => {
  return await flashcardsDB.flashcards
      .where('studyset_id').equals(studySetId)
      .filter(flashcard =>
          flashcard.question.toLowerCase().includes(query.toLowerCase()) ||
          flashcard.answer.toLowerCase().includes(query.toLowerCase())
      )
      .toArray();
};
</script>

<template>
  <div class="athAIna-border-outer p-1 rounded-[20px] h-[40px]">
    <div class="athAIna-border-inner rounded-[15px] relative flex flex-row items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-orange ml-2 mr-3">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
      <input type="search" :value="modelValue" @input="updateValue" @keydown="handleKeyPress" placeholder="Search Study Set" class="text-[14px] text-athAIna-orange placeholder-athAIna-orange focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]">
    </div>
  </div>
</template>

<style scoped>
</style>