<script setup>
import { ref, watch, computed } from "vue";
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
const isNavigatingBack = ref(false);

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

      // Only add to history if not navigating back
      if (!isNavigatingBack.value) {
        flashcardHistory.value.push(newFlashcard.id);
        console.log(
          "Added to history:",
          newFlashcard.id,
          "New history:",
          flashcardHistory.value
        );
      } else {
        // Reset the flag after navigation is complete
        isNavigatingBack.value = false;
        console.log("Backtracking - not adding to history");
      }

      // Reset flip state when flashcard changes
      isFlipped.value = false;
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
  console.log("history ", flashcardHistory.value);

  try {
    fetchStudysetName(currentFlashcard.value.studyset_id);
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

      flashcardHistory.value.push(randomFlashcard.id);
      router.replace(
        {
          name: "Review_Mode",
          params: {
            studySetTitle: studysetName.value,
            studySetId: currentFlashcard.value.studyset_id,
            id: randomFlashcard.id,
          },
        },
        () => {
          isFlipped.value = false;
        }
      );
    }
  } catch (error) {
    console.error("Failed to fetch flashcards:", error);
  }
};

const navigateToPreviousFlashcard = () => {
  console.log("Current history before backtracking:", flashcardHistory.value);

  if (flashcardHistory.value.length > 1) {
    flashcardHistory.value.pop();

    const previousFlashcardId =
      flashcardHistory.value[flashcardHistory.value.length - 1];
    console.log("Navigating to previous flashcard:", previousFlashcardId);

    isNavigatingBack.value = true;
    isFlipped.value = false;

    router.push({
      name: "Review_Mode",
      params: {
        studySetTitle: studysetName.value,
        studySetId: currentFlashcard.value.studyset_id,
        id: previousFlashcardId,
      },
    });
  } else {
    console.warn("No previous flashcards in history");
  }
};
</script>

<template>
  <div v-if="flashcard" class="flex flex-row items-center">
    <router-link :to="`/${studysetName}/${flashcard.studyset_id}/flashcards`">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
    </router-link>
    <span class="p-4 text-2xl font-semibold">
      {{ studysetName }}
    </span>
  </div>

  <div class="review-mode-container">
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
    <div @click="flipCard" class="flashcard h-full">
      <div v-if="flashcard" class="card mx-48 h-48 py-80">
        <div
          :class="{
            'card-content transition-transform duration-1000': true,
            flipped: isFlipped,
          }"
        >
          <div
            class="question absolute top-0 bottom-0 right-0 left-0 bg-pink-600 flex items-center justify-center"
          >
            <div class="athAIna-border-outer p-1">
              <div
                class="athAIna-border-inner h-96 py-60 flex flex-row justify-between items-center"
              >
                <div class="font-semibold text-lg">
                  <h1></h1>
                </div>
                <div v-if="isValidImage" class="flex flex-row p-0 items-center">
                  <div>
                    <h1 class="text-athAIna-violet text-xs sm:text-sm md:text-md 2xl:text-2xl p-20 w-full">
                      {{ currentFlashcard.question }}
                    </h1>
                  </div>
                  <div class="p-10">
                    <img
                      :src="currentFlashcard.image"
                      alt="Flashcard Image"
                      class="max-w-xs invisible md:visible h-48 lg:h-64 object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div v-else>
                  <h1 class="text-athAIna-violet text-md 2xl:text-2xl p-32">
                    {{ currentFlashcard.question }}
                  </h1>
                </div>
                <div class="p-0 font-semibold text-lg">
                  <!-- <button @click="flipCard">
                    <h1>></h1>
                  </button> -->
                </div>
              </div>
            </div>
          </div>

          <div
            class="answer absolute top-0 bottom-0 right-0 left-0 bg-pink-600 flex items-center justify-center"
          >
            <div class="athAIna-border-outer p-1">
              <div
                class="athAIna-border-inner h-96 flex flex-row justify-center items-center"
              >
                <div class="font-semibold text-lg">
                  <!-- <button @click="flipCard">
                    <h1><</h1>
                  </button> -->
                </div>
                <div>
                  <h1 class="text-athAIna-violet text-md 2xl:text-2xl p-10">
                    {{ currentFlashcard.answer }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.card-content {
  transform-style: preserve-3d;
}
.flipped {
  transform: rotateX(180deg);
}
.question,
.answer {
  backface-visibility: hidden;
}
.answer {
  transform: rotateX(180deg);
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

.review-mode-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flashcard {
  flex: 1;
  margin: 0 20px;
}

.prev-button,
.next-button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
