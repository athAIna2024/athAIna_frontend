<script setup>
import Search_Bar_Studyset from "@/components/Search_Bar_Studyset.vue";
import Studyset_Card from "@/components/Studyset_Card.vue";
import Subject_Selector from "@/components/Subject_Selector.vue";
import Pagination from "@/components/Pagination.vue";
import Create_Studyset from "@/views/studysetapp/Create_Studyset.vue";
import Loading_Modal from "@/components/Loading_Modal.vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { computed } from "vue";
import axios from "@/axios"; // Import the configured Axios instance
import studySetDb from "@/views/studysetapp/dexie.js";
import { useStudySetSearchStore } from "../../../stores/studySetSearchStore.js";
import { useStudySetFilterStore } from "../../../stores/studySetFilterStore.js";
import Filter_Bar_Studyset from "@/components/Filter_Bar_Studyset.vue";
import { dropdownOptions } from "@/components/constants/SubjectDropDownOptions.js";
import { useUserStore } from "../../../stores/userStore.js";

const isPageVisible = ref(false);
const studySetSearchStore = useStudySetSearchStore();
const studySetFilterStore = useStudySetFilterStore();

const studyset_url = "/studyset/";
const flashcard_url = "/flashcard/";
const userStore = useUserStore();
const learnerId = userStore.getUserID();

const isSuccessful_studyset = ref(false);
const message_studyset = ref("");
const isSuccessful_flashcard = ref(false);
const message_flashcard = ref("");

const studySet_result = ref([]);
const studySetCounts = ref(0);
const studySet_db = ref([]);

const isLoading = ref(false);

const currentPage = ref(1);
const itemsPerPage = 6;

const input = ref("");
const modals = ref({ subjectSelectModal: false });

const isModalVisible = ref(false);

const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};

const subject = ref("");
const updateSubject = (value) => {
  subject.value = value;
  toggleModal("subjectSelectModal");
};

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = async () => {
  await fetchStudySetFromDb();
  isModalVisible.value = false;
};

const isSuccessful_studySetFilterSearch = computed(() => {
  return (
    studySetFilterStore.getFilterActiveStatus() ||
    studySetSearchStore.getSearchActiveStatus()
  );
});

const message_studySetFilterSearch = computed(() => {
  if (studySetFilterStore.getFilterActiveStatus()) {
    return studySetFilterStore.getFilterResults().length > 0
      ? ""
      : "No study sets found for the selected subject.";
  }

  if (studySetSearchStore.getSearchActiveStatus()) {
    return studySetSearchStore.getSearchResults().length > 0
      ? ""
      : "No study sets found for the search term.";
  }
});

const currentStudySets = computed(() => {
  const isFilterActive = studySetFilterStore.getFilterActiveStatus();
  const isSearchActive = studySetSearchStore.getSearchActiveStatus();

  if (isFilterActive) {
    console.log("IsFilterActive", isFilterActive);
    return studySetFilterStore.getFilterResults();
  }

  if (isSearchActive) {
    console.log("IsSearchActive", isSearchActive);
    subject.value = "Choose Subject"; // Reset subject when search is active

    return studySetSearchStore.getSearchResults();
  }

  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return studySet_db.value.slice(startIndex, endIndex);
});

const getSubjectName = (abbreviation) => {
  return dropdownOptions[abbreviation] || abbreviation;
};

const fetchFlashcardCount = async (studysetId) => {
  try {
    const response = await axios.get(flashcard_url, {
      params: { studyset_id: studysetId },
    });

    if (response.data && Array.isArray(response.data.data)) {
      isSuccessful_flashcard.value = response.data.successful;
      message_flashcard.value = response.data.message;
      return response.data.data.length;
    } else {
      isSuccessful_flashcard.value = false;
      message_flashcard.value = "API response is not an array";
      return 0;
    }
  } catch (error) {
    if (error.response && error.response.status === 200) {
      isSuccessful_flashcard.value = error.response.data.successful;
      message_flashcard.value = error.response.data.message;
    } else {
      isSuccessful_flashcard.value = false;
      message_flashcard.value = "An error occurred. Please try again later.";
    }
    return 0;
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchStudySet = async () => {
  isLoading.value = true;
  const minimumLoadingTime = 500; // Minimum loading time in milliseconds
  const startTime = Date.now();
  try {
    // API Call
    const response = await axios.get(studyset_url, {
      params: { user_id: Number(learnerId) },
    });

    if (response.data && Array.isArray(response.data.data)) {
      isSuccessful_studyset.value = response.data.successful;
      message_studyset.value = response.data.message;
      studySet_result.value = response.data.data.map((studyset) => {
        return {
          id: Number(studyset.id),
          title: String(studyset.title),
          description: String(studyset.description),
          subject: String(studyset.subject),
          flashcard_count: Number(0),
          created_at: Date(studyset.created_at),
          updated_at: Date(studyset.updated_at),
        };
      });

      const flashcardCountPromises = studySet_result.value.map(
        async (studyset) => {
          studyset.flashcard_count = await fetchFlashcardCount(studyset.id);
        }
      );
      await Promise.all(flashcardCountPromises);

      const serializableStudySets = studySet_result.value.map((studyset) => {
        return {
          id: studyset.id,
          title: studyset.title,
          description: studyset.description,
          subject: studyset.subject,
          flashcard_count: studyset.flashcard_count,
          created_at: studyset.created_at,
          updated_at: studyset.updated_at,
        };
      });

      await studySetDb.studysets.bulkPut(serializableStudySets);
    } else {
      isSuccessful_studyset.value = false;
      message_studyset.value = "API response is not an array";
      studySet_result.value = [];
      studySetCounts.value = 0;
    }
    return studySet_result;
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

    return studySet_result;
  } finally {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = minimumLoadingTime - elapsedTime;

    if (remainingTime > 0) {
      await delay(remainingTime);
    }
    isLoading.value = false;
  }
};

const fetchStudySetFromDb = async () => {
  try {
    studySet_db.value = await studySetDb.studysets
      .orderBy("updated_at")
      .reverse()
      .toArray();

    if (studySet_db.value.length === 0) {
      await fetchStudySet();
      studySet_db.value = await studySetDb.studysets
        .orderBy("updated_at")
        .reverse()
        .toArray();
    }

    studySetCounts.value = studySet_db.value.length;
    isSuccessful_studyset.value = studySetCounts.value > 0;
    message_studyset.value = isSuccessful_studyset.value
      ? "Study sets fetched successfully"
      : "Create your first study set to get started!";
  } catch (error) {
    isSuccessful_studyset.value = false;
    message_studyset.value = "An error occurred. Please try again later.";
  }
};

onMounted(() => {
  document.title = "Study Sets"; // Set the document title first
  fetchStudySetFromDb(); // Fetch the study set data
});
</script>

<template>
  <transition appear name="fade">
    <div>
      <div class="my-16 ml-12 mr-12 min-h-screen">
        <div class="flex flex-col lg:flex-row justify-between lg:space-x-[50px] content-center">
          <Search_Bar_Studyset
              v-model="input"
              class="'lg:w-[700px] w-full" />
          <div class="flex flex-row mt-4 lg:mt-0 space-x-[50px] justify-evenly content-center">
            <div class="relative lg:w-[350px] w-full">
              <Subject_Selector
                  @click="toggleModal('subjectSelectModal')"
                  class="relative mb-3"
                  :placeholder="'Choose Subject'"
                  :outerClass="'athAIna-border-outer'"
                  :innerClass="'athAIna-border-inner'"
                  v-model="subject"
              />
              <Filter_Bar_Studyset
                  v-if="modals.subjectSelectModal"
                  :items=dropdownOptions
                  top="50px"
                  right="0px"
                  height="max-content"
                  width="350px"
                  @update:modelValue="updateSubject"
              >
              </Filter_Bar_Studyset>
            </div>

            <div
                @click="openModal"
                class="btn hover:cursor-pointer w-[250px] font-semibold"
            >
              Create Studyset
            </div>
          </div>
        </div>

        <div class="mt-[30px]">
          <div class="text-[16px] font-medium">Select a Study Set to View</div>
          <div
            class="w-full size-[1px] bg-gradient-to-r from-athAIna-yellow via-athAIna-orange to-athAIna-red mt-[12px]"
          ></div>
        </div>

        <div v-if="!isSuccessful_studyset">
          <div class="text-athAIna-sm font-medium mt-[30px]">
            {{ message_studyset }}
          </div>
        </div>

        <div v-if="isSuccessful_studySetFilterSearch">
          <div class="text-athAIna-sm font-medium mt-[30px]">
            {{ message_studySetFilterSearch }}
          </div>
        </div>

        <div v-if="isSuccessful_studyset">
          <div
            class="grid mt-[60px] mb-[60px] gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div v-for="(s, index) in currentStudySets" :key="index">
              <Studyset_Card
                :title="s.title"
                :description="s.description"
                :subject="getSubjectName(s.subject)"
                :flashcardCount="s.flashcard_count"
                :studySetId="s.id"
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

        <Loading_Modal
          :condition="isSuccessful_studyset"
          :isVisible="isLoading"
          :loadingHeader="'Fetching study sets...'"
          :loadingMessage="'Please wait for a couple of seconds'"
        />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
