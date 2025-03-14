<script setup>
import { ref } from "vue";
import axios from "@/axios"; // Make sure this is your configured axios instance
import OTP from "@/views/accountapp/Change_OTP.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const error = ref("");
const success = ref("");
const isOTPVisible = ref(false);
const isSubmitting = ref(false);

// Store email in OTP component
const storedEmail = ref("");

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

  // Validate email
  if (!email.value) {
    error.value = "Email is required";
    isSubmitting.value = false;
    return;
  }

  if (!validateEmail(email.value)) {
    error.value = "Please enter a valid email address";
    isSubmitting.value = false;
    return;
  }

  try {
    const response = await axios.post(
        "/account/password-change-request/",
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
  }
};

// Handle successful OTP verification
const handleOTPSuccess = () => {
  success.value = "Email verified successfully";
  // The OTP component will handle the navigation to the password reset page
};
</script>

<template>
  <div class="min-h-screen">
    <div
        class="absolute transform top-1/3 left-1/2 translate-x-0 translate-y-10 rotate-[12deg] shadow-md w-[450px] h-[525px] rounded-lg bg-gradient-to-br from-athAIna-red to-athAIna-yellow"
    ></div>
    <div
        class="absolute transform top-1/3 left-1/2 -translate-x-[18.75rem] translate-y-10 rotate-[-12deg] shadow-md w-[450px] h-[525px] rounded-lg bg-gradient-to-br from-athAIna-red to-athAIna-yellow"
    ></div>
    <div
        class="absolute transform top-1/3 left-1/2 -translate-x-[9.37rem] w-[450px] h-[600px] rounded-lg border-4 bg-athAIna-white flex flex-col p-10 py-20"
    >
      <div class="w-full flex flex-row justify-center items-center">
        <img src="@/assets/athAIna.svg" alt="Logo" class="w-20" />
      </div>
      <h1 class="text-athAIna-violet font-semibold w-full text-center my-10">
        Change Password Email Verification
      </h1>

      <!-- Error/Success Messages -->
      <div v-if="error" class="text-athAIna-red text-center mt-2 p-2 rounded">
        {{ error }}
      </div>
      <div v-if="success" class="text-green-500 text-center mt-2 p-2 rounded">
        {{ success }}
      </div>

      <div
          class="m-2 mb-10 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-full"
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

  <!-- OTP Component -->
  <OTP
      :is-visible="isOTPVisible"
      :email="storedEmail"
      title="OTP Verification"
      @close="closeOTP"
      @verification-success="handleOTPSuccess"
  />
</template>

<style scoped>
.btn {
  @apply bg-athAIna-violet py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
  color: white; /* Using direct CSS instead of Tailwind's text-white */
}
</style>