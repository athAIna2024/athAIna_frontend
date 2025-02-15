<script>
import router from '@/routes';

export default {
  name: 'Create_Flashcard_Manually',
};
</script>

<template>
    <form class="text-athAIna-lg text-center athAIna-border-inner p-5" action="/flashcards" method="post">
    <div class="w-full flex flex-row justify-left items-left m-4">
      <span class="text-athAIna-violet text-2xl font-semibold mx-4">
          <router-link to="/library_of_flashcards"> < </router-link>
        </span>
        <span class="text-athAIna-violet text-2xl font-semibold"> Create Flashcard for "<span>Networking</span>" </span>
      </div>
      <div class="border-athAIna-violet border-2 rounded-lg m-2 text-left p-10">
        <label for="question">Question:</label>
        <div class="mb-10">
        <div class="athAIna-border-outer p-1">
          <textarea type="text" class="athAIna-border-inner h-64 p-2" id="question" name="question"></textarea>
        </div>
        <span class="text-athAIna-red" v-if="question">Question exceed 300 characters, please shorten it.</span>
        </div>

        <div class="athAIna-border-outer p-1">
          <div class="athAIna-border-inner text-center h-20 content-center flex flex-row items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span class="p-4 text-athAIna-violet"> + Insert Image</span>
          </div>
        </div>
        <span class="text-athAIna-red" v-if="imagebig">Image exceeds 500KB size, please upload smaller image</span>
        
      </div>

      <div class="athAIna-border-outer p-0.5 my-10"></div>

      <div class="border-athAIna-violet border-2 rounded-lg m-2 text-left p-10">
        <label for="answer">Answer: </label>
        <div class="athAIna-border-outer p-1">
          <textarea type="text" class="athAIna-border-inner h-64 p-2" id="answer" name="answer"></textarea>
        </div>
        <span class="text-athAIna-red" v-if="answer">Answer exceed 300 characters, please shorten it.</span>
        </div>

      <div class="flex justify-end mb-4">

        <div class="athAIna-border-outer p-1 mt-10 mx-2 w-32 rounded-full">

          <router-link to="/library_of_flashcards">
          <button class="athAIna-border-inner rounded-full"> Cancel </button>
          </router-link>
        </div>
        <router-link to="/library_of_flashcards">
        <button class="btn mt-10 mx-2"> Submit </button>
        </router-link>
      </div>
    </form>
</template>

<style scoped>
</style>