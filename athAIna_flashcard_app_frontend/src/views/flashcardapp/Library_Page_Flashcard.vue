<script>
import Flashcard_Search_Bar from "@/components/Search_Bar.vue";
import Flashcard_Card from "@/components/Flashcard_Card.vue";
import AI_Flashcard from "@/views/flashcardapp/Generate_Flashcard_with_AI.vue";
import Delete_Flashcard from "@/views/flashcardapp/Delete_Flashcard.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: 'Library_Page_Flashcard',
  computed: {
  },
  components: {
    Flashcard_Search_Bar,
    Delete_Flashcard,
    AI_Flashcard,
    Flashcard_Card,
    Pagination},
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
        }, {
          id: 5,
          question: 'What is a hub?',
          answer: 'A hub is a common connection point for devices in a network. Hubs are commonly used to connect segments of a LAN.',
          category: 'Networking'
        }, {
          id: 6,
          question: 'What is a modem?',
          answer: 'A modem is a device that modulates an analog carrier signal to encode digital information, and also demodulates such a carrier signal to decode the transmitted information.',
          category: 'Networking'
        }
      ],
      modals: {
        deleteModal: false,
      },
      isAIFlashcardVisible: false,
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
    },
    openAI_Flashcard() {
      this.isAIFlashcardVisible = true;
      this.modals.addFlashcard = false;
    },
    closeAI_Flashcard() {
      this.isAIFlashcardVisible = false;
    },
  }
};
</script>

<template>
    <div class="flex flex-col mx-12 my-16">
      <div class="text-athAIna-lg text-center flex flex-row justify-between space-x-20 items-center">
        <h1 class="text-athAIna-violet font-semibold flex"> Networking </h1>
        <div class="flex flex-row justify-between space-x-6 items-center">
          <Flashcard_Search_Bar v-model="input" />
          <button class="relative btn w-80 text-[16px] font-semibold" @click="toggleModal('learningMode')"> Learning Mode </button>
            <div v-if="modals.learningMode" class="absolute top-[230px] right-[315px] h-[150px] w-[235px] border-athAIna-orange border-[4px] rounded-3xl bg-athAIna-white flex flex-col justify-between p-5">
              <button class="text-base border-athAIna-orange border-[3.5px] py-[10px] px-[30px] rounded-2xl text-sm">
                <router-link to="review/1"> Review Mode </router-link>
              </button>
              <button class="text-base bg-athAIna-orange py-[10px] px-[30px] rounded-2xl text-sm text-athAIna-white" @click="toggleModal('TestQuestions')">
                Test Mode
              </button>
            </div>
          <button class="relative btn w-80 text-[16px] font-semibold" @click="toggleModal('addFlashcard')"> Add Flashcard </button>
          <div v-if="modals.addFlashcard" class="absolute top-[230px] right-[47px] h-[150px] w-[240px] border-athAIna-orange border-[4px] rounded-3xl bg-athAIna-white flex flex-col justify-between p-5">
            <button class="text-base border-athAIna-orange border-[3.5px] py-[10px] px-[30px] rounded-2xl text-sm">
              <router-link to="create_flashcard_manually"> Create Manually </router-link>
            </button>
            <button @click="openAI_Flashcard" class="text-base bg-athAIna-orange py-[10px] px-[30px] rounded-2xl text-sm text-athAIna-white">
              Generate with AI
            </button>
          </div>
        </div>
      </div>

      <div class="mb-12 mt-5">
        <div class="w-full size-[1px] bg-gradient-to-r from-athAIna-yellow via-athAIna-orange to-athAIna-red mt-[12px]"></div>
      </div>

      <div class="text-[18px] font-semibold flex flex-row items-center"> Flashcards
        <div class="border-athAIna-violet border-2 rounded-full px-3 py-0 m-2">
          {{filteredList().length}}
        </div>
      </div>

      <div class="rounded-lg grid grid-cols-3 gap-[55px] mt-10 mb-12">
        <li class="list-none" v-for="flashcard in filteredList()" :key="flashcard.id">
            <Flashcard_Card :flashcard="flashcard" />
        </li>
        <div class="item error" v-if="input && !filteredList().length">
          <p>No results found!</p>
        </div>
      </div>

      <div class="flex justify-center">
        <Pagination
            :total-items="filteredList().length"
            :items-per-page="6"
            :current-page="currentPage"
            @update:currentPage="currentPage = $event"
        />
      </div>
    </div>

  <AI_Flashcard :is-visible="isAIFlashcardVisible" @close="closeAI_Flashcard" />  
  <div v-if="modals.TestQuestions" class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40">
    <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
      <div class="athAIna-border-inner p-4 text-center">
        <div class="flex justify-start pl-4 text-athAIna-lg">
          <button @click="close"> < </button>
        </div>
        <div class="flex justify-center flex-col">
        <h1 class="mt-8 text-athAIna-lg font-semibold"> Set Number of Questions </h1>
        <div class="m-10 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-3/4 ">
          <div class="relative flex flex-row items-center">
              <input type="text" class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]" />
          </div>
       </div>
        <div class="mb-8 flex justify-center">
          <button @click="nextStep" class="btn w-48"> 
            <router-link to="test"> Take a Test </router-link>
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>

</template>

<style scoped>
</style>