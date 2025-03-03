<script>
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
</script>

/* text depends on the flashcard id*/
<template>
  <span class="p-4 text-2xl font-semibold">
            <router-link to="/library_of_flashcards"> < </router-link> Networking
  </span>
  <div class="card h-48 py-80">
    <div :class="{'card-content transition-transform duration-1000': true, 'flipped': isFlipped}">
      <div class="question absolute top-0 bottom-0 right-0 left-0 p-8 bg-pink-600 flex items-center justify-center">
        <div class="athAIna-border-outer p-1">
          <div class="athAIna-border-inner flex flex-c justify-between items-center">
            <div class="p-10 font-semibold text-lg">
              <h1></h1>
            </div>
            <div>
              <h1 class="text-athAIna-violet p-64 text-xl">
                {{ currentFlashcard.question }}
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

      <div class="answer absolute top-0 bottom-0 right-0 left-0 p-8 bg-pink-600 flex items-center justify-center">
        <div class="athAIna-border-outer p-1">
          <div class="athAIna-border-inner flex flex-c justify-between items-center">
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
