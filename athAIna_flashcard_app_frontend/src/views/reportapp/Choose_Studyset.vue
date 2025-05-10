<script setup>
import { ref } from "vue";
import { watch } from "vue";
import { useRouter } from "vue-router";
import Subject_Selector from "@/components/Subject_Selector.vue";
import Test_Mode_Number_Of_Questions_Prompt from "@/components/Test_Mode_Number_Of_Questions_Prompt.vue";
import Floating_Dropdown_Studysets from "@/components/Floating_Dropdown_Studysets.vue";
import studySetDb from "@/views/studysetapp/dexie.js";
import { useStudysetStore } from "../../../stores/studySetStore.js";
import Warning_Message from "@/components/Warning_Message.vue";
import flashcardsDB from "@/views/flashcardapp/dexie.js";
import axios from "@/axios";
import {  useUserStore } from "../../../stores/userStore.js";

const studyset_url = "/studyset/";
const flashcard_url = "/flashcard/";
const userStore = useUserStore();
const learnerId = userStore.getUserID();
const studySet_result = ref([]);


const props = defineProps({
  isVisible: Boolean,
});

const router = useRouter();

const refreshTest_Mode = () => {
  router.go();
};

const studySetStore = useStudysetStore();
const flashcardsCount = ref(0);

const studySetSelected = ref({ id: null, title: null });
const modals = ref({
  studySetSelectModal: false,
});
const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};

const studySets = ref({});
const addStudySet = (id, title) => {
  studySets.value[id] = title;
};


const fetchFlashcardCountFromAPI = async (studysetId) => {
  try {
    const response = await axios.get(flashcard_url, {
      params: { studyset_id: studysetId },
    });
    if (response.data && Array.isArray(response.data.data)) {

      const flashcard_result = response.data.data.map(flashcard => {
        return {
          id: Number(flashcard.id),
          question: String(flashcard.question),
          answer: String(flashcard.answer),
          image: String(flashcard.image),
          studyset_id: Number(flashcard.studyset_instance),
          created_at: Date(flashcard.created_at),
          updated_at: Date(flashcard.updated_at),
          is_ai_generated: Boolean(flashcard.is_ai_generated),
        };
      });


      const serializableFlashcards = flashcard_result.map(flashcard => {
        return {
          id: flashcard.id,
          question: flashcard.question,
          answer: flashcard.answer,
          image: flashcard.image,
          studyset_id: flashcard.studyset_id,
          created_at: flashcard.created_at,
          updated_at: flashcard.updated_at,
          is_ai_generated: flashcard.is_ai_generated,
        };
      });

      await flashcardsDB.flashcards.bulkPut(serializableFlashcards);

      return response.data.data.length;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error fetching flashcard count:", error);
    return 0;
  }
};

const fetchStudySetFromAPI = async () => {
  try {
    // API Call
    const response = await axios.get(studyset_url, {
      params: { user_id: Number(learnerId) },
    });

    if (response.data && Array.isArray(response.data.data)) {
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
            studyset.flashcard_count = await fetchFlashcardCountFromAPI(studyset.id);
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
      studySet_result.value = [];
    }
    return studySet_result;
  } catch (error) {
    studySet_result.value = [];
    return studySet_result;
  }
};


const fetchStudySets = async () => {
  try {
    await fetchStudySetFromAPI();

    const studySetsArray = await studySetDb.studysets.toArray();
    studySetsArray.forEach((studySet) => {
      addStudySet(studySet.id, studySet.title);
    });
  } catch (error) {
    console.error("Error fetching study sets:", error);
  }
};
const updateStudySet = (id, title) => {
  studySetSelected.value = { id, title };
  toggleModal("studySetSelectModal");
};

const isNoOfQuestionsVisible = ref(false);

const emit = defineEmits(["close"]);

const fetchFlashcardCount = async () => {
  const flashcardsArray = await flashcardsDB.flashcards
      .where("studyset_id")
      .equals(Number(studySetSelected.value.id))
      .toArray();
  flashcardsCount.value = flashcardsArray.length;
};

const close = async () => {
  emit("close");
  studySetStore.setStudySetId(studySetSelected.value.id);
  studySetStore.setStudySetTitle(studySetSelected.value.title);

  await fetchFlashcardCount();

  if (flashcardsCount.value === 0) {
    isWarningVisible.value = true;
  } else {
    isNoOfQuestionsVisible.value = true;
  }
};


const isWarningVisible = ref(false);

const closeWarning = () => {
  isWarningVisible.value = false;
};


watch(() => props.isVisible, async (newVal) => {
  if (newVal) {
    await fetchStudySets();
  }
});
</script>

<template>
  <Warning_Message
    :warningHeader="'Oops! No questions available yet'"
    :warningMessage="`Create flashcards in ${studySetStore.getStudySetTitle()} to take a test.`"
    :isVisible="isWarningVisible"
    @close="closeWarning"
  />

  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40"
  >
    <div class="athAIna-border-outer p-1 flex flex-col w-[400px]">
      <div class="athAIna-border-inner p-7 flex flex-col">
        <!-- Close Button -->
        <div class="flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 hover:cursor-pointer"
            @click="close"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>

        <!-- Heading -->
        <p class="font-semibold text-[20px] mb-8">Choose a study set</p>

        <!-- Subject Field -->
        <div class="mb-8">
          <div class="mb-3 font-medium">Study Set</div>

          <div
            :class="modals.studySetSelectModal ? 'h-[200px]' : 'h-[50px]'"
            class="relative"
          >
            <Subject_Selector
              :placeholder="'Choose Study Set'"
              @click="toggleModal('studySetSelectModal')"
              class="relative w-auto mb-3"
              :innerClass="'athAIna-border-inner'"
              :outerClass="'athAIna-border-outer'"
              v-model="studySetSelected.title"
            />
            <Floating_Dropdown_Studysets
              v-if="modals.studySetSelectModal"
              :items="studySets"
              top="50px"
              right="0px"
              height="max-content"
              class="w-full"
              @update:modelValue="
                ({ key, value }) => updateStudySet(key, value)
              "
            />
          </div>
        </div>

        <!-- Take Test Button -->
        <div class="flex justify-center mb-4">
          <div class="btn font-semibold hover:cursor-pointer" @click="close">
            Next
          </div>
        </div>
      </div>
    </div>
  </div>

  <Test_Mode_Number_Of_Questions_Prompt
    :isVisible="isNoOfQuestionsVisible"
    @close="isNoOfQuestionsVisible = false"
    @refresh="refreshTest_Mode"
  />
</template>

<style scoped></style>
