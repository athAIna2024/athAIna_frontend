<script>
export default {
  name: "Demo_Page",
};
</script>

<template>
  <div class="m-10 mt-14 p-10 -z-0 flex flex-col items-center gap-y-32">
    <!-- First Row -->
    <div class="flex flex-row gap-x-20 h-96">
      <div class="bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red h-full m-5 w-11/12 rounded-lg flex items-center justify-center">
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

      <div class="h-full m-5 w-full justify-center flex flex-col">
        <h1 class="text-2xl font-semibold my-5">
          AI-Powered Flashcard Generation
        </h1>
        <p class="text-lg">
          Easily generate customized flashcards from your uploaded notes—our
          intelligent system analyzes your content and creates tailored study
          materials in an instant, eliminating the need for manual creation.
        </p>
      </div>
    </div>

    <!-- Second Row -->
    <div class="flex flex-row gap-x-[35px] h-96">
      <div class="h-full m-5 w-full justify-center flex flex-col">
        <h1 class="text-2xl font-semibold my-5">Comprehensive Test Mode</h1>
        <p class="text-lg">
          Enhance your learning experience by testing yourself with AI-generated
          flashcards; our interactive test mode supports exam preparation and
          concept review, helping you strengthen your knowledge and identify areas
          for improvement.
        </p>
      </div>

      <div class="bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red h-full m-5 w-[100%] rounded-lg flex items-center justify-center">
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

    <!-- Third Row -->
    <div class="flex flex-row gap-x-20 h-96 mb-20">
      <div class="bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red h-full m-5 w-11/12 rounded-lg flex items-center justify-center">
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
      <div class="h-full m-5 w-full justify-center flex flex-col">
        <h1 class="text-2xl font-semibold my-5"> Reports Generation </h1>
        <p class="text-lg">
          Gain valuable insights into your performance with our detailed report
          generation feature. After each test, review your scores, analyze your
          strengths and weaknesses, and track your progress over time to stay on
          the path to success.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>