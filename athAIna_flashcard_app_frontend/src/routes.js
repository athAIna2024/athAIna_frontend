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
import Change_OTP from "./views/accountapp/Change_OTP.vue";
import OTP_Page from "./views/accountapp/OTP_Page.vue";

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

import { useTestModeStore } from "../stores/testModeStore.js";
import { useAuthStore } from "../stores/authStore.js";

const routes = [
  {
    path: "",
    name: "Landing_Page",
    component: Landing_Page,
    meta: { title: "athAIna – Memorization Made Memorable" },
  },
  {
    path: "/features/",
    name: "Features_Page",
    component: Features_Page,
    meta: { title: "Features – athAIna" },
  },
  {
    path: "/demo/",
    name: "Demo_Page",
    component: Demo_Page,
    meta: { title: "Demo – athAIna" },
  },

  {
    path: "/faqs/",
    name: "FAQs_Page",
    component: FAQs_Page,
    meta: { title: "Frequently Asked Questions (FAQs) – athAIna" },
  },
  {
    path: "/contact_us/",
    name: "Create_Contact_Inquiry",
    component: Create_Contact_Inquiry,
    meta: { title: "Contact Us – athAIna" },
  },
  {
    path: "/login/",
    name: "Login",
    component: Login,
    meta: { title: "Login – athAIna" },
  },
  {
    path: "/logout/",
    name: "Logout",
    component: Logout,
    meta: { title: "Logout – athAIna" },
  },
  {
    path: "/signup/",
    name: "Signup",
    component: Signup,
    meta: { title: "Sign In – athAIna" },
  },
  {
    path: "/verify_email/",
    name: "Verify Email",
    component: OTP_Page,
    meta: { title: "Verify Email – athAIna" },
  },
  {
    path: "/change_password",
    name: "change_password",
    component: Change_Password,
    meta: { title: "Change Password – athAIna",
      requiresAuth: true },
  },
  {
    path: "/change_password_otp",
    name: "change_password_otp",
    component: Change_OTP,
    props: (route) => ({
      isVisible: true,
      email: route.params.email,
      purpose: "change_password",
    }),
    meta: { title: "Change Password (OTP) – athAIna",
      requiresAuth: true },
  },
  {
    path: "/change_password_page/:uidb64/:token",
    name: "Change_Password_Page",
    component: Change_Password_Page,
    meta: { title: "Change Password – athAIna",
      requiresAuth: true },
  },
  {
    path: "/forgot_password/",
    name: "Forgot_Password",
    component: Forgot_Password,
    meta: { title: "Forgot Password – athAIna" },
  },
  {
    path: "/forgot_password_page/:uidb64/:token",
    name: "Forgot_password_page",
    component: Forgot_Password_Page,
    meta: { title: "Forgot Password – athAIna" },
  },
  {
    path: "/:studySetTitle/:studySetId/flashcards/save",
    name: "Create_Flashcard_Manually",
    component: Create_Flashcard_Manually,
    meta: { title: "Create Flashcard – athAIna" },
  },
  {
    path: "/generate_flashcard_with_ai/",
    name: "Generate_Flashcard_with_AI",
    component: Generate_Flashcard_with_AI,
    meta: { title: "Generate AI Flashcard – athAIna" },
  },
  {
    path: "/:studySetTitle/:studySetId/flashcards",
    name: "Library_Page_Flashcard",
    component: Library_Page_Flashcard,
    meta: { title: "Flashcards – athAIna" },
  },
  {
    path: "/:studySetTitle/:studySetId/review/:id",
    name: "Review_Mode",
    component: Review_Mode,
    meta: { title: "Review Mode – athAIna" },
  },
  {
    path: "/:studySetTitle/:studySetId/test/:batchId",
    name: "Test_Mode",
    component: Test_mode,
    meta: { title: "Test Mode – athAIna" },
  },
  {
    path: "/:studySetTitle/:studySetId/update_flashcard/:flashcardId",
    name: "Update_Flashcard",
    component: Update_Flashcard,
    meta: { title: "Update Flashcard – athAIna" },
  },
  {
    path: "/delete_flashcard/",
    name: "Delete_Flashcard",
    component: Delete_Flashcard,
    meta: { title: "Delete Flashcard – athAIna" },
  },
  {
    path: "/create_studyset/",
    name: "Create_Studyset",
    component: Create_Studyset,
    meta: { title: "Create Study Set – athAIna" },
  },
  {
    path: "/library_of_studysets/",
    name: "Library_Page_Studyset",
    component: Library_Page_Studyset,
    meta: { title: "Study Sets – athAIna" },
  },
  {
    path: "/update_studyset/",
    name: "Update_Studyset",
    component: Update_Studyset,
    meta: { title: "Update Study Set – athAIna" },
  },
  {
    path: "/delete_studyset/",
    name: "Delete_Studyset",
    component: Delete_studyset,
    meta: { title: "Delete Study Set – athAIna" },
  },
  {
    path: "/report/",
    name: "View_Learning_Progress",
    component: View_Learning_Progress,
    meta: { title: "Report – athAIna" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check if the user is logged in
// add meta: { requiresAuth: true }, to the routes that require authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      !authStore.isLoggedIn
  ) {
    next({ path: "/login" });
  } else {
    next();
  }
});

// Crucial for resetting the test mode store when leaving the test mode
router.beforeEach((to, from, next) => {
  const testModeStore = useTestModeStore();

  if (!to.path.includes("/test")) {
    testModeStore.clear();
  }

  next();
});

// Update page title dynamically
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

export default router;