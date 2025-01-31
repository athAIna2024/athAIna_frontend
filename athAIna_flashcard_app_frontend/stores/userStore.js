import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userID: null,
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
  },
});
