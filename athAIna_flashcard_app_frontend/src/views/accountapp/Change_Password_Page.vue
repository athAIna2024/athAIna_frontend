<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/axios";
import { useAuthStore } from "../../../stores/authStore";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const error = ref(null);
const success = ref(null);
const isSubmitting = ref(false);

// Get token and uidb64 from URL parameters
const token = route.params.token;
const uidb64 = route.params.uidb64;
console.log("uidb64:", uidb64);
console.log("token:", token);

// Modify the resetPassword function in Forgot_Password_Page.vue
const updatePassword = async () => {
  error.value = null;
  success.value = null;
  isSubmitting.value = true;

  try {
    const access_token = authStore.getAccessToken();
    console.log("Access Token:", access_token);
    if (!access_token) {
      error.value = "Not authenticated. Please log in.";
      return; // Stop the function if no token
    }

    const response = await axios.patch(
      `http://localhost:8000/account/change-password/${uidb64}/${token}/`,
      {
        old_Password: oldPassword.value,
        new_Password: newPassword.value,
        confirm_new_password: confirmPassword.value,
      },
      {
        headers: {
          Authorization: `Bearer` + access_token, // Use the access token in the header
        },
      }
    );

    success.value = "Password has been reset successfully";

    // Redirect to login page after successful password reset
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (err) {
    error.value =
      err.response?.data?.error ||
      "An error occurred while resetting your password";
  }
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
      class="absolute transform top-1/3 left-1/2 -translate-x-[9.37rem] w-[450px] h-[650px] rounded-lg border-4 bg-athAIna-white flex flex-col p-10"
    >
      <div class="w-full flex flex-row justify-center items-center">
        <img src="@/assets/athAIna.svg" alt="Logo" class="w-20" />
      </div>
      <h1 class="text-athAIna-violet font-semibold w-full text-center">
        Change Password
      </h1>

      <!-- Old Password Field -->
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
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <input
            v-model="oldPassword"
            type="password"
            placeholder="Old Password"
            :disabled="isSubmitting"
            class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus:outline-none ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
          />
        </div>
      </div>

      <!-- New Password Field -->
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
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <input
            v-model="newPassword"
            type="password"
            placeholder="New Password"
            :disabled="isSubmitting"
            class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus:outline-none ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
          />
        </div>
      </div>

      <!-- Confirm Password Field -->
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
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            :disabled="isSubmitting"
            class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus:outline-none ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
          />
        </div>
      </div>

      <div class="flex m-10 justify-center">
        <button
          @click="updatePassword"
          class="btn w-full"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Changing Password...</span>
          <span v-else>Change Password</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply bg-athAIna-violet py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
  color: white;
}
</style>
