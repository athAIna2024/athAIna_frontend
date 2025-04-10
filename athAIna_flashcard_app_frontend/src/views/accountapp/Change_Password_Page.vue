<script setup>
import { ref, onMounted, reactive } from "vue"; // Added reactive import
import { useRoute, useRouter } from "vue-router";
import axios from "@/axios";
import { useAuthStore } from "../../../stores/authStore";
import axiosInstance from "@/axiosConfig";
import Cookies from "js-cookie";
import Loading_Modal from "@/components/Loading_Modal.vue";
import Success_Message from "@/components/Success_Message.vue"; // Import Success_Message component

const goBackToLibrary = () => {
  router.push({
    name: "Library_Page_Studyset",
  });
};

const isLoading = ref(false);
const isLoadingModalVisible = ref(false); // Add this for loading modal visibility
const isSuccessMessageVisible = ref(false); // Add this for success message visibility

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const success = ref(null);

// Replace single error with field-specific errors
const errors = reactive({
  old_password: "",
  new_password: "",
  confirm_new_password: "",
  general: "",
});

// Get token and uidb64 from URL parameters
const token = route.params.token;
const uidb64 = route.params.uidb64;
console.log("uidb64:", uidb64);
console.log("token:", token);

const showPassword = ref(false);
const showPassword2 = ref(false);
const showPassword3 = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const togglePassword2 = () => {
  showPassword2.value = !showPassword2.value;
};

const togglePassword3 = () => {
  showPassword3.value = !showPassword3.value;
};

// Enhanced updatePassword function with better error handling
const updatePassword = async () => {
  // Clear previous errors
  Object.keys(errors).forEach((key) => {
    if (Array.isArray(errors[key])) {
      errors[key] = [];
    } else {
      errors[key] = "";
    }
  });
  success.value = null;

  // Client-side validation
  if (!oldPassword.value) {
    errors.old_password = "Old password is required";
    return;
  }

  if (!newPassword.value) {
    errors.new_password = "New password is required";

    return;
  }

  if (!confirmPassword.value) {
    errors.confirm_new_password = "Please confirm your new password";

    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    errors.general = "New passwords do not match";

    return;
  }

  // Add validation to check new password isn't the same as old password
  if (newPassword.value === oldPassword.value) {
    errors.new_password = "New password cannot be the same as the old password";

    return;
  }

  // Password complexity validation
  if (newPassword.value.length < 8) {
    errors.new_password = "Password must be longer than 8 characters";

    return;
  }

  // Check if password is entirely numeric
  if (/^\d+$/.test(newPassword.value)) {
    errors.new_password = "Password cannot be entirely numeric";

    return;
  }

  // Check for at least one number
  if (!/\d/.test(newPassword.value)) {
    errors.new_password = "Password must contain at least one number";

    return;
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(newPassword.value)) {
    errors.new_password = "Password must contain at least one uppercase letter";

    return;
  }

  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword.value)) {
    errors.new_password =
      "Password must contain at least one special character";

    return;
  }

  // Show loading modal and set loading state
  isLoading.value = true;
  isLoadingModalVisible.value = true;

  try {
    const response = await axiosInstance.patch(
      `/account/change-password/${uidb64}/${token}/`,
      {
        old_password: oldPassword.value,
        new_password: newPassword.value,
        confirm_new_password: confirmPassword.value,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      }
    );

    if (response.status === 200) {
      // Hide loading modal and show success message
      isLoadingModalVisible.value = false;
      isSuccessMessageVisible.value = true;

      // Redirect to login page after successful password reset
      setTimeout(() => {
        router.push({
          name: "Library_Page_Studyset",
        });
      }, 2000);
    }
  } catch (err) {
    errors.old_password =
      err.response?.data?.old_password ||
      "The password did not match our records";
  } finally {
    // Set loading state back to false after API call completes
    isLoading.value = false;
  }
};

// Add these functions for modal control
const closeLoadingModal = () => {
  isLoadingModalVisible.value = false;
};

const closeSuccessMessage = () => {
  isSuccessMessageVisible.value = false;
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
            @click="goBackToLibrary"
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
            <span class="font-medium">Back to Library</span>
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
          class="text-athAIna-violet font-semibold text-lg w-full text-center"
        >
          Change Password
        </h1>

        <!-- Old Password Field -->
        <div
          class="m-2 mt-7 mb-5 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-auto"
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
d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <input
              v-model="oldPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Old Password"
              class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
            />
            <button
              v-if="oldPassword"
              @click="togglePassword"
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="size-5 text-athAIna-violet"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :d="
                    showPassword
                      ? 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      : 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                  "
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Old password field error message -->
        <div
          v-if="errors.old_password"
          class="text-athAIna-red text-xs mb-3 ml-4"
        >
          {{ errors.old_password }}
        </div>

        <!-- New Password Field -->
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
d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <input
              v-model="newPassword"
              :type="showPassword2 ? 'text' : 'password'"
              placeholder="New Password"
              class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
            />
            <button
              v-if="newPassword"
              @click="togglePassword2"
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="size-5 text-athAIna-violet"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :d="
                    showPassword2
                      ? 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      : 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                  "
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- New password field error message -->
        <div
          v-if="errors.new_password"
          class="text-athAIna-red text-xs mb-3 ml-4"
        >
          {{ errors.new_password }}
        </div>

        <!-- Confirm Password Field -->
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
d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <input
              v-model="confirmPassword"
              :type="showPassword3 ? 'text' : 'password'"
              placeholder="Confirm New Password"
              class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
            />
            <button
              v-if="confirmPassword"
              @click="togglePassword3"
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="size-5 text-athAIna-violet"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :d="
                    showPassword3
                      ? 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      : 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                  "
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Confirm password field error message -->
        <div
          v-if="errors.confirm_new_password"
          class="text-athAIna-red text-xs mb-3 ml-4"
        >
          {{ errors.confirm_new_password }}
        </div>

        <!-- Success Message -->
        <div v-if="success" class="text-athAIna-violet text-center mt-2">
          {{ success }}
        </div>

        <!-- General Error Message -->
        <!-- <div v-if="errors.general" class="text-athAIna-red text-center mt-2">
          {{ errors.general }}
        </div> -->

        <!-- Change Password Button -->
        <div class="flex m-10 justify-center">
          <button @click="updatePassword" class="btn w-full">
            {{ "Change Password" }}
          </button>
        </div>
      </div>
    </div>
    <Loading_Modal
      :loadingMessage="'Processing your password change'"
      :loadingHeader="'Please wait'"
      :isVisible="isLoadingModalVisible"
      :condition="!isLoading"
      @close="closeLoadingModal"
    />

    <Success_Message
      :successHeader="'Password Change Successful'"
      :successMessage="'Your password has been updated. Redirecting to login page...'"
      :isVisible="isSuccessMessageVisible"
      @close="closeSuccessMessage"
    />
  </div>
</template>
