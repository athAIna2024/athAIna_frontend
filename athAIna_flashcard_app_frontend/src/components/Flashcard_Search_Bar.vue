<script>
import { ref } from 'vue';
const input = ref('');

export default {
  name: 'Flashcard_Search_Bar',
  props: ['modelValue'],
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
};
</script>

<template>
  <div>
    <input type="text" v-model="input" class="border-2 border-athAIna-red rounded-lg p-2" placeholder="Search flashcards">
  </div>
</template>

<style scoped>
</style>