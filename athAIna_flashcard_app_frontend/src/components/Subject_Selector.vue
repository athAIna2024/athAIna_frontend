<script setup>
import { defineProps, defineEmits } from "vue";
import { ref } from "vue";
import { computed } from "vue";
import { watch } from "vue";
import { useStudySetFilterStore} from "../../stores/studySetFilterStore.js";

const studySetFilterStore = useStudySetFilterStore();
const props = defineProps({
  placeholder: String,
  outerClass: {
    type: String,
    required: true
  },
  innerClass: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ""
  }


});
const emit = defineEmits(['update:modelValue', 'click']);

const isCancelActive = ref(props.modelValue !== "");

const clearFilterResults = () => {
  emit("update:modelValue", "");
  studySetFilterStore.clear();
};

watch(
    () => props.modelValue,
    (newValue) => {
      isCancelActive.value = newValue !== "";
    },
    { immediate: true }
);

</script>

<template>
<div :class="outerClass + ' p-1 rounded-[20px] h-[40px]'">
  <div
      :class="innerClass + ' rounded-[15px] relative flex flex-row items-center justify-between px-3 text-sm'"
      @click="$emit('click')"
  >
    <span class="text-athAIna-orange">{{ modelValue || placeholder }}</span>
    <svg v-if="isCancelActive"
        xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-5 text-athAIna-violet hover:cursor-pointer"
        @click="clearFilterResults()"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
    <svg v-else
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-5 text-athAIna-violet hover:cursor-pointer"
    >
      <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>

  </div>
</div>
</template>

<style scoped></style>