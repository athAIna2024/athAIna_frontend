<script>
import Studyset_Search_Bar from '@/components/Studyset_Search_Bar.vue';
import Studyset_Card from "@/components/Studyset_Card.vue";
import Subject_Selector from "@/components/Subject_Selector.vue";

export default {
  name: 'Library_Page_Studyset',
  components: {Subject_Selector, Studyset_Search_Bar, Studyset_Card},
  mounted() {
    document.title = `Study Sets – athAIna`
  }
};
</script>

<template>
  <div class="">
    Grid Library of Study sets
    Refer to Figma 4.9 View Study Sets
  </div>

  <Studyset_Search_Bar />
  <Studyset_Card />
  <Subject_Selector />
</template>

<style scoped>
</style>