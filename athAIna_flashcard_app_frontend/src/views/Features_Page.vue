<!-- FIXME: Turn cards to components for cleaner code -->
<script setup>
import { defineComponent, onMounted, watch } from 'vue';

defineComponent({
  name: 'Features_Page',
})

</script>

<template>
  <div class="mx-14 my-20 mt-24 p-15 -z-0">

    <!-- Heading -->
    <div class="text-[28px] font-semibold my-5 mb-14">
      <span> Unlock Smarter Studying with AI Flashcards </span>
    </div>

    <!-- Card Grid -->
    <div class="grid grid-cols-2 gap-16 gap-y-24">

      <!-- Description Card 1 -->
      <div class="h-auto w-auto items-center athAIna-border-outer p-1">
        <div class="athAIna-border-inner p-12">

          <h1 class="text-xl font-semibold my-7 mt-9">
            AI-Powered Flashcard Generation
          </h1>

          <p class="leading-9 text-[14px] font-normal">
            Harness the power of AI to generate customized flashcards instantly
            from your uploaded notes. No need to manually create cards - our
            intelligent system understands your content and generates study
            materials tailored to your needs
          </p>

          <RouterLink to="/signup" class="w-full mx-4">
            <button class="btn h-[45px] rounded-[15px] !font-semibold mt-8 w-full">Generate My Flashcards</button>
          </RouterLink>        </div>      </div>

    <!-- Icon Card 1 -->
    <div class="p-1 bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red h-auto w-auto rounded-lg flex items-center justify-center">
      <img src="/book-icon.svg" alt="Animated Book Icon" class="" />
    </div>

    <!-- Icon Card 2 -->
    <div class="p-1 bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red h-auto w-auto rounded-lg flex items-center justify-center">
      <img src="/test-icon.svg" alt="Animated Book Icon" class="" />
    </div>

    <!-- Description Card 2-->
    <div class="h-auto w-auto items-center athAIna-border-outer p-1">
      <div class="athAIna-border-inner p-12">

        <h1 class="text-xl font-semibold my-7 mt-9"> Test Mode </h1>

        <p class="leading-9 text-[14px] font-normal">
          Take your learning to the next level by testing yourself with your
          AI-generated flashcards. Whether you're preparing for an exam or
          reviewing concepts, our interactive test mode will help you
          strengthen your knowledge and identify areas for improvement.
        </p>

        <RouterLink to="/signup" class="w-full mx-4">
          <button class="btn h-[45px] rounded-[15px] !font-semibold mt-8 w-full"> Generate My Test </button>
        </RouterLink>
      </div>
    </div>

    <!-- Description Card 3-->
    <div class="h-auto w-auto items-center athAIna-border-outer p-1">
      <div class="athAIna-border-inner p-12">

        <h1 class="text-xl font-semibold my-7 mt-9"> Reports Generation </h1>

        <p class="leading-9 text-[14px] font-normal">
          Get detailed insights into your performance with our comprehensive
          report generation feature. After every test, view your scores,
          analyze your strengths and weaknesses, and track your progress over
          time to ensure you're on the path to success.
        </p>

        <RouterLink to="/signup" class="w-full mx-4">
          <button class="btn h-[45px] rounded-[15px] !font-semibold mt-8 w-full"> Generate My Report </button>
        </RouterLink>
      </div>
    </div>

    <!-- Icon Card 3 -->
    <div class="p-1 bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red h-auto w-auto rounded-lg flex items-center justify-center">
      <img src="/book-icon.svg" alt="Animated Book Icon" class="" />
    </div>

    </div>
  </div>
</template>

<style scoped></style>