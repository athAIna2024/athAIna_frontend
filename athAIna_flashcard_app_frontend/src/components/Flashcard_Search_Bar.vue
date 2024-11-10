<script>
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
  <div class="athAIna-border-outer p-[3px]">
    <div class="athAIna-border-inner">
      <input type="text" :value="modelValue" @input="updateValue" class="rounded-lg p-4 w-96" placeholder="Search flashcards">
    </div>
  </div>

</template>

<style scoped>
</style>