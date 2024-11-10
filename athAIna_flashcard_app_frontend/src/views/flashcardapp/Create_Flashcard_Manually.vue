<script>
export default {
  name: 'Create_Flashcard_Manually',
};
</script>

<template>
  <div class="athAIna-border-outer">
    <form class="text-athAIna-lg text-center athAIna-border-inner rounded-lg p-5" action="/flashcards" method="post">
      <div class="athAIna-border-outer">
      <div class="athAIna-border-inner p-10">
      <label for="question">Question:</label>
      <input type="text" class="athAIna-border p-10" id="question" name="question"><br><br>

        <div class="athAIna-border-outer">
        <div class="athAIna-border-inner p-10">
          image
        </div>
        </div>
      </div>
      </div>
      <div class="athAIna-border-outer mt-10">
      <div class="athAIna-border-inner p-10">
      <label for="answer">Answer: </label>
      <input type="text" class="athAIna-border p-10" id="answer" name="answer"><br><br>
      </div>
      </div>
      <button class="btn mt-10"> Submit </button>
    </form>
  </div>
</template>

<style scoped>
</style>