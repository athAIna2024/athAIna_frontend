import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userID = ref(null);
  const email = ref(null);


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

  const clear = () => {
    userID.value = null;
    email.value = null;
    date_Joined.value = null;
  };

  return {
    userID,
    email,
    setUserID,
    clearUserID,
    getUserID,
    setEmail,
    getEmail,
    clearEmail,
    clear,
  };
}, {
  persist: true,
});