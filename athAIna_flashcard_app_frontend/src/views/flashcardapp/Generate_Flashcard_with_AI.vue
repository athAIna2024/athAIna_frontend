<script setup>
import { ref, computed } from "vue";
import Upload_File from "@/views/flashcardapp/Upload_File.vue";
import File_Ready from "@/views/flashcardapp/File_Ready.vue";
import Page_Selector from "@/views/flashcardapp/Page_Selector.vue";
import Confirmation_Prompt from "@/components/Confirmation_Prompt.vue";
import Loading_Modal from "@/components/Loading_Modal.vue";
import Error_Message from "@/components/Error_Message.vue";
import Warning_Message from "@/components/Warning_Message.vue";
import Success_Message from "@/components/Success_Message.vue";
// import Generation_Logic from "@/views/studysetapp/Generation_Logic.vue";

// Reactive state variables
const step = ref(1);
const modalState = ref("success"); // 'error', 'success', 'warning', 'loading'
const loadingMessage = ref("");
const errorMessage = ref("");
const warningMessage = ref("");
const successMessage = ref("");

// Props
const props = defineProps({
  isVisible: Boolean,
});

// Emits
const emit = defineEmits(["close"]);

// Computed property to dynamically load step components
const currentStepComponent = computed(() => {
  switch (step.value) {
    case 1:
      console.log("Step:", step.value); // For debugging only
      console.log("Showing Upload_File")
      return Upload_File;
    case 2:
      console.log("Showing File_Ready")
      return File_Ready;
    case 3:
      console.log("Showing Page_Selector")
      return Page_Selector;
    default:
      console.log("⚠️ Defaulting to Library");
      step.value = 1;
      emit('close');
  }
});

// Methods
const nextStep = () => {
  if (step.value < 4) step.value++
  console.log("Step:", step.value); // For debugging only
};

const previousStep = () => {
  if (step.value > 1) step.value--;
  console.log("Step: ", step.value); // For debugging only
};

const close = () => {
  emit("close");
  console.log("Closing modal"); // For debugging only
};

const showLoadingModal = (message) => {
  loadingMessage.value = message;
  modalState.value = "loading";
};

const showErrorModal = (message) => {
  errorMessage.value = message;
  modalState.value = "error";
};

const showWarningModal = (message) => {
  warningMessage.value = message;
  modalState.value = "warning";
};

const showSuccessModal = (message) => {
  successMessage.value = message;
  modalState.value = "success";
};

</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40">
    <div class="athAIna-border-outer p-1 flex flex-col w-auto">
      <div class="athAIna-border-inner px-3 py-6 text-center">
        <!-- FIXME: FIX LOGIC. ADD UPLOAD BUTTON. -->

        <!-- Back Button Logic -->
        <div class="flex justify-start text-athAIna-lg" v-show="step === 1">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
               class="size-6 hover:cursor-pointer" @click="previousStep" v-if="step > 1 && step < 4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
               class="size-6 hover:cursor-pointer" @click="close" v-else>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>

        </div>

        <!-- Main Step Component -->
        <component
            :is="currentStepComponent"
            :step="step"
            @next="nextStep"
            @prev="previousStep"
            @loading="showLoadingModal"
            @error="showErrorModal"
            @warning="showWarningModal"
            @success="showSuccessModal"
            @close="close"
        ></component>

        <!--        &lt;!&ndash; Error Modal &ndash;&gt;-->
        <!--        <div v-if="modalState.value === 'error'" class="error-modal">-->
        <!--          <h2>Error</h2>-->
        <!--          <p>{{ errorMessage.value }}</p>-->
        <!--          <button @click="modalState.value = null">Close</button>-->
        <!--        </div>-->

        <!--        &lt;!&ndash; Success Modal &ndash;&gt;-->
        <!--        <Success_Message-->
        <!--            v-if="modalState === 'success'"-->
        <!--            :successMessage="successMessage"-->
        <!--            @close="modalState = ''"-->
        <!--        />-->

      </div>
    </div>
  </div>
</template>

<style scoped>
</style>