<script setup>
import { ref } from "vue";
import { onMounted } from "vue";

import Choose_Studyset from "@/views/reportapp/Choose_Studyset.vue";
import Report from "@/views/reportapp/Report.vue";

// Props
const props = defineProps({
  isVisible: Boolean,
});

// Reactive Variables
const isChooseStudySetVisible = ref(false);
const isEmpty = ref(false); // empty report

const isTestModeVisible = ref(false);


// Define Emits
const defineEmits = ["close"];

// Methods
const showChooseStudySetModal = () => {
  isChooseStudySetVisible.value = true;
};

const closeTest_Mode = () => {
  isTestModeVisible.value = false;
};

const close = () => {
  isChooseStudySetVisible.value = false;
};



</script>


<template>
  <div class="h-screen">
    <div v-if="isEmpty" class="flex flex-col items-center justify-center gap-y-3 content-center flex-grow h-full w-full">
      <p>No report yet. Take a test first.</p>
      <div class="btn w-60 hover:cursor-pointer" @click="showChooseStudySetModal">Test yourself now</div>
    </div>

    <div v-else class="flex flex-col items-center justify-center gap-y-3 content-center flex-grow h-full w-full">
      <Report></Report>
    </div>
  </div>

  <Choose_Studyset
      :isVisible="isChooseStudySetVisible"
      @close="close"
  />
</template>

<style scoped>
</style>