<script setup>
import { useAuthStore } from "../stores/authStore.js";
import Guest_Navbar from "@/components/Guest_Navbar.vue";
import Learner_Navbar from "@/components/Learner_Navbar.vue";
import Footer_Navbar from "@/components/Footer_Navbar.vue";
import { computed } from "vue";

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
</script>

<template class="flex flex-col min-h-screen">
  <header>
    <Guest_Navbar v-if="!isLoggedIn" />
    <Learner_Navbar v-if="isLoggedIn" />
  </header>

  <main>
    <router-view />
  </main>

  <footer>
    <Footer_Navbar />
  </footer>
</template>

<style scoped></style>
