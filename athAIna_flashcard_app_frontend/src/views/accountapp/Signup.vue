<script setup>
import { reactive, ref } from "vue";
import OTP from "@/views/accountapp/Email_OTP.vue";
import { useRouter } from "vue-router";
import axios from "@/axios";
import Loading_Modal from "@/components/Loading_Modal.vue";

const email = ref("");
const password = ref("");
const password2 = ref("");
const error = ref("");
const isSuccessful = ref(false);

// States for loading and modals
const isLoading = ref(false);
const isLoadingModalVisible = ref(false);

const router = useRouter();

const isOTPVisible = ref(false);

const openOTP = () => {
  // Store email in localStorage for OTP resending functionality
  localStorage.setItem("signupEmail", email.value);

  // Hide loading modal and show OTP with success flag
  isLoadingModalVisible.value = false;
  isOTPVisible.value = true;
};

const closeOTP = () => {
  isOTPVisible.value = false;
};

const showPassword = ref(false);
const showPassword2 = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const togglePassword2 = () => {
  showPassword2.value = !showPassword2.value;
};

const errors = reactive({
  email: "",
  password: "",
  password2: "",
  general: "",
});

const createUser = async () => {
  // Clear previous errors
  Object.keys(errors).forEach((key) => {
    if (Array.isArray(errors[key])) {
      errors[key] = [];
    } else {
      errors[key] = "";
    }
  });

  if (password.value !== password2.value) {
    errors.general = "Passwords do not match";
    return;
  }

  // Show loading modal before API call
  isLoading.value = true;
  isLoadingModalVisible.value = true;

  try {
    const response = await axios.post("/account/register/", {
      email: email.value,
      password: password.value,
      password2: password2.value,
    });
    console.log(response.data);
    isSuccessful.value = response.data.successful;

    if (isSuccessful.value === true) {
      openOTP();
    }
  } catch (err) {
    console.log(err.response.data);
    if (err.response.status === 400) {
      isSuccessful.value = false;
      // Handle field-specific errors
      if (err.response.data.email) errors.email = err.response.data.email;
      if (err.response.data.password)
        errors.password = err.response.data.password;
      if (err.response.data.password2)
        errors.password2 = err.response.data.password2;

      // Handle non-field errors
      if (err.response.data.non_field_errors) {
        errors.general = err.response.data.non_field_errors[0];
      }
    }
    // Hide loading modal if there's an error
    isLoadingModalVisible.value = false;
  } finally {
    // Set loading state back to false after API call completes
    isLoading.value = false;
  }
};

const closeLoadingModal = () => {
  isLoadingModalVisible.value = false;
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
        <!-- Logo -->
        <div class="w-auto flex flex-row justify-center items-center">
          <img
            src="@/assets/athAIna.svg"
            alt="Logo"
            class="w-[185px] h-[111px] mb-3"
          />
        </div>

        <!-- Title -->
        <h1
          class="text-athAIna-violet font-semibold w-auto text-center text-lg mb-5"
        >
          Create an Account
        </h1>

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
              class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
              :disabled="isLoading"
            />
          </div>
          <div class="text-athAIna-red text-xs mt-1 ml-4" v-if="errors.email">
            {{ errors.email }}
          </div>
        </div>

        <!-- Password Field -->
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
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
              :disabled="isLoading"
            />
            <button
              @click="togglePassword"
              type="button"
              class="absolute right-4 text-athAIna-violet"
              :disabled="isLoading"
            >
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
          <div
            v-if="errors.password && errors.password[0]"
            class="text-athAIna-red text-xs mt-1 ml-4"
          >
            {{ errors.password[0] }}
          </div>
        </div>

        <!-- Confirm Password Field -->
        <div
          class="m-2 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-auto"
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
              v-model="password2"
              :type="showPassword2 ? 'text' : 'password'"
              placeholder="Confirm Password"
              class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
              :disabled="isLoading"
            />
            <button
              @click="togglePassword2"
              type="button"
              class="absolute right-4 text-athAIna-violet"
              :disabled="isLoading"
            >
              <svg
                v-if="showPassword2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
          <div
            v-if="errors.password2 && errors.password2[0]"
            class="text-athAIna-red text-xs mt-1 ml-4"
          >
            {{ errors.password2[0] }}
          </div>

          <div v-if="errors.general" class="text-athAIna-red text-center mt-2">
            {{ errors.general }}
          </div>

          <!-- Sign Up Button -->
          <div class="flex m-10 justify-center w-auto">
            <button
              class="btn w-full"
              @click="createUser"
              :disabled="isOTPVisible || isLoading"
            >
              Sign Up
            </button>
          </div>

          <div class="text-center">
            Already have an account?
            <span class="font-semibold underline">
              <RouterLink :to="{ name: 'Login' }"> Login </RouterLink>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Modal -->
    <Loading_Modal
      :loadingMessage="'Please wait while we create your account'"
      :loadingHeader="'Creating Account...'"
      :isVisible="isLoadingModalVisible"
      :condition="!isLoading"
      @close="closeLoadingModal"
    />

    <!-- Pass email prop to OTP component with flag for displaying success message -->
    <OTP
      :is-visible="isOTPVisible"
      :email="email"
      :show-success="isSuccessful"
      @close="closeOTP"
    />
  </div>
</template>

<style scoped>
.btn {
  @apply bg-athAIna-violet py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
  color: white;
}
</style>
