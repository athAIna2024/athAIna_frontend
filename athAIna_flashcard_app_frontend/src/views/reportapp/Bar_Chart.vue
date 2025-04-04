<script setup>
import { ref, computed } from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "vue-chartjs";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  scores: {
    type: Array,
    required: true,
  },
});


// Dynamically generate labels and datasets
const chartData = computed(() => {
  return {
    labels: props.scores.map(entry => new Date(entry.timestamp).toLocaleString("en-US", {
      timeZone: "Asia/Manila",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true })),
    datasets: [
      {
        label: "Scores",
        data: props.scores.map(entry => entry.score),
        backgroundColor: props.scores.map(entry => (entry.score >= 70 ? "rgba(75, 192, 75, 0.6)" : "rgba(255, 99, 132, 0.6)")), // Green for passing, Red for failing
        borderColor: props.scores.map(entry => (entry.score >= 70 ? "rgba(75, 192, 75, 1)" : "rgba(255, 99, 132, 1)")),
        borderWidth: 1,
      },
    ],
  };
});

// Chart Options with Custom Legend
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        generateLabels: (chart) => [
          {
            text: "Passing (≥ 70%)",
            fillStyle: "rgba(75, 192, 75, 0.6)",
            strokeStyle: "rgba(75, 192, 75, 1)",
            hidden: false,
          },
          {
            text: "Failing (< 70%)",
            fillStyle: "rgba(255, 99, 132, 0.6)",
            strokeStyle: "rgba(255, 99, 132, 1)",
            hidden: false,
          },
        ],
      },
    },
  },
});
</script>

<template>
  <div class="h-[400px] w-full flex justify-center">
    <Bar :data="chartData"
         :options="chartOptions"
         aria-label="Green bars indicate passing, achieved with a score of 70% or higher. Red bars represent failing scores"
    />
  </div>
</template>