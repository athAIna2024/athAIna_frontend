<!-- FIXME: MAJOR: PAGE LIST RENDERING LOGIC (V-FOR) -->
<script setup>
import { ref, computed, defineEmits } from 'vue';

// Define props
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Select Page — athAIna",
  }
});

// Emit function to send custom events
const emit = defineEmits();

// Define returned data
const isPageSelectorVisible = ref(true);
const pages = ref([
    {
      id: 1,
      image: null,
    },
    {
      id: 2,
      image: null,
    },
]);
const input = '';

// Define computed properties
const pageList = computed(() => {
  return pages.value.filter(page => {
    // return page.id.toLowerCase().includes(input.toLowerCase());
    return page.id;
  });
});

</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40">
    <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
      <div class="athAIna-border-inner p-7 text-center">
        <div class="flex flex-col">
          <!-- Back Button -->
          <!-- FIXME: Apply 'Previous Step' Logic to Back Button -->
          <div class="flex flex-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </div>
          <!-- Modal Title -->
          <div class="font-semibold text-[18px] mt-5 mb-5">
            Select Pages
          </div>
          <!-- File Name -->
          <div class="text-[14px] mb-10">
            notes.docx
          </div>
          <!-- Pages To Select -->
          <div class="flex flex-row justify-center">
            <!-- FIXME: Change bg color to gray -->
            <div class="w-[90px] h-[120px] bg-athAIna-black rounded-[10px]">
            <!-- FIXME: adding v-for currently prevents rendering of Page Selector modal -->
              <!--            v-for="page in pageList()" :key="page.id" >-->
            </div>
          </div>
          <!-- Generate Button -->
          <div class="flex justify-center mt-[50px]">
            <div class="btn w-[200px] mb-[25px] hover:cursor-pointer" @click="emit('close')"> Generate </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>