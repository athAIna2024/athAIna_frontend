<script>
import Studyset_Search_Bar from '@/components/Studyset_Search_Bar.vue';
import Studyset_Card from "@/components/Studyset_Card.vue";
import Subject_Selector from "@/components/Subject_Selector.vue";
3
export default {
  name: 'Library_Page_Studyset',
  components: {Subject_Selector, Studyset_Search_Bar, Studyset_Card},
  mounted() {
    document.title = `Study Sets – athAIna`
  },
  gridname: 'Grid',
  data() {
    return {
      items: [
        "Item 1",
        "Item 2",
        "Item 3"
      ],
    }
  },
  methods: {
    addItem() {
      const newItem = `Item ${this.items.length + 1}`
      this.items.push(newItem);
    }
  },
};

</script>

<template>
  <div class="mt-16 ml-12 mr-12">
    <div class="flex flex-row justify-between content-center">
      <Studyset_Search_Bar />
      <Subject_Selector />
      <div class="btn w-[250px] font-medium">
        Create Studyset
      </div>
    </div>

    <div class="mt-[30px]">
      <div class="text-[16px] font-medium"> Select a Study Set to View </div>
      <div class="w-full size-[1px] bg-gradient-to-r from-athAIna-yellow via-athAIna-orange to-athAIna-red mt-[12px]"></div>
    </div>

    <div class="grid mt-[60px] gap-[55px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
     <div v-for="(item, index) in items" :key="index">
       <Studyset_Card />
     </div>
    </div>
  </div>
</template>

<style scoped>
</style>