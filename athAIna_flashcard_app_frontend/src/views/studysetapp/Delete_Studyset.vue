<script>
import Delete_Confirmation from "@/views/studysetapp/Delete_Confirmation.vue";

export default {
  name: 'Delete_Studyset',
  components: {Delete_Confirmation},
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
  data() {
    return {
      isDeleteConfirmationModalVisible: false,
    }
  },
  methods: {
    openDeleteConfirmationModal() {
      this.isDeleteConfirmationModalVisible = true;
    },
    close() {
      this.$emit("close");
    },
    closeDeleteConfirmationModal() {
      this.isDeleteConfirmationModalVisible = false;
    }
  },
  watch: {
    isVisible(newValue) {
      if (newValue) {
        document.title = `${this.title}`;
      } else {
        document.title = `Library – athAIna`
      }
    },
    isDeleteConfirmationModalVisible(newValue) {
      if (newValue) {
        document.title = `${this.title}`;
        setTimeout(() => {
          this.closeDeleteConfirmationModal();
          this.close();
        }, 2000);
      } else {
        document.title = `Delete Studyset – athAIna`
      }
    }
  }
};
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-athAIna-black bg-opacity-50 z-40">
    <div class="bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red p-[4px] rounded-[20px] flex flex-col w-[550px]">
      <div class="flex flex-col justify-center items-center bg-athAIna-white p-[15px] rounded-[15px]">
        <p class="text-[16px] m-[40px]"> Are you sure you want to delete this study set? </p>
        <div class="flex justify-between space-x-5 mb-[30px]">
          <div class="flex bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red p-[4px] rounded-[20px]">
            <button @click="close" class="bg-athAIna-white text-athAIna-violet font-medium w-[210px] rounded-[18px]"> No </button>
          </div>
          <button @click="openDeleteConfirmationModal" class="btn w-[210px] font-semibold"> Yes </button>
        </div>
      </div>
    </div>
  </div>

  <Delete_Confirmation
    :isVisible="isDeleteConfirmationModalVisible"
    title="Study Set Deleted – athAIna"
    @close="closeDeleteConfirmationModal"
  >
  </Delete_Confirmation>
</template>

<style scoped>
</style>