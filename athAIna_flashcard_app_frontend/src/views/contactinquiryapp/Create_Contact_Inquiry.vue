<script setup>
import { ref } from "vue";
import axios from "@/axios";
import LoadingModal from "@/components/Loading_Modal.vue";
import SuccessMessage from "@/components/Success_Message.vue";

const formData = ref({
  name: "",
  email: "",
  message: "",
});

const loading = ref(false);
const error = ref(null);
const successMessage = ref(null);

// Field-specific error messages
const fieldErrors = ref({
  name: null,
  email: null,
  message: null,
});

// State for modals
const isLoadingModalVisible = ref(false);
const isSuccessMessageVisible = ref(false);

const submitInquiry = async () => {
  loading.value = true;
  error.value = null;
  successMessage.value = null;

  // Reset field errors
  fieldErrors.value = {
    name: null,
    email: null,
    message: null,
  };

  isLoadingModalVisible.value = true;

  try {
    const response = await axios.post("/contact/", formData.value);
    successMessage.value = response.data.message;
    formData.value = {
      name: "",
      email: "",
      message: "",
    };
    isSuccessMessageVisible.value = true;
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      "An error occurred while submitting your inquiry.";

    // Handle field-specific errors from backend
    if (err.response?.data?.errors) {
      const backendErrors = err.response.data.errors;

      // Map backend errors to field error states
      for (const field in backendErrors) {
        if (
          backendErrors.hasOwnProperty(field) &&
          fieldErrors.value.hasOwnProperty(field)
        ) {
          fieldErrors.value[field] = backendErrors[field][0]; // Get first error message
        }
      }
    }

    console.error("Submission error:", err.response?.data?.errors);
  } finally {
    loading.value = false;
    isLoadingModalVisible.value = false;
  }
};

// Methods to handle modal closing
const closeLoadingModal = () => {
  isLoadingModalVisible.value = false;
};

const closeSuccessMessage = () => {
  isSuccessMessageVisible.value = false;
};
</script>
<template>
  <div class="flex flex-row justify-between min-h-screen">
    <div class="flex flex-col items-center mx-14 mt-8 w-1/2">
      <h1
        class="text-athAIna-violet font-semibold w-full pt-10 pb-6 px-0 text-center text-[24px] flex justify-start"
      >
        SEND INQUIRY
      </h1>

      <!-- Success Message -->
      <!-- <div
          v-if="successMessage"
          class="mb-4 p-4 bg-green-100 text-green-700 rounded-lg w-[700px]"
      >
        {{ successMessage }}
      </div> -->

      <!-- Error Message -->
      <div
        v-if="error"
        class="mb-0 bg-red-100 text-athAIna-red rounded-lg w-full p-3"
      >
        {{ error }}
      </div>

      <!-- Name Field -->
      <div
        class="m-5 my-4 px-2 border-[2.5px] border-athAIna-violet rounded-[20px] h-[40px] w-full relative flex flex-row items-center"
        :class="{ 'border-red-500': fieldErrors.name }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-violet ml-2 mr-3"
          :class="{ 'text-red-500': fieldErrors.name }"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        <input
          v-model="formData.name"
          type="text"
          placeholder="Name"
          class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
        />
      </div>
      <p
        v-if="fieldErrors.name"
        class="mb-0 bg-red-100 text-athAIna-red rounded-lg w-full p-3"
      >
        {{ fieldErrors.name }}
      </p>

      <!-- Email Field -->
      <div
        class="m-5 mb-4 px-2 border-[2.5px] border-athAIna-violet rounded-[20px] h-[40px] w-full relative flex flex-row items-center"
        :class="{ 'border-red-500': fieldErrors.email }"
      >
        <div class="relative flex flex-row items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-5 absolute left-[4px] top-1/2 transform -translate-y-1/2 text-athAIna-violet ml-2 mr-3"
            :class="{
              'text-red-600 font-medium text-xs -mt-3 mb-0 self-start ml-6':
                fieldErrors.email,
            }"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          <input
            v-model="formData.email"
            type="email"
            placeholder="Email"
            class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
          />
        </div>
      </div>
      <p
        v-if="fieldErrors.email"
        class="mb-0 bg-red-100 text-athAIna-red rounded-lg w-full p-3"
      >
        {{ fieldErrors.email }}
      </p>

      <!-- Inquiry Field -->
      <div
        class="m-5 mb-4 px-2 border-[2.5px] border-athAIna-violet rounded-[20px] h-[136px] w-full relative flex flex-row items-center"
        :class="{ 'border-red-500': fieldErrors.message }"
      >
        <div class="relative flex flex-row items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-5 absolute left-1 top-[75px] transform -translate-y-1/2 text-athAIna-violet -mt-12 ml-2 mr-3"
            :class="{ 'text-red-500': fieldErrors.message }"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
          <textarea
            v-model="formData.message"
            placeholder="Inquiry"
            class="text-[14px] py-3 text-athAIna-violet placeholder-athAIna-violet focus:outline-none ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[128px] flex flex-row items-center pl-[50px]"
          ></textarea>
        </div>
      </div>
      <p
        v-if="fieldErrors.message"
        class="mb-0 bg-red-100 text-athAIna-red rounded-lg w-full p-3"
      >
        {{ fieldErrors.message }}
      </p>

      <!-- Submit Button -->
      <div class="flex my-10 justify-center w-full">
        <button
          @click="submitInquiry"
          :disabled="loading"
          class="w-full btn bg-athAIna-violet font-semibold text-athAIna-white py-2 px-4 rounded-full hover:bg-opacity-90 transition-colors duration-200 disabled:bg-opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? "Sending..." : "Send Inquiry" }}
        </button>
      </div>
    </div>

    <!-- Sample Card Display -->
    <div class="ml-0 mr-0 pr-0 flex justify-center w-1/2 mt-16 mb-10">
      <!-- Lowermost Card -->
      <div
        class="mr-12 mt-7 absolute rotate-[-4deg] shadow-md w-[360px] h-[480px] rounded-[15px] bg-gradient-to-br from-athAIna-yellow to-athAIna-red"
      ></div>

      <!-- Middle Card-->
      <div
        class="mr-0 ml-5 mt-3 absolute rotate-[0deg] shadow-md w-[360px] h-[480px] rounded-[15px] bg-gradient-to-br from-athAIna-yellow to-athAIna-red"
      ></div>

      <!-- Topmost Card -->
      <div
        class="absolute ml-20 p-[5px] shadow-md bg-gradient-to-br rounded-[15px] from-athAIna-yellow via-athAIna-orange to-athAIna-red rotate-[4deg] w-[360px] h-[480px]"
      >
        <div
          class="ml-0 rotate-[0deg] w-[350px] h-[470px] rounded-[10px] bg-athAIna-white flex flex-col gap-x-2 justify-center items-center align-middle"
        >
          <span class="p-0 text-[18px] font-semibold"> Contact Us </span>
          <span class="p-0 text-[14px] font-normal items-center align-middle">
            Fill out the form with your inquiry or concern
          </span>
        </div>
      </div>
    </div>

    <LoadingModal
      :loading-header="'Processing Your Inquiry'"
      :loading-message="'Please wait while we submit your inquiry...'"
      :condition="!loading"
      :is-visible="isLoadingModalVisible"
      @close="closeLoadingModal"
    />

    <SuccessMessage
      :success-header="'Inquiry Submitted'"
      :success-message="'Your inquiry has been successfully submitted. We will get back to you soon.'"
      :is-visible="isSuccessMessageVisible"
      @close="closeSuccessMessage"
    />
  </div>
</template>

<style scoped>
/* If you need any scoped styles, add them here */
</style>
