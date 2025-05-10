<script setup>
import { ref } from "vue";
import Upload_File from "@/views/flashcardapp/Upload_File.vue";
import File_Ready from "@/views/flashcardapp/File_Ready.vue";

const uploadedFile = ref(null);

console.log("Uploaded File:", uploadedFile.value);

// Handle file update from child (Upload_File)
const handleFileUpdate = (newFile) => {
  console.log("Uploaded File:", uploadedFile.value);
  uploadedFile.value = newFile; // Update the uploaded file
  console.log("Uploaded File:", uploadedFile.value);
};
</script>

<template>
  <Upload_File :uploadedFile="uploadedFile" @update:uploadedFile="handleFileUpdate" />
  <File_Ready :uploadedFile="uploadedFile" />
</template>

<style scoped>

</style>