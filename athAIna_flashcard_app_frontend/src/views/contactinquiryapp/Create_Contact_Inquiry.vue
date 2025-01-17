<script>
export default {
  name: 'Create_Contact_Inquiry',
};
</script>

<template>
    <div class="flex flex-row justify-between">
  <div class="flex flex-col justify-center items-center min-h-screen mx-10"> 
        <h1 class="text-athAIna-violet font-semibold w-full p-10"> Welcome Back! </h1>
        <div class="m-10 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-[700px]">
          <div class="relative flex flex-row items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-violet ml-2 mr-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              <input type="text" placeholder="Name" class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]" />
          </div>
       </div>

       <div class="m-5 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[40px] w-[700px]">
          <div class="relative flex flex-row items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-violet ml-2 mr-3">
               <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <input type="text" placeholder="Email" class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]" />
          </div>
       </div>
       
       <div class="m-5 bg-gradient-to-br from-athAIna-violet to-athAIna-violet rounded-[20px] h-[136px] w-[700px]">
        <div class="relative flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-violet ml-2 mr-3">
             <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
          <input type="text" placeholder="Inquiry" class="text-[14px] text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[128px] flex flex-row items-center pl-[50px]" />
        </div>
        
        <div class="flex my-10 justify-center">
          <button class="btn w-full"> Send Inquiry </button>
        </div>
       </div>
  </div>

  <div class="mt-40 mr-40 pr-40 flex justify-center">
      <div class="absolute rotate-[12deg] shadow-md w-[450px] h-[600px] rounded-lg bg-gradient-to-br from-athAIna-red to-athAIna-yellow"></div>  
      <div class="absolute rotate-[6deg] shadow-md w-[450px] h-[600px] rounded-lg bg-gradient-to-br from-athAIna-red to-athAIna-yellow"></div>  
      <div class="absolute  w-[450px] h-[600px] rounded-lg border-4 bg-athAIna-white flex">
        <span class="absolute p-8 text-center font-semibold"> Contact Us <br><br>
          <span class="font-normal"> Fill out the form with your inquiry or concern </span> </span>
      </div>  
    </div>
  </div>
</template>

<style scoped>
</style>