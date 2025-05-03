<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";
import axiosInstance from "@/axiosConfig";
import Cookies from "js-cookie";
import Confirmation_Prompt from "./Confirmation_Prompt.vue"; // Import Confirmation component

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "showLearnerProfile"]);
const router = useRouter();
const authStore = useAuthStore();
const deleteError = ref("");
const confirmDelete = ref(false);
const isLoading = ref(false);
const isSuccessMessageVisible = ref(false);
const showConfirmation = ref(false);
const confirmationMessage = ref(
  "Your account has been successfully deleted. You will be redirected to the login page."
);

// Reset confirmDelete whenever modal is opened/closed
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      confirmDelete.value = false;
      deleteError.value = "";
      showConfirmation.value = false;
    }
  }
);

const close = () => {
  emit("close");
};

const closeConfirmation = () => {
  showConfirmation.value = false;
};

const handleConfirm = () => {
  // This won't be called for the success confirmation
  showConfirmation.value = false;
};

const deleteAccount = async () => {
  isLoading.value = true;
  deleteError.value = "";

  try {
    const response = await axiosInstance.delete("/account/delete-account/", {
      withCredentials: true,
    });

    if (response.status === 200) {
      // Clear all auth-related data
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("athAIna_csrfToken");
      localStorage.removeItem("user");
      sessionStorage.clear();
      authStore.logout();
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    deleteError.value =
      error.response?.data?.message ||
      "An error occurred while deleting your account";
  } finally {
    isLoading.value = false;

    // On successful deletion (no error)
    if (!deleteError.value) {
      showConfirmation.value = true;

      // Ensure confirmation is shown for at least 2 seconds
      setTimeout(() => {
        showConfirmation.value = false;
        close();
        router.push({ name: "Login" });
      });
    }
  }
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-50"
  >
    <!-- Confirmation Prompt -->
    <Confirmation_Prompt
      :isVisible="showConfirmation"
      :confirmQuestion="confirmationMessage"
      @close="closeConfirmation"
      @confirm="handleConfirm"
    />

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
              @click="
                () => {
                  $emit('close');
                  $emit('showLearnerProfile');
                }
              "
              class="border-athAIna-orange border-[3.5px] py-[10px] px-[30px] rounded-2xl text-sm"
              :disabled="isLoading"
            >
              Cancel
            </button>

            <button
              @click="deleteAccount"
              :disabled="!confirmDelete || isLoading"
              class="border-athAIna-red border-[3.5px] py-[10px] px-[30px] rounded-2xl text-white transition-colors"
              :class="
                confirmDelete && !isLoading
                  ? 'bg-athAIna-red hover:bg-red-600'
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
