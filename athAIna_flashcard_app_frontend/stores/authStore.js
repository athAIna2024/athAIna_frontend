import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    authToken: localStorage.getItem("authToken") || null,
    access_token: null,
    refresh_token: null,
    csrf_token: null,
    user_id: null,
  }),
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
      this.authToken = null;
      this.user_id = null;
      this.access_token = null;
      this.refresh_token = null;
      this.csrf_token = null;
      
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
    setUserID(user_id) {
      this.user_id = user_id;
    },
    clearUserID() {
      this.user_id = null;
    },
    getUserID() {
      return this.user_id;
    },
  },
  persist: true,
});
