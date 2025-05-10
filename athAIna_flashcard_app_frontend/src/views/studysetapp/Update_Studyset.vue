<script setup>
import { ref } from 'vue';
import { watch }  from 'vue';
import { dropdownOptions} from "@/components/constants/SubjectDropDownOptions.js";
import axios from '@/axios';
import studySetDb from "@/views/studysetapp/dexie.js";
import Floating_Dropdown from "@/components/Floating_Dropdown.vue";
import Subject_Selector from "@/components/Subject_Selector.vue";
import Success_Message from "@/components/Success_Message.vue";

const studyset_url = "/studyset/update/";

const field_errors = ref({});

const title = ref("");
const description = ref("");
const subject = ref({});
const previousSubject = ref({});

const isSuccessful_retrieved = ref(false);
const message_retrieved = ref("");

const isSuccessful_updated = ref(false);
const message_updated = ref("");

const showSuccessMessage = ref(false);


const modals = ref({ subjectSelectModal: false });

const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};
const updateSubject = (key, value) => {
  subject.value = { key, value };
  toggleModal('subjectSelectModal');
};


const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: "Modal Title"
  },
  studySetId: {
    type: Number,
    required: true
  }
});

const clearSubjectSelected = () => {
  subject.value = {};
};

const emit = defineEmits(['close', 'refreshLibrary']);
const close = () => {

  message_updated.value = "";
  field_errors.value = {};

  emit('close');
};

const refreshLibrary = () => {
  emit('refreshLibrary');
};


watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    fetchStudySetData();
    document.title = `${props.title}`;
  } else {
    document.title = `Library – athAIna`;
  }
});

const fetchStudySetData = async () => {
  try {
    const response = await axios.get(`${studyset_url}${props.studySetId}/`);

    if (response.data.title) {
      title.value = response.data.title;
      description.value = response.data.description;

      const subjectKey = response.data.subject;
      previousSubject.value = { key: subjectKey, value: dropdownOptions[subjectKey] };
      subject.value = {...previousSubject.value};

      isSuccessful_retrieved.value = response.data.successful;
      message_retrieved.value = response.data.message;

    } else {
      isSuccessful_retrieved.value = false;
      message_retrieved.value = "There is no study set with the provided ID.";
    }

  } catch (error) {
    if (error.response.status === 400) {
      isSuccessful_retrieved.value = false;
      message_retrieved.value = error.response.message;

    } else {
      isSuccessful_retrieved.value = false;
      message_retrieved.value = "An error occurred. Please try again later.";
    }
  }
};

const updateStudySet = async () => {
  try {
    const requestData = {
      title: title.value,
      subject: subject.value.key,
    };

    if (description.value !== null && description.value !== '') {
      requestData.description = description.value;
    }

    const request = await axios.put(`${studyset_url}${props.studySetId}/`, requestData);

    isSuccessful_updated.value = request.data.successful;
    message_updated.value = request.data.message;

    // console.log(request.data);


    const updateStudySet = {
      id: Number(request.data.data.id),
      title: String(request.data.data.title),
      description: request.data.data.description === null ? "" : String(request.data.data.description),
      subject: String(request.data.data.subject),
      updated_at: Date(request.data.data.updated_at),
    };

    await studySetDb.studysets.update(props.studySetId, updateStudySet);

    if (isSuccessful_updated.value) {
      showSuccessMessage.value = true;
      refreshLibrary();
      close();
    }


  } catch (error) {

    if (error.response.status === 400) {

      isSuccessful_updated.value = error.response.data.successful;
      message_updated.value = error.response.data.message;

      field_errors.value = Object.fromEntries(
        Object.entries(error.response.data.errors).map(([key, value]) => [key, value[0]])
      );
    }
    else {
      isSuccessful_updated.value = false;
      message_updated.value = "An error occurred. Please try again later .";
    }
  }
};

watch(() => title.value, (newValue) => {
  if (newValue.trim() !== "") {
    field_errors.value.title = ""; // Clear the error
  }
  message_updated.value = ""; // Always reset the message
});

watch(() => subject.value, (newValue) => {
  if (newValue?.key) {
    field_errors.value.subject = ""; // Clear the error
  }
  message_updated.value = ""; // Always reset the message
});

watch(() => description.value, (newValue) => {
  if (newValue.trim() !== "") {
    field_errors.value.description = ""; // Clear the error
  }
  message_updated.value = ""; // Always reset the message
});
</script>

<template>

  <Success_Message
      :isVisible="showSuccessMessage"
      :successHeader="'Updating studyset'"
      :successMessage="'Successfully updated the study set.'"
      @close="showSuccessMessage = false"
  />

  <form @submit.prevent="updateStudySet">
    <div v-if="props.isVisible" class="fixed inset-0 flex items-center justify-center bg-athAIna-black bg-opacity-50 z-50">
      <div class="bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red z-50 p-[4px] w-[620px] rounded-[20px] shadow-lg w-96" style="background-color: white !important;">
        <div class="bg-athAIna-white p-[30px] rounded-[15px] flex flex-col">
          <div class="flex justify-end mb-[30px]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" @click="close" class="size-6 hover:cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
          <div class="flex justify-center mb-[30px]">
            <h2 class="font-semibold text-[20px]">Update Study Set</h2>
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
                    @cancel="clearSubjectSelected"
                    class="relative w-full"
                    :placeholder="'Choose Subject'"
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

          <div v-if="!isSuccessful_updated">
            <div class="text-athAIna-red text-[14px] font-medium">
              {{ message_updated }}
            </div>
          </div>

          <div class="flex justify-end mb-[20px]">
            <button type="submit" class="btn font-medium w-[200px]"> Update Study Set </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
</style>