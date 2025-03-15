<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/authStore";
import Cookies from "js-cookie";
import axiosInstance from "@/axiosConfig";

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
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40"
  >
    <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
      <div class="athAIna-border-inner p-4 text-center">
        <div class="flex justify-start m-8 pl-4 text-athAIna-lg">
          Are you sure you want to log out?
        </div>
        <div class="mb-8 flex justify-center">
          <button @click="$emit('close')" class="btn-alt w-48 mr-5">No</button>
          <button @click="logout" class="btn w-48">Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
