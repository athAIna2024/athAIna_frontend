<script setup>
import { computed } from "vue";
import { ref } from "vue";
import { watch } from "vue";

import { onMounted } from "vue";
import Subject_Selector from "@/components/Subject_Selector.vue";
import Date_Range_Selector from "@/components/Date_Range_Selector.vue";
import Bar_Chart from "@/views/reportapp/Bar_Chart.vue";
import Floating_Dropdown_Studysets from "@/components/Floating_Dropdown_Studysets.vue";
import axios from '@/axios';
import studySetDb from "@/views/studysetapp/dexie.js";
import {useUserStore} from "../../../stores/userStore.js";

const userStore = useUserStore();
const learnerId = userStore.getUserID();
// const userDateJoined = userStore;

const isSuccessful = ref(false);
const message = ref("");

const chartOptions = ref({
  responsive: true,
});

// Reactive Variables
const title = ref("Study Set Title");

const studySets = ref({});

const addStudySet = (id, title) => {
  studySets.value[id] = title;
};

const fetchStudySets = async () => {
  try {
    const studySetsArray = await studySetDb.studysets.toArray();
    studySetsArray.forEach((studySet) => {
      addStudySet(studySet.id, studySet.title);
    });
  } catch (error) {
    console.error('Error fetching study sets:', error);
  }
};

const updateStudySet = (id, title) => {
  studySetSelected.value = { id, title };
  toggleModal('studySetModal');
};

const modals = ref({
  studySetModal: false,
})
// Methods
const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};

const studySetSelected = ref({ id: null, title: null});

const startDate = ref(new Date("2025-01-30")); // Date user first joined
const endDate = ref(new Date()); // Current date (always the current, not the date user login);

const testScores = ref([]);

const fetchTestReport = async () => {
  try {
    const url = 'report';
    const response = await axios.get(url, {
      params: {
        id: learnerId,
        studyset_id: Number(studySetSelected.value.id),
        start_date: startDate.value.toISOString(),
        end_date: endDate.value.toISOString(),
      }
    });

    isSuccessful.value = response.data.successful;
    message.value = "Fetch test scores successfully";
    console.log(response.data);

    if (isSuccessful)
    {
      console.log("THERE IS TEST SCORES");
      testScores.value = response.data.data.map(entry => ({
        timestamp: entry.submitted_at,
        score: (entry.score / entry.number_of_questions) * 100,
      }));
      console.log("TEST SCORES COMPUTED", testScores.value);
    } else {
      testScores.value = [];
      message.value = response.data.message;
      console.error(response.data.message);
    }

  } catch (error) {
    testScores.value = [];
    isSuccessful.value = false;
    message.value = "An error occurred while fetching test scores.";
  }
};

watch([studySetSelected, startDate, endDate], ([newStudySet, newStartDate, newEndDate]) => {
  if (newStudySet.id !== null) {
    fetchTestReport();
  }
});
onMounted(() => {
  fetchStudySets();
});

</script>

<template>
  <div class="h-screen">
    <div class="flex flex-col justify-center gap-y-3 content-center w-screen">
      <div class="m-20 flex flex-row justify-between w-auto">
        <p class="font-semibold text-lg">{{ title }}</p>
        <div class="flex flex-row justify-between items-center gap-x-10">

          <div class="flex flex-col">
            <Subject_Selector
                :placeholder="'Choose Study Set'"
                @click="toggleModal('studySetModal')"
                class="relative w-[350px]"
                :innerClass="'athAIna-border-inner'"
                :outerClass="'athAIna-border-outer'"
                v-model="studySetSelected.title"

            />
            <Floating_Dropdown_Studysets v-if="modals.studySetModal"
                               :items="studySets"
                               top="240px"
                               right="max-content"
                               height="max-content"
                               width="350px"
                               @update:modelValue="({ key, value }) => updateStudySet(key, value)"
            />

          </div>

          <Date_Range_Selector
              :minDate=startDate
              :maxDate=endDate
          />

        </div>
      </div>

      <div class="h-[400px] w-full flex justify-center">
        <Bar_Chart
            :scores="testScores"
        />
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>