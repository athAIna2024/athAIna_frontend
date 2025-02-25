<script>
import OTP from './OTP.vue';
export default {
  name: 'Forgot_Password',
  components: { OTP },
  data() {
    return {
      isOTPVisible: false,
    };
  },
  methods: {
    openOTP() {
      this.isOTPVisible = true;
    },
    closeOTP() {
      this.isOTPVisible = false;
    },
  },
};
</script>

<template>
 <div class="flex flex-row min-h-screen mt-6 mb-12 items-center justify-center content-center text-center bg-center">
    <!-- Right Card -->
    <div class="mt-8 ml-10 rotate-[-12deg] shadow-md w-[400px] h-[550px] rounded-lg bg-gradient-to-br from-athAIna-yellow to-athAIna-red"></div>

    <!-- Left Card -->
    <div class="mt-16 mr-12 rotate-[15deg] shadow-md w-[400px] h-[500px] rounded-lg bg-gradient-to-bl from-athAIna-yellow to-athAIna-red"></div>

    <!-- Middle Card -->
    <div class="absolute bg-gradient-to-b rounded-[15px] from-athAIna-yellow via-athAIna-orange to-athAIna-red
          w-[450px] h-[600px] bg-athAIna-white flex flex-col p-[5px]">
    <div class="absolute m-0 w-[440px] h-[590px] rounded-[10px] bg-athAIna-white flex flex-col p-10">
<div class="w-full flex flex-row justify-center items-center">
         <img src="@/assets/athAIna.svg" alt="Logo" class="w-20" />
       </div>
       <h1 class="text-athAIna-violet font-semibold w-full text-center"> Email Verification </h1>
       <div class="m-2 mb-10 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-full">
         <div class="relative flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-violet ml-2 mr-3">
               <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
             <input type="text" placeholder="Enter Email Address" class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]" />
         </div>
      </div>
       
       <div class="flex m-10 justify-center">
         <button class="btn w-full" @click="openOTP"> 
           Change My Password
          </button>
       </div>
      </div>
      </div>
  </div>  

  <div class="min-h-screen" v-if="verified">
     <div class="absolute transform top-1/3 left-1/2 translate-x-0 translate-y-10 rotate-[12deg] shadow-md w-[450px] h-[525px] rounded-lg bg-gradient-to-br from-athAIna-red to-athAIna-yellow"></div>  
     <div class="absolute transform top-1/3 left-1/2 -translate-x-[18.75rem] translate-y-10 rotate-[-12deg] shadow-md w-[450px] h-[525px] rounded-lg bg-gradient-to-br from-athAIna-red to-athAIna-yellow"></div>  
     <div class="absolute transform top-1/3 left-1/2 -translate-x-[9.37rem] w-[450px] h-[600px] rounded-lg border-4 bg-athAIna-white flex flex-col p-10">
       <div class="w-full flex flex-row justify-center items-center">
         <img src="@/assets/athAIna.svg" alt="Logo" class="w-20" />
       </div>
       <h1 class="text-athAIna-violet font-semibold w-full text-center"> Change Password </h1>
      
      <div class="m-2 mb-10 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-full">
         <div class="relative flex flex-row items-center">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-violet ml-2 mr-3">
           <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
           <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
         </svg>
             <input type="text" placeholder="Enter New Password" class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]" />
         </div>
      </div>
      
      <div class="m-2 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-full">
       <div class="relative flex flex-row items-center">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-violet ml-2 mr-3">
           <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
           <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
         </svg>
         <input type="text" placeholder="Confirm New Password" class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]" />
       </div>
       
       <div class="flex m-10 justify-center">
         <button class="btn w-full"> Change My Password </button>
       </div>
      </div>
     </div>  
   </div>

    <OTP :is-visible="isOTPVisible" @close="closeOTP" />
</template>

<style scoped>
</style>