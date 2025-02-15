<script setup>
import {defineProps, defineEmits, ref, computed, onMounted, watchEffect, onUnmounted} from "vue";
import Success_Message from "@/components/Success_Message.vue";
import Error_Message from "@/components/Error_Message.vue";
import Warning_Message from "@/components/Warning_Message.vue";
import Confirmation_Prompt from "@/components/Confirmation_Prompt.vue";

// Emits
const emit = defineEmits(['next', 'error', 'success', 'prev', 'loading', 'warning', 'confirm', 'pageSelect']);

// Reactive state variables
const modalState = ref(""); // 'warning', 'confirm'
const successMessage = ref("");
const errorMessage = ref("");
const warningHeader = ref("Disclaimer");
const warningMessage = ref("Your file contains images that will not be processed for flashcard generation. " +
    "Manual creation for image-based learning is recommended.");
const isConfirmVisible = ref(false);
const isWarningVisible = ref(false);
const confirmQuestion = ref("Are you sure you want to submit the file?");
const hasImage = ref(true);
// const storedFile = ref("");
// const uploadedFile = ref("No file selected");
// console.log(props.uploadedFile?.name); // For debugging only
// console.log(uploadedFile); // For debugging only

// Props
const props = defineProps({
  isVisible: Boolean,
  uploadedFile: {
    type: Object,
    required: true,
  },
});

// Methods
const closeModal = () => {
  emit("close");
  modalState.value = "";
};

const showErrorModal = (message) => {
  errorMessage.value = message;
  modalState.value = "error";
};

const showSuccessModal = (message) => {
  successMessage.value = message;
  modalState.value = "success";
};

const showWarningModal = (header, message) => {
  warningHeader.value = header;
  warningMessage.value = message;
  modalState.value = "warning";
};

const showConfirmPrompt = () => {
  // modalState.value = "confirm";
  isConfirmVisible.value = true;
};

// FIXME: Fix weird Warning_Message render logic.
const handleConfirmPrompt = () => {
  isConfirmVisible.value = false;
  console.log("handleConfirmPrompt()");
  if (hasImage === true) {
    isWarningVisible.value = true;
  } else {
    emit('next');
  }
};

const closeConfirmPrompt = () => {
  isConfirmVisible.value = false;
  console.log("closeConfirmPrompt()")
};

const validate = () => {
  // if (!props.uploadedFile) {
  //   closeModal();
  //   showConfirmPrompt("Are you sure you want to confirm the file submission?");
  // } else {
  //   emit("loading");
  // };
  // isConfirmVisible.value = true;
  emit("next");
};

// const isWarningModalVisible = () => {
//   closeModal();
//   showWarningModal(
//       "Disclaimer",
//       "Your file contains images that will not be processed for flashcard generation. " +
//       "Manual creation for image-based learning is recommended."
//   );
//   modalState.value = 'pageSelect';
// }

const closeWarningModal = () => {
  isConfirmVisible.value = false;
  emit('next');
}

const fileName = ref("No file selected.");

onMounted(() => {
  loadFileName();

  window.addEventListener('storage', loadFileName);
});

onUnmounted(() => {
  window.removeEventListener('storage', loadFileName);
});

const loadFileName = () => {
  const storedFile = localStorage.getItem("uploadedFile");
  if (storedFile) {
    try {
      const parsedFile = JSON.parse(storedFile);
      fileName.value = parsedFile.name || "Unknown File";
    } catch (e) {
      console.error("Error parsing uploaded file from localStorage:", e);
    }
  }
};

// inject("uploadedFile", uploadedFile);
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center">
    <!-- Upload File Text -->
    <h2 class="text-xl font-semibold mt-9 mb-2">Upload File to Generate</h2>

    <div class="px-16">
      <!-- Disclaimer -->
      <p class="text-[9px] mb-9">Disclaimer: Images in files are disregarded during flashcard generation.</p>

      <!-- File Ready Row-->
      <div class="flex flex-row width-max justify-between mb-9">
        <!-- File Details Section-->
        <div class="flex flex-row justify-start gap-x-4 items-center ">
          <!-- File Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <!-- File Name -->
          <p class="text-[16px] w-[200px] truncate">{{ fileName }}</p>
        </div>

        <!-- Remove File Section -->
        <div class="flex flex-row justify-end">
          <!-- Remove File Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
               class="size-6 hover:cursor-pointer" @click="$emit('prev')">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <button class="px-28 btn font-semibold mb-6" @click="showConfirmPrompt">Submit</button>
  </div>

  <!-- Confirmation Prompt -->
  <Confirmation_Prompt
      :isVisible="isConfirmVisible"
      :confirmQuestion="confirmQuestion"
      @close="closeConfirmPrompt"
      @confirm="handleConfirmPrompt"
  />

  <!-- Warning Modal -->
  <Warning_Message
      :isVisible="isWarningVisible"
      :warningHeader="warningHeader"
      :warningMessage="warningMessage"
      @close="closeWarningModal"
  />
</template>

<style scoped>

</style>