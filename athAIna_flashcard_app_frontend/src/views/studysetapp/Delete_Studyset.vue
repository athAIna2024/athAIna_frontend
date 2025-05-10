<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import Delete_Confirmation from "@/views/studysetapp/Delete_Confirmation.vue";
import axios from '@/axios';
import studySetDb from "@/views/studysetapp/dexie.js";
import flashcardsDB from "@/views/flashcardapp/dexie.js";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const studyset_url = "/studyset/delete/";
const studyset_title = ref("");
const isSuccessful = ref(false);
const message = ref("");


const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Modal Title",
  },
  studySetId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['close']);
const isDeleteConfirmationModalVisible = ref(false);

const openDeleteConfirmationModal = () => {
  isDeleteConfirmationModalVisible.value = true;
};

const close = () => {
  emit('close');
};

const closeDeleteConfirmationModal = () => {
  isDeleteConfirmationModalVisible.value = false;
};

watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    fetchStudySetTitle();
    document.title = `${props.title}`;
  } else {
    document.title = route.meta.title;
  }
});

watch(isDeleteConfirmationModalVisible, (newValue) => {
  if (newValue) {
    document.title = `${props.title}`;
    setTimeout(() => {
      closeDeleteConfirmationModal();
      close();
    }, 500);
  } else {
    document.title = 'Delete Study Set - athAIna';
  }
});

const deleteStudySet = async () => {
  try {
    const request = await axios.delete(`${studyset_url}${props.studySetId}/`);

    isSuccessful.value = request.data.successful;
    message.value = request.data.message;

    if (isSuccessful) {
      const flashcards = await flashcardsDB.flashcards.where({ studyset_id: props.studySetId }).toArray();
      const flashcardIds = flashcards.map(flashcard => flashcard.id);
      await flashcardsDB.flashcards.bulkDelete(flashcardIds);

      await studySetDb.studysets.delete(props.studySetId);

      openDeleteConfirmationModal();

      router.push({
        name: 'Library_Page_Studyset'
      });
      router.go();

    } else {
      isSuccessful.value = false;
      message.value = request.data.message;
    }

  } catch (error) {
    if (error.response.status === 400) {
      isSuccessful.value = error.response.data.successful;
      message.value = error.response.data.message;
    } else {
      isSuccessful.value = false;
      message.value = "An error occurred. Please try again later.";
    }
  }
};

const fetchStudySetTitle = async () => {
  try {
    const response = await axios.get(`${studyset_url}${props.studySetId}/`);

    if (response.data.title) {
      studyset_title.value = response.data.title;
    }

    // console.log("studyset_title", studyset_title.value);
    // console.log("studyset id", props.studySetId);
  } catch (error) {
    console.error(error);
  }
};


</script>

<template>
    <transition name="modal-fade" mode="out-in">
      <div v-if="props.isVisible" class="fixed inset-0 flex items-center justify-center bg-athAIna-black bg-opacity-50 z-40">
        <div class="bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red p-[4px] rounded-[20px] flex flex-col w-[550px]">
          <div class="flex flex-col justify-center items-center bg-athAIna-white p-[15px] rounded-[15px]">
            <p class="text-[16px] m-[40px] text-center"> Are you sure you want to delete {{ studyset_title }} study set? </p>
            <div class="flex justify-between space-x-5 mb-[30px]">
              <div class="flex bg-gradient-to-br from-athAIna-yellow via-athAIna-orange to-athAIna-red p-[4px] rounded-[20px]">
                <button @click="close" class="bg-athAIna-white text-athAIna-violet font-medium w-[210px] rounded-[18px]"> No </button>
              </div>
              <form @submit.prevent="deleteStudySet">
                <button @click="openDeleteConfirmationModal" class="btn w-[210px] font-semibold"> Yes </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>


  <Delete_Confirmation
      :isVisible="isDeleteConfirmationModalVisible"
      title="Study Set Deleted – athAIna"
      @close="closeDeleteConfirmationModal"
  >
  </Delete_Confirmation>
</template>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.modal-fade-enter, .modal-fade-leave-to /* .modal-fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>