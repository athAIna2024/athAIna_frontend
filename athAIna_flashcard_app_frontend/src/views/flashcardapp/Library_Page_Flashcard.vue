<script>
import Flashcard_Search_Bar from "@/components/Flashcard_Search_Bar.vue";
import Flashcard_Card from "@/components/Flashcard_Card.vue";

export default {
  name: 'Library_Page_Flashcard',
  components: {Flashcard_Search_Bar, Flashcard_Card},
};

const flashcards = [
  { id: 1, question: 'What is a network?', answer: 'A network is a collection of computers, servers, mainframes, network devices, and other devices connected to one another to allow the sharing of data.' },
  { id: 2, question: 'What is a router?' },
  { id: 3, question: 'What is a switch?' },
  { id: 4, question: 'What is a hub?' },
  { id: 5, question: 'What is a firewall?' },
  { id: 6, question: 'What is a VPN?' },
  { id: 7, question: 'What is a DNS?' },
  { id: 8, question: 'What is a DHCP?' },
  { id: 9, question: 'What is a NAT?' },
  { id: 10, question: 'What is a subnet?' },
]

function filteredList() {
  return flashcards.filter(flashcard => flashcard.question.toLowerCase().includes(input.value.toLowerCase()));
}
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
    <ul>
      <li class="list-none" v-for="flashcard in filteredList()" :key="flashcard.id">
        <router-link :to="{ name: 'flashcard-detail', params: { id: flashcard.id } }">
          <Flashcard_Card />
        </router-link>
      </li>
    </ul>
    <div class="item error" v-if="input&&!filteredList().length">
      <p>No results found!</p>
    </div>
  </div>

</template>

<style scoped>
</style>