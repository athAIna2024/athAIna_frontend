<script>
import Flashcard_Search_Bar from "@/components/Flashcard_Search_Bar.vue";
import Flashcard_Card from "@/components/Flashcard_Card.vue";
import create_Flashcard_Manually from "@/views/flashcardapp/Create_Flashcard_Manually.vue";

export default {
  name: 'Library_Page_Flashcard',
  computed: {
    create_Flashcard_Manually() {
      return create_Flashcard_Manually
    }
  },
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
        }],
      modals: {
        deleteModal: false,
      showModal1: false,
      showModal2: false,
      }
    };
  },
  methods: {
    filteredList() {
      return this.flashcards.filter(flashcard => {
        return flashcard.question.toLowerCase().includes(this.input.toLowerCase());
      });
    },
    toggleModal(modalName) {
      this.modals[modalName] = !this.modals[modalName];
    }
  }
};
</script>

<template>

  <div class="athAIna-border-outer p-1">
  <div class="athAIna-border-inner">
  <div class="text-athAIna-lg text-center flex flex-row justify-between items-center">
<!--
    <div v-if="modals.deleteModal">-->
    <!--
    </div>-->

    <h1 class="text-athAIna-red p-10 flex"> Networking </h1>
    <div class="p-10 flex flex-row">
      <Flashcard_Search_Bar v-model="input" />
      <button class="mx-10" @click="toggleModal('learningMode')"> Learning Mode </button>
        <div v-if="modals.learningMode" class="fixed top-auto bottom-0 border-athAIna-red border-2 rounded-lg bg-athAIna-white flex flex-col p-10">
          <button>
            <router-link to="review_mode"> Review Mode </router-link>
          </button>
          <button>
            <router-link to="test_mode"> Test Mode </router-link>
          </button>
        </div>
      <button class="mx-10" @click="toggleModal('addFlashcard')"> Add Flashcard </button>
          <div v-if="modals.addFlashcard" class="fixed top-auto bottom-0 border-athAIna-red border-2 rounded-lg bg-athAIna-white flex flex-col p-10">
            <button>
              <router-link to="create_flashcard_manually"> Create Flashcard Manually </router-link>
            </button>
            <button>
              <router-link to="generate_flashcard_with_AI"> Create Flashcard from AI </router-link>
            </button>
          </div>
    </div>
  </div>

  <div class="p-10 text-athAIna-lg flex flex-row items-center m-2">Flashcards:  
  <div class="border-athAIna-violet border-2 rounded-full p-2 m-2">
  {{filteredList().length}}
  </div>
  </div>
  <div class="rounded-lg grid grid-cols-3 p-10 gap-x-6">
      <li class="list-none" v-for="flashcard in filteredList()" :key="flashcard.id">
          <Flashcard_Card :flashcard="flashcard" />
      </li>
      <div class="item error" v-if="input && !filteredList().length">
        <p>No results found!</p>
      </div>
  </div>
  </div>
  </div>

</template>

<style scoped>
</style>