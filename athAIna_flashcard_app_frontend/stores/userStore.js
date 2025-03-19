import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userID: null,
    email: null,
    date_Joined: null,
  }),
  actions: {
    setUserID(user_id) {
      this.userID = user_id;
    },
    clearUserID() {
      this.userID = null;
    },
    getUserID() {
      return this.userID;
    },
    setEmail(email) {
      this.email = email;
    },
    getEmail() {
      return this.email;
    },
    clearEmail() {
      this.email = null;
    },
    clearUserData() {
      this.userID = null;
      this.email = null;
    },

    // setDate(date_Joined) {
    //   this.date_Joined = date_Joined;
    // },
    // getDate() {
    //   return this.date_Joined;
    // },
    // clearDate() {
    //   this.date_Joined = null;
    // },
  },
});
