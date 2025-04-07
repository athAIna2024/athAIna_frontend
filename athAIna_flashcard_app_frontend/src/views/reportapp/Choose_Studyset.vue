<script setup>
import {defineEmits, defineProps, ref} from "vue";
import Floating_Dropdown from "@/components/Floating_Dropdown.vue";
import Filter_Bar_Studyset from "@/components/Filter_Bar_Studyset.vue";
import Subject_Selector from "@/components/Subject_Selector.vue";
import { dropdownOptions} from "@/components/constants/SubjectDropDownOptions.js";
import Test_Mode_Number_Of_Questions_Prompt from "@/components/Test_Mode_Number_Of_Questions_Prompt.vue";

const props = defineProps({
  isVisible: Boolean,
});

const subject = ref("");
const modals = ref({ subjectSelectModal: false });
const updateSubject = (value) => {
  subject.value = value;
  toggleModal('subjectSelectModal');
};
const isNoOfQuestionsVisible = ref(false);

const emit = defineEmits(["close", "update:modelValue"]);

const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};

const close = () => {
  emit("close");
  isNoOfQuestionsVisible.value = true;
};
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
          <div class="mb-3 font-medium">Subject</div>

          <div :class="modals.subjectSelectModal ? 'h-[200px]' : 'h-[50px]'" class="relative">
            <Subject_Selector
                @click="toggleModal('subjectSelectModal')"
                class="relative w-auto mb-3"
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
                class="w-full"
                @update:modelValue="updateSubject"
            >
            </Filter_Bar_Studyset>
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