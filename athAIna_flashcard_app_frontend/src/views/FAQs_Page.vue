<script>
import axios from "@/axios"; // Assuming your axios config is in this path

export default {
  name: "FAQs_Page",
  data() {
    return {
      faqs: [
        {
          question: "How can I create flashcards on athAIna?",
          answer: "You can create flashcards in two ways:" + "\n" +
              "\n Manually. Fill out the flashcard fields by entering questions and answers yourself.\n" +
              "Automatically. Upload your notes, and athAIna will convert them into flashcards for you.",
          open: false,
        },
        {
          question: "What file formats can I upload for automatic flashcard generation?",
          answer: "You can upload PDF files, Word documents, and text files. athAIna will extract the content and create flashcards based on the information provided.",
          open: false,
        },
        {
          question: "What is the difference between Review Mode and Test Mode?",
          answer: "In Review Mode, you can go through your flashcards at your own pace, reviewing the questions and answers. In Test Mode, you will be quizzed on your flashcards, and you will receive immediate feedback on your answers.",
          open: false,
        },
        {
          question: "Can I switch between Review Mode and Test Mode?",
          answer: "Yes, you can switch between the two modes at any time. Just select the mode you want to use from the main menu.",
          open: false,
        },
      ],
      loading: false,
      error: null,
    };
  },
  methods: {
    toggle(i) {
      this.faqs[i].open = !this.faqs[i].open;
    },
    /* 
    // Commented out API fetching code
    async fetchFAQs() {
      try {
        this.loading = true;
        const response = await axios.get("faq/list/");

        if (response.data.successful) {
          // Transform the API data to match your component's structure
          this.faqs = response.data.data.map((faq) => ({
            ...faq,
            open: false, // Add the open property for toggle functionality
          }));
        } else {
          this.error = response.data.message;
        }
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to fetch FAQs";
      } finally {
        this.loading = false;
      }
    },
    */
  },
  created() {
    // Comment out the API fetch call
    // this.fetchFAQs();
  },
};
</script>

<template>
  <div class="text-center text-[24px] mt-3 p-20 font-semibold min-h-screen">
    Frequently Asked Questions (FAQs)

    <!-- FIXME: Undo comment out once connected to backend. -->
    <!-- Loading State -->
    <!--    <div v-if="loading" class="my-10">Loading FAQs...</div>-->

    <!-- Error State -->
    <!--    <div v-else-if="error" class="my-10 text-red-600">-->
    <!--      {{ error }}-->
    <!--    </div>-->

    <div class="flex flex-col items-center justify-center gap-y-10 mt-16">
      <!-- FAQs List -->
      <!-- FIXME: Bring back v-else line once connected to backend. -->
      <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="athAIna-border-outer-faq py-[3px] px-[2.7px] text-[16px] font-semibold !rounded-[20px] w-2/4 justify-center"
      >
        <div class="athAIna-border-inner-faq !rounded-[17.5px] px-6 py-5">
          <button
              @click="toggle(i)"
              class="flex items-center w-full justify-between"
              :aria-expanded="faq.open"
              :aria-controls="'faq-' + i"
          >
            <span class="text-left"> {{ faq.question }} </span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          <div
            v-show="faq.open"
            :id="'faq-' + i"
            class="text-left font-normal m-0 mt-5"
            v-html="faq.answer"
          ></div>
        </div>
      </div>
    </div>

    <!-- No FAQs State -->
    <div v-if="!loading && !error && faqs.length === 0" class="my-10">
      No FAQs available.
    </div>
  </div>
</template>

<style scoped>
/* Your existing styles */
</style>
