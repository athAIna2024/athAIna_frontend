<!-- <script>
export default {
  name: 'Learner_Navbar',
  data() {
    return {
      modals: {
        profile: false,
        accSettings: false,
      },
    };
  },
  methods: {
    toggleModal(modalName) {
      this.modals[modalName] = !this.modals[modalName];
    },
  }
};
</script> -->

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserStore } from "../../stores/userStore";

// Cookies.remove('cringe', { path: "/", domain: "localhost" });
Cookies.set("cringe", "nae nae baby", {
  secure: true,
  sameSite: "Strict",
  expires: 1,
});

const userStore = useUserStore();
const router = useRouter();
const accessToken = Cookies.get("access_token");
const refreshTKN = Cookies.get("refresh_token");

const logOutAuth = "Bearer " + accessToken;
console.log(refreshTKN);
console.log("access token:", logOutAuth);

const logout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/account/logout/",
      {
        refresh: refreshTKN,
      },
      {
        headers: {
          Authorization: logOutAuth,
        },
      }
    );

    console.log(response.data);

    if (response.data.successful) {
      userStore.clearUser();

      // Log the cookies before removal
      console.log("Access Token before removal:", Cookies.get("access_token"));
      console.log(
        "Refresh Token before removal:",
        Cookies.get("refresh_token")
      );

      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

      // Log the cookies to verify removal
      console.log("Access Token after removal:", Cookies.get("access_token"));
      console.log("Refresh Token after removal:", Cookies.get("refresh_token"));

      router.push("/login");
    } else {
      console.log(response.data.error);
    }
  } catch (error) {
    console.log(error);
  }
};

function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const modals = ref({
  profile: false,
  accSettings: false,
});

const toggleModal = (modalName) => {
  modals.value[modalName] = !modals.value[modalName];
};
</script>

<template>
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
            <span> adamsandler@athaina.com </span>
            <span> ************ </span>
          </div>
          <button
            @click="toggleModal('accSettings')"
            class="mt-10 text-base border-athAIna-orange border-[3.5px] py-[10px] px-[30px] rounded-2xl text-sm"
          >
            <router-link to="change_password"> Change Password </router-link>
          </button>
          <button
            @click="toggleModal('profile')"
            class="text-base bg-athAIna-orange mt-8 py-[10px] px-[30px] rounded-2xl text-sm text-athAIna-white"
          >
            <router-link to="login"> Log Out </router-link>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="w-full flex flex-row justify-between items-center p-7 pr-12 pl-12 z-50 sticky font-poppins shadow-md"
  >
    <div class="flex flex-row justify-between items-center space-x-20">
      <img src="@/assets/athAIna.svg" alt="Logo" class="14 w-14" />
      <div>Features</div>
      <div>FAQS</div>
      <div>
        <router-link to="/contact_us"> Contact us </router-link>
      </div>
      <div>Demo</div>
    </div>

    <div class="flex flex-row justify-between items-center space-x-20">
      <router-link to="/library_of_studysets">
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
        <button
          @click="logout"
          class="text-base bg-athAIna-orange py-[10px] px-[30px] rounded-2xl text-sm text-athAIna-white"
        >
          <router-link to="login"> Log Out </router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
