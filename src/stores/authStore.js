import { defineStore } from "pinia";
import { auth } from "@/firebase";

import { onAuthStateChanged, signOut } from "firebase/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    loading: true,
  }),

  actions: {
    init() {
      onAuthStateChanged(auth, (u) => {
        this.user = u;
        this.loading = false;
      });
    },
    logout() {
      return signOut(auth);
    },
  },
});
