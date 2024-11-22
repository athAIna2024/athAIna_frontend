<script>
export default {
  name: 'Guest_Navbar',
};
</script>

<template>
  <div class="w-full flex flex-row justify-between items-center p-7 pl-12 pr-12 z-50 sticky font-poppins font-light shadow-md">
    <div class="flex flex-row justify-between items-center space-x-20">
      <img src="@/assets/athAIna.svg" alt="Logo" class="14 w-14" />
      <div>Features</div>
      <div>FAQS</div>
      <div>Contact us</div>
      <div>Demo</div>
    </div>

    <div class="flex flex-row justify-between items-center space-x-20">
      <div>Login</div>
      <button class="btn">Sign up</button>
    </div>
  </div>
</template>

<style scoped>
</style>