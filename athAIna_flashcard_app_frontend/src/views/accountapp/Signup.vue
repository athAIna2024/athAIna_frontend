<script setup>
import { reactive, ref } from "vue";
import OTP from "@/views/accountapp/Email_OTP.vue";
import { useRouter } from "vue-router";
import axios from "@/axios";

const email = ref("");
const password = ref("");
const password2 = ref("");
const error = ref("");
const isSuccessful = ref(false);

const router = useRouter();

const isOTPVisible = ref(false);

const openOTP = () => {
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
        Create an Account
      </h1>
      <!-- Email Field -->
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
              class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
          />
        </div>
        <div v-if="errors.email[0]" class="text-athAIna-red text-xs mt-1 ml-4">
          {{ errors.email[0] }}
        </div>
      </div>

      <!--Password Field -->
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
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
          />
          <button
              v-if="password"
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
        <div
            v-if="errors.password[0]"
            class="text-athAIna-red text-xs mt-1 ml-4"
        >
          {{ errors.password[0] }}
        </div>
      </div>

      <!-- Confirm Password Field -->

      <div
          class="m-2 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-full"
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
              v-model="password2"
              :type="showPassword2 ? 'text' : 'password'"
              placeholder="Confirm Password"
              class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
          />
          <button
              v-if="password2"
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
        <div
            v-if="errors.password2[0]"
            class="text-athAIna-red text-xs mt-1 ml-4"
        >
          {{ errors.password2[0] }}
        </div>

        <!-- Display error message if any -->
        <div v-if="errors.general" class="text-athAIna-red text-center mt-2">
          {{ errors.general }}
        </div>

        <div class="flex m-10 justify-center">
          <button
              @click="createUser"
              class="btn w-full"
              :disabled="isOTPVisible"
          >
            Sign Up
          </button>
        </div>

        <div class="text-center">
          Already have an account?
          <span class="font-semibold underline">
            <RouterLink to="/login"> Login </RouterLink>
          </span>
        </div>
      </div>
    </div>
  </div>

  <OTP :is-visible="isOTPVisible" title="OTP Verification" @close="closeOTP" />
</template>

<style scoped></style>