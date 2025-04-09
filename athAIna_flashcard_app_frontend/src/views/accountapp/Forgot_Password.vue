<script setup>
import { ref } from "vue";
import axios from "@/axios"; // Make sure this is your configured axios instance
import OTP from "@/views/accountapp/Forgot_OTP.vue";
import Loading_Modal from "@/components/Loading_Modal.vue"; // Import the Loading_Modal component
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const error = ref("");
const success = ref("");
const isOTPVisible = ref(false);
const isSubmitting = ref(false);
const isLoading = ref(false); // State for loading modal

// Store email in OTP component
const storedEmail = ref("");

const goBackToLogin = () => {
  router.push("/login");
};

const openOTP = () => {
  storedEmail.value = email.value; // Store email for OTP component
  isOTPVisible.value = true;
};

const closeOTP = () => {
  isOTPVisible.value = false;
  // Optionally reset the form after OTP verification is cancelled
  if (!success.value) {
    email.value = "";
    error.value = "";
    success.value = "";
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sendResetEmail = async () => {
  error.value = "";
  success.value = "";
  isSubmitting.value = true;
  isLoading.value = true; // Show loading modal

  // Validate email
  if (!email.value) {
    error.value = "Email is required";
    isSubmitting.value = false;
    isLoading.value = false; // Hide loading modal
    return;
  }

  if (!validateEmail(email.value)) {
    error.value = "Please enter a valid email address";
    isSubmitting.value = false;
    isLoading.value = false; // Hide loading modal
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
      success.value =
        response.data.message ||
        "Password reset instructions sent to your email";
      openOTP(); // Show OTP component on success
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
    isLoading.value = false; // Hide loading modal on completion
  }
};

// Handle successful OTP verification
const handleOTPSuccess = () => {
  success.value = "Email verified successfully";
  // The OTP component will handle the navigation to the password reset page
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
        <div class="mt-5 w-auto flex flex-row justify-center items-center">
          <img
              src="@/assets/athAIna.svg"
              alt="Logo"
              class="w-[185px] h-[111px] mb-3"
          />
        </div>
        <h1
            class="text-athAIna-violet font-semibold text-lg w-full text-center">
        Forgot Password Email Verification
      </h1>

      <div
        class="m-2 mt-16 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-full"
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
            :disabled="isSubmitting || isOTPVisible"
            class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus:outline-none ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
            @keyup.enter="!isSubmitting && !isOTPVisible && sendResetEmail()"
          />
        </div>
      </div>

      <!-- Error/Success Messages -->
      <div class="h-10">
        <div v-if="error" class="text-athAIna-red text-center p-6 rounded">
          {{ error }}
        </div>
        <div v-if="success" class="text-green-500 text-center p-6 rounded">
          {{ success }}
        </div>
      </div>

      <div class="flex m-10 justify-center">
        <button
          @click="sendResetEmail"
          class="btn w-full"
          :disabled="isSubmitting || isOTPVisible"
        >
          <span v-if="isSubmitting">Sending...</span>
          <span v-else>Send Reset Email</span>
        </button>
      </div>
    </div>
    </div>
  </div>

  <!-- Use the Loading_Modal component -->
  <Loading_Modal
    :loadingMessage="'Please wait while we send the reset email'"
    :loadingHeader="'Processing...'"
    :isVisible="isLoading"
    :condition="!isLoading"
  />

  <!-- OTP Component -->
  <OTP
    :is-visible="isOTPVisible"
    :email="storedEmail"
    title="OTP Verification"
    @close="closeOTP"
    @verification-success="handleOTPSuccess"
  />
</template>
