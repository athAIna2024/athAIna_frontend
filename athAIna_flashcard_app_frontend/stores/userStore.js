import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userID = ref(null);
  const email = ref(null);
  const date_Joined = ref(null);

  const setUserID = (user_id) => {
    userID.value = user_id;
  };

  const clearUserID = () => {
    userID.value = null;
  };

  const getUserID = () => {
    return userID.value;
  };

  const setEmail = (userEmail) => {
    email.value = userEmail;
  };

  const getEmail = () => {
    return email.value;
  };

  const clearEmail = () => {
    email.value = null;
  };

  const clearUserData = () => {
    userID.value = null;
    email.value = null;
  };

  return {
    userID,
    email,
    date_Joined,
    setUserID,
    clearUserID,
    getUserID,
    setEmail,
    getEmail,
    clearEmail,
    clearUserData,
  };
}, {
  persist: true,
});