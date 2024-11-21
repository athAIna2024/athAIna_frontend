<script>
import Delete_Confirmation from "@/views/flashcardapp/Delete_Confirmation.vue";

export default {
  name: 'Delete_Flashcard',
  components: {
    Delete_Confirmation
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Delete Flashcard",
    },
  },
  data() {
    return {
      isDeleteConfirmationModalVisible: false,
    }
  },
  methods: {
    openDeleteConfirmationModal() {
      this.isDeleteConfirmationModalVisible = true;
    },
    closeDeleteConfirmationModal() {
      this.isDeleteConfirmationModalVisible = false;
    },
    closeDeleteFlashcardModal() {
      this.$emit('close');
    }
  },
  watch: {
    isVisible(newValue) {
      if (newValue) {
        document.title = `${this.title}`;
      } else {
        document.title = "athAIna";
      }
    },
    isDeleteConfirmationModalVisible(newValue) {
      if (newValue) {
        document.title = `${this.title}`;
        setTimeout(() => {
          this.closeDeleteConfirmationModal();
          this.closeDeleteFlashcardModal();
        }, 2000);
      } else {
        document.title = "Delete Flashcard";
      }
    }
  }
};
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40">
        <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
            <div class="athAIna-border-inner p-4 text-center">
              <h1 class="m-10"> Permanently delete flashcard? </h1>
              <div class="flex justify-between mb-8">
                <div class="athAIna-border-outer p-1 w-48 rounded-full">
                  <button @click="close" class="athAIna-border-inner rounded-full"> No </button>
                </div>
                <button @click="openDeleteConfirmationModal" class="btn w-48"> Confirm </button>
              </div>
            </div>
        </div>
  </div>

  <Delete_Confirmation v-if="isDeleteConfirmationModalVisible" :isVisible="isDeleteConfirmationModalVisible" title="Delete Confirmed" @close="closeDeleteConfirmationModal">
  </Delete_Confirmation>

</template>

<style scoped>
</style>