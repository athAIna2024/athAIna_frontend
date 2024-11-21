<script>
export default {
  name: 'Footer_Navbar',
};
</script>

<template>
  <div class="w-full flex flex-row justify-between items-center text-[14px] p-5 pl-12 pr-12 sticky font-poppins font-light"
    style="box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);">
    <div class="flex flex-row items-center">
      <img src="@/assets/athAIna.svg" alt="Logo" class="14 w-14" />
    </div>

    <div class="flex flex-row justify-between items-center space-x-20 text-[14px]">
      <div>Privacy Policy</div>
      <div>Terms of Service</div>
      <div>Contact Us</div>
    </div>
  </div>
</template>

<style scoped>
</style>