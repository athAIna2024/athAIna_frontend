<script>
export default {
  name: 'Generate_Flashcard_with_AI.vue',
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
    stepText() {
      switch (this.step) {
      case 1:
        return "Upload Files to Generate";
      case 2:
        return "File ready";
      case 3:
        return "File submitted";
      default:
        return "Upload Files to Generate";
      }
    },
      detail() {
        if (this.step === 2) {
          return "note.docx";
        } else {
          return "";
        }
      },
      buttonText() {
        switch (this.step) {
          case 1:
            return "Upload";
          case 2:
            return "Submit";
          case 3:
            return "";
          default:
            return "Upload Files to Generate";
        }
      },
    }
  }
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40">
    <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
      <div class="athAIna-border-inner p-4 text-center">
        <div class="flex justify-start pl-4 text-athAIna-lg">
          <button @click="previousStep" v-if="step > 1 && step < 2"> < </button>
          <button @click="close" v-else> < </button>
        </div>
        <h1 class="mt-8 text-athAIna-lg font-semibold"> {{ stepText }} </h1>
        <p class="mb-8 text-athAIna-md"> {{ detail }} </p>
        <div class="mb-8 flex justify-center" v-if="step < 3">
          <button @click="nextStep" class="btn w-48"> {{ buttonText }} </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>