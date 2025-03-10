<script>
export default {
  name: "Footer_Navbar",
};
</script>

<template>
  <div
    class="w-full flex flex-row justify-between items-center p-7 pr-12 pl-12 z-50 font-poppins font-light shadow-md"
    style="box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.3)"
  >
    <div class="flex flex-row justify-between items-center space-x-20">
      <img src="@/assets/athAIna.svg" alt="Logo" class="14 w-14" />
    </div>

    <div class="flex flex-row justify-between items-center space-x-10">
      <div>Privacy Policy</div>
      <div>Terms of Service</div>
      <div>
        <router-link to="/contact_us"> Contact us </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
