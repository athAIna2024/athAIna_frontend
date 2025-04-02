<script setup>
import { ref } from "vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref(null)

const props = defineProps({
  minDate: {
    type: Date,
    // default: () => new Date()
  },
  maxDate: {
    type: Date,
    // default: () => new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  },
})

</script>

<template>
  <div class="athAIna-border-outer p-1 rounded-[20px] h-[40px] w-[250px]">
    <div class="athAIna-border-inner rounded-[15px] relative flex flex-row items-center justify-between px-3 text-sm">
      <VueDatePicker
          class="h-auto w-full font-regular"
          v-model="date" range hide-input-icon :enable-time-picker="false"
          placeholder="Set Date Range"
          :ui="{ input: 'custom-datepicker-input' }"
          :start-date="props.minDate"
          :min-date="props.minDate"
          :max-date="props.maxDate"
          ignore-time-validation
      />
    </div>
  </div>
</template>

<style lang="postcss">
  .custom-datepicker-input::placeholder {
    @apply text-athAIna-violet;
  }

  .custom-datepicker-input {
    font-size: 14px;
    padding: 0;
    @apply font-sans border-none;
    @apply text-athAIna-violet;
  }
</style>