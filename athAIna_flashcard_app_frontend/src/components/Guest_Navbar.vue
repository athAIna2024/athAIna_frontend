<script setup></script>

<template>
  <div
    class="w-full flex flex-row justify-between items-center p-7 pr-12 pl-12 z-50 bg-athAIna-white sticky font-poppins shadow-md"
  >
    <div
      class="invisible lg:w-100 lg:visible flex flex-row justify-between items-center space-x-20"
    >
      <router-link to="/"
        ><img src="@/assets/athAIna.svg" alt="Logo" class="14 w-14"
      /></router-link>
      <div>
        <router-link to="/features" exact-active-class="active-link">
          Features
        </router-link>
      </div>
      <div>
        <router-link to="/faqs" exact-active-class="active-link"
          >FAQS</router-link
        >
      </div>
      <div>
        <router-link to="/contact_us" exact-active-class="active-link">
          Contact us
        </router-link>
      </div>
      <div>
        <router-link to="/demo" exact-active-class="active-link"
          >Demo</router-link
        >
      </div>
    </div>

    <div class="flex flex-row justify-between items-center space-x-20">
      <div>
        <router-link to="/login" exact-active-class="active-link">
          Login
        </router-link>
      </div>
      <router-link to="/signup">
        <button class="btn">Sign up</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.active-link {
  font-weight: bold;
  color: #da384c;
}
</style>
