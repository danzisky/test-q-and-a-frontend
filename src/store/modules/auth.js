// src/stores/auth.js
import { defineStore } from 'pinia';

export const useAuth = defineStore("auth", {
    state: () => ({
        user: null,
    }),
    actions: {
        setUser(user) {
            this.user = user
        },
        unsetUser(user) {
            if(this.user?.name === user?.name) {
                this.user = null
            }
        },
    },
    getters: {
        getUser() {
            return this.user;
        },
        isAuthenticated() {
            return this.isAuthenticated;
        },
    },
});
