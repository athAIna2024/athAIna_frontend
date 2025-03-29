<script setup>
import {computed, ref} from "vue";

const scores = ref([
  { timestamp: "2024-03-03T12:45:00", score: 40 },
  { timestamp: "2024-03-03T18:00:00", score: 80 },
  { timestamp: "2024-03-04T01:00:00", score: 85 },
  { timestamp: "2024-03-05T14:30:00", score: 90 },
  { timestamp: "2024-03-05T14:30:00", score: 30 },
  { timestamp: "2024-03-05T14:30:00", score: 90 },
  { timestamp: "2024-03-05T14:30:00", score: 60 },
]);

// FIXME: Improve data formatting. Implement dictionaries instead of arrays.
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


const chartOptions = ref({
  responsive: true,
});

// Reactive Variables
const study_set_placeholder = ref("Choose a Study Set");
const subject_placeholder = ref("Filter by Subject");
const title = ref("Study Set Title");
const select_study_set = ref(false);
const select_subject = ref(false);
const studysets = ['Networking', 'Man, Church, Society']; // To be fetched from DB
const subjects = ['Arts', 'Technology', 'Relationships'];

// Components
import Subject_Selector from "@/components/Subject_Selector.vue";
import Date_Range_Selector from "@/components/Date_Range_Selector.vue";
import Floating_Dropdown from "@/components/Floating_Dropdown.vue";
import Bar_Chart from "@/views/reportapp/Bar_Chart.vue";

// Methods
const toggleModal = (modalName) => {
  modalName.value = !modalName.value;
}
</script>

<template>
  <div class="h-screen">
    <div class="flex flex-col justify-center gap-y-3 content-center w-screen">
      <div class="m-20 flex flex-row justify-between w-auto">
        <p class="font-semibold text-lg">{{ title }}</p>
        <div class="flex flex-row justify-between items-center gap-x-10">

          <!-- Study Set Selector-->
          <div class="flex flex-col">
            <Subject_Selector
                :placeholder="study_set_placeholder"
                @click="select_study_set=!select_study_set"
                class="relative w-[263px]"/>
            <Floating_Dropdown v-if="select_study_set"
                               :items="studysets"
                               top="240px"
                               right="667px"
                               height="max-content"
                               width="max-content">
            </Floating_Dropdown>
          </div>

          <!-- Subject Selector -->
          <!--          <div class="flex flex-col">-->
          <!--            <Subject_Selector-->
          <!--                :placeholder="subject_placeholder"-->
          <!--                @click="select_subject=!select_subject"-->
          <!--                class="relative w-[263px]"/>-->
          <!--            <Floating_Dropdown v-if="select_subject"-->
          <!--                               :items="subjects"-->
          <!--                               top="240px"-->
          <!--                               right="365px"-->
          <!--                               height="max-content"-->
          <!--                               width="260px">-->
          <!--            </Floating_Dropdown>-->
          <!--          </div>-->

          <Date_Range_Selector/>
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