<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "@/axios";

const router = useRouter();
const route = useRoute();

const oldPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref(""); // Changed from confirmPassword to match serializer
const error = ref(null);
const success = ref(null);
const isSubmitting = ref(false);

// Get the uidb64 and token from route params
const { uidb64, token } = route.params;

const changePassword = async () => {
  error.value = null;
  success.value = null;
  isSubmitting.value = true;

  // Validation checks
  if (!oldPassword.value || !newPassword.value || !confirmNewPassword.value) {
    error.value = "All fields are required";
    isSubmitting.value = false;
    return;
  }

  if (newPassword.value !== confirmNewPassword.value) {
    error.value = "New passwords do not match";
    isSubmitting.value = false;
    return;
  }

  try {
    const response = await axios.patch(
      `/account/change-password/${uidb64}/${token}/`,
      {
        old_password: oldPassword.value,
        new_password: newPassword.value,
        confirm_new_password: confirmNewPassword.value, // Changed to match serializer
      }
    );

    if (response.data.successful) {
      success.value = response.data.message;
      // Clear the form
      oldPassword.value = "";
      newPassword.value = "";
      confirmNewPassword.value = "";

      // Redirect to login after successful password change
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      error.value = response.data.message;
    }
  } catch (err) {
    console.error("Change password error:", err);
    error.value =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "An error occurred while changing your password";
  } finally {
    isSubmitting.value = false;
  }
};

// Password requirements validation
const passwordRequirements = ref([
  { text: "At least 8 characters", met: false },
  { text: "At least one number", met: false },
  { text: "At least one uppercase letter", met: false },
  { text: "At least one special character", met: false },
  { text: "Cannot be entirely numeric", met: true },
]);

const checkPasswordRequirements = (password) => {
  passwordRequirements.value[0].met = password.length >= 8;
  passwordRequirements.value[1].met = /\d/.test(password);
  passwordRequirements.value[2].met = /[A-Z]/.test(password);
  passwordRequirements.value[3].met = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  passwordRequirements.value[4].met = !/^\d+$/.test(password);
};

watch(newPassword, (value) => {
  checkPasswordRequirements(value);
});
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

      <!-- Error/Success Messages -->
      <div v-if="error" class="text-athAIna-red text-center mt-2">
        {{ error }}
      </div>
      <div v-if="success" class="text-athAIna-violet text-center mt-2">
        {{ success }}
      </div>

      <!-- Password Requirements -->
      <div class="mb-4 text-sm">
        <p class="font-semibold mb-2 text-athAIna-violet text-center">
          Password Requirements:
        </p>
        <ul class="list-none space-y-1">
          <li
            v-for="(req, index) in passwordRequirements"
            :key="index"
            :class="{
              'text-green-500': req.met,
              'text-athAIna-red': !req.met,
            }"
            class="flex items-center justify-center"
          >
            <span class="mr-2">{{ req.met ? "✓" : "×" }}</span>
            {{ req.text }}
          </li>
        </ul>
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
          @click="changePassword"
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
