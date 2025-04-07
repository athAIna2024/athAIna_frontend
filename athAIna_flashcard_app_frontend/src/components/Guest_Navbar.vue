<script setup></script>

<template>
  <div
    class="w-full flex flex-row justify-between items-center p-7 pr-12 pl-12 z-50 bg-athAIna-white sticky font-poppins shadow-md"
  >
    <div
      class="invisible lg:w-100 lg:visible flex flex-row justify-between items-center space-x-20"
    >
      <router-link :to="{ name: 'Landing_Page' }"
        ><img src="@/assets/athAIna.svg" alt="Logo" class="14 w-14"
      /></router-link>
      <div>
        <router-link
          :to="{ name: 'Features_Page' }"
          exact-active-class="active-link"
        >
          Features
        </router-link>
      </div>
      <div>
        <router-link
          :to="{ name: 'FAQs_Page' }"
          exact-active-class="active-link"
          >FAQS</router-link
        >
      </div>
      <div>
        <router-link
          :to="{ name: 'Create_Contact_Inquiry' }"
          exact-active-class="active-link"
        >
          Contact us
        </router-link>
      </div>
      <div>
        <router-link
          :to="{ name: 'Demo_Page' }"
          exact-active-class="active-link"
          >Demo</router-link
        >
      </div>
    </div>

    <div class="flex flex-row justify-between items-center space-x-20">
      <div>
        <router-link :to="{ name: 'Login' }" exact-active-class="active-link">
          Login
        </router-link>
      </div>
      <router-link :to="{ name: 'Signup' }">
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
