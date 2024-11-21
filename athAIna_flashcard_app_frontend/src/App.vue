<script setup>

import Guest_Navbar from '@/components/Guest_Navbar.vue';
import Learner_Navbar from "@/components/Learner_Navbar.vue";
import Footer_Navbar from "@/components/Footer_Navbar.vue";

</script>

<template>
  <header>
<!--    Put logic here if the user is authenticated and is a learner or a guest-->
      <Guest_Navbar />
      <Learner_Navbar />
  </header>

  <main>
    <router-view />

  </main>

  <footer>
    <Footer_Navbar />
  </footer>
</template>

<style scoped>

</style>
