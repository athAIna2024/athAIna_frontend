<script setup>
import { useAuthStore } from "../stores/authStore.js";
import Guest_Navbar from '@/components/Guest_Navbar.vue';
import Learner_Navbar from "@/components/Learner_Navbar.vue";

const authStore = useAuthStore();
</script>

<template>
  <header>
    <!-- IN PROGRESS: Put logic here if the user is authenticated and is a learner or a guest-->
    <!-- Conditionally render Navbar based on authentication status -->
    <Guest_Navbar v-if="!isLoggedIn" />
    <Learner_Navbar v-if="isLoggedIn" /> <!-- FIXME: Switched for testing only. Re-switch again once done. -->
  </header>

  <main>
    <router-view />

  </main>
</template>

<style scoped>

</style>
