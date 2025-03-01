<script setup>
import { ref, watch, computed } from "vue";
import Dexie from "dexie";
import { useRouter, useRoute } from "vue-router";
import flashcardsDB from "@/views/flashcardapp/dexie.js";
import studySetDb from "@/views/studysetapp/dexie.js";
const props = defineProps({
  flashcard: {
    type: Object,
    required: true,
  },
});

const isFlipped = ref(false);
const studysetName = ref("");
const router = useRouter();
const route = useRoute();
const currentFlashcard = ref(props.flashcard);
const flashcardHistory = ref([]);

const flipCard = () => {
  isFlipped.value = !isFlipped.value;
  console.log(isFlipped.value);
};

const fetchStudysetName = async (studysetId) => {
  try {
    const studyset = await studySetDb.studysets
        .where("id")
        .equals(Number(studysetId))
        .first();
    studysetName.value = studyset ? studyset.title : "Unknown Studyset";
  } catch (error) {
    console.error("Failed to fetch study set:", error);
    studysetName.value = "Unknown Studyset";
  }
};

watch(
    () => props.flashcard,
    (newFlashcard) => {
      if (newFlashcard) {
        currentFlashcard.value = newFlashcard;
        fetchStudysetName(newFlashcard.studyset_id);
      }
    },
    { immediate: true }
);

watch(
    () => route.params.id,
    async (newId) => {
      if (newId) {
        try {
          const flashcard = await flashcardsDB.flashcards.get(Number(newId));
          if (flashcard) {
            flashcardHistory.value.push(currentFlashcard.value); // Add current flashcard to history
            currentFlashcard.value = flashcard;
            fetchStudysetName(flashcard.studyset_id);
          }
        } catch (error) {
          console.error("Failed to fetch flashcard:", error);
        }
      }
    },
    { immediate: true }
);

const isValidImage = computed(() => {
  return (
      typeof currentFlashcard.value.image === "string" &&
      currentFlashcard.value.image.trim() !== "" &&
      currentFlashcard.value.image.startsWith("http")
  );
});

const navigateToRandomFlashcard = async () => {
  try {
    const flashcards = await flashcardsDB.flashcards
        .where("studyset_id")
        .equals(currentFlashcard.value.studyset_id)
        .toArray();
    const filteredFlashcards = flashcards.filter(
        (f) => f.id !== currentFlashcard.value.id
    );
    if (filteredFlashcards.length > 0) {
      const randomFlashcard =
          filteredFlashcards[
              Math.floor(Math.random() * filteredFlashcards.length)
              ];
      router.push(`/review/${randomFlashcard.id}`);
    }
  } catch (error) {
    console.error("Failed to fetch flashcards:", error);
  }
};

const navigateToPreviousFlashcard = () => {
  if (flashcardHistory.value.length > 0) {
    const previousFlashcard = flashcardHistory.value.pop();
    router.push(`/review/${previousFlashcard.id}`);
  }
};
</script>

/* text depends on the flashcard id*/
<template>
  <div v-if="flashcard">
    <span class="p-4 text-2xl font-semibold">
      <router-link :to="`/${studysetName}/${flashcard.studyset_id}/flashcards`">
        <
      </router-link>
      {{ studysetName }}
    </span>
  </div>
  <div v-if="flashcard" class="card h-48 py-80">
    <div
        :class="{
        'card-content transition-transform duration-1000': true,
        flipped: isFlipped,
      }"
    >
      <div
          class="question absolute top-0 bottom-0 right-0 left-0 p-8 bg-pink-600 flex items-center justify-center"
      >
        <div class="athAIna-border-outer p-1">
          <div
              class="athAIna-border-inner flex flex-c justify-between items-center"
          >
            <div class="p-10 font-semibold text-lg">
              <h1></h1>
            </div>
            <div>
              <h1 class="text-athAIna-violet p-64 text-xl">
                {{ currentFlashcard.question }}
              </h1>
            </div>
            <div v-if="isValidImage" class="p-10">
              <img
                  :src="currentFlashcard.image"
                  alt="Flashcard Image"
                  class="max-w-xs h-auto"
              />
            </div>
            <div class="p-10 font-semibold text-lg">
              <button @click="flipCard">
                <h1>></h1>
              </button>
            </div>
            <button @click="navigateToRandomFlashcard" class="next-button">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="#69003D"
                  class="w-6 h-6"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button @click="navigateToPreviousFlashcard" class="prev-button">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="#69003D"
                  class="w-6 h-6"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
          class="answer absolute top-0 bottom-0 right-0 left-0 p-8 bg-pink-600 flex items-center justify-center"
      >
        <div class="athAIna-border-outer p-1">
          <div
              class="athAIna-border-inner flex flex-c justify-between items-center"
          >
            <div class="p-10 font-semibold text-lg">
              <button @click="flipCard">
                <h1><</h1>
              </button>
            </div>
            <div>
              <h1 class="text-athAIna-violet p-64 text-xl">
                {{ currentFlashcard.answer }}
              </h1>
            </div>
            <div class="p-10 font-semibold text-lg">
              <h1>></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-content {
  transform-style: preserve-3d;
}
.flipped {
  transform: rotateY(180deg);
}
.question,
.answer {
  backface-visibility: hidden;
}
.answer {
  transform: rotateY(180deg);
}
.circle-button {
  background-color: white;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>