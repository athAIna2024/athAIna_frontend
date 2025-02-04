<script setup>
import {ref} from 'vue';
import {computed} from "vue";
import {onMounted} from "vue";
import {watch} from "vue";
import Flashcard_Search_Bar from "@/components/Search_Bar.vue";
import Flashcard_Card from "@/components/Flashcard_Card.vue";
import AI_Flashcard from "@/views/flashcardapp/Generate_Flashcard_with_AI.vue";
import Delete_Flashcard from "@/views/flashcardapp/Delete_Flashcard.vue";
import Pagination from "@/components/Pagination.vue";

import axios from '@/axios';
import { useRoute } from 'vue-router';
import {useStudysetStore} from "../../../stores/studySetStore.js";
import flashcardsDB from "@/views/flashcardapp/dexie.js";

const flashcard_url = "/flashcard/";
const store = useStudysetStore();
const route = useRoute();
const studySetTitle = route.params.studySetTitle;
const studySetId = store.studySetId;
const isSuccessful = ref(false);
const message = ref("");
const flashcard_result = ref([]);
const flashcard_db = ref([]);
const flashcardCounts = ref(0);
const itemsPerPage = 6;

const dropdownOptions = ref({
  ARTS: "Arts",
  BUS: "Business",
  GEO: "Geography",
  ENGR: "Engineering",
  HEALTH_MED: "Health and Medicine",
  HIST: "History",
  LAW_POL: "Law and Politics",
  LANG_CULT: "Languages and Cultures",
  MATH: "Mathematics",
  PHIL: "Philosophy",
  SCI: "Science",
  SOC_SCI: "Social Sciences",
  TECH: "Technology",
  WRIT_LIT: "Writing and Literature"
});


const input = ref('');
const currentPage = ref(1);
const flashcards = ref([
  {
    id: 1,
    question: 'What is a network?',
    answer: 'A network is a collection of computers, servers, mainframes, network devices, and other devices connected to one another to allow the sharing of data.',
    category: 'Networking'
  },
  {
    id: 2,
    question: 'What is a router?',
    answer: 'A router is a networking device that forwards data packets between computer networks.',
    category: 'Networking'
  },
  {
    id: 3,
    question: 'What is a switch?',
    answer: 'A switch is a device that connects devices together on a computer network by using packet switching to receive, process, and forward data to the destination device.',
    category: 'Networking'
  },
  {
    id: 4,
    question: 'What is a firewall? What is a firewall What is a firewall What is a firewall What is a firewall What is a firewall What is a firewall What is a firewall What is a firewall What is a firewall What is a firewall',
    answer: 'A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules.',
    category: 'Networking'
  },
  {
    id: 5,
    question: 'What is a hub?',
    answer: 'A hub is a common connection point for devices in a network. Hubs are commonly used to connect segments of a LAN.',
    category: 'Networking'
  },
  {
    id: 6,
    question: 'What is a modem?',
    answer: 'A modem is a device that modulates an analog carrier signal to encode digital information, and also demodulates such a carrier signal to decode the transmitted information.',
    category: 'Networking'
  }
]);

const modals = ref({
  deleteModal: false,
  showModal1: false,
  showModal2: false,
  showModal3: false,
});

const isAIFlashcardVisible = ref(false);


function toggleModal(modalName) {
  modals.value[modalName] = !modals.value[modalName];
}

function openAI_Flashcard() {
  isAIFlashcardVisible.value = true;
}

function closeAI_Flashcard() {
  isAIFlashcardVisible.value = false;
}

const fetchFlashcards = async () => {
  try {
    const response = await axios.get(flashcard_url, {
      params: { studyset_id: studySetId }
    });


    if (response.data.data) {
      isSuccessful.value = response.data.successful;
      message.value = response.data.message;
      flashcard_result.value = response.data.data.map(flashcard => {
        return {
          id: Number(flashcard.id),
          question: String(flashcard.question),
          answer: String(flashcard.answer),
          image: String(flashcard.image),
          studyset_id: Number(flashcard.studyset_instance),
          created_at: Date(flashcard.created_at),
          updated_at: Date(flashcard.updated_at),
          is_ai_generated: Boolean(flashcard.is_ai_generated),
        };
      });

      console.log("API RESPONSE", response.data.data);


      const serializableFlashcards = flashcard_result.value.map(flashcard => {
        return {
          id: flashcard.id,
          question: flashcard.question,
          answer: flashcard.answer,
          image: flashcard.image,
          studyset_id: flashcard.studyset_id,
          created_at: flashcard.created_at,
          updated_at: flashcard.updated_at,
          is_ai_generated: flashcard.is_ai_generated,
        };
      });

      await flashcardsDB.flashcards.bulkPut(serializableFlashcards);

      flashcardCounts.value = Number(flashcard_result.value.length);

    } else {
      isSuccessful.value = false;
      message.value = "An error occurred. Please try again later.";
      flashcard_result.value = [];
    }

    return flashcard_result;

  } catch (error) {
    if (error.response && error.response.status === 400) {
      isSuccessful.value = error.response.data.successful;
      message.value = error.response.data.message;
    } else {
      isSuccessful.value = false;
      message.value = "An error occurred. Please try again later.";
    }
    flashcard_result.value = [];

    return flashcard_result;
  }
}

const fetchFlashcardsFromDb = async () => {
  try {
    await fetchFlashcards();
    flashcard_db.value = await flashcardsDB.flashcards.orderBy("updated_at").reverse().toArray();
    console.log("DEXIE RESPONSE", flashcard_db);

    if (flashcard_db.value.length > 0) {
      isSuccessful.value = true;
      message.value = "Flashcards fetched successfully";
    }
    else {
      isSuccessful.value = false;
      message.value = "No flashcards found";
    }
  } catch (error) {
    isSuccessful.value = false;
    message.value = "An error occurred. Please try again later.";
  }
}

const filteredFlashcards = computed(() => {
  return flashcard_db.value.filter(flashcard => flashcard.studyset_id === Number(studySetId));
});

const currentFlashcards = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredFlashcards.value.slice(startIndex, endIndex);
});

onMounted(() => {
  fetchFlashcardsFromDb();
  document.title = "Flashcards";
});
</script>

<template>

  <div class="flex flex-col mx-12 my-16">
    <div class="text-athAIna-lg text-center flex flex-row justify-between space-x-20 items-center">
      <h1 class="text-athAIna-violet font-semibold flex"> {{ studySetTitle }} </h1>
      <div class="flex flex-row justify-between space-x-6 items-center">
        <Flashcard_Search_Bar v-model="input" />
        <button class="relative btn w-60 text-[16px] font-semibold" @click="toggleModal('learningMode')"> Learning Mode </button>
        <div v-if="modals.learningMode" class="absolute top-[230px] right-[315px] h-[150px] w-[235px] border-athAIna-orange border-[4px] rounded-3xl bg-athAIna-white flex flex-col justify-between p-5">
          <button class="text-base border-athAIna-orange border-[3.5px] py-[10px] px-[30px] rounded-2xl text-sm">
            <router-link to="review/1"> Review Mode </router-link>
          </button>
          <button class="text-base bg-athAIna-orange py-[10px] px-[30px] rounded-2xl text-sm text-athAIna-white" @click="toggleModal('TestQuestions')">
            Test Mode
          </button>
        </div>
        <button class="relative btn w-60 text-[16px] font-semibold" @click="toggleModal('addFlashcard')"> Add Flashcard </button>
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

    <div class="mt-4 mb-6">
      <div class="w-full size-[1px] bg-gradient-to-r from-athAIna-yellow via-athAIna-orange to-athAIna-red mt-[12px]">
      </div>
    </div>

    <div class="flex flex-row gap-2">
      <div class="text-[18px] font-semibold flex flex-row items-center">
        Flashcards
      </div>
      <div class="border-athAIna-violet border-2 rounded-full px-3 py-0">
        {{ flashcardCounts }}
      </div>
    </div>

    <div class="grid grid-cols-3 gap-12 mt-10 mb-12">
      <li class="list-none" v-for="flashcard in currentFlashcards" :key="flashcard.id">
          <Flashcard_Card
              :flashcardId="flashcard.id"
              :question="flashcard.question"
              :answer="flashcard.answer"
          />
      </li>
      <div class="item error" v-if="!isSuccessful">
        <p>Please create a flashcard to review</p>
      </div>
    </div>

    <div class="flex justify-center">
      <Pagination
          :total-items="flashcardCounts"
          :items-per-page="itemsPerPage"
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

