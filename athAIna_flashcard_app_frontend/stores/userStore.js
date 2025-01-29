import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userID: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
    getUser() {
      return this.user;
    },
  },
});
