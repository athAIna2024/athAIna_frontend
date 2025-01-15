<script>
import Search_Bar from '@/components/Search_Bar.vue';
import Studyset_Card from "@/components/Studyset_Card.vue";
import Subject_Selector from "@/components/Subject_Selector.vue";
import Footer_Navbar from "@/components/Footer_Navbar.vue";
import Pagination from "@/components/Pagination.vue";
import Create_Studyset from "@/views/studysetapp/Create_Studyset.vue";
import Floating_Dropdown from "@/components/Floating_Dropdown.vue";

export default {
  name: 'Library_Page_Studyset',
  components: {
    Floating_Dropdown,
    Create_Studyset,
    Footer_Navbar,
    Subject_Selector,
    Search_Bar,
    Studyset_Card,
    Pagination,
  },

  data() {
    return {
      input: '',
      items: [
        "Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6",
        "Item 7", "Item 8", "Item 9", "Item 10", "Item 11"
      ],
      dropdownOptions: [
          "Arts", "Business", "Geography", "Engineering", "Health & Medicine",
          "History", "Law & Politics", "Languages & Cultures", "Mathematics",
          "Philosophy", "Science", "Social Sciences", "Technology", "Writing & Literature"
      ],
      currentPage: 1,
      isModalVisible: false,
      modals: {
        subjectSelectModal: false,
      },
    }
  },

  computed: {
    currentItems() {
      const startIndex = (this.currentPage - 1) * 6;
      return this.items.slice(startIndex, startIndex + 6);
    }
  },

  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    filteredList() {
      return this.flashcards.filter(flashcard => {
        return flashcard.question.toLowerCase().includes(this.input.toLowerCase());
      });
    },
    toggleModal(modalName) {
      this.modals[modalName] = !this.modals[modalName];
    }
  },

  mounted() {
    document.title = `Library – athAIna`
  }
}
</script>

<template>
  <div class="my-16 ml-12 mr-12">
    <div class="flex flex-row justify-between space-x-[50px] content-center">
      <Search_Bar v-model="input" class="w-[700px]"/>
      <Subject_Selector @click="toggleModal('subjectSelectModal')" class="relative w-[350px]"/>
      <Floating_Dropdown v-if="modals.subjectSelectModal"
        :items="dropdownOptions"
        top="230px"
        right="360px"
        height="max-content"
        width="350px">
      </Floating_Dropdown>
      <div @click="openModal" class="btn hover:cursor-pointer w-[250px] font-semibold">
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

  <Create_Studyset
      :isVisible="isModalVisible"
      title="Create Studyset – athAIna"
      @close="closeModal">

  </Create_Studyset>

</template>

<style scoped>
</style>
