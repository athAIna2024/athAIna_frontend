<script setup>
import { defineComponent, onMounted } from 'vue';

defineComponent({
  name: 'Features_Page',
});

onMounted(() => {
  document.title = 'Features – AthAIna';
});
</script>

<template>
  <div class="m-10 p-10 -z-0">
    <div class="text-3xl font-semibold my-5">
      <span>Unlock Smarter Studying with AI Flashcards</span>
    </div>
    <div class="grid grid-cols-2 items-center">
      <div class="h-96 items-center athAIna-border-outer p-1">
        <div class="athAIna-border-inner p-10">
          <h1 class="text-2xl font-semibold my-5">
            AI-Powered Flashcard Generation
          </h1>
          <p class="text-md">
            Harness the power of AI to generate customized flashcards instantly
            from your uploaded notes. No need to manually create cards - our
            intelligent system understands your content and generates study
            materials tailored to your needs
          </p>
          <RouterLink to="/signup" class="w-full mx-4">
            <button class="btn mt-8 w-full">Generate My Flashcards</button>
          </RouterLink>
        </div>
      </div>
      <div
        class="p-1 bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red h-96 m-5 rounded-lg flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          class="size-16"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      </div>
      <div
        class="bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red h-96 m-5 rounded-lg flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          class="size-16"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      </div>
      <div class="h-96 items-center athAIna-border-outer p-1">
        <div class="athAIna-border-inner p-10">
          <h1 class="text-2xl font-semibold my-5">Test mode</h1>
          <p class="text-lg">
            Take your learning to the next level by testing yourself with your
            AI-generated flashcards. Whether you're preparing for an exam or
            reviewing concepts, our interactive test mode will help you
            strengthen your knowledge and identify areas for improvement.
          </p>
          <RouterLink to="/signup" class="w-full mx-4">
            <button class="btn mt-8 w-full">Generate My Test</button>
          </RouterLink>
        </div>
      </div>
      <div class="h-96 items-center athAIna-border-outer p-1">
        <div class="athAIna-border-inner p-10">
          <h1 class="text-2xl font-semibold my-5">Reports Generation</h1>
          <p class="text-lg">
            Get detailed insights into your performance with our comprehensive
            report generation feature. After every test, view your scores,
            analyze your strengths and weaknesses, and track your progress over
            time to ensure you're on the path to success.
          </p>
          <RouterLink to="/signup" class="w-full mx-4">
            <button class="btn mt-8 w-full">Generate My Report</button>
          </RouterLink>
        </div>
      </div>
      <div
        class="bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red h-96 m-5 rounded-lg flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          class="size-16"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
