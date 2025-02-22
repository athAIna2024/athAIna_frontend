<script setup>
  defineOptions({
    name: 'Login'
  });
</script>

<template>
  <div class="flex flex-row gap-x-0 mt-16 my-16 mr-16 ml-14 p-0 max-h-screen">

  <!-- Sample Card Display -->
  <div class="ml-0 mr-28 pr-0 flex justify-center w-1/2 mt-10 mb-10">
    <!-- Lowermost Card -->
    <div class="mr-28 mt-7 absolute rotate-[-4deg] shadow-md w-[360px] h-[490px] rounded-[15px] bg-gradient-to-br from-athAIna-yellow to-athAIna-red"></div>

    <!-- Middle Card-->
    <div class="mr-12 mt-3 absolute rotate-[0deg] shadow-md w-[360px] h-[490px] rounded-[15px] bg-gradient-to-br from-athAIna-yellow to-athAIna-red"></div>

    <!-- Topmost Card -->
    <div class="absolute ml-3 p-[5px] shadow-md bg-gradient-to-br rounded-[15px] from-athAIna-yellow via-athAIna-orange to-athAIna-red
          rotate-[4deg] w-[360px] h-[490px]">
    <div class="absolute ml-0 rotate-[0deg] w-[350px] h-[480px] rounded-[10px] bg-athAIna-white flex">
      <span class="absolute p-8 bottom-1 font-semibold"> What is the largest star in the universe? </span>
    </div>
    </div>
  </div>

  <!-- Login Form -->
  <div class="flex flex-col justify-center items-center h-auto w-[450px] mt-20 mb-20">
    <h1 class="text-athAIna-violet font-semibold w-full text-center text-xl"> Welcome Back! </h1>

    <!-- Email Field-->
    <div class="relative flex flex-row items-center mt-[60px] bg-athAIna-violet rounded-[20px] h-auto w-full">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
           class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-violet ml-2 mr-3">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
      <input type="text" placeholder="Email" class="font-medium text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]" />
    </div>
    <span class="text-athAIna-red" v-if="EmailInvalid">Invalid Email</span>

    <!-- Password Field-->
    <div class="relative flex items-center mt-[45px] bg-athAIna-violet rounded-[20px] h-auto w-full">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
           class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-violet ml-2 mr-3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
      <input type="text" placeholder="Password" class="font-medium text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]" />
    </div>

    <!-- Forgot Password -->
    <div class="w-full flex justify-end mt-5 mr-5 text-[16px] font-medium">
      <span class="underline">
        <router-link to="/forgot_password"> Forgot Password? </router-link>
      </span>
    </div>

    <!-- Log In Button -->
    <div class="w-full flex mt-14 mb-7 justify-center">
      <button class="btn w-full"> Log In </button>
    </div>

    <!-- Sign Up CTA -->
    <div class="text-center">
      Don't have an account? <span class="font-semibold underline">
        <RouterLink to="/signup"> Sign Up </RouterLink> </span>
    </div>

    <div v-if="locked" class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40">
    <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
      <h1 class="m-8 text-white text-center text-2xl font-semibold"> LOCKED OUT </h1>
      <div class="athAIna-border-inner mt-4 rounded-t-none p-4 text-center">
        <h1 class="m-8 text-2xl text-emerald-400 font-semibold"> Time remaining: 1 hour </h1>
        <p class="m-8 text-athAIna-md"> Try logging in again later </p>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>

<style scoped>
</style>