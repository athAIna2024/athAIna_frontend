<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/authStore";
import { useFlashcardSearchStore } from "../../../stores/flashcardSearchStore.js";
import { useStudysetStore } from "../../../stores/studySetStore.js";
import { useLockedUsersStore } from "../../../stores/lockedUsersStore.js";
import { useStudySetSearchStore } from "../../../stores/studySetSearchStore.js";
import { useUserStore } from "../../../stores/userStore.js";
import { useTestModeStore } from "../../../stores/testModeStore.js";

import Cookies from "js-cookie";
import axiosInstance from "@/axiosConfig";
import Confirmation_Prompt from "@/components/Confirmation_Prompt.vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Modal Title",
  },
});

const authStore = useAuthStore();
const flashcardSearchStore = useFlashcardSearchStore();
const studysetStore = useStudysetStore();
const lockedUsersStore = useLockedUsersStore();
const studySetSearchStore = useStudySetSearchStore();
const userStore = useUserStore();
const testModeStore = useTestModeStore();

const router = useRouter();
const emit = defineEmits(["close"]);

const logout = async () => {
  try {
    const response = await axiosInstance.post("/account/logout/", {});

    console.log("response: ", response);
    console.log("response data: ", response.data);
    console.log("response status: ", response.status);
    console.log("response error: ", response.error);
    console.log("response message: ", response.message);

    if (response.status === 204) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("athAIna_csrfToken");

      sessionStorage.clear();

      let dbs = await indexedDB.databases();
      dbs.forEach((db) => {
        indexedDB.deleteDatabase(db.name);
      });

      authStore.logout();

      flashcardSearchStore.clear();
      studysetStore.clear();
      studySetSearchStore.clear();
      testModeStore.clear();

      router.push({
        name: "Login1",
      });
      emit("close");
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.log(error);
  } finally {
    userStore.clear();
  }
};
</script>
<template>
  <Confirmation_Prompt
    :isVisible="isVisible"
    confirmQuestion="Are you sure you want to log out?"
    @close="$emit('close')"
    @confirm="logout"
  />
</template>

<style scoped></style>
