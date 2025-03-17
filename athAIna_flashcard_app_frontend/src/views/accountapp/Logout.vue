<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/authStore";
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

      authStore.logout();
      router.push("/login");
      emit("close");
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.log(error);
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
