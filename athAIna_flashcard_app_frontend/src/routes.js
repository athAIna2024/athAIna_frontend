import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/accountapp/Login.vue';
import Signup from './views/accountapp/Signup.vue';
import Create_Flashcard from './views/flashcardapp/Create_Flashcard.vue';
import Create_Studyset from './views/studysetapp/Create_Studyset.vue';
import Create_Contact_Inquiry from "./views/contactinquiryapp/Create_Contact_Inquiry.vue";
import Review_Mode from "./views/flashcardapp/Review_Mode.vue";

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
        path: '/create_flashcard/',
        name: 'Create_Flashcard',
        component: Create_Flashcard,
    },
    {
        path: '/review/',
        name: 'Review_Mode',
        component: Review_Mode,
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