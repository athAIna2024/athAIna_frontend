<script setup>
import { ref, defineEmits, watchEffect } from "vue";

// Props
const props = defineProps({
  loadingMessage: String,
  loadingHeader: String,
  condition: Boolean,
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
      if (props.condition === true) {
        // Condition that has to be met to close loading modal
        emit("close");
      }
    }, 3000);
  }
});
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-50"
  >
    <div class="athAIna-border-outer p-1 flex flex-col w-[350px]">
      <div class="athAIna-border-inner px-10 py-10 text-center">
        <!-- Loading Icon (Animated) -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          class="p-0"
          width=""
          height="50"
        >
          <radialGradient
            id="a12"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stop-color="#FFBA20"></stop>
            <stop offset=".3" stop-color="#FFBA20" stop-opacity=".9"></stop>
            <stop offset=".6" stop-color="#FFBA20" stop-opacity=".6"></stop>
            <stop offset=".8" stop-color="#FFBA20" stop-opacity=".3"></stop>
            <stop offset="1" stop-color="#FFBA20" stop-opacity="0"></stop>
          </radialGradient>
          <circle
            transform-origin="center"
            fill="none"
            stroke="url(#a12)"
            stroke-width="10"
            stroke-linecap="round"
            stroke-dasharray="200 1000"
            stroke-dashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
          <circle
            transform-origin="center"
            fill="none"
            opacity=".2"
            stroke="#FFBA20"
            stroke-width="10"
            stroke-linecap="round"
            cx="100"
            cy="100"
            r="70"
          ></circle>
        </svg>

        <h2 class="font-semibold text-[16px] mt-3">{{ loadingHeader }}</h2>
        <p class="text-[14px]">{{ loadingMessage }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
