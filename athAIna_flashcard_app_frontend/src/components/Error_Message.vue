<script setup>
import { defineProps, defineEmits } from "vue";

// Props
const props = defineProps({
  errorHeader: String,
  errorMessage: String,
  isVisible: Boolean,
});

// Emits
const emit = defineEmits(["close"]);

// Methods
const closeModal = () => {
  emit("close");
};

</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40">
    <div class="athAIna-border-outer p-1 flex flex-col w-auto">
      <div class="athAIna-border-inner px-5 py-7 text-center flex flex-col">

        <!-- Close Button -->
        <div class="flex justify-end">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor"
               class="size-6 hover:cursor-pointer flex justify-end p-0 m-0" @click="closeModal">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>

        <!-- Error Icon -->
        <div class="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red"
               class="size-7 mt-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>

        <!-- Error Header & Message-->
        <h2 class="font-semibold text-[16px] mt-3">{{ errorHeader }}</h2>
        <p class="text-[14px] mb-5 px-8">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>