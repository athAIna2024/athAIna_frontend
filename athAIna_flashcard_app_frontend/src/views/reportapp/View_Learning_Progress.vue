<script setup>
import { ref } from "vue";
import { onMounted } from "vue";

import Choose_Studyset from "@/views/reportapp/Choose_Studyset.vue";
import Report from "@/views/reportapp/Report.vue";
import axios from '@/axios';

// Props
const props = defineProps({
  isVisible: Boolean,
});

// Reactive Variables
const isChooseStudySetVisible = ref(false);
const isEmpty = ref(false);

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



const fetchTestReport = async () => {
  try {
    const url = 'report';
    const response = await axios.get(url, {
      params: {
        id: 1,
        studyset_id: 2,
        start_date: "2025-03-28 10:50:31.546000",
        end_date: "2025-03-28 11:50:31.546000"
      }
    });

    if (response.data.successful) {
      console.log('Test scores found:', response.data);
    } else {
      console.log('No test scores found:', response.data.message);
    }
  } catch (error) {
    console.error('An error occurred while fetching the test report:', error);
  }
};

onMounted(() => {
  fetchTestReport();
});


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