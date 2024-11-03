<script>
import Flashcard_Search_Bar from "@/components/Flashcard_Search_Bar.vue";
import Flashcard_Card from "@/components/Flashcard_Card.vue";
import { ref } from 'vue';

export default {
  name: 'Library_Page_Flashcard',
  components: {Flashcard_Search_Bar, Flashcard_Card},
  data() {
    return {
      input: '',
      flashcards: [
        {
          id: 1,
          question: 'What is a network?',
          answer: 'A network is a collection of computers, servers, mainframes, network devices, and other devices connected to one another to allow the sharing of data.',
          category: 'Networking'
        }, {
          id: 2,
          question: 'What is a router?',
          answer: 'A router is a networking device that forwards data packets between computer networks.',
          category: 'Networking'
        }, {
          id: 3,
          question: 'What is a switch?',
          answer: 'A switch is a device that connects devices together on a computer network by using packet switching to receive, process, and forward data to the destination device.',
          category: 'Networking'
        }, {
          id: 4,
          question: 'What is a firewall?',
          answer: 'A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules.',
          category: 'Networking'
        }]
    };
  },
  methods: {
    filteredList() {
      return this.flashcards.filter(flashcard => {
        return flashcard.question.toLowerCase().includes(this.input.toLowerCase());
      });
    },
    review_ModeClicked(id) {
      this.$router.push('/review/' + id);
    }
  }
};
</script>

<template>
  <div class="flex flex-row justify-between">
    <h1 class="text-athAIna-red p-10"> Networking </h1>
    <div class="p-10">
      <Flashcard_Search_Bar v-model="input" />
      <button class="mx-10">Add flashcard</button>
      <button class="mx-10">Add flashcard</button>
    </div>
  </div>
  <div class="border-athAIna-red border-2 rounded-lg grid grid-cols-3">
      <li class="list-none" v-for="flashcard in filteredList()" :key="flashcard.id">
        <router-link to="/review" class="text-athAIna-red">
          <Flashcard_Card :flashcard="flashcard" @click.native="review_ModeClicked(flashcard.id)" />
        </router-link>
      </li>
    <div class="item error" v-if="input && !filteredList().length">
      <p>No results found!</p>
    </div>
  </div>

</template>

<style scoped>
</style>