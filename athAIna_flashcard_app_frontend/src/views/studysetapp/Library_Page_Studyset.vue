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

    <div class="grid mt-[60px] mb-[60px] gap-[55px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="(item, index) in currentItems" :key="index">
        <Studyset_Card />
      </div>
    </div>

    <Pagination
        :total-items="items.length"
        :items-per-page="6"
        :current-page="currentPage"
        @update:currentPage="currentPage = $event"
    />
  </div>

  <Footer_Navbar />
</template>

<script>
import Studyset_Search_Bar from '@/components/Studyset_Search_Bar.vue';
import Studyset_Card from "@/components/Studyset_Card.vue";
import Subject_Selector from "@/components/Subject_Selector.vue";
import Footer_Navbar from "@/components/Footer_Navbar.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: 'Library_Page_Studyset',
  components: {
    Footer_Navbar,
    Subject_Selector,
    Studyset_Search_Bar,
    Studyset_Card,
    Pagination
  },

  data() {
    return {
      items: [
        "Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6",
        "Item 7", "Item 8", "Item 9", "Item 10", "Item 11"
      ],
      currentPage: 1,
    }
  },

  computed: {
    currentItems() {
      const startIndex = (this.currentPage - 1) * 6; // Calculate the starting index
      return this.items.slice(startIndex, startIndex + 6); // Slice the items array to show only 6 items
    }
  }
}
</script>

<style scoped>
</style>
