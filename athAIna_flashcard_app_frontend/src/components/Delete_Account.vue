<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";
import axiosInstance from "@/axiosConfig";
import Cookies from "js-cookie";
import Confirmation_Prompt from "./Confirmation_Prompt.vue"; // Import Confirmation component
import account_Delete_Confirmation from "@/views/accountapp/account_Delete_Confirmation.vue";
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
const showDeleteConfirmation = ref(false); // Add ref for Delete_Confirmation
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
      showDeleteConfirmation.value = false;
    }
  }
);

const close = () => {
  emit("close");
};

const closeConfirmation = () => {
  showConfirmation.value = false;
};

const closeDeleteConfirmation = () => {
  showDeleteConfirmation.value = false;
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
      // Show confirmation immediately before clearing auth data
      showDeleteConfirmation.value = true;

      // Delay logout and redirect to allow user to see the confirmation
      setTimeout(() => {
        // Clear all auth-related data
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("athAIna_csrfToken");
        localStorage.removeItem("user");
        sessionStorage.clear();
        authStore.logout();

        showDeleteConfirmation.value = false;
        close();
        router.push({ name: "Login" });
      }, 2000);
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    deleteError.value =
      error.response?.data?.message ||
      "An error occurred while deleting your account";
    isLoading.value = false;
  }
};
</script>

<template>
  <!-- Delete Confirmation - placed outside the main modal to ensure it appears on top -->
  <account_Delete_Confirmation
    :isVisible="showDeleteConfirmation"
    title="Account Deleted"
    @close="closeDeleteConfirmation"
  />

  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-[9000]"
    style="width: 100vw; height: 100vh; top: 0; left: 0; right: 0; bottom: 0"
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
<style scoped>
/* Ensure modals and overlays properly cover everything */
.fixed.inset-0 {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
