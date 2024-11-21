<script>
import { EventBus } from "@/eventBus.js";

export default {
  name: 'Flashcard_Card',
  props: {
    flashcard: Object
  },
  methods: {
    goFlashCard() {
      this.$router.push({ name: 'Flashcard', params: { id: this.flashcard.id } });
    },
    toggleModal(modal) {
      EventBus.$emit('toggleModal', modal);
    }
  }
};
</script>

<template>
  <div class="athAIna-border-outer p-1 m-4">
    <div class="athAIna-border-inner">
      <div class="rounded-lg p-6 py-16 w-96" @click="goFlashCard()">
    <router-link :to="'/review' + flashcard.id" class="text-athAIna-red">
      <h1 class="">{{ flashcard.question }}</h1>
    </router-link>
        <div class="athAIna-border-outer p-[1.5px]">
          <div class="athAIna-border-inner">

          </div>
        </div>
              <div class="flex justify-end">
                <router-link :to="'/edit_flashcard' + flashcard.id" class="text-athAIna-red">
                  <button class="p-2">Edit</button>
                </router-link>
                <button class="p-2" @click.stop="toggleModal('deleteModal')">Delete</button>
          </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
</style>