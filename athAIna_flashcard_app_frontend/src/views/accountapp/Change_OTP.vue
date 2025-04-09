<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "@/axios";
import { useUserStore } from "../../../src/../stores/userStore";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const props = defineProps({
  title: {
    type: String,
    default: "OTP Verification",
  },
  email: {
    type: String,
    required: false,
    default: "",
  },
  purpose: {
    type: String,
    default: "change_password",
  },
});

const emit = defineEmits(["verification-success"]);

// Use email from props or from route params
const userEmail = computed(
  () => props.email || route.params.email || userStore.getEmail()
);

const step = ref(1);
const error = ref("");
const isVerified = ref(false);

const otpValue = ref("");
const displayOTP = ref(["", "", "", "", "", ""]);

// Countdown and OTP resend functionality
const countdown = ref(10); // Keep at 10 seconds as requested
const isCountdownActive = ref(false);
let countdownInterval = null;

const startCountdown = () => {
  isCountdownActive.value = true;
  countdown.value = 10; // Keep at 10 seconds

  if (countdownInterval) {
    clearInterval(countdownInterval); // Clear any existing interval
  }

  countdownInterval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval);
      isCountdownActive.value = false;
    }
  }, 1000);
};

const resendOTP = async () => {
  try {
    // Only proceed if countdown is not active
    if (isCountdownActive.value) return;

    error.value = "";
    console.log("Resending OTP to:", userEmail.value); // Debug log

    const response = await axios.post("/account/resend-otp/", {
      email: userEmail.value,
      purpose: props.purpose,
    });

    console.log("Resend OTP response:", response.data); // Debug log

    if (response.data.successful) {
      // Clear the current OTP input fields
      otpValue.value = "";
      displayOTP.value = ["", "", "", "", "", ""];
      // Start countdown again
      startCountdown();
    }
  } catch (err) {
    console.error("Error resending OTP:", err);
    error.value = err.response?.data?.message || "Failed to resend OTP";
  }
};

onMounted(() => {
  // Start countdown when component is mounted
  startCountdown();
});

onBeforeUnmount(() => {
  // Clear interval when component is unmounted
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

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
  if (event.key === "Backspace") {
    if (displayOTP.value[boxIndex]) {
      // If current box has a value, clear it
      displayOTP.value[boxIndex] = "";
      otpValue.value = displayOTP.value.join("");
    } else if (boxIndex > 0) {
      // If current box is empty and not the first box, go to previous box
      event.preventDefault();
      const prevInput = event.target.previousElementSibling;
      if (prevInput) {
        prevInput.focus();
        displayOTP.value[boxIndex - 1] = "";
        otpValue.value = displayOTP.value.join("");
      }
    }
  }
};

const verifyOTP = async () => {
  try {
    const response = await axios.post("/account/verify-password-change-otp/", {
      otp: otpValue.value,
      email: userEmail.value,
    });

    if (response.data.successful) {
      isVerified.value = true;
      step.value++;

      // Extract the uidb64 and token from the password_reset_link
      const resetLink = response.data.password_reset_link;
      // Parse the URL to extract uidb64 and token
      const urlParts = resetLink.split("/");
      const uidb64 = urlParts[urlParts.length - 3];
      const token = urlParts[urlParts.length - 2];

      // Redirect to the reset password page with the tokens
      setTimeout(() => {
        router.push({
          name: "Change_Password_Page",
          params: { uidb64, token },
        });
      }, 1000);
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Invalid OTP code";
    console.error("OTP verification error", err);
  }
};

const navigateBack = () => {
  router.push({ name: "Library_Page_Studyset" });
};

const nextStep = () => {
  if (otpValue.value.length === 6) {
    verifyOTP();
  } else {
    error.value = "Please enter a valid OTP code";
  }
};

const previousStep = () => {
  if (step.value > 1) {
    step.value--;
  }
};

watch(step, (newValue) => {
  if (newValue === 3) {
    setTimeout(() => {
      emit("verification-success");
    }, 2000);
  }
});

// Computed properties for step text
const stepText = computed(() => {
  switch (step.value) {
    case 1:
      return "OTP VERIFICATION";
    case 2:
      return "Verification Successful";
    case 3:
      return "Redirecting...";
    default:
      return "";
  }
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="athAIna-card">
        <!-- Header with back button -->
        <div class="flex items-center justify-between mb-6">
          <button
            @click="navigateBack"
            class="text-athAIna-violet hover:text-athAIna-red focus:outline-none flex items-center"
            aria-label="Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>
        </div>

        <!-- Step 1: OTP Entry -->
        <div v-if="step === 1" class="text-center">
          <h1 class="text-2xl font-bold text-athAIna-violet mb-6">
            {{ stepText }}
          </h1>
          <p class="mb-6 text-gray-600">We've sent a verification code</p>

          <p v-if="error" class="text-athAIna-red text-sm mb-4">{{ error }}</p>

          <!-- OTP Input Boxes -->
          <div class="flex flex-row justify-center items-center">
            <input
              type="text"
              v-model="otpValue"
              class="sr-only"
              @input="handleOTPChange"
            />
            <div class="flex flex-row justify-center items-center gap-2">
              <input
                v-for="(digit, index) in displayOTP"
                :key="index"
                type="text"
                maxlength="1"
                :value="digit"
                @input="handleBoxInput(index, $event)"
                @keydown="handleBoxKeydown(index, $event)"
                class="w-12 h-12 text-center text-2xl font-bold border-2 border-athAIna-violet text-athAIna-violet rounded-lg focus:outline-none focus:border-athAIna-yellow"
              />
            </div>
          </div>

          <!-- Resend OTP section -->
          <div class="mt-6 mb-6 text-sm text-athAIna-violet">
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

          <!-- Verify Button -->
          <div class="mt-8 flex justify-center">
            <button
              @click="nextStep"
              class="w-48 bg-athAIna-orange text-white py-3 px-8 rounded-xl hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="otpValue.length !== 6"
            >
              Verify
            </button>
          </div>
        </div>

        <!-- Step 2: Verification Success -->
        <div v-else-if="step === 2" class="text-center py-8">
          <div class="flex justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p class="text-xl font-medium text-athAIna-violet mb-2">
            Verification Successful!
          </p>
          <p class="text-athAIna-violet mb-6">
            Redirecting to change your password...
          </p>

          <div class="w-full h-2 bg-gray-200 rounded-full mt-4">
            <div
              class="bg-athAIna-orange h-full rounded-full animate-pulse"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Page-specific styles */
.athAIna-card {
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  background-image: linear-gradient(white, white),
    linear-gradient(to bottom right, #da384c, #f5a524);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
</style>
