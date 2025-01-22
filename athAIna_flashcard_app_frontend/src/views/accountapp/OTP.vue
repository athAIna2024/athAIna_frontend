<script setup>
import { ref, watch, computed } from "vue";
import axios from "axios";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Modal Title",
  },
  verificationType: {
    type: String,
    required: true,
    validator: (value) =>
      [("verifyEmail", "forgotPassword", "changePassword")].includes(value)
  },
});

const emit = defineEmits(["close", "verified"]);

const step = ref(1);
const error = ref("");
const otpValue = ref("");
const displayOTP = ref(["", "", "", "", "", ""]);

const API_ENDPOINTS = {
  verifyEmail: "http://localhost:8000/account/verify-email/",
  forgotPassword: "http://localhost:8000/account/verify-password-change-otp/",
  changePassword: "http://localhost:8000/account/verify-change-password-otp/",
};

const handleOTPChange = (e) => {
  const value = e.target.value.replace(/[^0-9]/g, (otpValue.value = value));
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
    prevInput.focus();
    displayOTP.value[boxIndex - 1] = "";
    otpValue.value = displayOTP.value.join("");
  }
};

const nextStep = () => {
  step.value++;
  console.log(otpValue.value);
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
    }, 2000);
  }
});

// Computed properties
const stepText = computed(() => {
  // Add your step text logic here
});

const detail = computed(() => {
  // Add your detail logic here
});

const buttonText = computed(() => {
  // Add your button text logic here
});

const verifyOTP = async () => {
  if (otpValue.value.length !== 6) return;

  try {
    const response = await axios.post(API_ENDPOINTS[props.verificationType], {
      otp: otpValue.value
    });
    if (response.data.successful) {
      if (response.data.password_reset_link) {
        emit("verified", {
          success: true,
          message: response.data.message,
          resetLink: response.data.password_reset_link,
        });
        close();
      } else {
        emit("verified", {
          success: true,
          message: response.data.message,
        });
      }
      console.log(response.data);
      close();
    }
  } catch (err) {
    error.value = err.response?.data?.message || "An error occurred";
  }

  const close = () => {
    emit("close");
    step.value = 1;
    error.value = "";
    otpValue.value = "";
    displayOTP.value = ["", "", "", "", "", ""];
  };
};
// export default {
//   name: 'OTP.vue',
//     props: {
//       isVisible: {
//         type: Boolean,
//         required: true,
//       },
//       title: {
//         type: String,
//         default: "Modal Title",
//       },
//     },
//   data () {
//     return {
//       step: 1,
//     };
//   },
//     methods: {
//       close() {
//         this.$emit("close");
//         this.step = 1;
//       },
//       nextStep() {
//         this.step++;
//       },
//       previousStep() {
//         if (this.step > 1) {
//           this.step--;
//         }
//       },
//     },
//     watch: {
//     step(newValue) {
//       if (newValue === 3) {
//         setTimeout(() => {
//           close();
//         }, 2000);
//       }
//       }
//     },
//     computed: {
//     stepText() {},
//       detail() {},
//       buttonText() {},
//     }
//   }
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
            @click="verifyOTP"
            class="btn w-48"
            :disabled="otpValue.length !== 6"
          >
            Verify
          </button>
        </div>
        <div>
          <!-- Show error if exists -->
          <p v-if="error" class="text-athAIna-red text-sm mt-2">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
