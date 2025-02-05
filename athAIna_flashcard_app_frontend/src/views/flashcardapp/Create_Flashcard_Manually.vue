<script setup>

import {useRoute} from "vue-router";
import { useStudysetStore} from "../../../stores/studySetStore.js";

const route = useRoute();
const store = useStudysetStore();
const studySetName = store.studySetTitle;

</script>

<template>
  <div class="text-athAIna-violet text-athAIna-lg font-semibold mx-4">
    <div class="flex flex-row space-x-6 my-2 mx-8 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
      <div>
        Create flashcard for "<span>{{ studySetName}}</span>"
      </div>
    </div>

  </div>
  <form>
    <div class="m-4">

      <div class="athAIna-border-outer p-1 shadow-xl">
        <div class="athAIna-border-inner py-4">
          <div>

          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
</style>