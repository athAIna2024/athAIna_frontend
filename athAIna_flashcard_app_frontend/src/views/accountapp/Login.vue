<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const email = ref("");
const password = ref("");

const login = async () => {
  try {
    const response = await axios.post("http://localhost:8000/account/login/", {
      email: email.value,
      password: password.value,
    });

    console.log(response.data);

    if (response.data.successful) {
      router.push("/library_of_studysets");
      
    } else {
      console.log(response.data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="flex flex-row justify-center">
    <div class="mt-40 mr-40 pr-40 flex justify-center">
      <div
        class="absolute rotate-[12deg] shadow-md w-[450px] h-[600px] rounded-lg bg-gradient-to-br from-athAIna-red to-athAIna-yellow"
      ></div>
      <div
        class="absolute rotate-[6deg] shadow-md w-[450px] h-[600px] rounded-lg bg-gradient-to-br from-athAIna-red to-athAIna-yellow"
      ></div>
      <div
        class="absolute w-[450px] h-[600px] rounded-lg border-4 bg-athAIna-white flex"
      >
        <span class="absolute p-8 bottom-1 font-semibold"> What is love? </span>
      </div>
    </div>

    <div class="flex flex-col justify-center items-center min-h-screen">
      <h1 class="text-athAIna-violet font-semibold w-full text-center">
        Welcome Back!
      </h1>
      <div
        class="m-10 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-[700px]"
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
      </div>

      <div
        class="m-10 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-[700px]"
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
            type="password"
            placeholder="Password"
            class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]"
          />
        </div>

        <div class="justify-end flex flex-end my-10">
          <span class="underline">
            <router-link to="/forgot_password"
              >Forgot Password?</router-link
            ></span
          >
        </div>

        <div class="flex mb-10 justify-center">
          <button @click="login" class="btn w-full">Log In</button>
        </div>

        <div class="text-center">
          Don't have an account?
          <span class="font-semibold underline">
            <RouterLink to="/signup"> Sign Up </RouterLink>
          </span>
        </div>
      </div>

      <div
        v-if="locked"
        class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40"
      >
        <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
          <h1 class="m-8 text-white text-center text-2xl font-semibold">
            LOCKED OUT
          </h1>
          <div class="athAIna-border-inner mt-4 rounded-t-none p-4 text-center">
            <h1 class="m-8 text-2xl text-emerald-400 font-semibold">
              Time remaining: 1 hour
            </h1>
            <p class="m-8 text-athAIna-md">Try logging in again later</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
