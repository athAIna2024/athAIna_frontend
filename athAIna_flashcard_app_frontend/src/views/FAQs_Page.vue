<script>
import axios from "@/axios"; // Assuming your axios config is in this path

export default {
  name: "FAQs_Page",
  data() {
    return {
      faqs: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    toggle(i) {
      this.faqs[i].open = !this.faqs[i].open;
    },
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
  },
  created() {
    // Fetch FAQs when the component is created
    this.fetchFAQs();
  },
};
</script>

<template>
  <div class="text-center m-10 p-20 font-semibold -z-0">
    Frequently Asked Questions (FAQs)

    <!-- Loading State -->
    <div v-if="loading" class="my-10">Loading FAQs...</div>

    <!-- Error State -->
    <div v-else-if="error" class="my-10 text-red-600">
      {{ error }}
    </div>

    <!-- FAQs List -->
    <div
        v-else
        v-for="(faq, i) in faqs"
        :key="i"
        class="athAIna-border-outer p-1 my-10"
    >
      <div class="athAIna-border-inner px-10 py-5">
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
            class="text-left font-normal m-10"
            v-html="faq.answer"
        ></div>
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
