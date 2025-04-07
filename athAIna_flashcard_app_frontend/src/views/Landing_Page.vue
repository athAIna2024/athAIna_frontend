<script setup>
import { ref, defineComponent } from 'vue';

defineComponent({
  name: "Landing_Page",
});

const scrollToFeatures = () => {
  const featuresSection = document.getElementById("features-section");
  if (featuresSection) {
    featuresSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
</script>

<template>

  <!-- Hero Section -->
  <div class="flex flex-row justify-start min-h-screen mt-10 p-10">

    <!-- Text -->
    <div class="flex flex-col">
      <div class="ml-3 md:w-4/5">
        <span class="text-4xl font-semibold w-auto"> Memorization Made Memorable </span>
        <br />
        <div class="text-3xl my-4 w-auto"> Now powered with AI </div>
        <br />
      </div>
      <div class="text-[16px] ml-3 my-2 mb-12 md:w-3/5 text-justify">
        <span>
          athAIna offers the best flashcard software service, seamlessly
          integrated with advanced AI technology. Create personalized
          flashcards effortlessly, along with review and test modes with
          detailed learning statistics. Embrace a smarter way to learn and
          master new concepts with athAIna!</span
        >
      </div>
      <div class="w-full md:w-3/5 flex flex-row justify-between gap-x-4">
        <RouterLink to="/signup" class="w-full mx-3">
          <button class="btn h-[45px] !rounded-full w-full">Try now</button>
        </RouterLink>
        <div @click="scrollToFeatures" class="btn-alt group w-full">
          <div class="btn-alt-inner hover:cursor-pointer">
            Learn more
          </div>
        </div>
      </div>
    </div>

    <!-- Cards -->
    <div class="ml-0 mr-0 pr-0 flex justify-center mt-5 mb-10 w-full">
      <!-- Lowermost Card -->
      <div
          class="mr-40 mt-8 absolute rotate-[-4deg] shadow-md w-[600px] h-[700px] rounded-[15px] bg-gradient-to-br from-athAIna-yellow to-athAIna-red"
      ></div>

      <!-- Middle Card-->
      <div
          class="mr-20 mt-5 absolute rotate-[0deg] shadow-md w-[600px] h-[700px] rounded-[15px] bg-gradient-to-br from-athAIna-yellow to-athAIna-red"
      ></div>

      <!-- Topmost Card -->
      <div
          class="absolute ml-5 p-[5px] shadow-md bg-gradient-to-br rounded-[15px] from-athAIna-yellow via-athAIna-orange to-athAIna-red rotate-[4deg] w-[600px] h-[720px]"
      >
        <div
            class="absolute ml-0 rotate-[0deg] w-[600px] h-[710px] rounded-[10px] bg-athAIna-white flex align-middle items-center"
        >
          <span class="absolute p-10 ml-4 text-lg font-semibold">
            What is the largest star in the universe?
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Learn More Section -->
  <div id="features-section" class="ml-10 my-14 text-3xl font-semibold scroll-mt-20">
    <div class="my-2">
      Attain greater heights of excellence
    </div>
  </div>

  <!-- First Card-->
  <div class="relative">
    <div class="ml-10 flex-row flex athAIna-border-outer p-1 w-1-5-3 relative">
      <div class="athAIna-border-inner px-12 py-10 pr-36">
        <div class="mt-5 mb-8 text-[20px] font-semibold">
          Craft Flashcards with AI Magic
        </div>
        <div class="text-sm">
          Saves time with automated, smartly designed flashcards that make
          studying more efficient
        </div>
        <RouterLink to="/signup" class="w-full mx-4">
          <button class="btn !rounded-full mt-8 w-full px-0">Try it out!</button>
        </RouterLink>
      </div>
    </div>
    <!-- Floating Card -->
    <div
        class="absolute bottom-[-60px] left-[550px] shadow-md w-[210px] h-[280px] rounded-[15px] bg-gradient-to-br from-athAIna-yellow to-athAIna-red
        p-7 flex flex-col justify-end text-athAIna-white font-semibold"
    >
      Who was the female actress in Tarzan (1972)?
    </div>
  </div>

  <!-- Second Card -->
  <div class="w-full flex flex-row justify-end pr-16 relative mt-[-80px]">
    <div class="athAIna-border-outer p-1 w-1-5-3 relative">
      <div class="athAIna-border-inner px-12 py-10">
        <div class="mt-5 mb-8 text-[20px] font-semibold">
          Reveal Your Triumph with Detailed Reports
        </div>
        <div class="text-sm">
          Uncovers your progress guiding your path to mastery
        </div>

        <div class="mt-10 mb-3 pr-28">
          <RouterLink to="/signup" class="">
            <button class="btn !rounded-full mt-8 w-full px-0">See your progress</button>
          </RouterLink>
        </div>

      </div>
    </div>
    <!-- Floating Image -->
    <div class="absolute bottom-[-60px] right-[-25px] rounded-[15px]"
    >
      <img src="/book-icon.svg" class="h-[240px]">
    </div>
  </div>

  <!-- Third Card -->
  <div class="w-full flex flex-row ml-10 pr-16 relative mt-[10px] mb-32">
    <div class="athAIna-border-outer p-1 w-1-5-3 relative">
      <div class="athAIna-border-inner px-12 py-10 pb-8">
        <div class="mt-5 mb-8 text-[20px] font-semibold">
          Conquer Exams with Test Questions
        </div>
        <div class="text-sm">
          Unlocks your wisdom, boosting your exam readiness
        </div>
        <div class=" mb-0 pr-28">
          <RouterLink to="/signup" class="w-full mx-4">
            <button class="btn !rounded-full mt-5 w-full px-0">Take a test</button>
          </RouterLink>
        </div>
      </div>
    </div>
    <!-- Floating Image -->
    <div class="absolute bottom-[-60px] left-[450px] rounded-[15px]"
    >
      <img src="/test-icon.svg" class="h-[190px]">
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply bg-athAIna-violet py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200;
  color: white;
}
</style>
