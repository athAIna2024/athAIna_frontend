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
const studyset_url = "/studyset/";
const flashcard_url = "/flashcard/";
const userId = ref(1);

const isSuccessful_studyset = ref(false);
const message_studyset = ref("");
const isSuccessful_flashcard = ref(false);
const message_flashcard = ref("");

const studySet_result = ref([]);
const studySetCounts = ref(0);
const flashcardCounts = ref({});

const currentPage = ref(1);
const itemsPerPage = 6;

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


const isModalVisible = ref(false);

const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};


const currentStudySets = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return studySet_result.value.slice(startIndex, endIndex);
});

const getSubjectName = (abbreviation) => {
  return dropdownOptions.value[abbreviation] || abbreviation;
};

const fetchFlashcardCount = async (studysetId) => {
  try {
    const response = await axios.get(flashcard_url, {
      params: { studyset_id: studysetId }
    });


    if (response.data && Array.isArray(response.data.data)) {
      isSuccessful_flashcard.value = response.data.successful;
      message_flashcard.value = response.data.message;
      flashcardCounts.value[studysetId] = response.data.data.length;

      // Debugging
      console.log("isSuccessful_flashcard", isSuccessful_flashcard.value);
      console.log("message_flashcard", message_flashcard.value);

    } else {
      isSuccessful_flashcard.value = false;
      message_flashcard.value = "API response is not an array";
      flashcardCounts.value[studysetId] = 0;

      // Debugging
      console.log("isSuccessful_flashcard", isSuccessful_flashcard.value);
      console.log("message_flashcard", message_flashcard.value);
    }

  } catch (error) {
    if (error.response && error.response.status === 200) {
      isSuccessful_flashcard.value = error.response.data.successful;
      message_flashcard.value = error.response.data.message;

      // Debugging
      console.log("isSuccessful_flashcard", isSuccessful_flashcard.value);
      console.log("message_flashcard", message_flashcard.value);
    } else {
      isSuccessful_flashcard.value = false;
      message_flashcard.value = "An error occurred. Please try again later.";

      // Debugging
      console.log("isSuccessful_flashcard", isSuccessful_flashcard.value);
      console.log("message_flashcard", message_flashcard.value);

    }
    flashcardCounts.value[studysetId] = 0;
  }
};

const fetchStudySet = async () => {
  try {
    const response = await axios.get('/studyset/', {
      params: { user_id: Number(userId.value) }
    });

    if (response.data && Array.isArray(response.data.data)) {
      isSuccessful_studyset.value = response.data.successful;
      message_studyset.value = response.data.message;
      studySet_result.value = response.data.data;
      studySetCounts.value = response.data.data.length;

      // Fetch flashcard counts for each study set concurrently
      const flashcardCountPromises = studySet_result.value.map(studyset => fetchFlashcardCount(studyset.id));
      await Promise.all(flashcardCountPromises);

    } else {
      isSuccessful_studyset.value = false;
      message_studyset.value = "API response is not an array";
      studySet_result.value = [];
      studySetCounts.value = 0;
    }

  } catch (error) {
    if (error.response && error.response.status === 400) {
      isSuccessful_studyset.value = error.response.data.successful;
      message_studyset.value = error.response.data.message;
    } else {
      isSuccessful_studyset.value = false;
      message_studyset.value = "An error occurred. Please try again later.";
    }
    studySet_result.value = [];
    studySetCounts.value = 0;
  }
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

    <div v-if="currentStudySets.length === 0" class="mt-[60px] text-[20px] font-semibold">
    </div>


    <div v-else>
      <div class="grid mt-[60px] mb-[60px] gap-[55px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(s, index) in currentStudySets" :key="index">
          <Studyset_Card
            :title="s.title"
            :description="s.description"
            :subject="getSubjectName(s.subject)"
            :flashcardCount="flashcardCounts[s.id] || 0"
          />
        </div>
      </div>

      <Pagination
          :total-items="studySetCounts"
          :items-per-page="itemsPerPage"
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

    </div>

</template>

<style scoped></style>
