<script setup>
import { ref } from "vue";
import { watch } from "vue";
import axios from "@/axios";
import flashcardsDB from "@/views/flashcardapp/dexie.js";
import studySetDb from "@/views/studysetapp/dexie.js";
import Delete_Confirmation from "@/views/flashcardapp/Delete_Confirmation.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const flashcard_url = "/flashcard/delete/";

const isSuccessful = ref(false);
const message = ref("");

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Delete Flashcard",
  },
  flashcardId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const isDeleteConfirmationModalVisible = ref(false);

const openDeleteConfirmationModal = () => {
  isDeleteConfirmationModalVisible.value = true;
};

const closeDeleteConfirmationModal = () => {
  isDeleteConfirmationModalVisible.value = false;
};

const close = () => {
  emit("close");
};

watch(
  () => props.isVisible,
  (newValue) => {
    if (newValue) {
      document.title = `${props.title}`;
    } else {
      document.title = route.meta.title;
    }
  }
);

watch(isDeleteConfirmationModalVisible, (newValue) => {
  if (newValue) {
    document.title = `${props.title}`;
    setTimeout(() => {
      closeDeleteConfirmationModal();
      close();
    }, 500);
  } else {
    document.title = "Delete Flashcard";
  }
});

const deleteFlashcard = async () => {
  try {
    console.log("FLASHCARD ID ", props.flashcardId);
    const request = await axios.delete(`${flashcard_url}${props.flashcardId}/`);

    isSuccessful.value = request.data.successful;
    message.value = request.data.message;

    const studySetId = request.data.data.studyset_instance;
    await flashcardsDB.flashcards.delete(props.flashcardId);

    const studySet = await studySetDb.studysets.get(Number(studySetId));
    await studySetDb.studysets
      .where("id")
      .equals(studySetId)
      .modify({ flashcard_count: studySet.flashcard_count - 1 });

    if (isSuccessful) {

      router.push({
        name: 'Library_Page_Flashcard',
        params: {
          studySetId: studySet.id,
          studySetTitle: studySet.title,
        },
      });
      router.go();

    }
  } catch (error) {
    if (error.response.status === 400) {
      isSuccessful.value = error.response.data.successful;
      message.value = error.response.data.message;
    } else {
      isSuccessful.value = false;
      message.value = "An error occurred. Please try again.";
    }
  }
};
</script>
<template>
  <transition name="modal-fade" mode="out-in">
    <div
      v-if="isVisible"
      class="fixed inset-0 flex items-center justify-center bg-athAIna-black bg-opacity-50 z-40"
    >
      <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
        <div class="athAIna-border-inner p-4 text-center">
          <div class="flex flex-col justify-center items-center">
            <div class="text-athAIna-base m-[40px] text-center">
              Are you sure you want to delete this flashcard?
            </div>
            <div class="flex flex-row space-x-5 mb-[30px]">
              <div class="athAIna-border-outer p-1 w-48 rounded-full">
                <button
                  @click="close"
                  class="athAIna-border-inner rounded-full"
                >
                  No
                </button>
              </div>

              <form @submit.prevent="deleteFlashcard">
                <button @click="openDeleteConfirmationModal" class="btn w-48">
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <Delete_Confirmation
    :isVisible="isDeleteConfirmationModalVisible"
    title="Delete Confirmed"
    @close="closeDeleteConfirmationModal"
  >
  </Delete_Confirmation>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.modal-fade-enter, .modal-fade-leave-to /* .modal-fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.fade-out {
  opacity: 0;
  transition: opacity 0.5s ease-out;
}
</style>
