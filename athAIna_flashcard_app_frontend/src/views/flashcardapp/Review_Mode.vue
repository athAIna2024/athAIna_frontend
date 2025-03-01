<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Review_Mode_Flashcard from "@/components/Review_Mode_Flashcard.vue";
import Dexie from "dexie";

const route = useRoute();
const flashcardId = ref(route.params.id);
const flashcard = ref(null);

const flashcardsDB = new Dexie("FlashcardDatabase");
flashcardsDB.version(1).stores({
  flashcards:
    "id, question, answer, image, studyset_id, created_at, updated_at, is_ai_generated",
});

onMounted(async () => {
  try {
    flashcard.value = await flashcardsDB.flashcards.get(
      Number(flashcardId.value)
    );
    console.log(flashcardId.value);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="p-10">
    <Review_Mode_Flashcard :flashcard="flashcard" />
  </div>
</template>

<style scoped></style>
