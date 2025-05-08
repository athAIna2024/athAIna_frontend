<script setup>

import {computed} from "vue";
import {useAuthStore} from "../stores/authStore.js";


const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);

</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="athAIna-border-outer p-1 flex flex-col w-1/3 h-1/3">
      <div
          class="athAIna-border-inner px-14 py-10 flex flex-col items-center text-center"
      >
        <!-- Check Icon -->
        <svg xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             stroke-width="1.5"
             stroke="red"
             class="size-6">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>

        <!-- Title -->
        <h2 class="font-semibold text-[16px] mt-2"> ERROR 404 </h2>
        <!-- Subtitle -->
        <p class="text-[14px] mb-3 mx-9"> Where do you think you're going? </p>
        <router-link v-if="!isLoggedIn" :to="{ name: 'Landing_Page' }">
          <button class="text-[14px] font-semibold btn w-auto px-4">Go back!</button>
        </router-link>

        <router-link v-if="isLoggedIn" :to="{ name: 'Library_Page_Studyset' }">
          <button class="text-[14px] font-semibold btn w-auto px-4">Go back!</button>
        </router-link>
      </div>
    </div>
  </div>
</template>