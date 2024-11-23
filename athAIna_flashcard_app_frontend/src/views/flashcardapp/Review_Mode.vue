<script>
import Review_Mode_Flashcard from '@/components/Review_Mode_Flashcard.vue';

export default {
  name: 'Review_Mode',
  components: {Review_Mode_Flashcard},
  data() {
    return {
      flashcardId: this.$route.params.id
    };
    },
  created() {
    console.log(this.flashcardId);
  }

  
};

</script>

<template>
  <div class="p-10">
  <Review_Mode_Flashcard />
  </div>
</template>

<style scoped>
</style>