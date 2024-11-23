<script>
import Update_Flashcard from "@/views/flashcardapp/Update_Flashcard.vue";
import Delete_Flashcard from "@/views/flashcardapp/Delete_Flashcard.vue";
import AI_Flashcard from "@/views/flashcardapp/Generate_Flashcard_with_AI.vue";

export default {
  name: 'Flashcard_Card',
  props: {
    flashcard: {
      type: Object,
      required: true
    }
  },
  components: {
    AI_Flashcard,
    Update_Flashcard,
    Delete_Flashcard
  },
  data() {
    return {
      isUpdateModalVisible: false,
      isDeleteModalVisible: false,
      isAIFlashcardVisible: false,
    }
  },
  methods: {
    openUpdateModal() {
      this.isUpdateModalVisible = true;
    },
    closeUpdateModal() {
      this.isUpdateModalVisible = false;
    },
    openDeleteModal() {
      this.isDeleteModalVisible = true;
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
    },
    openAI_Flashcard() {
      this.isAIFlashcardVisible = true;
    },
    closeAI_Flashcard() {
      this.isAIFlashcardVisible = false;
    },
  }
};
</script>

<template>
  <div class="athAIna-border-outer p-1 shadow-md">
    <div class="athAIna-border-inner">
      <div class="rounded-lg p-6 py-8 w-full h-48" @click="goFlashCard()">
        <router-link :to="'/review/' + flashcard.id" class="text-athAIna-red">
          <h1 class="text-athAIna-violet text-athaina-base mb-5 h-20">{{ flashcard.question }}</h1>
          <!-- FIXME: Add logic for excessive text length. -->
        </router-link>  
        <div class="athAIna-border-violet p-[0.5px] w-full mt-[12px] mb-[5px]">
        </div>
            <div class="flex justify-end text-athAIna-violet">
              <router-link :to="'/update_flashcard/' + flashcard.id">
                <button class="p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>
              </router-link>
              <button class="" @click="openDeleteModal">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              </button>
          </div>
      </div>
    </div>
  </div>

  <Delete_Flashcard :is-visible="isDeleteModalVisible" @close="closeDeleteModal" />

</template>

<style scoped>
</style>