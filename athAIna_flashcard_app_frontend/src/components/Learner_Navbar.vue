<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Delete_Account from "@/components/Delete_Account.vue";
import Logout from "@/views/accountapp/Logout.vue";
import { useUserStore } from "../../stores/userStore";
import axiosInstance from "@/axiosConfig";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";
import Cookies from "js-cookie";
import { useFlashcardSearchStore } from "../../stores/flashcardSearchStore.js";
import { useStudysetStore } from "../../stores/studySetStore.js";
import { useStudySetSearchStore } from "../../stores/studySetSearchStore.js";
import { useTestModeStore } from "../../stores/testModeStore.js";

const router = useRouter();
const authStore = useAuthStore();

const flashcardSearchStore = useFlashcardSearchStore();
const studysetStore = useStudysetStore();
const studySetSearchStore = useStudySetSearchStore();
const testModeStore = useTestModeStore();

const modals = ref({
  profile: false,
  accSettings: false,
  Delete_Account: false,
  logout: false,
});
// Auto-logout settings
const INACTIVITY_CHECK_INTERVAL = 1800 * 1000; // Check every 30 mins 
const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 60 minute timeout for testing
const activityInterval = ref(null);
const lastActivity = ref(Date.now());
const isRefreshing = ref(false);
const inactivityWarningShown = ref(false); // Added this missing ref

// Track user activity
const updateLastActivity = () => {
  lastActivity.value = Date.now();
  console.log(
    `[Activity Tracker] Activity detected at ${new Date().toLocaleTimeString()}`
  );
};

// Add debounced version to avoid excessive updates
const throttledUpdateActivity = (() => {
  let lastCall = 0;
  return () => {
    const now = Date.now();
    if (now - lastCall > 5000) {
      // Only update every 5 seconds max
      lastCall = now;
      updateLastActivity();
    }
  };
})();

// Check token status and user activity
const checkActivity = async () => {
  try {
    // Skip if already in the process of refreshing
    if (isRefreshing.value) {
      return;
    }

    // Check for inactivity
    const currentTime = Date.now();
    const inactiveTime = currentTime - lastActivity.value;
    const inactiveSeconds = Math.floor(inactiveTime / 1000);

    // Log every check with seconds of inactivity
    console.log(
      `[Activity Checker] User inactive for ${inactiveSeconds} seconds`
    );

    // Show warning when approaching timeout
    if (
      inactiveTime > INACTIVITY_TIMEOUT * 0.75 &&
      !inactivityWarningShown.value
    ) {
      console.warn(
        `[Activity Warning] User will be logged out in ${Math.floor(
          (INACTIVITY_TIMEOUT - inactiveTime) / 1000
        )} seconds due to inactivity`
      );
      inactivityWarningShown.value = true;
    }

    if (inactiveTime > INACTIVITY_TIMEOUT) {
      console.log(
        `[Activity Checker] Inactivity threshold of ${
          INACTIVITY_TIMEOUT / 1000
        } seconds exceeded, logging out`
      );
      await handleLogout("Session expired due to inactivity");
      return;
    }
  } catch (error) {
    console.error("[Activity Checker] Error during check:", error);
  }
};
// Handle logout
const handleLogout = async (reason) => {
  console.log(`[Logout] Logging out: ${reason}`);

  try {
    const response = await axiosInstance.post("/account/logout/", {});

    console.log("response: ", response);
    console.log("response data: ", response.data);
    console.log("response status: ", response.status);
    console.log("response error: ", response.error);
    console.log("response message: ", response.message);

    if (response.status === 204) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("athAIna_csrfToken");

      let dbs = await indexedDB.databases();
      dbs.forEach((db) => {
        indexedDB.deleteDatabase(db.name);
      });

      authStore.logout();

      flashcardSearchStore.clear();
      studysetStore.clear();
      studySetSearchStore.clear();
      testModeStore.clear();

      router.push("/login");
      emit("close");
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.log(error);
  } finally {
    userStore.clear();
  }
};

// Set up activity tracking and periodic checks
onMounted(() => {
  console.log("[Activity Tracker] Setting up activity monitoring");

  // Add event listeners for user activity
  document.addEventListener("mousemove", throttledUpdateActivity);
  document.addEventListener("keydown", updateLastActivity);
  document.addEventListener("click", updateLastActivity);

  // Initialize last activity time
  updateLastActivity();

  // Clear any existing intervals first
  if (activityInterval.value) {
    clearInterval(activityInterval.value);
  }

  // Set interval for checking token and activity status
  console.log(
    `[Activity Tracker] Setting check interval: ${INACTIVITY_CHECK_INTERVAL}ms`
  );
  activityInterval.value = setInterval(
    checkActivity,
    INACTIVITY_CHECK_INTERVAL
  );

  // Add focus handler to update last activity when user returns
  window.addEventListener("focus", updateLastActivity);

  console.log(
    `[Activity Tracker] Setup complete - inactivity timeout: ${
      INACTIVITY_TIMEOUT / 1000
    } seconds`
  );
});

// Clean up event listeners and intervals
onBeforeUnmount(() => {
  console.log("[Activity Tracker] Cleaning up resources");
  document.removeEventListener("mousemove", throttledUpdateActivity);
  document.removeEventListener("keydown", updateLastActivity);
  document.removeEventListener("click", updateLastActivity);
  window.removeEventListener("focus", updateLastActivity);

  if (activityInterval.value) {
    clearInterval(activityInterval.value);
    activityInterval.value = null;
    console.log("[Activity Tracker] Interval cleared");
  }
});

const userStore = useUserStore();

const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};
</script>

<template>
  <Delete_Account
    :is-open="modals.Delete_Account"
    @close="toggleModal('Delete_Account')"
  />
  <Logout :isVisible="modals.logout" @close="toggleModal('logout')" />
  <div
    v-if="modals.accSettings"
    class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40"
  >
    <div class="athAIna-border-outer p-1 flex flex-col w-[550px]">
      <div class="athAIna-border-inner p-4 text-center">
        <div class="flex justify-end pl-4 text-athAIna-lg">
          <button @click="toggleModal('accSettings')">x</button>
        </div>
        <div class="flex flex-col items-center justify-between p-5">
          <span class="font-semibold">User Profile</span>
          <div class="flex flex-col">
            <span> {{ userStore.getEmail() }} </span>
            <span> {{}} </span>
          </div>
          <button
            @click="toggleModal('accSettings')"
            class="mt-10 text-base border-athAIna-orange border-[3.5px] w-52 mb-2 py-[10px] px-[30px] rounded-2xl text-sm"
          >
            <router-link to="change_password"> Change Password </router-link>
          </button>

          <button
            @click="toggleModal('Delete_Account')"
            class="text-base border-athAIna-red border-[3.5px] w-52 py-[10px] px-[30px] rounded-2xl text-sm text-red-500"
          >
            Delete Account
          </button>

          <button
            @click="
              toggleModal('accSettings');
              toggleModal('logout');
            "
            class="text-base bg-athAIna-orange mt-8 py-[10px] px-[30px] rounded-2xl text-sm text-athAIna-white"
          >
            <!-- <router-link to="login"> Log Out </router-link> -->
            Log Out
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="w-full flex flex-row justify-between items-center p-7 pr-12 pl-12 z-50 bg-athAIna-white sticky font-poppins shadow-md"
  >
    <div
      class="invisible lg:w-100 lg:visible flex flex-row justify-between items-center space-x-20"
    >
      <router-link to="/"
        ><img src="@/assets/athAIna.svg" alt="Logo" class="14 w-14"
      /></router-link>
      <div>
        <router-link to="/features" exact-active-class="active-link">
          Features
        </router-link>
      </div>
      <div>
        <router-link to="/faqs" exact-active-class="active-link"
          >FAQS</router-link
        >
      </div>
      <div>
        <router-link to="/contact_us" exact-active-class="active-link">
          Contact us
        </router-link>
      </div>
      <div>
        <router-link to="/demo" exact-active-class="active-link"
          >Demo</router-link
        >
      </div>
    </div>

    <div class="flex flex-row justify-between items-center space-x-20">
      <router-link to="/library_of_studysets" exact-active-class="active-link">
        <div>Library</div>
      </router-link>
      <div>Reports</div>
      <button class="" @click="toggleModal('profile')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>

      <div
        v-if="modals.profile"
        class="absolute top-[100px] right-[27px] h-[150px] w-[240px] border-athAIna-orange border-[4px] rounded-3xl bg-athAIna-white flex flex-col justify-between p-5"
      >
        <button
          @click="
            toggleModal('profile');
            toggleModal('accSettings');
          "
          class="text-base border-athAIna-orange border-[3.5px] py-[10px] px-[30px] rounded-2xl text-sm"
        >
          Account Settings
        </button>
        <form id="csrf-form" style="display: none">{% csrf_token %}</form>
        <button
          @click="
            toggleModal('profile');
            toggleModal('logout');
          "
          class="text-base bg-athAIna-orange py-[10px] px-[30px] rounded-2xl text-sm text-athAIna-white"
        >
          Log Out
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active-link {
  font-weight: bold;
  color: #da384c;
}
</style>
