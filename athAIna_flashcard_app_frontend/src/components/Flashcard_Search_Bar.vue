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
    <div class="athAIna-border-outer p-1 rounded-full">
      <input type="text" :value="modelValue" @input="updateValue" class="athAIna-border-inner p-4 focus:outline-none rounded-full" placeholder="Search flashcards">
  </div>

</template>

<style scoped>
</style>