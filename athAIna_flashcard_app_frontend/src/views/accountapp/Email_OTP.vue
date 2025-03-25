<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import axios from "@/axios";
import Success_Message from "@/components/Success_Message.vue";
import Loading_Modal from "@/components/Loading_Modal.vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Modal Title",
  },
  email: {
    type: String,
    default: "", // Email can be passed from parent component
  },
  showSuccess: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);
const router = useRouter();
const step = ref(1);
const error = ref("");
const isVerified = ref(false);

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

const resendOTP = async () => {
  try {
    error.value = "";
    isLoading.value = true;
    isLoadingModalVisible.value = true;

    // Get email from props or localStorage
    const userEmail = props.email || localStorage.getItem("signupEmail");

    if (!userEmail) {
      error.value = "Email not found. Please try again.";
      isLoadingModalVisible.value = false;
      isLoading.value = false;
      return;
    }

    // Use the correct payload format for your backend
    const response = await axios.post("/account/resend-otp/", {
      email: userEmail,
      purpose: "signup", // Using the purpose defined in your serializer
    });

    if (response.data.successful) {
      // Clear the current OTP input fields
      otpValue.value = "";
      displayOTP.value = ["", "", "", "", "", ""];

      // Show success message
      isLoadingModalVisible.value = false;
      isSuccessMessageVisible.value = true;

      setTimeout(() => {
        isSuccessMessageVisible.value = false;
        // Start countdown again
        startCountdown();
      }, 2000);
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to resend OTP";
    console.error("Error resending OTP", err);
  } finally {
    isLoading.value = false;
    isLoadingModalVisible.value = false;
  }
};

onMounted(() => {
  // Start countdown when component is mounted
  if (props.isVisible) {
    startCountdown();

    // Show success message if account was created successfully
    if (props.showSuccess) {
      isSuccessMessageVisible.value = true;

      // Hide success message after 2 seconds
      setTimeout(() => {
        isSuccessMessageVisible.value = false;
      }, 2000);
    }
  }
});

onBeforeUnmount(() => {
  // Clear interval when component is unmounted
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

watch(
  () => props.isVisible,
  (newValue) => {
    if (newValue) {
      startCountdown();

      // Show success message if account was created successfully
      if (props.showSuccess) {
        isSuccessMessageVisible.value = true;

        // Hide success message after 2 seconds
        setTimeout(() => {
          isSuccessMessageVisible.value = false;
        }, 2000);
      }
    } else if (countdownInterval) {
      clearInterval(countdownInterval);
    }
  }
);

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

const verifyOTP = async () => {
  try {
    isLoading.value = true;
    isLoadingModalVisible.value = true;

    const response = await axios.post("/account/verify-email/", {
      otp: otpValue.value,
    });

    console.log(response.data);

    if (response.data.successful) {
      isVerified.value = true;
      step.value++;

      // Hide loading modal and show success message
      isLoadingModalVisible.value = false;
      isSuccessMessageVisible.value = true;

      // After success message, close and redirect
      setTimeout(() => {
        isSuccessMessageVisible.value = false;
        close();
        router.push("/login");
      }, 2000);
    } else {
      isLoadingModalVisible.value = false;
      error.value = response.data.error;
    }
  } catch (err) {
    console.log(err.response.data);
    error.value = err.response?.data?.message || "Invalid OTP code";
    console.error("OTP verification error", err);
    isLoadingModalVisible.value = false;
  } finally {
    isLoading.value = false;
  }
};

const close = () => {
  emit("close");
  step.value = 1;
  error.value = "";
  otpValue.value = "";
  displayOTP.value = ["", "", "", "", "", ""];
  isSuccessMessageVisible.value = false;
  isLoadingModalVisible.value = false;

  // Clear countdown interval when closing
  if (countdownInterval) {
    clearInterval(countdownInterval);
    isCountdownActive.value = false;
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

// Computed properties
const successHeader = computed(() => {
  if (isVerified.value) {
    return "Email Verified Successfully";
  }
  return "Account Created Successfully";
});

const successMessage = computed(() => {
  if (isVerified.value) {
    return "Your email has been verified. Redirecting to login page...";
  }
  return "Your account has been created. Please verify your email with the OTP code.";
});
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40"
  >
    <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
      <div class="athAIna-border-inner p-4 text-center relative">
        <!-- Close button -->
        <button
          @click="close"
          class="absolute top-2 right-2 text-athAIna-violet hover:text-athAIna-red focus:outline-none"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

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
      :successHeader="successHeader"
      :successMessage="successMessage"
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
