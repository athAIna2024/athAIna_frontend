<script setup>
import {defineProps, defineEmits, ref, inject, computed} from "vue";
import Success_Message from "@/components/Success_Message.vue";
import Error_Message from "@/components/Error_Message.vue";

// Emits
const emit = defineEmits(["next", "error", "success", 'prev', 'loading', 'warning']);

// Reactive state variables
const modalState = ref(""); // 'error', 'success', 'warning', 'loading'
const successMessage = ref("");
const errorMessage = ref("");
// const uploadedFile = inject("uploadedFile");
// console.log(props.uploadedFile?.name); // For debugging only
// console.log(uploadedFile); // For debugging only

console.log()

// Props
const props = defineProps({
  isVisible: Boolean,
  uploadedFile: {
    type: Object,
    required: true,
  },
});

// Methods
const showErrorModal = (message) => {
  errorMessage.value = message;
  modalState.value = "error";
};

const showSuccessModal = (message) => {
  successMessage.value = message;
  modalState.value = "success";
};

console.log("Prop:" + props.uploadedFile);
const fileName = computed(() => props.uploadedFile?.name || "No file selected");

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
          <p class="text-[16px]">{{ fileName }}</p>
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
    <button class="px-28 btn font-semibold mb-6" @click="$emit('next')">Submit</button>
  </div>
</template>

<style scoped>

</style>