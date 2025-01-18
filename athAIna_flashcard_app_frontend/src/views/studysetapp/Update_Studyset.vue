<script>
export default {
  name: 'Update_Studyset',
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
  methods: {
    close() {
      this.$emit("close");
    },
  },
  watch: {
    isVisible(newValue) {
      if (newValue) {
        document.title = `${this.title}`;
      } else {
        document.title = `Library – athAIna`
      }
    },
  }
};

</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-athAIna-black bg-opacity-50 z-50">
    <div class="bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red z-50 p-[4px] w-[620px] rounded-[20px] shadow-lg w-96" style="background-color: white !important;">
      <div class="bg-athAIna-white p-[30px] rounded-[15px] flex flex-col">

        <div class="flex justify-end mb-[30px]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" @click="close" class="size-6 hover:cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
        <div class="flex justify-center mb-[30px]">
          <h2 class="font-semibold text-[20px]">Update Study Set</h2>
        </div>

        <div class="flex flex-col justify-between gap-2 mb-[30px] text-[16px] font-medium">
          <p> Study Set Name </p>
          <input type="text" placeholder="Name" class="flex justify-start border-athAIna-violet border-solid border-[3px] rounded-[20px] placeholder-athAIna-orange text-athAIna-orange text-[14px] p-[5px] pl-[14px]"/>
        </div>

        <div class="flex flex-col justify-between gap-2 mb-[30px] text-[16px] font-medium">
          <p> Subject </p>
          <div class="flex justify-end border-athAIna-violet border-[3px] rounded-[20px] p-[5px] pr-[14px]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-[20px] hover:cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        <div class="flex flex-col justify-between gap-2 mb-[50px] text-[16px] font-medium">
          <p> Description </p>
          <textarea placeholder="Type Description (Optional)" class="focus:outline-none text-athAIna-orange border-athAIna-violet border-solid border-[3px] rounded-[20px] placeholder-athAIna-orange text-[14px] p-[14px] pl-[14px] h-[82px]"/>
        </div>

        <div class="flex justify-end mb-[20px]">
          <button @click="close" class="btn font-medium w-[200px]"> Confirm Changes </button>
        </div>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>