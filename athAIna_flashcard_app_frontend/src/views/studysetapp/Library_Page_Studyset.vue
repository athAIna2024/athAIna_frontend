<script setup>
import Search_Bar from "@/components/Search_Bar.vue";
import Studyset_Card from "@/components/Studyset_Card.vue";
import Subject_Selector from "@/components/Subject_Selector.vue";
import Footer_Navbar from "@/components/Footer_Navbar.vue";
import Pagination from "@/components/Pagination.vue";
import Create_Studyset from "@/views/studysetapp/Create_Studyset.vue";
import Floating_Dropdown from "@/components/Floating_Dropdown.vue";

import { ref } from "vue";
import { onMounted } from "vue";
import { computed } from "vue";
import axios from "axios";

// refactor backend 
const user = ref(null);
const url = "http://localhost:8000/studyset/library_studysets/?user_id=1";
const studySet_result = ref([]);
const input = ref("");
const modals = ref({ subjectSelectModal: false });
const dropdownOptions = ref([
  "Arts",
  "Business",
  "Geography",
  "Engineering",
  "Health & Medicine",
  "History",
  "Law & Politics",
  "Languages & Cultures",
  "Mathematics",
  "Philosophy",
  "Science",
  "Social Sciences",
  "Technology",
  "Writing & Literature",
]);
const currentPage = ref(1);
const isModalVisible = ref(false);

const fetchStudySet = async () => {
  try {
    const response = await axios.get(url);

    if (response.data && Array.isArray(response.data.results)) {
      studySet_result.value = response.data.results; // Ensure this is populated correctly
      console.log(studySet_result.value)
      console.log(studySet_result.value[0].subjects);
    } else {
      console.error("API response is not an array");
    }
  
  } catch (error) {
    console.error(error);
  }
};

const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};
 
const currentItems = computed(() => {
  const startIndex = (currentPage.value - 1) * 6;
  const items = studySet_result.value.slice(startIndex, startIndex + 6);
  console.log('Current items:', items); // Log the current items
  return items;
});


onMounted(() => {
  fetchStudySet();
  document.title = "Studysets";
});
</script>

<template>
  <div class="my-16 ml-12 mr-12">
    <div class="flex flex-row justify-between space-x-[50px] content-center">
      <Search_Bar v-model="input" class="w-[700px]" />
      <Subject_Selector
        @click="toggleModal('subjectSelectModal')"
        class="relative w-[350px]"
      />
      <Floating_Dropdown
        v-if="modals.subjectSelectModal"
        :items="dropdownOptions"
        top="230px"
        right="360px"
        height="max-content"
        width="350px"
      >
      </Floating_Dropdown>
      <div
        @click="openModal"
        class="btn hover:cursor-pointer w-[250px] font-semibold"
      >
        Create Studyset
      </div>
    </div>

    <div class="mt-[30px]">
      <div class="text-[16px] font-medium">Select a Study Set to View</div>
      <div
        class="w-full size-[1px] bg-gradient-to-r from-athAIna-yellow via-athAIna-orange to-athAIna-red mt-[12px]"
      ></div>
    </div>

    <div
      class="grid mt-[60px] mb-[60px] gap-[55px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div v-for="(item, index) in currentItems" :key="index">
    
        {{  item.title }}
        {{  item.subjects }}
        {{  item.description }}

        <Studyset_Card :studySet="item" />
      </div>
    </div>

    <Pagination
      :total-items="studySet_result.value ? studySet_result.value.length : 0" 
      :items-per-page="6"
      :current-page="currentPage"
      @update:currentPage="currentPage = $event"
    />
  </div>

  <Create_Studyset
    :isVisible="isModalVisible"
    title="Create Studyset – athAIna"
    @close="closeModal"
  >
  </Create_Studyset>
</template>

<style scoped></style>
