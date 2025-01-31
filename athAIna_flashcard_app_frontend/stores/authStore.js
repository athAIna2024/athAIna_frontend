import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    userProfile: null,
    authToken: localStorage.getItem("authToken") || null,
    access_token: null,
    refresh_token: null,
  }),
  actions: {
    login() {
      this.isLoggedIn = true;
      this.userProfile = userData;
      this.authToken = token;
      localStorage.setItem("authToken", token);
    },
    logout() {
      this.isLoggedIn = false;
      this.userProfile = null;
      this.authToken = null;
      localStorage.removeItem("authToken");
    },
    setTokens(access_token, refresh_token) {
      this.access_token = access_token;
      this.refresh_token = refresh_token;
    },
    getAccessToken() {
      return this.access_token;
    },
    getRefreshToken() {
      return this.refresh_token;
    },
    clearTokens() {
      this.access_token = null;
      this.refresh_token = null;
    },
  },
});
