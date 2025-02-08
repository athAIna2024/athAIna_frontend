<script>
export default {
  name: 'FAQs_Page',
  data() {
    return {
      faqs: [
        { question: 'How do I create flashcards in athAIna?',
          answer: 'You can create flashcards in two ways:<br><br><b>Manually</b>. Fill out the flashcards by entering the questions and answers yourself.<br> <b>Automatically</b>. Upload your notes, and <i>athAIna</i> will convert them into flashcards for you.', open: false },
        { question: 'What file formats can I upload for automatic flashcard generation?', answer: 'You can create flashcards in two ways:<br><br><b>Manually</b>. Fill out the flashcards by entering the questions and answers yourself.<br> <b>Automatically</b>. Upload your notes, and <i>athAIna</i> will convert them into flashcards for you.', open: false },
        { question: 'What is the difference between Review Mode and Test Mode?', answer: 'You can create flashcards in two ways:<br><br><b>Manually</b>. Fill out the flashcards by entering the questions and answers yourself.<br> <b>Automatically</b>. Upload your notes, and <i>athAIna</i> will convert them into flashcards for you.', open: false },
        { question: 'Can I switch between Review Mode and Test Mode?', answer: 'You can create flashcards in two ways:<br><br><b>Manually</b>. Fill out the flashcards by entering the questions and answers yourself.<br> <b>Automatically</b>. Upload your notes, and <i>athAIna</i> will convert them into flashcards for you.', open: false }
        
      ]
    };
  },
  methods: {
    toggle(i) {
      this.faqs[i].open = !this.faqs[i].open;
    }
  }
};
</script>

<template>
  <div class="text-center m-10 p-20 font-semibold -z-0">
    Frequently Asked Questions (FAQs)
    <div v-for="(faq, i) in faqs" :key="i" class="athAIna-border-outer p-1 my-10">
      <div class="athAIna-border-inner px-10 py-5">
        <button @click="toggle(i)" class="flex items-center w-full justify-between" aria-expanded="true" aria-controls="accb1">  
          <span class="text-left">
            {{ faq.question }} </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </button>
        <div v-show="faq.open" class="text-left font-normal m-10" v-html="faq.answer">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>