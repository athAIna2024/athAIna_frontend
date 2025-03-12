<script setup>
import { defineProps, defineEmits } from "vue";

// Props
const props = defineProps({
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
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40"
  >
    <div class="athAIna-border-outer p-1 flex flex-col w-auto">
      <div class="athAIna-border-inner px-3 py-6 text-center">
        <h2>Success</h2>
        <p>{{ errorMessage.value }}</p>
        <button @click="closeModal">OK</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
