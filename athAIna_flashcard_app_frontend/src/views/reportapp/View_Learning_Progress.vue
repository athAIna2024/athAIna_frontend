<script setup>
import { ref, computed } from "vue";
import Choose_Studyset from "@/views/reportapp/Choose_Studyset.vue";

// Props
const props = defineProps({
  isVisible: Boolean,
});

// Reactive Variables
const isChooseStudySetVisible = ref(false);

// Define Emits
const defineEmits = ["close"];

// Methods
const showChooseStudySetModal = () => {
  isChooseStudySetVisible.value = true;
};

const close = () => {
  isChooseStudySetVisible.value = false;
};
</script>


<template>
  <div class="h-screen">
    <div class="flex flex-col items-center justify-center gap-y-3 content-center flex-grow h-full w-full">
      <p>No report yet. Take a test first.</p>
      <div class="btn w-60 hover:cursor-pointer" @click="showChooseStudySetModal">Test yourself now</div>
    </div>
  </div>

  <Choose_Studyset
      :isVisible="isChooseStudySetVisible"
      @close="close"
  />
</template>

<style scoped>
</style>