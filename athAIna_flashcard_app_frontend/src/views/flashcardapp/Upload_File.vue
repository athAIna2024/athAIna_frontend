<!-- FIXME: Throw uploaded file value to File_Ready.vue -->
<script setup>
import {defineProps, defineEmits, ref, watch, inject, provide} from "vue";
// import Success_Message from "@/components/Success_Message.vue";
import Error_Message from "@/components/Error_Message.vue";

// Reactive state variables
const modalState = ref(""); // 'error'
const errorMessage = ref("");
// const successMessage = ref("");
const isFileUploaded = ref(false);

// Props
const props = defineProps({
  isVisible: Boolean,
  uploadedFile: {
    type: Object,
    required: true,
  },
});

// Emits
const emit = defineEmits(["next", "error", "success", "update:uploadedFile"]);

// Methods
const showErrorModal = (message) => {
  errorMessage.value = message;
  modalState.value = "error";
};

// const showSuccessModal = (message) => {
//   successMessage.value = message;
//   modalState.value = "success";
// };

const handleFileUpload = (event) => {
  if (!event.target.files.length) {
    console.log("Error. No file selected.");
  } else {
    console.log("Before update:", event.target.files[0]);
    emit("update:uploadedFile", event.target.files[0]);
    console.log("After update:", event.target.files[0]);
    isFileUploaded.value = true;
    console.log("Successful File Upload!") // For debugging only
    emit("next");
    // showSuccessModal("File uploaded successfully!");
  }
};

// Watch for when success modal closes
// watch(modalState, (newValue) => {
//   if (newValue === "" && isFileUploaded.value) {
//     emit("next"); // Proceed only after success modal closes
//   }
// });
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center">
    <!-- Upload File Text -->
    <h2 class="text-xl font-semibold mt-7 mb-8 mx-14">Upload File to Generate</h2>
    <!-- Choose File Button -->
    <label class="btn w-auto flex justify-between text-[16px] gap-2 py-4 pr-7 pl-6 font-medium mb-8">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
      </svg>
      Choose File
      <input class="hidden" type="file" @change="handleFileUpload" />
    </label>
<!--    <button @click="$emit('next')">Next</button>-->
  </div>

  <!-- Success Modal -->
  <Success_Message
      v-if="modalState === 'success'"
      :isVisible="modalState === 'success'"
      :successMessage="successMessage"
      @close="modalState = ''"
  />
</template>

<style scoped>

</style>