<script>
export default {
  name: 'Review_Mode_Flashcard',
};
</script>


/* text depends on the flashcard id*/
<template>
  <div v-if="question"  class="athAIna-border-outer p-1">
      <span class="p-4 text-2xl font-semibold"> 
        <router-link to="/library_of_flashcards"> < </router-link> Networking </span>
    <div class="athAIna-border-outer p-1">
    <div class="athAIna-border-inner flex flex-c justify-between items-center">
      <div class="p-10 font-semibold text-lg">
        <h1> </h1>
      </div>  
      <div>
      <h1 class="text-athAIna-violet p-64 text-xl">
        What is a network?
      </h1>
      </div>
      <div class="p-10 font-semibold text-lg">
        <h1> > </h1>
      </div>  
    </div>
    </div> 
  </div>

  <div>
      <span class="p-4 text-2xl font-semibold"> 
        <router-link to="/library_of_flashcards"> < </router-link> Networking </span>
    <div class="athAIna-border-outer p-1">
    <div class="athAIna-border-inner flex flex-c justify-between items-center">
      <div class="p-10 font-semibold text-lg">
        <h1> < </h1>
      </div>  
      <div>
      <h1 class="text-athAIna-violet p-64 text-xl">
        A network is a collection of computers, servers, mainframes, network devices, and other devices connected to one another to allow the sharing of data.
      </h1>
      </div>
      <div class="p-10 font-semibold text-lg">
        <h1> > </h1>
      </div>  
    </div>
    </div> 
  </div>
</template>

<style scoped>
</style>