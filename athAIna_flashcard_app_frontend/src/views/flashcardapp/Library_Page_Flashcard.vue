<script>
import Flashcard_Search_Bar from "@/components/Flashcard_Search_Bar.vue";
import Flashcard_Card from "@/components/Flashcard_Card.vue";

export default {
  name: 'Library_Page_Flashcard',
  components: {Flashcard_Search_Bar, Flashcard_Card},
};
</script>

<template>


  <div class="">
    Grid Library of Flashcards
  </div>
  <Flashcard_Search_Bar />
  <Flashcard_Card />

</template>

<style scoped>
</style>