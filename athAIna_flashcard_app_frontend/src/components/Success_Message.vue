<script setup>
import { defineProps, defineEmits, watchEffect } from "vue";

// Props
const props = defineProps({
  successHeader: String,
  successMessage: String,
  isVisible: Boolean,
});

// Emits
const emit = defineEmits(["close"]);

// Methods
const closeModal = () => {
  emit("close");
};

// Timeout Reference
let timeoutId = null;

// Watch for modal visibility changes
watchEffect(() => {
  if (props.isVisible) {
    // Clear any previous timeout (prevents multiple timers from stacking)
    if (timeoutId) clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
      emit("close");
    }, 1000); // 3000 is too long
  }
});
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
        <!-- Check Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.75"
          stroke="green"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <!-- Title -->
        <h2 class="font-semibold text-[16px] mt-2">{{ successHeader }}</h2>
        <!-- Subtitle -->
        <p class="text-[14px] mb-3 mx-9">{{ successMessage }}</p>
        <!-- OK Button -->
        <!--        <button @click="closeModal" class="text-[14px] font-semibold btn w-auto px-4">OK</button>-->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
