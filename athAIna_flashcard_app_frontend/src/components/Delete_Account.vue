<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";
import axiosInstance from "@/axiosConfig";
import Cookies from "js-cookie";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);
const router = useRouter();
const authStore = useAuthStore();
const deleteError = ref("");
const confirmDelete = ref(false); // New ref to track confirmation status

// Reset confirmDelete whenever modal is opened/closed
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      confirmDelete.value = false; // Reset to unchecked when modal opens
    }
  }
);

const deleteAccount = async () => {
  try {
    const response = await axiosInstance.delete("/account/delete-account/", {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });

    if (response.status === 200) {
      // Clear all auth-related data
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("athAIna_csrfToken");
      authStore.logout();

      // Redirect to login page
      router.push("/login");
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    deleteError.value =
      error.response?.data?.message ||
      "An error occurred while deleting your account";
  }
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-50"
  >
    <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
      <div class="athAIna-border-inner p-4 text-center">
        <div class="flex flex-col items-center justify-between p-5 space-y-6">
          <h2 class="font-semibold text-xl">Delete Account</h2>

          <p class="text-center text-gray-600">
            Are you sure you want to delete your account?
          </p>

          <div class="flex items-center justify-center mt-4">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                v-model="confirmDelete"
                class="w-4 h-4 accent-athAIna-red"
              />
              <span class="text-sm text-gray-700"
                >I understand this action cannot be undone</span
              >
            </label>
          </div>

          <div v-if="deleteError" class="text-red-500 text-sm">
            {{ deleteError }}
          </div>

          <div class="flex space-x-4">
            <button
              @click="$emit('close')"
              class="border-athAIna-orange border-[3.5px] py-[10px] px-[30px] rounded-2xl text-sm"
            >
              Cancel
            </button>

            <button
              @click="deleteAccount"
              :disabled="!confirmDelete"
              class="border-athAIna-red border-[3.5px] py-[10px] px-[30px] rounded-2xl text-me text-white transition-colors"
              :class="
                confirmDelete
                  ? 'hover:bg-red-600'
                  : 'opacity-50 cursor-not-allowed'
              "
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
