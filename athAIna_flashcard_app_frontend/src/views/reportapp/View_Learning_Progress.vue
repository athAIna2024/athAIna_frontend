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
import Create_Studyset from "@/views/studysetapp/Create_Studyset.vue";

const report_url = '/report/list/';
const userStore = useUserStore();
const learnerId = userStore.getUserID();
const isSuccessful = ref(false);
const message = ref("");
const router = useRouter();

const props = defineProps({
  isVisible: Boolean,
});

const isChooseStudySetVisible = ref(false);
const isEmptyTestScores = ref(false); // empty report
const isEmptyStudySet = ref(false); // no study sets
const isWarningVisible = ref(false); // no study sets found
const isTestModeVisible = ref(false);

const isCreateStudySetModalVisible = ref(false);
const closeCreateStudySetModal = () => {
  isCreateStudySetModalVisible.value = false;
};
const openCreateStudySetModal = () => {
  isCreateStudySetModalVisible.value = true;
};

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


    console.log("TEST SCORES ARE EMPTY? ", isEmptyTestScores.value);
  } catch (error) {
    isSuccessful.value = false;
    message.value = "Error fetching test scores.";
  }
};

const fetchStudySetCount = async () => {
  try {
    const studySetsArray = await studySetDb.studysets.toArray();
    if (studySetsArray.length === 0) {
      isEmptyStudySet.value = true;
      isWarningVisible.value = true;
    } else {
      isEmptyStudySet.value = false;
    }
  } catch (error) {
    console.error('Error fetching study sets:', error);
  }
}


onMounted(() => {
  fetchStudySetCount();
  fetchTestScores();
});

</script>


<template>

  <Create_Studyset
      :isVisible="isCreateStudySetModalVisible"
      title="Create Studyset – athAIna"
      @close="closeCreateStudySetModal"
  >
  </Create_Studyset>

  <div class="h-screen">
    <div v-show="isEmptyStudySet" class="flex flex-col items-center justify-center gap-y-3 content-center flex-grow h-full w-full">
      <p>Oops! No study sets yet. Create one and start your learning adventure!</p>
      <div class="btn w-60 hover:cursor-pointer" @click="openCreateStudySetModal">Create Study Set</div>
    </div>

    <div v-show="isEmptyTestScores" class="flex flex-col items-center justify-center gap-y-3 content-center flex-grow h-full w-full">
      <p>No report yet. Take a test first.</p>
      <div class="btn w-60 hover:cursor-pointer" @click="showChooseStudySetModal">Test yourself now</div>
    </div>
    <div v-show="!isEmptyTestScores" class="flex flex-col items-center justify-center gap-y-3 content-center flex-grow h-full w-full">
      <Report></Report>
    </div>

  </div>
  <Choose_Studyset
      :isVisible="isChooseStudySetVisible"
      @close="close"
  />

  <Warning_Message
      :warningHeader="'No Study Sets Found'"
      :warningMessage="'Please create a study set to view the report.'"
      :isVisible="isWarningVisible"
      @close="closeWarning"
  />
</template>

<style scoped>
</style>