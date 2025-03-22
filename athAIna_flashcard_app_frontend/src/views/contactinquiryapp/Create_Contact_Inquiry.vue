<script setup>
import { ref } from "vue";
import axios from "@/axios";

const formData = ref({
  name: "",
  email: "",
  message: "",
});

const loading = ref(false);
const error = ref(null);
const successMessage = ref(null);

const submitInquiry = async () => {
  loading.value = true;
  error.value = null;
  successMessage.value = null;

  try {
    const response = await axios.post(
        "http://localhost:8000/contact/",
        formData.value
    );
    successMessage.value = response.data.message;
    formData.value = {
      name: "",
      email: "",
      message: "",
    };
  } catch (err) {
    error.value =
        err.response?.data?.message ||
        "An error occurred while submitting your inquiry.";
    console.error("Submission error:", err.response?.data?.errors);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-row justify-between min-h-screen">
    <div class="flex flex-col items-center mx-10 justify-center">
      <h1 class="text-athAIna-violet font-semibold w-full p-10 text-center lg:text-left">
        Welcome Back!
      </h1>

      <!-- Success Message -->
      <div
          v-if="successMessage"
          class="mb-4 p-4 bg-green-100 text-green-700 rounded-lg w-[700px]"
      >
        {{ successMessage }}
      </div>

      <!-- Error Message -->
      <div
          v-if="error"
          class="mb-4 p-4 bg-red-100 text-red-700 rounded-lg w-[700px]"
      >
        {{ error }}
      </div>

      <div
          class="m-10 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-full md:w-[700px]"
      >
        <div class="relative flex flex-row items-center">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-violet ml-2 mr-3"
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
      </div>

      <div
          class="m-5 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-[700px]"
      >
        <div class="relative flex flex-row items-center">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-violet ml-2 mr-3"
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

      <div
          class="m-5 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[136px] w-[700px]"
      >
        <div class="relative flex flex-row items-center">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-violet -mt-12 ml-2 mr-3"
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
              class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus:outline-none ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[128px] flex flex-row items-center pl-[50px]"
          ></textarea>
        </div>

        <div class="flex my-10 justify-center">
          <button
              @click="submitInquiry"
              :disabled="loading"
              class="w-full bg-athAIna-violet text-athAIna-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:bg-opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? "Sending..." : "Send Inquiry" }}
          </button>
        </div>
      </div>
    </div>

    <div class="invisible 2xl:visible items-center flex justify-center mr-96">
      <div
          class="absolute rotate-[12deg] shadow-md w-[450px] h-[600px] rounded-lg bg-gradient-to-br from-athAIna-red to-athAIna-yellow"
      ></div>
      <div
          class="absolute rotate-[6deg] shadow-md w-[450px] h-[600px] rounded-lg bg-gradient-to-br from-athAIna-red to-athAIna-yellow"
      ></div>
      <div
          class="absolute w-[450px] h-[600px] rounded-lg border-4 bg-athAIna-white flex"
      >
        <span class="absolute p-8 text-center font-semibold">
          Contact Us <br /><br />
          <span class="font-normal">
            Fill out the form with your inquiry or concern
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* If you need any scoped styles, add them here */
</style>
