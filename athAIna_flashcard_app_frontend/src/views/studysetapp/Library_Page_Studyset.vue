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
import axios from '@/axios'; // Import the configured Axios instance

// refactor backend 
const user = ref(null);
const studyset_url = "/studyset/";
const flashcard_url = "/flashcard/";

const studySet_result = ref([]);
const input = ref("");
const modals = ref({ subjectSelectModal: false });
const dropdownOptions = ref({
  ARTS: "Arts",
  BUS: "Business",
  GEO: "Geography",
  ENGR: "Engineering",
  HEALTH_MED: "Health and Medicine",
  HIST: "History",
  LAW_POL: "Law and Politics",
  LANG_CULT: "Languages and Cultures",
  MATH: "Mathematics",
  PHIL: "Philosophy",
  SCI: "Science",
  SOC_SCI: "Social Sciences",
  TECH: "Technology",
  WRIT_LIT: "Writing and Literature"
});
const currentPage = ref(1);
const isModalVisible = ref(false);

const fetchStudySet = async () => {
  try {
    const response = await axios.get(studyset_url);

    if (response.data && Array.isArray(response.data.data)) {
      studySet_result.value = response.data.data; // Ensure this is populated correctly

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
  return items;
});

const getSubjectName = (abbreviation) => {
  return dropdownOptions.value[abbreviation] || abbreviation;
};


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

    <div v-if="currentItems.length === 0" class="mt-[60px] text-[20px] font-semibold">
      No study sets found
    </div>


    <div v-else>
      <div class="grid mt-[60px] mb-[60px] gap-[55px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(item, index) in currentItems" :key="index">
          <Studyset_Card
            :title="item.title"
            :description="item.description"
            :subjects="getSubjectName(item.subjects)"
          />
        </div>
      </div>

      <Pagination
          :total-items="studySet_result.value ? studySet_result.value.length : 0"
          :items-per-page="6"
          :current-page="currentPage"
          @update:currentPage="currentPage = $event"
      />
    </div>

<!--    Resolve the issue of emits in the Create_Studyset component-->
<!--    <Create_Studyset-->
<!--        :isVisible="isModalVisible"-->
<!--        title="Create Studyset – athAIna"-->
<!--        @close="closeModal"-->
<!--    >-->
<!--    </Create_Studyset>-->
    </div>

</template>

<style scoped></style>
