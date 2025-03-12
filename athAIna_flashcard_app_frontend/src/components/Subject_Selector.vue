<script setup>
// export default {
//   name: 'Subject_Selector',
// };
defineProps({
  placeholder: String,
});
import { ref } from "vue";
</script>

<template>
  <div class="athAIna-border-outer p-1 rounded-[20px] h-[40px]">
    <div
      class="athAIna-border-inner rounded-[15px] relative flex flex-row items-center justify-between px-3 text-sm"
    >
      <span>{{ placeholder }}</span>
      <svg
        @click="toggleModal"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-5 text-athAIna-violet hover:cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped></style>
