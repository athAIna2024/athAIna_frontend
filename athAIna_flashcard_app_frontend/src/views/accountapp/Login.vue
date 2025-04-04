<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "@/axios";
import Cookies from "js-cookie";
import { useUserStore } from "../../../stores/userStore";
import { useAuthStore } from "../../../stores/authStore";
import { useLockedUsersStore } from "../../../stores/lockedUsersStore";

import Loading_Modal from "@/components/Loading_Modal.vue";

const userStore = useUserStore();
const authStore = useAuthStore();

const isLoading = ref(false);

const lockedUsersStore = useLockedUsersStore();
const failedAttempts = ref(0);
const maxAttempts = 3;

console.log(userStore.getUserID());

const router = useRouter();
const email = ref("");
const password = ref("");
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const errors = ref({
  email: [],
  password: [],
  general: "",
});

const login = async () => {
  isLoading.value = true;
  console.log("Logging in...", isLoading.value);

  const userId = email.value;

  if (lockedUsersStore.isUserLocked(userId)) {
    errors.value.general = "You are locked out. Please try again later.";
    isLoading.value = false;
    console.log("user is locked out :", isLoading.value);
    return;
  }

  try {
    const response = await axios.post(
      "/account/login/",
      {
        email: email.value,
        password: password.value,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response.data);

    if (response.data.successful) {
      const sessionTime = new Date();

      sessionStorage.setItem("session", sessionTime);

      userStore.setUserID(response.data.user_id);
      userStore.setDateJoined(response.data.user_date_joined);
      userStore.setEmail(response.data.email);
      userStore.setLoginTime(response.data.login_date);
      Cookies.set("access_token", `${response.data.access}`, {
        secure: true,
        sameSite: "Strict",
        expires: 3600 / (24 * 60 * 60),
      });
      Cookies.set("refresh_token", `${response.data.refresh}`, {
        secure: true,
        sameSite: "Strict",
        expires: 1209600 / (24 * 60 * 60),
      });

      authStore.setTokens({
        access: response.data.access,
        refresh: response.data.refresh,
      });

      authStore.setUserID(response.data.user_id);
      userStore.setEmail(response.data.email);
      console.log(userStore.getEmail());

      authStore.login();

      // router.replace("/library_of_studysets");
      // window.location.href = "/library_of_studysets";
      router.push("/library_of_studysets");
    } else {
      console.log(response.data.error);
    }
  } catch (error) {
    console.log(error.value);
    if (error.response.status === 400) {
      errors.value.email = error.response.data.email || [];

      if (errors.value.password) {
        if (!error.response.data.email) {
          handleFailedAttempt(userId);
        }
        errors.value.password = error.response.data.password || [];
      }
      if (error.response.data.non_field_errors) {
        errors.value.email.push(...error.response.data.non_field_errors);
      }
    } else {
      errors.value.general = error.response.data.error;
    }
  } finally {
    isLoading.value = false;
    console.log("Logging in done...", isLoading.value);
  }
};

const handleFailedAttempt = (userId) => {
  // Add this function at the end
  failedAttempts.value += 1;
  console.log("Failed attempts: ", failedAttempts.value);
  if (failedAttempts.value >= maxAttempts) {
    const lockoutEndTime = Date.now() + 60 * 1000; // Lock out for 1 minute
    lockedUsersStore.setLockedUsers(userId, lockoutEndTime);
    errors.value.general = "You are locked out. Please try again later.";
  } else {
  }
};
</script>

<template>
  <Loading_Modal
    :loadingMessage="'Please wait a minute'"
    :loadingHeader="'Logging in...'"
    :isVisible="isLoading"
    :condition="!isLoading"
  />

  <div class="flex flex-row gap-x-0 mt-16 my-16 mr-16 ml-14 p-0 max-h-screen">
    <!-- Sample Card Display -->
    <div class="ml-0 mr-28 pr-0 flex justify-center w-1/2 mt-10 mb-10">
      <!-- Lowermost Card -->
      <div
        class="mr-28 mt-7 absolute rotate-[-4deg] shadow-md w-[360px] h-[490px] rounded-[15px] bg-gradient-to-br from-athAIna-yellow to-athAIna-red"
      ></div>

      <!-- Middle Card-->
      <div
        class="mr-12 mt-3 absolute rotate-[0deg] shadow-md w-[360px] h-[490px] rounded-[15px] bg-gradient-to-br from-athAIna-yellow to-athAIna-red"
      ></div>

      <!-- Topmost Card -->
      <div
        class="absolute ml-3 p-[5px] shadow-md bg-gradient-to-br rounded-[15px] from-athAIna-yellow via-athAIna-orange to-athAIna-red rotate-[4deg] w-[360px] h-[490px]"
      >
        <div
          class="absolute ml-0 rotate-[0deg] w-[350px] h-[480px] rounded-[10px] bg-athAIna-white flex"
        >
          <span class="absolute p-8 bottom-1 font-semibold">
            What is the largest star in the universe?
          </span>
        </div>
      </div>
    </div>

    <!-- Login Form -->
    <div
      class="flex flex-col justify-center items-center h-auto w-[450px] mt-20 mb-20"
    >
      <h1 class="text-athAIna-violet font-semibold w-full text-center text-xl">
        Welcome Back!
      </h1>

      <!-- Email Field-->
      <div
        class="relative flex flex-row items-center mt-[60px] bg-athAIna-violet rounded-[20px] h-auto w-full"
      >
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
          class="font-medium text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
        />
      </div>
      <div v-if="errors.email.length" class="text-athAIna-red mt-1 ml-7">
        <div v-for="(error, index) in errors.email" :key="index">
          {{ error }}
        </div>
      </div>

      <!-- Password Field-->
      <div
        class="relative flex items-center mt-[45px] bg-athAIna-violet rounded-[20px] h-auto w-full"
      >
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
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
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
          class="font-medium text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
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
      <div v-if="errors.password.length" class="text-athAIna-red ml-7 mt-1">
        <div v-for="(error, index) in errors.password" :key="index">
          {{ error }}
        </div>
      </div>
      <div v-if="errors.general.length" class="text-athAIna-red ml-7 mt-1">
        <div>
          {{ errors.general }}
        </div>
      </div>

      <!-- Forgot Password -->
      <div class="w-full flex justify-end mt-5 mr-5 text-[16px] font-medium">
        <span class="underline">
          <router-link to="/forgot_password"> Forgot Password? </router-link>
        </span>
      </div>

      <!-- Log In Button -->
      <div class="w-full flex mt-14 mb-7 justify-center">
        <button @click="login" class="btn w-full">Log In</button>
      </div>

      <!-- Sign Up CTA -->
      <div class="text-center">
        Don't have an account?
        <span class="font-semibold underline">
          <RouterLink to="/signup"> Sign Up </RouterLink>
        </span>
      </div>

      <!-- <div
        v-if="locked"
        class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40"
      >
        <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
          <h1 class="m-8 text-white text-center text-2xl font-semibold">
            LOCKED OUT
          </h1>
          <div class="athAIna-border-inner mt-4 rounded-t-none p-4 text-center">
            <h1 class="m-8 text-2xl text-emerald-400 font-semibold">
              Time remaining: {{ Math.floor(lockedTime / 60) }} minutes
              {{ lockedTime % 60 }} seconds
            </h1>
            <p class="m-8 text-athAIna-md">Try logging in again later</p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped></style>
