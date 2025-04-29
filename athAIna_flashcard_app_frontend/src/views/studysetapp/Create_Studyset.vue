<script setup>
import { ref } from 'vue';
import { watch } from 'vue';
import axios from '@/axios';
import studySetDb from "@/views/studysetapp/dexie.js";
import Success_Message from "@/components/Success_Message.vue";
import {useUserStore} from "../../../stores/userStore.js";
import Subject_Selector from "@/components/Subject_Selector.vue";
import Floating_Dropdown from "@/components/Floating_Dropdown.vue";

const studyset_url = "/studyset/save/";
const field_errors = ref({});
const isSuccessful = ref(false);
const message = ref("");
const title = ref("");
const description = ref("");
const subject = ref({ key: "No subject", value: "Choose a subject" });

const userStore = useUserStore();
const learnerId = userStore.getUserID();

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: "Modal Title"
  }
});

const emit = defineEmits(['close']);
const close = () => {

  title.value = "";
  description.value = "";
  subject.value = { key: "No subject", value: "Choose a subject" };

  message.value = "";
  field_errors.value = {};
  emit('close');
};
const modals = ref({ subjectSelectModal: false });

const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};

const updateSubject = (key, value) => {
  subject.value = { key, value };
  toggleModal('subjectSelectModal');
};

watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    document.title = `${props.title}`;
  } else {
    document.title = `Library – athAIna`;
  }
});

const saveStudySet = async () => {
  try {
    const requestData = {
      learner_instance: Number(learnerId), // Ensure this is an integer
      title: title.value,
      subject: subject.value.key // Ensure this matches the field name in your serializer
    };

    if (description.value !== null && description.value !== '') {
      requestData.description = description.value;
    }

    const request = await axios.post(studyset_url, requestData);

    isSuccessful.value = request.data.successful;
    message.value = request.data.message;

    const newStudySet = {
      id: Number(request.data.data.id),
      learner_instance: Number(learnerId), // remove .value (causing NaN error to studyset
      title: String(request.data.data.title),
      description: String(request.data.data.description),
      subject: String(request.data.data.subject),
      flashcard_count: Number(0),
      created_at: Date(request.data.data.created_at),
      updated_at: Date(request.data.data.updated_at),
    }

    await studySetDb.studysets.add(newStudySet);
    console.log(studySetDb.studysets.get({ id: newStudySet.id }));

    if (isSuccessful.value) {
      close();
    }


  } catch (error) {

    if (error.response.status === 400) {
      isSuccessful.value = error.response.data.successful;
      message.value = error.response.data.message;

      field_errors.value = Object.fromEntries(
          Object.entries(error.response.data.errors).map(([key, value]) => [key, value[0]])
      );
    }
    else {
      isSuccessful.value = false;
      message.value = "An error occurred. Please try again later.";
    }
  }
};
</script>

<template>

  <Success_Message
    :isVisible="isSuccessful"
    :successHeader="'Saving studyset'"
    :successMessage="'Successfully created a study set.'"
    @close="isSuccessful = false"
  />

  <form @submit.prevent="saveStudySet">
    <div v-if="props.isVisible" class="fixed inset-0 flex items-center justify-center bg-athAIna-black bg-opacity-50 z-50">
      <div class="bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red z-50 p-[4px] w-[620px] rounded-[20px] shadow-lg w-96" style="background-color: white !important;">
        <div class="bg-athAIna-white p-[30px] rounded-[15px] flex flex-col">

          <div class="flex justify-end mb-[30px]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" @click="close" class="size-6 hover:cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
          <div class="flex justify-center mb-[30px]">
            <h2 class="font-semibold text-[20px]">Create a Study Set</h2>
          </div>

          <div class="flex flex-col justify-between gap-2 mb-[30px] text-[16px] font-medium">
            <p> Study Set Name </p>
            <input
                type="text"
                placeholder="Name"
                class="border-athAIna-violet border-solid border-[3px] rounded-[20px] placeholder-athAIna-orange text-[14px] p-[5px] pl-[14px]"
                v-model="title"
            />
            <div v-if="field_errors.title" class="text-athAIna-red text-[14px] font-medium">
              {{ field_errors.title }}
            </div>

          </div>

          <div class="flex flex-col justify-between gap-2 mb-[30px] text-[16px] font-medium">
            <p> Subject </p>
            <div class="relative">
              <Subject_Selector
                  @click="toggleModal('subjectSelectModal')"
                  class="relative w-full mb-3"
                  :placeholder="'Choose a subject'"
                  :outerClass="''"
                  :innerClass="'border-athAIna-violet border-solid border-[3px] rounded-[20px] text-[14px] p-[5px] pl-[14px]'"
                  v-model="subject.value"
              />

              <Floating_Dropdown
                  v-if="modals.subjectSelectModal"
                  top="50px"
                  right="0px"
                  height="max-content"
                  width="553px"
                  @update:modelValue="({ key, value }) => updateSubject(key, value)"
              />

            </div>

            <div v-if="field_errors.subject" class="text-athAIna-red text-[14px] font-medium">
              {{ field_errors.subject }}
            </div>
          </div>


          <div class="flex flex-col justify-between gap-2 mb-[25px] text-[16px] font-medium">
            <p> Description </p>
            <textarea
                placeholder="Type Description (Optional)"
                class="focus:outline-none text-athAIna-orange border-athAIna-violet border-solid border-[3px] rounded-[20px] placeholder-athAIna-orange text-[14px] p-[14px] pl-[14px] h-[82px]"
                v-model="description"
            />
            <div v-if="field_errors.description" class="text-athAIna-red text-[14px] font-medium">
              {{ field_errors.description }}
            </div>
          </div>

          <div v-if="!isSuccessful">
            <div class="text-athAIna-red text-[14px] font-medium">
              {{ message }}
            </div>
          </div>

          <div>

          </div>
          <div class="flex justify-end mb-[20px]">
            <button type="submit" class="btn font-medium w-[200px]"> Create Study Set </button>
          </div>
        </div>

      </div>
    </div>
  </form>
</template>

<style scoped>
</style>