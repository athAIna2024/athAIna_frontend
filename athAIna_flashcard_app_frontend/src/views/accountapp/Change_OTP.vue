<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "@/axios";
import { useUserStore } from "../../../stores/userStore";
import Success_Message from "@/components/Success_Message.vue";
import Loading_Modal from "@/components/Loading_Modal.vue";

const props = defineProps({
  purpose: {
    type: String,
    default: "password-change",
  },
});

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const error = ref("");
const isVerified = ref(false);
const userEmail = ref("");

// States for loading and modals
const isLoading = ref(false);
const isLoadingModalVisible = ref(false);
const isSuccessMessageVisible = ref(false);

const otpValue = ref("");
const displayOTP = ref(["", "", "", "", "", ""]);

// Countdown and OTP resend functionality
const countdown = ref(5);
const isCountdownActive = ref(false);
let countdownInterval = null;

onMounted(() => {
  // Get the email from route params or vuex store
  userEmail.value = route.query.email || userStore.getEmail() || "";
  if (!userEmail.value) {
    error.value = "Email not found. Please try again.";
    return;
  }

  startCountdown();
});

onBeforeUnmount(() => {
  // Clear interval when component is unmounted
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

const startCountdown = () => {
  isCountdownActive.value = true;
  countdown.value = 5;

  countdownInterval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval);
      isCountdownActive.value = false;
    }
  }, 1000);
};

const handleOTPChange = (e) => {
  const value = e.target.value.replace(/[^0-9]/g, "");
  otpValue.value = value;
  displayOTP.value = [...value.padEnd(6, "")];
};

const handleBoxInput = (boxIndex, event) => {
  const input = event.target;
  const value = input.value.slice(-1);
  if (!/^[0-9]+$/.test(value)) {
    input.value = "";
    return;
  }
  displayOTP.value[boxIndex] = value;
  otpValue.value = displayOTP.value.join("");
  if (value && boxIndex < 5) {
    const nextInput = input.parentElement.children[boxIndex + 1];
    if (nextInput) {
      nextInput.focus();
    }
  }
};

const handleBoxKeydown = (boxIndex, event) => {
  if (
    event.key === "Backspace" &&
    !displayOTP.value[boxIndex] &&
    boxIndex > 0
  ) {
    event.preventDefault();
    const prevInput = event.target.previousElementSibling;
    if (prevInput) {
      prevInput.focus();
      displayOTP.value[boxIndex - 1] = "";
      otpValue.value = displayOTP.value.join("");
    }
  }
};

const nextStep = () => {
  if (otpValue.value.length === 6) {
    verifyOTP();
  } else {
    error.value = "Please enter a valid OTP code";
  }
};

const closeLoadingModal = () => {
  isLoadingModalVisible.value = false;
};

const closeSuccessMessage = () => {
  isSuccessMessageVisible.value = false;
};

const verifyOTP = async () => {
  try {
    isLoading.value = true;
    isLoadingModalVisible.value = true;

    const response = await axios.post("/account/verify-password-change-otp/", {
      otp: otpValue.value,
      email: userEmail.value,
    });

    if (response.data.successful) {
      isVerified.value = true;
      isLoadingModalVisible.value = false;
      isSuccessMessageVisible.value = true;

      const resetLink = response.data.password_reset_link;
      const urlParts = resetLink.split("/");
      const uidb64 = urlParts[urlParts.length - 3];
      const token = urlParts[urlParts.length - 2];

      setTimeout(() => {
        router.push({
          name: "Change_Password_Page",
          params: { uidb64, token },
        });
      }, 1000);
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Invalid OTP code";
    isLoadingModalVisible.value = false;
  } finally {
    isLoading.value = false;
  }
};

const resendOTP = async () => {
  try {
    if (isCountdownActive.value) return;

    error.value = "";
    isLoading.value = true;
    isLoadingModalVisible.value = true;

    const response = await axios.post("/account/resend-otp/", {
      email: userEmail.value,
      purpose: props.purpose,
    });

    if (response.data.successful) {
      otpValue.value = "";
      displayOTP.value = ["", "", "", "", "", ""];

      isLoadingModalVisible.value = false;
      isSuccessMessageVisible.value = false;

      setTimeout(() => {
        isSuccessMessageVisible.value = false;
        startCountdown();
      }, 2000);
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to resend OTP";
  } finally {
    isLoading.value = false;
    isLoadingModalVisible.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-athAIna-dark py-12 px-4"
  >
    <div class="athAIna-border-outer p-1 flex flex-col w-full max-w-[550px]">
      <div class="athAIna-border-inner p-4 text-center relative">
        <h1 class="m-8 text-athAIna-lg font-semibold">OTP VERIFICATION</h1>
        <p class="m-8 text-athAIna-md">
          We've sent a One Time Password (OTP) to verify your email.
        </p>
        <p v-if="error" class="text-athAIna-red text-sm mb-4">{{ error }}</p>
        <div class="flex flex-row justify-center items-center">
          <input
            type="text"
            v-model="otpValue"
            class="sr-only"
            @input="handleOTPChange"
          />
          <div class="flex flex-row justify-center items-center gap-2">
            <input
              v-for="(digit, boxIndex) in displayOTP"
              :key="boxIndex"
              type="text"
              maxlength="1"
              v-model="displayOTP[boxIndex]"
              @input="handleBoxInput(boxIndex, $event)"
              @keydown="handleBoxKeydown(boxIndex, $event)"
              class="w-12 h-12 text-center text-2xl font-bold border-2 border-athAIna-violet text-athAIna-violet rounded-lg focus:outline-none focus:border-athAIna-yellow"
            />
          </div>
        </div>

        <!-- Resend OTP section -->
        <div class="mt-4 mb-2 text-sm text-athAIna-violet">
          <span v-if="isCountdownActive"
            >Resend OTP in {{ countdown }} seconds</span
          >
          <button
            v-else
            @click="resendOTP"
            class="text-athAIna-red hover:underline focus:outline-none"
          >
            Resend OTP
          </button>
        </div>

        <div class="m-8 flex justify-center">
          <button
            @click="nextStep"
            class="btn w-48"
            :disabled="otpValue.length !== 6"
          >
            Verify
          </button>
        </div>
      </div>
    </div>

    <!-- Loading Modal -->
    <Loading_Modal
      :loadingMessage="
        isVerified ? 'Verifying your email' : 'Processing your request'
      "
      :loadingHeader="'Please wait'"
      :isVisible="isLoadingModalVisible"
      :condition="!isLoading"
      @close="closeLoadingModal"
    />

    <!-- Success Message -->
    <Success_Message
      :successHeader="'Verification Successful!'"
      :successMessage="'Redirecting to change your password...'"
      :isVisible="isSuccessMessageVisible"
      @close="closeSuccessMessage"
    />
  </div>
</template>

<style scoped>
.btn {
  @apply bg-athAIna-violet py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
  color: white;
}
</style>
