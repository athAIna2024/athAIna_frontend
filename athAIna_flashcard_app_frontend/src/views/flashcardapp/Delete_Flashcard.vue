<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import Delete_Confirmation from "@/views/flashcardapp/Delete_Confirmation.vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Delete Flashcard",
  },
});

const emit = defineEmits(['close']);

const isDeleteConfirmationModalVisible = ref(false);

const openDeleteConfirmationModal = () => {
  isDeleteConfirmationModalVisible.value = true;
};

const closeDeleteConfirmationModal = () => {
  isDeleteConfirmationModalVisible.value = false;
};

const close = () => {
  emit('close');
};

watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    document.title = `${props.title}`;
  } else {
    document.title = "athAIna";
  }
});

watch(isDeleteConfirmationModalVisible, (newValue) => {
  if (newValue) {
    document.title = `${props.title}`;
    setTimeout(() => {
      closeDeleteConfirmationModal();
      close();
    }, 500);
  } else {
    document.title = "Delete Flashcard";
  }
});
</script>
<template>
  <transition name="modal-fade" mode="out-in">
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-athAIna-black bg-opacity-50 z-40">
          <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
              <div class="athAIna-border-inner p-4 text-center">
                <div class="flex flex-col justify-center items-center">
                  <div class="text-athAIna-base m-[40px] text-center">
                    Are you sure you want to delete this flashcard?
                  </div>
                  <div class="flex flex-row space-x-5 mb-[30px]">
                    <div class="athAIna-border-outer p-1 w-48 rounded-full">
                      <button @click="close" class="athAIna-border-inner rounded-full"> No </button>
                    </div>
                    <div>
                      <button @click="openDeleteConfirmationModal" class="btn w-48"> Confirm </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
    </div>
  </transition>

  <Delete_Confirmation :isVisible="isDeleteConfirmationModalVisible" title="Delete Confirmed" @close="closeDeleteConfirmationModal">
  </Delete_Confirmation>

</template>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.modal-fade-enter, .modal-fade-leave-to /* .modal-fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>