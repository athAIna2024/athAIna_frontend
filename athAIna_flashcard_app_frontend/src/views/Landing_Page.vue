<script>
export default {
  name: "Landing_Page",
};
</script>

<template>
  <div class="p-10">
    <div class="flex flex-row">
      <div class="flex flex-col">
        <div class="mx-10">
          <span class="text-3xl font-semibold"
            >Memorization made memorable</span
          >
          <br />
          <div class="text-2xl my-4">Now powered with AI</div>
          <br />
        </div>
        <div class="text-xl m-10 md:w-2/3 text-justify">
          <span>
            athAIna offers the best flashcard software service, seamlessly
            integrated with advanced AI technology. Create personalized
            flashcards effortlessly, along with review and test modes with
            detailed learning statistics. Embrace a smarter way to learn and
            master new concepts with athAIna!</span
          >
        </div>
        <div class="w-full md:w-1/2 flex flex-row">
          <button class="btn w-full mx-4">Try now</button>
          <button class="btn w-full">Learn more</button>
        </div>
      </div>
      <div class="invisible 2xl:visible w-full flex flex-row justify-end">
        <div
          class="absolute transform -translate-x-[15rem] translate-y-10 shadow-md w-[360px] h-[480px] rounded-lg bg-gradient-to-br from-athAIna-red to-athAIna-yellow"
        ></div>
        <div
          class="absolute transform -translate-x-[10rem] translate-y-6 rotate-[12deg] shadow-md w-[360px] h-[480px] rounded-lg bg-gradient-to-br from-athAIna-red to-athAIna-yellow"
        ></div>
        <div
          class="absolute transform -translate-x-[5rem] w-[360px] h-[480px] rotate-[15deg] rounded-lg border-4 bg-athAIna-white flex flex-col p-10"
        >
          What's the largest star in the universe??
        </div>
      </div>
    </div>

    <div class="mx-10 my-52 text-2xl font-semibold">
      Attain greater heights of excellence
    </div>

    <div class="w-full flex-row flex">
      <div class="athAIna-border-outer p-1 w-1/3">
        <div class="athAIna-border-inner p-10">
          <div class="text-lg font-semibold">
            Craft Flashcards with AI Magic
          </div>
          <div class="text-sm my-2">
            Saves time with automated, smartly designed flashcards that make
            studying more efficient
          </div>
          <button class="btn mt-10 w-full">Try it out!</button>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-row justify-end">
      <div class="athAIna-border-outer p-1 w-1/3">
        <div class="athAIna-border-inner p-10">
          <div class="text-lg font-semibold">
            Reveal Your Triumph with Detailed Reports
          </div>
          <div class="text-sm my-2">
            Uncovers your progress guiding your path to mastery
          </div>
          <button class="btn mt-10 w-full">See your progress</button>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-row">
      <div class="athAIna-border-outer p-1 w-1/3">
        <div class="athAIna-border-inner p-10">
          <div class="text-lg font-semibold">
            Conquer Exams with Test Questions
          </div>
          <div class="text-sm my-2">
            Unlocks your wisdom, boosting your exam readiness
          </div>
          <button class="btn mt-10 w-full">Take a test</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
