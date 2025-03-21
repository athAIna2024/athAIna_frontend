<script setup>
import { ref, onMounted } from "vue";
import Delete_Account from "@/components/Delete_Account.vue";
import Logout from "@/views/accountapp/Logout.vue";
import { useUserStore } from "../../stores/userStore";

const modals = ref({
  profile: false,
  accSettings: false,
  Delete_Account: false,
  logout: false,
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
            <span> {{ userStore.getEmail() || "Not logged in " }} </span>
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
    class="w-full flex flex-row justify-between items-center p-7 pr-12 pl-12 z-50 sticky font-poppins shadow-md"
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
