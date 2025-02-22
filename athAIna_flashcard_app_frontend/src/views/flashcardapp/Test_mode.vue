<script setup>
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