<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  top: String,
  right: String,
  height: String,
  width: String,
  itemList: Array,
});

const emit = defineEmits(["close", "itemClick"]);

const dropdownRef = ref(null);

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    emit("close");
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

</script>

<template>
  <div
      ref="dropdownRef"
      class="absolute z-50 max-h-[150px] overflow-y-auto h-[150px] w-[250px] border-athAIna-orange border-[4px] rounded-3xl bg-athAIna-white flex flex-col gap-y-3 justify-between p-3 shadow-md items-center"
      :style="{
      top: `${top}`,
      right: `${right}`,
      height: `${height}`,
      width: `${width}`,
      overflow: 'hidden'
    }"
  >
    <div class="flex flex-col gap-y-2 p-3 w-full">
      <div v-for="item in itemList" :key="item" class="w-full">
          <button
              class="text-athAIna-base border-athAIna-orange border-[3.5px] py-[5px] px-[30px] rounded-3xl text-sm w-full
              min-w-[100px] max-w-full truncate hover:gradient-hover transition-colors duration-300"
              :title="item"
              @click="$emit('itemClick', item)"
          >
            {{ item }}
          </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button:hover {
  @apply bg-gradient-to-r from-athAIna-yellow to-athAIna-red;
  @apply text-athAIna-white;
  @apply font-semibold;
  @apply border-none;
  @apply py-[8px];
  @apply px-[33.5px];
}
</style>