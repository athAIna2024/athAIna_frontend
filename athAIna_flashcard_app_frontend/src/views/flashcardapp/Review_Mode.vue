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
  <div class="">
    Review Mode
    Refer to 4.3 View flashcards via review mode
  </div>
  <Review_Mode_Flashcard />
</template>

<style scoped>
</style>