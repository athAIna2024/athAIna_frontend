<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Choose_Studyset from "@/views/reportapp/Choose_Studyset.vue";
import Report from "@/views/reportapp/Report.vue";
import {useUserStore} from "../../../stores/userStore.js";
import axios from '@/axios';
import Warning_Message from "@/components/Warning_Message.vue";
import studySetDb from "@/views/studysetapp/dexie.js";
import Loading_Modal from "@/components/Loading_Modal.vue";
import flashcardsDB from "@/views/flashcardapp/dexie.js";

const report_url = '/report/list/';
const userStore = useUserStore();
const learnerId = userStore.getUserID();
const isSuccessful = ref(false);
const message = ref("");
const router = useRouter();

const isLoading = ref(false);
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const props = defineProps({
  isVisible: Boolean,
});

const isChooseStudySetVisible = ref(false);
const isEmptyTestScores = ref(false); // empty report
const isEmptyStudySet = ref(false); // no study sets
const isWarningVisible = ref(false); // no study sets found
const isTestModeVisible = ref(false);

const isCreateStudySetModalVisible = ref(false);


const redirectToLibraryPage = () => {
  router.push({
    name: "Library_Page_Studyset",
  });
}

const defineEmits = ["close"];

const showChooseStudySetModal = () => {
  isChooseStudySetVisible.value = true;
};

const closeTest_Mode = () => {
  isTestModeVisible.value = false;
};

const close = () => {
  isChooseStudySetVisible.value = false;
};

const closeWarning = () => {
  isWarningVisible.value = false;
};

const fetchTestScores = async () => {
  isLoading.value = true;
  const minimumLoadingTime = 500;
  const startTime = Date.now();


  try {
    const response = await axios.get(report_url, {
      params: {
        user_id: Number(learnerId),
      },
    });

    isSuccessful.value = response.data.successful;
    message.value = response.data.message;

    if (Array.isArray(response.data.data)) {
      isEmptyTestScores.value = false;
    } else {
      isEmptyTestScores.value = true;
    }

  } catch (error) {
    isSuccessful.value = false;
    message.value = "Error fetching test scores.";
  } finally {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = minimumLoadingTime - elapsedTime;

    if (remainingTime > 0) {
      await delay(remainingTime);
    }
    isLoading.value = false;
  }
};

const fetchStudySetCount = async () => {
  isLoading.value = true;
  const minimumLoadingTime = 500;
  const startTime = Date.now();
  try {
    const studySetsArray = await studySetDb.studysets.toArray();
    isEmptyStudySet.value = Array.from(studySetsArray).length === 0;
  } catch (error) {
    console.error('Error fetching study sets:', error);
  } finally {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = minimumLoadingTime - elapsedTime;

    if (remainingTime > 0) {
      await delay(remainingTime);
    }
    isLoading.value = false;
  }
}


onMounted(async () => {
  await fetchStudySetCount();
  await fetchTestScores();
});
</script>


<template>

  <Loading_Modal
      :loadingHeader="'Fetching report data...'"
      :loadingMessage="'Please wait for a couple of seconds'"
      :condition="isLoading"
      :isVisible="isLoading"
  />

    <div v-if="!isLoading">
      <div class="h-screen">

        <div v-if="isEmptyStudySet" class="flex flex-col items-center justify-center gap-y-3 content-center flex-grow h-full w-full">
          <p>Oops! No study sets yet. Create one and start your learning adventure!</p>
          <div class="btn w-60 hover:cursor-pointer" @click="redirectToLibraryPage">Create Study Set</div>
        </div>

        <div v-else-if="isEmptyTestScores" class="flex flex-col items-center justify-center gap-y-3 content-center flex-grow h-full w-full">
          <p>No report yet. Take a test first.</p>
          <div class="btn w-60 hover:cursor-pointer" @click="showChooseStudySetModal">Test yourself now</div>
        </div>

        <div v-else>
          <div class="flex flex-col items-center justify-center gap-y-3 content-center flex-grow h-full w-full">
            <Report></Report>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h-screen">
      <div class="flex flex-col items-center justify-center gap-y-3 content-center flex-grow h-full w-full">
        <Report></Report>
      </div>
    </div>


  <Choose_Studyset
      :isVisible="isChooseStudySetVisible"
      @close="close"
  />

</template>

<style scoped>
</style>