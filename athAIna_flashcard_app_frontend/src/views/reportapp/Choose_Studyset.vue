<script setup>

import { ref } from "vue";
import { onMounted } from "vue";
import Subject_Selector from "@/components/Subject_Selector.vue";
import Test_Mode_Number_Of_Questions_Prompt from "@/components/Test_Mode_Number_Of_Questions_Prompt.vue";
import Floating_Dropdown_Studysets from "@/components/Floating_Dropdown_Studysets.vue";
import studySetDb from "@/views/studysetapp/dexie.js";
import { useStudysetStore} from "../../../stores/studySetStore.js";

const props = defineProps({
  isVisible: Boolean,
});

const studySetStore = useStudysetStore();
const studySetId = studySetStore.studySetId;
const studySetTitle = studySetStore.studySetTitle;

// Related to studysets dropdown
const studySetSelected = ref({ id: null, title: null});
const modals = ref({
  studySetSelectModal: false,
})
const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};

const studySets = ref({});
const addStudySet = (id, title) => {
  studySets.value[id] = title;
};
const fetchStudySets = async () => {
  try {
    const studySetsArray = await studySetDb.studysets.toArray();
    studySetsArray.forEach((studySet) => {
      addStudySet(studySet.id, studySet.title);
    });
  } catch (error) {
    console.error('Error fetching study sets:', error);
  }
};
const updateStudySet = (id, title) => {
  studySetSelected.value = { id, title };
  toggleModal('studySetSelectModal');
};
// end of related to studysets dropdown

const isNoOfQuestionsVisible = ref(false);

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
  studySetStore.setStudySetId(studySetSelected.value.id);
  studySetStore.setStudySetTitle(studySetSelected.value.title);
  isNoOfQuestionsVisible.value = true;
};

onMounted(() => {
  fetchStudySets();
});

</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40">
    <div class="athAIna-border-outer p-1 flex flex-col w-[400px]">
      <div class="athAIna-border-inner p-7 flex flex-col">

        <!-- Close Button -->
        <div class="flex justify-end">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
               class="size-6 hover:cursor-pointer" @click="close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>

        <!-- Heading -->
        <p class="font-semibold text-[20px] mb-8"> Choose a study set </p>

        <!-- Subject Field -->
        <div class="mb-8">
          <div class="mb-3 font-medium">Study Set</div>

          <div :class="modals.studySetSelectModal ? 'h-[200px]' : 'h-[50px]'" class="relative">
            <Subject_Selector
                :placeholder="'Choose Study Set'"
                @click="toggleModal('studySetSelectModal')"
                class="relative w-auto mb-3"
                :innerClass="'athAIna-border-inner'"
                :outerClass="'athAIna-border-outer'"
                v-model="studySetSelected.title"

            />
            <Floating_Dropdown_Studysets v-if="modals.studySetSelectModal"
                                         :items="studySets"
                                         top="50px"
                                         right="0px"
                                         height="max-content"
                                         class="w-full"
                                         @update:modelValue="({ key, value }) => updateStudySet(key, value)"
            />
          </div>
        </div>

        <!-- Take Test Button -->
        <div class="flex justify-center mb-4">
          <div class="btn font-semibold hover:cursor-pointer" @click="close">Next</div>
        </div>

      </div>
    </div>
  </div>

  <Test_Mode_Number_Of_Questions_Prompt
      :isVisible="isNoOfQuestionsVisible"
      @close="isNoOfQuestionsVisible = false"
  />
</template>

<style scoped>

</style>