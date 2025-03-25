<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import axios from "@/axios";

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
});

const emit = defineEmits(["close"]);
const router = useRouter();
const step = ref(1);
const error = ref("");
const isVerified = ref("false");

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

    // Get email from props or localStorage
    const userEmail = props.email || localStorage.getItem("signupEmail");

    if (!userEmail) {
      error.value = "Email not found. Please try again.";
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
      // Start countdown again
      startCountdown();
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to resend OTP";
    console.error("Error resending OTP", err);
  }
};

onMounted(() => {
  // Start countdown when component is mounted
  if (props.isVisible) {
    startCountdown();
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
    } else if (countdownInterval) {
      clearInterval(countdownInterval);
    }
  }
);

const handleOTPChange = (e) => {
  const value = e.target.value.replace(/[^0-9]/g, (otpValue.value = value));
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
    event.target.nextElementSibling.focus();
    const nextInput = input.parentElement.children[boxIndex + 1]; // Fixed: changed index to boxIndex
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
    const response = await axios.post("/account/verify-email/", {
      otp: otpValue.value,
    });

    console.log(response.data);

    if (response.data.successful) {
      isVerified.value = true;
      step.value++;
      setTimeout(() => {
        close();
        router.push("/login");
      }, 2000);
    } else {
      error.value = response.data.error;
    }
  } catch (err) {
    console.log(err.response.data);
    error.value = err.response?.data?.message || "Invalid OTP code";
    console.error("OTP verification error", err);
  }
};

const close = () => {
  emit("close");
  step.value = 1;
  error.value = "";
  otpValue.value = "";
  displayOTP.value = ["", "", "", "", "", ""];

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

const previousStep = () => {
  if (step.value > 1) {
    step.value--;
  }
};

watch(step, (newValue) => {
  if (newValue === 3) {
    setTimeout(() => {
      close();
      try {
        router.push("/login");
      } catch (err) {
        console.error("Error redirecting to login page", err);
      }
    }, 2000);
  }
});

// Computed properties
const stepText = computed(() => {
  switch (step.value) {
    case 1:
      return "OTP Verification";
    case 2:
      return "Verification Successful";
    default:
      return "";
  }
});

const detail = computed(() => {
  // Add your detail logic here
});

const buttonText = computed(() => {
  // Add your button text logic here
});
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40"
  >
    <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
      <div class="athAIna-border-inner p-4 text-center">
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
  </div>
</template>

<style scoped>
.btn {
  @apply bg-athAIna-violet py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
  color: white;
}
</style>
