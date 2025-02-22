<script setup>

/*
PSEUDOCODE

1. Retrieve the number of questions to be created
   a. If it exceeds the number of available questions, set it to the maximum available questions
   b. If it is less than 1, suggest the user set the number of questions to at least 10
   c. Create a store for test mode that can be persisted to save the questions and learner answers
   d. Alternatively, create a frontend database to save the questions and learner answers

2. Randomize the questions on the frontend (no API call needed) and save them to a temporary frontend database

3. Display the questions one by one
   a. Change the "next" button to "send"
   b. If the user clicks "send", display the answer and transition to the next question after 10 seconds

4. Save the user's answer to the frontend database
   a. Compare the user's answer to the correct answer in the frontend database
   b. If it is a partial match or incorrect, call the backend API for AI validation of the correct answer
   c. If it is correct, display "Correct" and move to the next question

5. If it is the last question
   a. Display the score
   b. Add logic to transition the button from "Send" to "Finish" when it is the last question
   c. Save the score to the backend database
   d. SQL Logic: `testModeDb.flashcards.where('batch_id').equals(batch_id).filter(flashcard => flashcard.is_correct === true).count()`

FRONTEND DATABASE SCHEMA for TEST MODE
- batch_id
- date_created
- flashcard_id (foreign key to Flashcard table)
- question (String)
- answer (String)
- user_answer (String)
- date_user_answered (Date)
- is_correct (Boolean)
- date_corrected (Date)

 */

import Test_Mode_Flashcard from '@/components/Test_Mode_Flashcard.vue';
import Confirmation_Prompt from "@/components/Confirmation_Prompt.vue";

import {ref} from "vue";
import { useStudysetStore} from "../../../stores/studySetStore.js";
import { useRouter } from 'vue-router';

const router = useRouter();
const studySetStore = useStudysetStore();
const progress = 1;
const questionLength = 10;
const studySetName = studySetStore.studySetTitle;
const studySetId = studySetStore.studySetId;
const showConfirmation = ref(false);


const navigateToLibraryPage = () => {
  showConfirmation.value = true;
};


const closeConfirmation = () => {
  showConfirmation.value = false;
};

const confirmNavigation = () => {
  showConfirmation.value = false;
  router.push({ name: 'Library_Page_Flashcard', params: { studySetTitle: studySetName, studySetId: studySetId } });
};

</script>

<template>
<div class="mx-6">
  <div class="athAIna-border-inner p-6">
    <div class="flex flex-row justify-between">
      <div class="flex flex-row space-x-6 my-2 items-center">

        <button @click="navigateToLibraryPage">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>

        <div>
          Test mode for <span class="font-bold text-athAIna-violet text-athAIna-large">{{ studySetName}}</span>
        </div>
      </div>

      <span class="font-bold"> {{progress}} / {{questionLength}} </span>
    </div>

    <Test_Mode_Flashcard />
  </div>
</div>
<Confirmation_Prompt
  :confirmQuestion="'Are you sure you want to leave? All progress will be lost.'"
  :isVisible="showConfirmation"
  @close="closeConfirmation"
  @confirm="confirmNavigation"
/>
</template>

<style scoped>
</style>