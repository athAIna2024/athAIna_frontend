import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const userID = ref(null);
    const email = ref(null);
    const loginTime = ref(null);
    const dateJoined = ref(null);

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

    const setLoginTime = (time) => {
      loginTime.value = time;
    };

    const setDateJoined = (date) => {
      dateJoined.value = date;
    };

    const getLoginTime = () => {
      return loginTime.value;
    };

    const getDateJoined = () => {
        return dateJoined.value;
    }

    const clear = () => {
      userID.value = null;
      email.value = null;
      loginTime.value = null;
      dateJoined.value = null;
    };

    return {
      userID,
      email,
      loginTime,
      setUserID,
      dateJoined,
      clearUserID,
      getUserID,
      setEmail,
      getEmail,
      setLoginTime,
      setDateJoined,
      clearEmail,
      clear,
    };
  },
  {
    persist: true,
  }
);
