<script setup>
import {defineEmits, defineProps, ref} from "vue";
import Floating_Dropdown from "@/components/Floating_Dropdown.vue";

const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40">
    <div class="athAIna-border-outer p-1 flex flex-col w-[400px]">
      <div class="athAIna-border-inner p-7 flex flex-col">

        <!-- Close Button -->
        <div class="flex justify-end">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
               class="size-6 hover:cursor-pointer" @click="close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>

        <!-- Heading -->
        <p class="font-semibold text-[20px] mb-5"> Choose a study set </p>

        <!-- Subject Field -->
        <div class="mb-8">
          <div class="mb-3 font-medium">Subject</div>

          <!-- Dropdown Unclicked -->
          <div class="flex justify-end border-athAIna-violet border-[3px] rounded-[20px] p-[5px] pr-[14px]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-[20px] hover:cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>

          <!-- FIXME: Add Dropdown-->
          <!--          <Floating_Dropdown top="0" left="0" width="100%" height="50px" />-->
        </div>

        <!-- Number of Questions Field -->
        <div class="mb-10">
          <div class="mb-3 font-medium">Number of Questions</div>

          <!-- Dropdown Unclicked -->
          <input type="text"
                 class="flex justify-start border-athAIna-violet border-solid border-[3px] rounded-[20px] text-[14px] p-[5px] pl-[14px] w-full"/>
        </div>

        <!-- Take Test Button -->
        <div class="flex justify-center mb-4">
          <div class="btn font-semibold hover:cursor-pointer" @click="close">Take a Test</div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>