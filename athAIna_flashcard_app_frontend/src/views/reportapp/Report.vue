<script setup>
import { ref } from "vue";

// Reactive Variables
const study_set_placeholder = ref("Choose a Study Set");
const subject_placeholder = ref("Filter by Subject");
const title = ref("Study Set Title");
const select_study_set = ref(false);
const select_subject = ref(false);
const studysets = ['Networking', 'Man, Church, Society']; // To be fetched from DB
const subjects = ['Arts', 'Technology', 'Relationships'];

// Components
import Subject_Selector from "@/components/Subject_Selector.vue";
import Date_Range_Selector from "@/components/Date_Range_Selector.vue";
import Floating_Dropdown from "@/components/Floating_Dropdown.vue";

// Methods
const toggleModal = (modalName) => {
  modalName.value = !modalName.value;
}
</script>

<template>
  <div class="h-screen">
    <div class="flex flex-col justify-center gap-y-3 content-center w-screen">
      <div class="m-20 flex flex-row justify-between w-auto">
        <p class="font-semibold text-lg">{{ title }}</p>
        <div class="flex flex-row justify-between items-center gap-x-10">

          <!-- Study Set Selector-->
          <div class="flex flex-col">
            <Subject_Selector
                :placeholder="study_set_placeholder"
                @click="select_study_set=!select_study_set"
                class="relative w-[263px]"/>
            <Floating_Dropdown v-if="select_study_set"
                               :items="studysets"
                               top="240px"
                               right="667px"
                               height="max-content"
                               width="max-content">
            </Floating_Dropdown>
          </div>

          <!-- Subject Selector -->
          <div class="flex flex-col">
            <Subject_Selector
                :placeholder="subject_placeholder"
                @click="select_subject=!select_subject"
                class="relative w-[263px]"/>
            <Floating_Dropdown v-if="select_subject"
                               :items="subjects"
                               top="240px"
                               right="365px"
                               height="max-content"
                               width="260px">
            </Floating_Dropdown>
          </div>

          <Date_Range_Selector/>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>