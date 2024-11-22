import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        userProfile: null,
        authToken: localStorage.getItem('authToken') || null,
    }),
    actions: {
        login() {
            this.isLoggedIn = true;
            this.userProfile = userData;
            this.authToken = token;
            localStorage.setItem('authToken', token);
        },
        logout() {
            this.isLoggedIn = false;
            this.userProfile = null;
            this.authToken = null;
            localStorage.removeItem('authToken');
        },
    },
});