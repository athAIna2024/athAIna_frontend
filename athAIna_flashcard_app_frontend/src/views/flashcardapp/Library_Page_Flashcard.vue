<script>
import Flashcard_Search_Bar from "@/components/Flashcard_Search_Bar.vue";
import Flashcard_Card from "@/components/Flashcard_Card.vue";

export default {
  name: 'Library_Page_Flashcard',
  components: {Flashcard_Search_Bar, Flashcard_Card},
};
</script>

<template>


  <div class="">
    Grid Library of Flashcards
  </div>
  <Flashcard_Search_Bar />
  <Flashcard_Card />
  <div class="flex flex-row justify-between">
    <h1 class="text-AthMagenta p-10"> Networking </h1>
    <div class="p-10">
      <Flashcard_Search_Bar />
      <button class="mx-10">Add flashcard</button>
      <button class="mx-10">Add flashcard</button>
    </div>
  </div>
  <div class="border-athAIna-red border-2 rounded-lg grid grid-cols-3">
    <li class="list-none" v-for="flashcard in filteredList()" :key="flashcard.id">
      <router-link :to="{ name: 'flashcard-detail', params: { id: flashcard.id } }">
        <Flashcard_Card />
      </router-link>
    </li>
    <div class="item error" v-if="input&&!filteredList().length">
      <p>No results found!</p>
    </div>
  </div>

</template>

<style scoped>
</style>