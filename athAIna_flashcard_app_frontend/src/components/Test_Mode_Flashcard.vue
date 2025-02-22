<script setup>

/*
PSEUDOCODE
ADD CONFIRMATION PROMPT WHEN NAVIGATING BACK TO LIBRARY PAGE THAT ALL PROGRESS WILL NOT BE SAVED

1. Retrieve how many questions to be created
a. If it is beyond the number of questions available, set it to maximum questions available
b. If it is set to less than 1, suggest user to set the question to at least 10
- Create a store for test mode that can be persisted for the number of questions to be randomized

2. Randomized the questions and save it to a temporary front-end database
3.

 */

import { ref } from 'vue';

const question = ref(true);
const answer = ref(false);
const result = ref(false);


const triggerEvent = (event) => {
  if (event === 'question') {
    question.value = !question.value;
  } else if (event === 'answer') {
    answer.value = !answer.value;
  } else if (event === 'result') {
    result.value = !result.value;
  }
};


</script>

<template>



<div v-if="question" class="athAIna-border-outer p-1 my-4">
<div class="athAIna-border-inner">
  <h1 class="text-athAIna-violet p-10 h-64 font-normal">
    What is a network?
  </h1>
  <div class="p-10 flex flex-row justify-between">
    <div class="athAIna-border-outer p-1 rounded-[20px] h-[40px] mx-10">
      <div class="athAIna-border-inner rounded-[15px] relative flex flex-row items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-orange ml-2 mr-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input type="text" :value="modelValue" @input="updateValue" placeholder="Enter Answer" class="text-[14px] text-athAIna-orange placeholder-athAIna-orange focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]">
      </div>
    </div>
    <button class="btn w-48" @click="triggerEvent('answer'); triggerEvent('question');"> Next </button>
  </div>
</div>
</div>

<div v-if="answer" class="athAIna-border-outer p-1 my-4">
<div class="athAIna-border-inner">
  <h1 class="text-athAIna-violet p-10 h-16">
    What is a network?
  </h1>
  <h1 class="text-athAIna-violet p-10 h-16">
    Your answer: <span class="text-athAIna-green p-10 h-16">
    A network is a collection of devices connected to one another to share data. </span>
  </h1>
  <div class="m-10">
    <div class="athAIna-border-outer p-0.5">
    </div>
  </div>
  <h1 class="text-athAIna-violet p-10 h-16">
    Correct answer: <span class="text-athAIna-green p-10 h-16">
    A network is a collection of devices connected to one another to share data. </span>
  </h1>
  <div class="athAIna-border-inner p-10 flex flex-row justify-end align-center">
    <button class="btn-alt w-48 mx-4" @click="triggerEvent('result');"> Done </button>
    <button class="btn w-48" @click="triggerEvent('answer'); triggerEvent('question');"> Next </button>
  </div>
</div>
</div>


<div v-if="result" class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40">
  <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
    <div class="athAIna-border-inner p-4 text-center">
      <h1 class="m-8 text-athAIna-lg font-semibold"> You've done well! Keep it up!! </h1>
      <h1 class="m-8 text-2xl text-emerald-400 font-semibold"> 90% </h1>
      <p class="m-8 text-athAIna-md"> 9/10 questions answered correctly </p>
      <div class="m-8 flex justify-center">
        <button @click="triggerEvent('result'); triggerEvent('question'); triggerEvent('answer');" class="btn w-48"> Start New Test </button>
      </div>
    </div>
  </div>
</div>




</template>

<style scoped>
</style>