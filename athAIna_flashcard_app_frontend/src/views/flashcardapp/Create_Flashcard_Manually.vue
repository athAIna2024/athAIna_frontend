<script setup>

import {useRoute} from "vue-router";
import { useStudysetStore} from "../../../stores/studySetStore.js";

const route = useRoute();
const store = useStudysetStore();
const studySetName = store.studySetTitle;

</script>

<template>
  <div class="text-athAIna-violet text-athAIna-lg font-semibold mx-4 my-8">
    <div class="flex flex-row space-x-6 my-2 mx-8 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
      <div>
        Create flashcard for "<span>{{ studySetName}}</span>"
      </div>
    </div>

  </div>
  <form class="mx-12 my-8">

      <div class="athAIna-border-outer p-1 shadow-xl">
        <div class="athAIna-border-inner py-4">

          <div>
            <div class="question mx-16 my-2">
              <div class="border-athAIna-violet border-2 rounded-lg p-4 w-full">
                <div class="flex flex-col gap-4">
                  <div class="athAIna-border-outer p-1">
                    <div class="athAIna-border-inner py-1">
                      <textarea class="w-full rounded-lg p-4 border-0 text-athAIna-base text-athAIna-violet focus:outline-none" rows="5"></textarea>
                    </div>
                  </div>

                  <label for="image-upload">
                    <div class="athAIna-border-outer p-1">
                      <div class="athAIna-border-inner py-1">
                        <div class="flex flex-row items-center gap-2 justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                          </svg>
                          <span class="text-athAIna-base">+ Insert Image</span>
                        </div>
                        <input type="file" accept="png, jpg" id="image-upload" class="hidden" />
                      </div>
                    </div>
                  </label>



                </div>

              </div>
            </div>

            <div>
              
            </div>
          </div>
          
          
          <div>
          </div>

        </div>
      </div>
  </form>
</template>

<style scoped>
::-webkit-input-placeholder {
  text-align: center;
}
:-moz-placeholder {
  /* Firefox 18- */
  text-align: center;
}
::-moz-placeholder {
  /* Firefox 19+ */
  text-align: center;
}
:-ms-input-placeholder {
  text-align: center;
}
</style>