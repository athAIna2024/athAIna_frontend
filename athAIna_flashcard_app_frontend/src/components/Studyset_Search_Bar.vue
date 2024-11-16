<script>
export default {
  name: 'Studyset_Search_Bar',
};
</script>

<template>
  <div class="bg-gradient-to-br from-athAIna-yellow via via-athAIna-orange to to-athAIna-red rounded-[20px] h-[40px] w-[700px]">
    <div class="relative flex flex-row items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-athAIna-orange ml-2 mr-3">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
      <input type="text" placeholder="Search Studyset" class="text-[14px] text-athAIna-orange placeholder-athAIna-orange focus: outline-none ring- ring-athAIna-yellow w-full rounded-[15px] m-[4px] h-[32px] flex flex-row items-center pl-[50px]" />
    </div>
  </div>
</template>

<style scoped>
</style>