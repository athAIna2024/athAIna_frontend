<script setup>
import { computed } from "vue";
import { ref } from "vue";
import { onMounted } from "vue";
import Subject_Selector from "@/components/Subject_Selector.vue";
import Date_Range_Selector from "@/components/Date_Range_Selector.vue";
import Bar_Chart from "@/views/reportapp/Bar_Chart.vue";
import Floating_Dropdown_Studysets from "@/components/Floating_Dropdown_Studysets.vue";
import axios from '@/axios';
import studySetDb from "@/views/studysetapp/dexie.js";
import {useUserStore} from "../../../stores/userStore.js";

const userStore = useUserStore();
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

const fetchTestReport = async () => {
  try {
    const url = 'report';
    const response = await axios.get(url, {
      params: {
        id: 1,
        studyset_id: 2,
        start_date: "2025-03-28 10:50:31.546000",
        end_date: "2025-03-28 11:50:31.546000"
      }
    });

    isSuccessful.value = response.data.successful;
    message.value = "Fetch test scores successfully";

  } catch (error) {
    isSuccessful.value = false;
    message.value = error.message;
    console.error(error.message);
  }
};

const scores = ref([
  { timestamp: "2024-03-03T12:45:00", score: 40 },
  { timestamp: "2024-03-03T18:00:00", score: 80 },
  { timestamp: "2024-03-04T01:00:00", score: 85 },
  { timestamp: "2024-03-05T14:30:00", score: 90 },
  { timestamp: "2024-03-05T14:30:00", score: 30 },
  { timestamp: "2024-03-05T14:30:00", score: 90 },
  { timestamp: "2024-03-05T14:30:00", score: 60 },
]);

const chartData = computed(() => {
  return {
    labels: scores.value.map(entry =>
        new Date(entry.timestamp).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
    ),
    datasets: [
      {
        label: "Pass (≥ 70%)",
        data: scores.value.map(entry => (entry.score >= 70 ? entry.score : null)), // Show only passing scores
        backgroundColor: "rgba(75, 192, 75, 0.6)", // Green
        borderColor: "rgba(75, 192, 75, 1)",
        borderWidth: 1,
      },
      {
        label: "Fail (< 70%)",
        data: scores.value.map(entry => (entry.score < 70 ? entry.score : null)), // Show only failing scores
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
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
              :minDate="new Date('2025-01-01')"
              :maxDate="new Date('2025-12-31')"
          />

        </div>
      </div>

      <div class="h-[400px] w-full flex justify-center">
        <Bar_Chart
            :options="chartOptions"
            :data="chartData"
            aria-label="Green bars indicate passing, achieved with a score of 70% or higher. Red bars represent failing scores"
        />
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>