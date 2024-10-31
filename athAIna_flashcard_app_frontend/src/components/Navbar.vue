<script>
export default {
  name: 'Navbar',
};
</script>

<template>
  <div class="flex flex-row justify-between items-center my-2 z-50 sticky">
    <div class="flex flex-row justify-between space-x-40">
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