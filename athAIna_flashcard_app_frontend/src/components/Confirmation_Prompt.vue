<script setup>
import { defineProps, defineEmits, ref } from "vue";

// Props
const props = defineProps({
  confirmQuestion: String,
  isVisible: Boolean,
});

// Reactive Variables
const modalState = ref("");

// Emits
const emit = defineEmits(["close", "confirm"]);

// Methods
const closeModal = () => {
  emit("close");
};

const confirmAction = () => {
  emit("confirm");
  // modalState.value ='next';
};
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-athAIna-black bg-opacity-50 z-40"
  >
    <div
      class="bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red p-[4px] rounded-[20px] flex flex-col w-[550px]"
    >
      <div
        class="flex flex-col justify-center items-center bg-athAIna-white p-[15px] rounded-[15px]"
      >
        <p class="text-[16px] m-[40px] text-center">{{ confirmQuestion }}</p>
        <div class="flex justify-between space-x-5 mb-[30px]">
          <div
            class="flex bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red p-[4px] rounded-[20px]"
          >
            <button
              @click="closeModal"
              class="bg-athAIna-white text-athAIna-violet font-medium w-[210px] rounded-[18px]"
            >
              No
            </button>
          </div>
          <button @click="confirmAction" class="btn w-[210px] font-semibold">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
