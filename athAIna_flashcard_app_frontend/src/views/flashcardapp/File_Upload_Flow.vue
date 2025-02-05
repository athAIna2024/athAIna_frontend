<script setup>
import { ref, provide } from "vue";
import Upload_File from "@/components/Upload_File.vue";
import File_Ready from "@/components/File_Ready.vue";

const uploadedFile = ref(null);
provide("uploadedFile", uploadedFile);
</script>

<template>
  <Upload_File />
  <File_Ready />
</template>

<style scoped>

</style>