<script setup>
import { defineProps, ref } from "vue";
// import studySetDb from "@/views/studysetapp/dexie.js";

const props = defineProps({
  items: Object,
  top: Number,
  right: Number,
  height: Number,
  width: Number,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

// const filterStudySets = async (query) => {
//   return await studySetDb.studysets
//       .filter(studyset =>
//           studyset.subject.toLowerCase().equals(query.toLowerCase()))
//       .toArray();
// };
</script>

<template>
  <div
    class="max-h-[150px] overflow-y-auto absolute h-[150px] w-[250px] border-athAIna-orange border-[4px] rounded-3xl bg-athAIna-white flex flex-col gap-y-3 justify-between p-5 shadow-md items-center"
    :style="{
      top: `${top}`,
      right: `${right}`,
      height: `${height}`,
      width: `${width}`,
    }"
  >
    <div class="max-h-[150px] overflow-y-auto no-scrollbar flex flex-col gap-y-3 p-3 w-full">
      <div v-for="[key, value] in Object.entries(items)" :key="key" class="w-full">
        <button
            class="text-base border-athAIna-orange border-[3.5px] py-[5px] px-[30px] rounded-3xl text-sm w-full"
            :class="value.active
            ? 'bg-athAIna-orange text-athAIna-white'
            : 'border-athAIna-orange border-[3.5px]'"
            @click="updateValue(value)"
        >
          {{ value }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for Webkit browsers (Chrome, Safari) */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for Firefox */
.no-scrollbar {
  scrollbar-width: none;
}
</style>
