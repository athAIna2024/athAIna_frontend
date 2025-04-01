<script setup>
import { defineProps, ref } from "vue";
import { dropdownOptions} from "@/components/constants/SubjectDropDownOptions.js";

const props = defineProps({
  top: String,
  right: String,
  height: String,
  width: String,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = async (key, value) => {
  emit("update:modelValue", { key, value });
};


</script>

<template>
  <div
      class="absolute z-50 max-h-[150px] overflow-y-auto h-[150px] w-[250px] border-athAIna-orange border-[4px] rounded-3xl bg-athAIna-white flex flex-col gap-y-3 justify-between p-5 shadow-md items-center"
      :style="{
      top: `${top}`,
      right: `${right}`,
      height: `${height}`,
      width: `${width}`,
    }"
  >
    <div class="max-h-[150px] overflow-y-auto minimalistic-scrollbar flex flex-col gap-y-3 p-3 w-full">
      <div v-for="[key, value] in Object.entries(dropdownOptions)" :key="key" class="w-full">
        <button
            class="text-athAIna-base border-athAIna-orange border-[3.5px] py-[5px] px-[30px] rounded-3xl text-sm w-full"
            :class="value.active
            ? 'bg-athAIna-orange text-athAIna-white'
            : 'border-athAIna-orange border-[3.5px]'"
            @click="() => updateValue(key, value)"
        >
          {{ value }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.minimalistic-scrollbar::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
}

.minimalistic-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; /* Background of the scrollbar track */
}

.minimalistic-scrollbar::-webkit-scrollbar-thumb {
  background: #888; /* Color of the scrollbar thumb */
  border-radius: 10px; /* Rounded corners for the scrollbar thumb */
}

.minimalistic-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555; /* Color of the scrollbar thumb on hover */
}

/* For Firefox */
.minimalistic-scrollbar {
  scrollbar-width: thin; /* Thin scrollbar */
  scrollbar-color: #888 #f1f1f1; /* Color of the scrollbar thumb and track */
}
</style>