<!-- <script>
export default {
  name: 'Review_Mode_Flashcard',
  data() {
    return {
      isFlipped: false
    };
  },
  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped;
      console.log(this.isFlipped);
    }
  }
};
</script> -->
<script setup>
import { ref, defineProps, watch } from "vue";
import Dexie from "dexie";

const props = defineProps({
  flashcard: {
    type: Object,
    required: true,
  },
});

const isFlipped = ref(false);
const studysetName = ref("");

// Initialize the existing study sets database
const studysetsDB = new Dexie("StudySetDatabase");
studysetsDB.version(1).stores({
  studysets: "id, name, description, created_at, updated_at",
});
const flipCard = () => {
  isFlipped.value = !isFlipped.value;
  console.log(isFlipped.value);
};
watch(
  () => props.flashcard,
  async (newFlashcard) => {
    if (newFlashcard) {
      try {
        const studyset = await studysetsDB.studysets.get(
          Number(newFlashcard.studyset_id)
        );
        console.log(studyset);
        console.log("name", studyset.title);
        studysetName.value = studyset ? studyset.title : "Unknown Studyset";
      } catch (error) {
        console.error("Failed to fetch study set:", error);
        studysetName.value = "Unknown Studyset";
      }
    }
  },
  { immediate: true }
);
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
                {{ flashcard.question }}
              </h1>
            </div>
            <div class="p-10 font-semibold text-lg">
              <button @click="flipCard">
                <h1>></h1>
              </button>
            </div>
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
                {{ flashcard.answer }}
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
</style>
