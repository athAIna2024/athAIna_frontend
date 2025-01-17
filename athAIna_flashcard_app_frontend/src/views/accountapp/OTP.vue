<script>
export default {
  name: 'OTP.vue',
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        default: "Modal Title",
      },
    },
  data () {
    return {
      step: 1,
    };
  },
    methods: {
      close() {
        this.$emit("close");
        this.step = 1;
      },
      nextStep() {
        this.step++;
      },
      previousStep() {
        if (this.step > 1) {
          this.step--;
        }
      },
    },
    watch: {
    step(newValue) {
      if (newValue === 3) {
        setTimeout(() => {
          close();
        }, 2000);
      }
      }
    },
    computed: {
    stepText() {},
      detail() {},
      buttonText() {},
    }
  }
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40">
    <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
      <div class="athAIna-border-inner p-4 text-center">
        <h1 class="m-8 text-athAIna-lg font-semibold"> OTP VERIFICATION </h1>
        <p class="m-8 text-athAIna-md"> We've sent a One Time Password (OTP) to verify your email.</p>
        <div class="flex flex-row justify-center items-center">
          <input type="text" minlength="1" class="text-[14px] border-2 border-athAIna-violet text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-[50px] rounded-[15px] m-[4px] h-[50px]" />
          <input type="text" minlength="1" class="text-[14px] border-2 border-athAIna-violet text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-[50px] rounded-[15px] m-[4px] h-[50px]" />
          <input type="text" minlength="1" class="text-[14px] border-2 border-athAIna-violet text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-[50px] rounded-[15px] m-[4px] h-[50px]" />
          <input type="text" minlength="1" class="text-[14px] border-2 border-athAIna-violet text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-[50px] rounded-[15px] m-[4px] h-[50px]" />
          <input type="text" minlength="1" class="text-[14px] border-2 border-athAIna-violet text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-[50px] rounded-[15px] m-[4px] h-[50px]" />
          <input type="text" minlength="1" class="text-[14px] border-2 border-athAIna-violet text-athAIna-violet placeholder-athAIna-violet focus: outline-none ring- ring-athAIna-yellow w-[50px] rounded-[15px] m-[4px] h-[50px]" />
        </div>
        <div class="m-8 flex justify-center">
          <button @click="nextStep" class="btn w-48"> Verify </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>