<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

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

const emit = defineEmits(["close"]);

const step = ref(1);
const error = ref("");
const isVerified = ref("false");

const otpValue = ref("");
const displayOTP = ref(["", "", "", "", "", ""]);

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
    const nextInput = input.parentElement.children[index + 1];
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
    const response = await axios.post(
        "http://localhost:8009/account/verify-forgot-password-otp/",
        {
          otp: otpValue.value,
        }
    );

    if (response.data.successful) {
      isVerified.value = true;
      step.value++;

      // Extract the uidb64 and token from the password_reset_link
      const resetLink = response.data.password_reset_link;
      const [uidb64, token] = resetLink.split('/').slice(-3, -1);

      // Redirect to the reset password page with the tokens
      setTimeout(() => {
        close();
        router.push({
          name: 'Forgot_password_page',
          params: { uidb64, token }
        });
      }, 2000);
    }
  } catch (err) {
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
        router.push("/Forgot_Password_Page");
      } catch (err) {
        console.error("Error redirecting to Forgot page", err);
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
          <!-- <input
            type="text"
            maxlength="1"
            class="text-[24px] font-bold border-2 border-athAIna-violet text-athAIna-violet placeholder-athAIna-violet focus:outline-none ring- ring-athAIna-yellow w-[50px] rounded-[15px] m-[4px] h-[50px] text-center"
          />
          <input
            type="text"
            maxlength="1"
            class="text-[24px] font-bold border-2 border-athAIna-violet text-athAIna-violet placeholder-athAIna-violet focus:outline-none ring- ring-athAIna-yellow w-[50px] rounded-[15px] m-[4px] h-[50px] text-center"
          />
          <input
            type="text"
            maxlength="1"
            class="text-[24px] font-bold border-2 border-athAIna-violet text-athAIna-violet placeholder-athAIna-violet focus:outline-none ring- ring-athAIna-yellow w-[50px] rounded-[15px] m-[4px] h-[50px] text-center"
          />
          <input
            type="text"
            maxlength="1"
            class="text-[24px] font-bold border-2 border-athAIna-violet text-athAIna-violet placeholder-athAIna-violet focus:outline-none ring- ring-athAIna-yellow w-[50px] rounded-[15px] m-[4px] h-[50px] text-center"
          />
          <input
            type="text"
            maxlength="1"
            class="text-[24px] font-bold border-2 border-athAIna-violet text-athAIna-violet placeholder-athAIna-violet focus:outline-none ring- ring-athAIna-yellow w-[50px] rounded-[15px] m-[4px] h-[50px] text-center"
          />
          <input
            type="text"
            maxlength="1"
            class="text-[24px] font-bold border-2 border-athAIna-violet text-athAIna-violet placeholder-athAIna-violet focus:outline-none ring- ring-athAIna-yellow w-[50px] rounded-[15px] m-[4px] h-[50px] text-center"
          /> -->
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

<style scoped></style>
