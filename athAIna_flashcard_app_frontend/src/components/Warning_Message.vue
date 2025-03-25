<script setup>
import { defineProps, defineEmits } from "vue";

// Props
const props = defineProps({
  warningHeader: String,
  warningMessage: String,
  isVisible: Boolean,
});

// Emits
const emit = defineEmits(["close", "next"]);

// Methods
const closeModal = () => {
  emit("close");
};
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40"
  >
    <div class="athAIna-border-outer p-1 flex flex-col w-auto">
      <div
        class="athAIna-border-inner px-14 py-10 flex flex-col items-center text-center"
      >
        <!-- Warning Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="orange"
          class="size-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
        <!-- Warning Header -->
        <h2 class="font-semibold text-[16px] my-4">{{ warningHeader }}</h2>
        <!-- Warning Message -->
        <p class="text-sm w-[375px] mb-8">{{ warningMessage }}</p>
        <!-- Submit Button -->
        <button @click="closeModal" class="btn py-0 h-9 w-24 font-semibold">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
