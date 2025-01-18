<script>
export default {
  name: 'Update_Flashcard',
};
</script>

<template>
  <div class="text-athAIna-lg m-10">
    <span> Edit Flashcard </span>
  </div>
    <form class="text-athAIna-lg text-center athAIna-border-inner p-5" action="/flashcards" method="post">
      <div class="border-athAIna-violet border-2 rounded-lg m-2 text-left p-10">
        <label for="question">Question:</label>
        <div class="athAIna-border-outer p-1 mb-10">
          <input type="text" class="athAIna-border-inner h-64 p-2" id="question" name="question">

        </div>

        <div class="athAIna-border-outer p-1">
          <div class="athAIna-border-inner text-center h-20 content-center">
            <div>Image</div>
          </div>
        </div>
      </div>

      <div class="athAIna-border-outer p-0.5 my-10"></div>

      <div class="border-athAIna-violet border-2 rounded-lg m-2 text-left p-10">
        <label for="answer">Answer: </label>
        <div class="athAIna-border-outer p-1 mb-10">
          <input type="text" class="athAIna-border-inner h-64 p-2" id="answer" name="answer">
        </div>
      </div>

      <div class="flex justify-end m-4">
        <div class="athAIna-border-outer p-1 mt-10 mx-2 w-32 rounded-full">

          <router-link to="/library_of_flashcards">
          <button class="athAIna-border-inner rounded-full"> Cancel </button>
          </router-link>
        </div>

        <router-link to="/library_of_flashcards">
        <button class="btn mt-10 mx-2"> Update </button>
        </router-link>
      </div>
    </form>
</template>

<style scoped>
</style>