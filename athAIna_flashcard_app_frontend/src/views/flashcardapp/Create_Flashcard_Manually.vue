<script setup>
import {useRoute} from "vue-router";
import { useStudysetStore} from "../../../stores/studySetStore.js";
import { ref } from 'vue';
import axios from '@/axios';

const route = useRoute();
const store = useStudysetStore();
const studySetName = store.studySetTitle
const studySetId = store.studySetId;
const flashcard_url = "/flashcard/save/";
const field_errors = ref({});
const isSuccessful = ref(false);
const message = ref("");

const question = ref("");
const answer = ref("");
const image = ref("");
const imageName = ref("");

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
    imageName.value = file.name;
  }
};

const saveFlashcard = async () => {
  try {
    const formData = new FormData();
    formData.append('studyset_instance', studySetId);
    formData.append('question', question.value);
    formData.append('answer', answer.value);
    if (image.value) {
      formData.append('image', image.value);
    }

    const request = await axios.post(flashcard_url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    isSuccessful.value = request.data.successful;
    message.value = request.data.message;

  } catch (error) {
    if (error.response.status === 400) {
      isSuccessful.value = error.response.data.successful;
      message.value = error.response.data.message;

      field_errors.value = Object.fromEntries(
          Object.entries(error.response.data.errors).map(([key, value]) => [key, value[0]])
      );
    }
  }
};
</script>

<template>
  <div class="text-athAIna-violet text-athAIna-lg font-semibold mx-4 my-8">
    <div class="flex flex-row space-x-6 my-2 mx-8 items-center">
      <router-link :to="{ name: 'Library_Page_Flashcard', params: { studySetTitle: studySetName, studySetId: studySetId } }">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </router-link>

      <div>
        Create flashcard for "<span>{{ studySetName}}</span>"
      </div>
    </div>

  </div>
  <form class="mx-12 my-8" @submit.prevent="saveFlashcard" enctype="multipart/form-data">

      <div class="athAIna-border-outer p-1 shadow-xl">
        <div class="athAIna-border-inner py-4">


          <div class="question mx-16 my-2">
            <div class="border-athAIna-violet border-2 rounded-lg p-4 w-full">
              <div class="flex flex-col gap-4">

                <span class="text-athAIna-base text-athAIna-violet ml-1">Question</span>
                  <div class="athAIna-border-outer p-1 mb-4">
                    <div class="athAIna-border-inner py-1">
                      <textarea
                          class="w-full rounded-lg p-4 border-0 text-athAIna-base text-athAIna-violet placeholder-athAIna-orange focus:outline-none"
                          rows="5"
                          placeholder="Write your question here."
                          v-model="question"
                      ></textarea>
                    </div>
                  </div>
                  <div v-if="field_errors.question" class="text-athAIna-red text-athAIna-base">{{ field_errors.question }}</div>

                <label for="image-upload">

                  <div class="athAIna-border-outer p-1 mb-4">
                    <div class="athAIna-border-inner py-1">

                      <div class="flex flex-row items-center gap-2 justify-center my-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>

                        <span v-if="imageName">{{ imageName }}</span>
                        <span v-else class="text-athAIna-base">+ Insert Image</span>

                      </div>

                      <input
                          type="file"
                          accept="image/png, image/jpeg"
                          id="image-upload"
                          class="hidden"
                          @change="handleFileUpload"
                      />
                    </div>
                  </div>
                </label>
                <div v-if="field_errors.image" class="text-athAIna-red text-athAIna-base">{{ field_errors.image }}</div>

              </div>

            </div>
          </div>

          <div class="w-full size-[2px] bg-gradient-to-r from-athAIna-yellow via-athAIna-orange to-athAIna-red my-6"></div>


          <div class="answer mx-16 my-2">
            <div class="border-athAIna-violet border-2 rounded-lg p-4 w-full">
              <div class="flex flex-col gap-4">
                <span class="text-athAIna-base text-athAIna-violet ml-1">Answer</span>
                <div class="athAIna-border-outer p-1 mb-4">
                  <div class="athAIna-border-inner py-1">
                    <textarea
                        class="w-full rounded-lg p-4 border-0 text-athAIna-base text-athAIna-violet placeholder-athAIna-orange focus:outline-none"
                        rows="2"
                        placeholder="Write your answer here."
                        v-model="answer"
                    ></textarea>
                  </div>
                </div>
                <div v-if="field_errors.answer" class="text-athAIna-red text-athAIna-base">{{ field_errors.answer }}</div>

              </div>

            </div>
          </div>
          </div>


      </div>
    <div class="flex flex-row space-x-6 justify-end">

      <div class="athAIna-border-outer p-1 mt-10 mx-2 w-32 rounded-full">
        <router-link :to="{ name: 'Library_Page_Flashcard', params: { studySetTitle: studySetName, studySetId: studySetId } }">
          <button class="athAIna-border-inner rounded-full"> Cancel </button>
        </router-link>
      </div>
      <button class="btn mt-10 mx-2" type="submit"> Submit </button>
    </div>
  </form>
</template>

<style scoped>
</style>