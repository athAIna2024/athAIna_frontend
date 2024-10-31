import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/accountapp/Login.vue';
import Signup from '@/views/accountapp/Signup.vue';
import Create_Flashcard_Manually from '@/views/flashcardapp/Create_Flashcard_Manually.vue';
import Create_Studyset from '@/views/studysetapp/Create_Studyset.vue';
import Create_Contact_Inquiry from '@/views/contactinquiryapp/Create_Contact_Inquiry.vue';
import Review_Mode from '@/views/flashcardapp/Review_Mode.vue';
import Generate_Flashcard_with_AI from "@/views/flashcardapp/Generate_Flashcard_with_AI.vue";
import Test_mode from "@/views/flashcardapp/Test_mode.vue";
import Update_Flashcard from "@/views/flashcardapp/Update_Flashcard.vue";
import Delete_Flashcard from "@/views/flashcardapp/Delete_Flashcard.vue";

const routes = [

    {
        path: '/login/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/signup/',
        name: 'Signup',
        component: Signup,
    },

    {
        path: '/create_flashcard_manually/',
        name: 'Create_Flashcard_Manually',
        component: Create_Flashcard_Manually,
    },
    {
        path: '/generate_flashcard_with_ai/',
        name: 'Generate_Flashcard_with_AI',
        component: Generate_Flashcard_with_AI,
    },
    {
        path: '/review/',
        name: 'Review_Mode',
        component: Review_Mode,
    },
    {
        path: '/test/',
        name: 'Test_Mode',
        component: Test_mode,
    },
    {
        path: '/update_flashcard/:id',
        name: 'Update_Flashcard',
        component: Update_Flashcard,
    },
    {
        path: '/delete_flashcard/:id',
        name: 'Delete_Flashcard',
        component: Delete_Flashcard,
    },
    {
        path: '/create_studyset/',
        name: 'Create_Studyset',
        component: Create_Studyset,
    },

    {
        path: '/contact_us/',
        name: 'Create_Contact_Inquiry',
        component: Create_Contact_Inquiry,
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;