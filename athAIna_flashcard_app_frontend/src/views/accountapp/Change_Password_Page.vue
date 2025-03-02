<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/axios";
import { useAuthStore } from "../../../stores/authStore";
import axiosInstance from "@/axiosConfig";
import Cookies from "js-cookie";

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
const error = ref(null);
const success = ref(null);
const isSubmitting = ref(false);

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

// Modify the resetPassword function in Forgot_Password_Page.vue
const updatePassword = async () => {
  error.value = null;
  success.value = null;
  isSubmitting.value = true;

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
      success.value = "Password has been reset successfully";

      // Redirect to login page after successful password reset
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
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
        class="absolute transform top-1/3 left-1/2 -translate-x-[9.37rem] w-[450px] h-[600px] rounded-lg border-4 bg-athAIna-white flex flex-col p-10"
    >
      <div class="w-full flex flex-row justify-center items-center">
        <img src="@/assets/athAIna.svg" alt="Logo" class="w-20" />
      </div>
      <h1 class="text-athAIna-violet font-semibold w-full text-center">
        Change Password
      </h1>

      <!-- Error/Success Messages -->
      <div v-if="error" class="text-athAIna-red text-center mt-2">
        {{ error }}
      </div>
      <div v-if="success" class="text-athAIna-violet text-center mt-2">
        {{ success }}
      </div>

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

      <div class="flex m-10 justify-center">
        <button @click="updatePassword" class="btn w-full">
          Change Password
        </button>
      </div>
    </div>
  </div>
</template>