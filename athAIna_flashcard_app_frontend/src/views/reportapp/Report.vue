<script setup>
import { provide } from "vue";
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
import Basic_Dropdown from "@/components/Basic_Dropdown.vue";
import {flashcardCreationModes, views} from "@/components/constants/SubjectDropDownOptions.js";
import Line_Chart from "@/views/reportapp/Line_Chart.vue";

const userStore = useUserStore();
const learnerId = userStore.getUserID();

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
  toggleView: false,
})

const barChartSelected = ref(false);
const lineChartSelected = ref(true);

// Methods
const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};

const studySetSelected = ref({ id: null, title: null});
const viewModeSelected = ref({ id: null, title: null});

const minDate = new Date(userStore.getDateJoined());
const maxDate = ref(new Date()); // Current date (always the current, not the date user login);

const startDate = ref(new Date());
const endDate = ref(new Date());

provide('startDate', startDate); // along with inject, allows to pass data between components
provide('endDate', endDate); // along with inject, allows to pass data between components

const testScores = ref([]);

const fetchTestReport = async () => {
  try {
    const url = 'report';
    const start = new Date(startDate.value);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(endDate.value);
    end.setUTCHours(23, 59, 59, 999);

    const response = await axios.get(url, {
      params: {
        user_id: learnerId,
        studyset_id: Number(studySetSelected.value.id),
        start_date: start.toISOString(),
        end_date: end.toISOString(),
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

watch([startDate, endDate, studySetSelected], () => {
  if (studySetSelected.value.id !== null && startDate.value && endDate.value) {
    fetchTestReport();
  }
});

onMounted(() => {
  fetchStudySets();
});

function showLineChart() {

}

function showBarChart() {

}

const handleToggleViewClick = (option) => {
  viewModeSelected.value.title = option;
  toggleModal('toggleView');

  if (option === "Bar") {
    // console.log("Bar View selected");
    barChartSelected.value = true;
    lineChartSelected.value = false;
  } else if (option === "Line") {
    // console.log("Line Viw selected");
    barChartSelected.value = false;
    lineChartSelected.value = true;
  }
};

</script>

<template>
  <div class="h-screen">
    <div class="flex flex-col justify-center gap-y-3 content-center w-screen">
      <div class="m-20 flex flex-row justify-between w-auto">
        <p class="font-semibold text-lg">{{ studySetSelected.title }}</p>
        <div class="flex flex-row justify-between items-center gap-x-10">

          <div class="flex flex-col">
            <Subject_Selector
                :placeholder="'Choose Study Set'"
                @click="toggleModal('studySetModal')"
                class="relative w-[250px]"
                :innerClass="'athAIna-border-inner'"
                :outerClass="'athAIna-border-outer'"
                v-model="studySetSelected.title"

            />
            <Floating_Dropdown_Studysets
                v-if="modals.studySetModal"
                :items="studySets"
                top="240px"
                right="max-content"
                height="max-content"
                width="full"
                @update:modelValue="({ key, value }) => updateStudySet(key, value)"
            />

          </div>

          <div class="relative flex-col min-w-[150px] sm:w-full text-[16px] md:w-full lg:w-[250px]">
            <Subject_Selector
                :placeholder="'Toggle View'"
                @click="toggleModal('toggleView')"
                class="relative w-full"
                :innerClass="'athAIna-border-inner'"
                :outerClass="'athAIna-border-outer'"
                v-model="viewModeSelected.title"
            />
            <Basic_Dropdown
                class="w-full"
                v-if="modals.toggleView"
                :items="views"
                :itemList="views"
                top="50px"
                right="0px"
                height="max-content"
                width="full"
                @itemClick="handleToggleViewClick"
            >
            </Basic_Dropdown>
          </div>

          <Date_Range_Selector
              :minDate=minDate
              :maxDate=maxDate
              @update:startDate="(date) => startDate.value = date"
              @update:endDate="(date) => endDate.value = date"
          />

        </div>
      </div>

      <div class="h-[400px] w-full flex justify-center">
        <Bar_Chart
            v-if="barChartSelected"
            :scores="testScores"
        />

       <Line_Chart
            v-if="lineChartSelected"
            :scores="testScores"
        />
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>