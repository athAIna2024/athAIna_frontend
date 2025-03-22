<script setup>
import { defineProps, ref } from "vue";
// import studySetDb from "@/views/studysetapp/dexie.js";

const props = defineProps({
  items: Array,
  top: Number,
  right: Number,
  height: Number,
  width: Number,
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};

// const filterStudySets = async (query) => {
//   return await studySetDb.studysets
//       .filter(studyset =>
//           studyset.subject.toLowerCase().equals(query.toLowerCase()))
//       .toArray();
// };

</script>

<template>
  <div class="absolute h-[150px] w-[250px] border-athAIna-orange border-[4px] rounded-3xl bg-athAIna-white flex flex-col gap-y-3 justify-between p-5 shadow-md items-center"
    :style="{
      top: `${top}`,
      right: `${right}`,
      height: `${height}`,
      width: `${width}`,
     }"
  >
    <div v-for="item in items" :key="item" class="w-full">
      <button
          class="text-base border-athAIna-orange border-[3.5px] py-[5px] px-[30px] rounded-3xl text-sm w-full"
          :class="item.active ? 'bg-athAIna-orange text-athAIna-white' : 'border-athAIna-orange border-[3.5px]'"
          @click="filterStudySets"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>