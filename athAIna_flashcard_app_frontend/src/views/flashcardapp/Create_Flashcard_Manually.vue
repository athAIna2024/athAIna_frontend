<script>
export default {
  name: 'Create_Flashcard_Manually',
};
</script>

<template>
  <div class="text-athAIna-lg text-athAIna-violet m-10"> 
    <span> Create Flashcards for "Category" </span>
  </div>
  <div class="athAIna-border-outer p-1">
    <form class="text-athAIna-lg text-center athAIna-border-inner rounded-lg p-5" action="/flashcards" method="post">
      <div class="athAIna-border-outer p-1">
        <div class="athAIna-border-inner p-10">
        <label for="question">Question:</label>
        <input type="text" class="athAIna-border p-10" id="question" name="question"><br><br>
          <div class="athAIna-border-outer p-1">
            <div class="athAIna-border-inner">
              image
            </div>
          </div>
        </div>
      </div>

      <div class="athAIna-border-outer p-1">
        <div class="athAIna-border-inner">
        <label for="answer">Answer: </label>
        <input type="text" class="athAIna-border p-10" id="answer" name="answer"><br><br>
        </div>
      </div>
      <div class="flex justify-end m-4">
        <div class="athAIna-border-outer p-1 mt-10 mx-2 w-32 rounded-full">
          <button class="athAIna-border-inner rounded-full"> Cancel </button>
        </div>
        <button class="btn mt-10 mx-2"> Submit </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>