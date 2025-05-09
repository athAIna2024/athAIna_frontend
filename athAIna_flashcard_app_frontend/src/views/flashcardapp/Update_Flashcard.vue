<script setup>
import { useRouter } from "vue-router";
import { useRoute } from 'vue-router';
import { useStudysetStore } from "../../../stores/studySetStore.js";
import { ref } from 'vue';
import axios from '@/axios';
import { onMounted } from 'vue';
import flashcardsDB from "@/views/flashcardapp/dexie.js";
import Success_Message from "@/components/Success_Message.vue";
import  { watch } from "vue";

const route = useRoute();
const router = useRouter();
const store = useStudysetStore();
const studySetName = store.studySetTitle;
const studySetId = store.studySetId;
const flashcardId = route.params.flashcardId;
const flashcard_url = "/flashcard/update/";
const field_errors = ref({});
const isSuccessful = ref(false);
const message = ref("");

const isSuccessful_retrieved = ref(false);
const message_retrieved = ref("");

const question = ref("");
const answer = ref("");
const image = ref("");
const imageName = ref("");
const originalImageUrl = ref("");

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
    imageName.value = file.name;
  }
};

const clearImage = () => {
  const fileInput = document.getElementById('image-upload');
  if (fileInput) {
    fileInput.value = ''; // Clear the file input
  }
  image.value = null;
  imageName.value = null;

};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const showSuccessMessage = ref(false);

const updateFlashcard = async () => {
  const minimumLoadingTime = 1000; // Minimum loading time in milliseconds
  const startTime = Date.now();

  try {


    const formData = new FormData();
    formData.append('studyset_instance', studySetId);
    formData.append('question', question.value);
    formData.append('answer', answer.value);


    if (image.value === null && originalImageUrl.value) {
      formData.append('image', ''); // CANNOT SET NULL VALUE FOR IMAGE FIELD
    }
    else if (image.value && image.value !== originalImageUrl.value) {
      formData.append('image', image.value);
    }

    const response = await axios.patch(`${flashcard_url}${flashcardId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    isSuccessful.value = response.data.successful;
    message.value = response.data.message;


    // console.log(response.data.data.image);

    const updateFlashcard = {
      id: Number(flashcardId),
      question: String(response.data.data.question),
      answer: String(response.data.data.answer),
      image: response.data.data.image,
      updated_at: Date(response.data.data.updated_at),
      studyset_id: studySetId,
    }

    await flashcardsDB.flashcards.update(Number(flashcardId), updateFlashcard);
    if (isSuccessful.value) {
      showSuccessMessage.value = true;
      navigateToLibraryPage();
    }


  } catch (error) {
    if (error.status  === 400) {
      isSuccessful.value = error.response.data.successful;
      message.value = error.response.data.message;

      field_errors.value = Object.fromEntries(
          Object.entries(error.response.data.errors).map(([key, value]) => [key, value[0]])
      );
    }
  } finally {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = minimumLoadingTime - elapsedTime;

    if (remainingTime > 0) {
      await delay(remainingTime);
    }
    showSuccessMessage.value = false;

  }
};

const fetchFlashcardData = async () => {
  try {
    const response = await axios.get(`${flashcard_url}${flashcardId}/`);

    if (response.data.question) {
      question.value = response.data.question;
      answer.value = response.data.answer;
      originalImageUrl.value = response.data.image ? response.data.image : "";
      imageName.value = response.data.image ? response.data.image.split('/').pop() : "";

      isSuccessful_retrieved.value = response.data.successful;
      message_retrieved.value = response.data.message;

    } else {
      isSuccessful_retrieved.value = false;
      message_retrieved.value = "There is no flashcard with the given ID.";
    }
  } catch (error) {
    if (error.response.status === 404) {
      isSuccessful_retrieved.value = false;
      message_retrieved.value = error.response.message;
    } else {
      isSuccessful_retrieved.value = false;
      message_retrieved.value = "An error occurred. Please try again later.";
    }
  }
};

const navigateToLibraryPage = () => {
  showSuccessMessage.value = false;
  setTimeout(() => {
    router.push({
      name: 'Library_Page_Flashcard',
      params: { studySetTitle: studySetName, studySetId: studySetId }
    });
  }, 500); // Delay navigation to match the fade-out duration

  document.body.classList.add('fade-out'); // Add fade-out class

};

onMounted(() => {
  fetchFlashcardData();
});

watch(question, (newValue) => {
  if (newValue.trim() !== "") {
    field_errors.value.question = null;
  }
});

watch(answer, (newValue) => {
  if (newValue.trim() !== "") {
    field_errors.value.answer = null;
  }
});

watch(image, (newValue) => {
  if (newValue) {
    field_errors.value.image = null;
  }
});

</script>
<template>
  <Success_Message
      :isVisible="showSuccessMessage"
      :successHeader="'Updating flashcard'"
      :successMessage="'Successfully updated the flashcard.'"
      @close="showSuccessMessage = false"
  />

  <div class="text-athAIna-violet text-athAIna-lg font-semibold mx-4 my-8">
    <div class="flex flex-row space-x-6 my-2 mx-8 items-center align-middle">
      <button @click="navigateToLibraryPage">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>

      <div class="text-[16px] font-bold">
        Update flashcard for "<span>{{ studySetName}}</span>"
      </div>
    </div>

  </div>
  <form class="mx-12 my-8" @submit.prevent="updateFlashcard" enctype="multipart/form-data">

    <div class="athAIna-border-outer p-1 shadow-xl">
      <div class="athAIna-border-inner py-4">


        <div class="question my-2 pt-10 px-10">
          <div class="flex flex-col gap-4">
            <div class="flex flex-row justify-between">
              <span class="text-athAIna-violet ml-1 font-bold text-[22px]">Question</span>
              <div v-if="!imageName" class="flex flex-row bg-athAIna-violet w-auto px-8 py-2 rounded-full">
                <div class="flex flex-row items-center gap-2 justify-center my-2">

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>

                  <label for="image-upload">
                      <span class="text-athAIna-white text-[14px]">+ Insert Image</span> <input
                          type="file"
                          accept="image/png, image/jpeg"
                          id="image-upload"
                          class="hidden"
                          @change="handleFileUpload"
                      />
                    </label>
                </div>
              </div>
              <div class="flex flex-row bg-athAIna-violet w-auto px-8 py-2 rounded-full" v-if="imageName">
                <div class="flex flex-row items-center gap-2 justify-center my-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <label for="image-upload" class="text-athAIna-white">
                    <span v-if="imageName.length > 50">{{ imageName.substring(0, 25) + "..." }}</span>
                    <span v-else-if="imageName">{{ imageName }}</span>
                  </label>
                  <button @click="clearImage">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                </div>
              </div>
            </div>

            <div v-if="field_errors.image" class="text-athAIna-red text-athAIna-base">{{ field_errors.image }}</div>

            <div class="athAIna-border-outer p-1 mb-2 mt-3">
              <div class="athAIna-border-inner py-1">
                      <textarea
                          class="w-full rounded-lg p-4 border-0 text-athAIna-base text-athAIna-violet placeholder-athAIna-violet focus:outline-none"
                          rows="5"
                          placeholder="Write your question here."
                          v-model="question"
                      ></textarea>
              </div>
            </div>
            <div v-if="field_errors.question" class="text-athAIna-red text-athAIna-base mb-4">{{ field_errors.question }}</div>

          </div>
        </div>



        <div class="w-auto mx-10 mt-11 size-[3px] bg-gradient-to-r from-athAIna-yellow via-athAIna-orange to-athAIna-red my-6"></div>

        <div class="answer mx-10 my-2 mb-12">
          <div class="flex flex-col gap-4">
            <span class="text-athAIna-violet ml-1 mt-2 font-bold text-[22px]">Answer</span>
            <div class="athAIna-border-outer p-1 mb-4">
              <div class="athAIna-border-inner py-1">
                    <textarea
                        class="w-full rounded-lg p-4 border-0 text-athAIna-base text-athAIna-violet placeholder-athAIna-violet focus:outline-none"
                        rows="2"
                        placeholder="Write your answer here."
                        v-model="answer"
                    ></textarea>
              </div>
            </div>
          </div>
          <div v-if="field_errors.answer" class="text-athAIna-red text-athAIna-base">{{ field_errors.answer }}</div>

        </div>

      </div>


    </div>
    <div class="flex flex-row space-x-6 justify-end">

      <div class="athAIna-border-outer p-1 mt-10 mx-2 w-32 rounded-full">
        <button @click="(event) => { event.preventDefault(); navigateToLibraryPage(); }" class="athAIna-border-inner rounded-full"> Cancel </button>
      </div>
      <button class="btn mt-10 mx-2 w-32" type="submit"> Update </button>
    </div>
  </form>
</template>

<style scoped>
.fade-out {
  opacity: 0;
  transition: opacity 0.5s ease-out;
}
</style>