<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "@/axios";
import { useUserStore } from "../../../stores/userStore";
import Success_Message from "@/components/Success_Message.vue";

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

// Use email from props or from route params
const userEmail = computed(
  () => props.email || route.params.email || userStore.getEmail()
);

const error = ref("");
const isVerified = ref(false);
const isSuccessMessageVisible = ref(false);

const otpValue = ref("");
const displayOTP = ref(["", "", "", "", "", ""]);

// Countdown and OTP resend functionality
const countdown = ref(10);
const isCountdownActive = ref(false);
let countdownInterval = null;

const startCountdown = () => {
  isCountdownActive.value = true;
  countdown.value = 10;

  if (countdownInterval) {
    clearInterval(countdownInterval);
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
    if (isCountdownActive.value) return;

    error.value = "";

    const response = await axios.post("/account/resend-otp/", {
      email: userEmail.value,
      purpose: props.purpose,
    });

    if (response.data.successful) {
      otpValue.value = "";
      displayOTP.value = ["", "", "", "", "", ""];
      startCountdown();
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to resend OTP";
  }
};

onMounted(() => {
  startCountdown();
});

onBeforeUnmount(() => {
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
      displayOTP.value[boxIndex] = "";
      otpValue.value = displayOTP.value.join("");
    } else if (boxIndex > 0) {
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

const closeSuccessMessage = () => {
  isSuccessMessageVisible.value = false;
};
</script>

<template>
  <div
    class="flex flex-row min-h-screen items-center justify-center content-center text-center bg-center"
  >
    <!-- Right Card -->
    <div
      class="mt-8 ml-10 rotate-[-12deg] shadow-md w-[400px] h-[550px] rounded-lg bg-gradient-to-br from-athAIna-yellow to-athAIna-red"
    ></div>

    <!-- Left Card -->
    <div
      class="mt-16 mr-12 rotate-[15deg] shadow-md w-[400px] h-[500px] rounded-lg bg-gradient-to-bl from-athAIna-yellow to-athAIna-red"
    ></div>

    <!-- Middle Card -->
    <div
      class="absolute bg-gradient-to-b rounded-[15px] from-athAIna-yellow via-athAIna-orange to-athAIna-red w-[450px] h-[600px] bg-athAIna-white flex flex-col p-[5px]"
    >
      <div
        class="absolute m-0 w-[440px] h-[590px] rounded-[10px] bg-athAIna-white flex flex-col p-10"
      >
        <!-- Back Button -->
        <div class="absolute top-8 left-8 z-10">
          <button
            @click="navigateBack"
            class="flex items-center text-athAIna-violet hover:text-athAIna-red transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6 mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <span class="font-medium">Back to Library</span>
          </button>
        </div>

        <!-- Logo -->
        <div class="mt-5 w-auto flex flex-row justify-center items-center">
          <img
            src="@/assets/athAIna.svg"
            alt="Logo"
            class="w-[185px] h-[111px] mb-3"
          />
        </div>

        <!-- Title -->
        <h1
          class="text-athAIna-violet font-semibold text-lg w-full text-center"
        >
          OTP Verification
        </h1>

        <div class="flex flex-col items-center mt-5">
          <p class="mb-4 text-gray-600 text-sm">
            We've sent a verification code to your email
          </p>

          <!-- Error Message -->
          <p v-if="error" class="text-athAIna-red text-xs mb-4">{{ error }}</p>

          <!-- OTP Input Boxes -->
          <div class="flex flex-row justify-center items-center mt-4">
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
                class="w-11 h-11 text-center text-xl font-bold border-2 border-athAIna-violet text-athAIna-violet rounded-lg focus:outline-none focus:border-athAIna-yellow"
              />
            </div>
          </div>

          <!-- Resend OTP section -->
          <div class="mt-6 text-sm text-athAIna-violet">
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
          <div class="mt-8">
            <button
              @click="nextStep"
              class="verify-btn w-48"
              :disabled="otpValue.length !== 6"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Message Component -->
    <Success_Message
      :successHeader="'Verification Successful!'"
      :successMessage="'Redirecting to change your password...'"
      :isVisible="isSuccessMessageVisible"
      @close="closeSuccessMessage"
    />
  </div>
</template>

<style scoped>
.verify-btn {
  @apply bg-gradient-to-r from-athAIna-yellow to-athAIna-red text-center py-2 px-4 font-medium rounded-xl shadow-md hover:from-athAIna-red hover:to-athAIna-yellow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed;
  color: #ffffff;
}
</style>
