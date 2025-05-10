<script setup>
import { ref } from "vue";
import axios from "@/axios";
import Loading_Modal from "@/components/Loading_Modal.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const error = ref("");
const isSubmitting = ref(false);
const isLoading = ref(false);

const goBackToLogin = () => {
  router.push({
    name: "Login",
  });
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sendResetEmail = async () => {
  error.value = "";
  isSubmitting.value = true;
  isLoading.value = true;

  // Validate email
  if (!email.value) {
    error.value = "Email is required";
    isSubmitting.value = false;
    isLoading.value = false;
    return;
  }

  if (!validateEmail(email.value)) {
    error.value = "Please enter a valid email address";
    isSubmitting.value = false;
    isLoading.value = false;
    return;
  }

  try {
    const response = await axios.post(
      "/account/change-password-request/",
      { email: email.value },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.successful) {
      // Route to OTP page instead of showing modal
      router.push({
        name: "Forgot_OTP",
        query: { email: email.value },
      });
    } else {
      error.value = response.data.message || "Failed to send reset email";
    }
  } catch (err) {
    console.error("Error:", err);
    error.value =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Error sending reset email. Please try again later.";
  } finally {
    isSubmitting.value = false;
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="flex flex-row min-h-screen mt-6 mb-12 items-center justify-center content-center text-center bg-center"
  >
    <!-- Right Card -->
    <div
      class="mt-8 ml-10 rotate-[-12deg] shadow-md w-[400px] h-[550px] rounded-lg bg-gradient-to-br from-athAIna-yellow to-athAIna-red"
    ></div>

    <!-- Left Card -->
    <div
      class="mt-16 mr-12 rotate-[15deg] shadow-md w-[400px] h-[500px] rounded-lg bg-gradient-to-bl from-athAIna-yellow to-athAIna-red"
    ></div>

    <!-- Middle Card -->
    <div
      class="absolute bg-gradient-to-b rounded-[15px] from-athAIna-yellow via-athAIna-orange to-athAIna-red w-[450px] h-[600px] bg-athAIna-white flex flex-col p-[5px]"
    >
      <div
        class="absolute m-0 w-[440px] h-[590px] rounded-[10px] bg-athAIna-white flex flex-col p-10"
      >
        <!-- Back button -->
        <div class="absolute top-8 left-8 z-10">
          <button
            @click="goBackToLogin"
            class="flex items-center text-athAIna-violet hover:text-athAIna-red transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6 mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <span class="font-medium">Back to Log in</span>
          </button>
        </div>

        <!-- Logo -->
        <div class="mt-5 w-auto flex flex-row justify-center items-center">
          <img
            src="@/assets/athAIna.svg"
            alt="Logo"
            class="w-[185px] h-[111px] mb-3"
          />
        </div>

        <!-- Title -->
        <h1
          class="text-athAIna-violet font-semibold text-lg w-full text-center mb-5"
        >
          Forgot Password Email Verification
        </h1>

        <!-- Content Container -->
        <div class="mt-8 w-full">
          <!-- Error Message -->
          <div v-if="error" class="text-athAIna-red text-center mt-2 mb-3">
            {{ error }}
          </div>

          <!-- Email Field -->
          <div
            class="m-2 mb-5 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-auto"
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
                v-model="email"
                type="email"
                placeholder="Email"
                :disabled="isSubmitting"
                class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus:outline-none ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
                @keyup.enter="!isSubmitting && sendResetEmail()"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex mt-8 justify-center w-auto">
            <button
              @click="sendResetEmail"
              class="btn w-full"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Reset Email</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading Modal -->
      <Loading_Modal
        :loadingMessage="'Please wait while we send the reset email'"
        :loadingHeader="'Processing...'"
        :isVisible="isLoading"
        :condition="!isLoading"
      />
    </div>
  </div>
</template>
