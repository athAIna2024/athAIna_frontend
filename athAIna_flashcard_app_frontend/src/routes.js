import { createRouter, createWebHistory } from "vue-router";
import Landing_Page from "@/views/Landing_Page.vue";
import Features_Page from "@/views/Features_Page.vue";
import Demo_Page from "@/views/Demo_Page.vue";
import FAQs_Page from "@/views/FAQs_Page.vue";

import Create_Contact_Inquiry from "@/views/contactinquiryapp/Create_Contact_Inquiry.vue";

import Login from "@/views/accountapp/Login.vue";
import Logout from "@/views/accountapp/Logout.vue";
import Signup from "@/views/accountapp/Signup.vue";
import Change_Password from "@/views/accountapp/Change_Password.vue";
import Forgot_Password from "@/views/accountapp/Forgot_Password.vue";
import Forgot_Password_Page from "./views/accountapp/Forgot_Password_Page.vue";
import Change_Password_Page from "./views/accountapp/Change_Password_Page.vue";

import Create_Flashcard_Manually from "@/views/flashcardapp/Create_Flashcard_Manually.vue";
import Generate_Flashcard_with_AI from "@/views/flashcardapp/Generate_Flashcard_with_AI.vue";
// Library page includes the search and select flashcard
import Library_Page_Flashcard from "@/views/flashcardapp/Library_Page_Flashcard.vue";
import Review_Mode from "@/views/flashcardapp/Review_Mode.vue";
import Test_mode from "@/views/flashcardapp/Test_mode.vue";
import Update_Flashcard from "@/views/flashcardapp/Update_Flashcard.vue";
import Delete_Flashcard from "@/views/flashcardapp/Delete_Flashcard.vue";

import Create_Studyset from "@/views/studysetapp/Create_Studyset.vue";
// Library page includes the search and select studyset
import Library_Page_Studyset from "@/views/studysetapp/Library_Page_Studyset.vue";
import Update_Studyset from "@/views/studysetapp/Update_Studyset.vue";
import Delete_studyset from "@/views/studysetapp/Delete_Studyset.vue";

import View_Learning_Progress from "@/views/reportapp/View_Learning_Progress.vue";

const routes = [
  {
    path: "",
    name: "Landing_Page",
    component: Landing_Page,
  },
  {
    path: "/features/",
    name: "Features_Page",
    component: Features_Page,
  },
  {
    path: "/demo/",
    name: "Demo_Page",
    component: Demo_Page,
  },

  {
    path: "/faqs/",
    name: "FAQs_Page",
    component: FAQs_Page,
  },
  {
    path: "/contact_us/",
    name: "Create_Contact_Inquiry",
    component: Create_Contact_Inquiry,
  },
  {
    path: "/login/",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout/",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/signup/",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/change_password/",
    name: "Change_Password",
    component: Change_Password,
  },
  {
    path: "/change_password_page/:uidb64/:token",
    name: "Change_Password_Page",
    component: Change_Password_Page,
  },
  {
    path: "/forgot_password/",
    name: "Forgot_Password",
    component: Forgot_Password,
  },
  {
    path: "/forgot_password_page/:uidb64/:token",
    name: "Forgot_password_page",
    component: Forgot_Password_Page,
  },
  {
    path: "/:studySetTitle/:studySetId/flashcards/save",
    name: "Create_Flashcard_Manually",
    component: Create_Flashcard_Manually,
  },
  {
    path: "/generate_flashcard_with_ai/",
    name: "Generate_Flashcard_with_AI",
    component: Generate_Flashcard_with_AI,
  },
  {
    path: "/:studySetTitle/:studySetId/flashcards",
    name: "Library_Page_Flashcard",
    component: Library_Page_Flashcard,
  },
  {
    path: "/review/:id",
    name: "Review_Mode",
    component: Review_Mode,
  },
  {
    path: "/test/",
    name: "Test_Mode",
    component: Test_mode,
  },
  {
    path: "/:studySetTitle/:studySetId/update_flashcard/:flashcardId",
    name: "Update_Flashcard",
    component: Update_Flashcard,
  },
  {
    path: "/delete_flashcard/",
    name: "Delete_Flashcard",
    component: Delete_Flashcard,
  },
  {
    path: "/create_studyset/",
    name: "Create_Studyset",
    component: Create_Studyset,
  },
  {
    path: "/library_of_studysets/",
    name: "Library_Page_Studyset",
    component: Library_Page_Studyset,
  },
  {
    path: "/update_studyset/",
    name: "Update_Studyset",
    component: Update_Studyset,
  },
  {
    path: "/delete_studyset/",
    name: "Delete_Studyset",
    component: Delete_studyset,
  },
  {
    path: "/view_learning_progress/",
    name: "View_Learning_Progress",
    component: View_Learning_Progress,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
