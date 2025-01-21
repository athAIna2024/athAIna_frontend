<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import axios from '@/axios';

const studyset_url = "/studyset/save/";
const field_errors = ref({});
const isSuccessful = ref(false);
const title = ref("");
const description = ref("");
const subject = ref("");
const learnerId = ref(1); // For testing purposes, REMOVE IT AND USE THE USER ID

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
  emit('close');
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
    const response = await axios.post(studyset_url, {
      learner_instance: Number(learnerId.value), // Ensure this is an integer
      title: title.value,
      description: description.value,
      subject: subject.value // Ensure this matches the field name in your serializer
    });

    isSuccessful.value = response.data.successful;
    // Handle successful response
  } catch (error) {
    isSuccessful.value = error.response.data.successful;

    if (error.response.status === 400) {

      field_errors.value = Object.fromEntries(
          Object.entries(error.response.data.errors).map(([key, value]) => [key, value[0]])
      );
    }
    else {
      field_errors.value['message'] = "An error occurred. Please try again later.";
    }
  }
};
</script>

<template>
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
            <div class="flex justify-end border-athAIna-violet border-[3px] rounded-[20px] p-[5px] pr-[14px]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-[20px] hover:cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            TEMPORARY INPUT FOR NOW UNTIL WE HAVE A SUBJECT SELECTOR
            <input
                type="text"
                placeholder="Subject"
                class="border-athAIna-violet border-solid border-[3px] rounded-[20px] placeholder-athAIna-orange text-[14px] p-[5px] pl-[14px]"
                v-model="subject" />

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

          <div v-if="!isSuccessful" class="text-athAIna-red text-[14px] font-medium">
            {{ field_errors.message }}
          </div>

          <div v-else>
            <div class="text-athAIna-green text-[14px] font-medium">
              Study Set created successfully
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