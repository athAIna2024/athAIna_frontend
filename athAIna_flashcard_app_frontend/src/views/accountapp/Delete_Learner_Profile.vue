<!--TODO MAKE THIS INTO <SCRIPT SETUP> COMPONENT API</SCRIPT>-->
<script>
export default {
  name: "Delete_Learner_Profile",
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
};
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40"
  >
    <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
      <div class="athAIna-border-inner p-4 text-center">
        <div class="flex justify-start m-8 pl-4 text-athAIna-lg">
          Are you sure you want to delete your account?
        </div>
        <div class="mb-8 flex justify-center">
          <button @click="close" class="btn-alt w-48 mr-5">No</button>
          <button class="btn w-48">
            <router-link :to="{ name: 'Login1' }"> Yes </router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
