import { defineStore } from "pinia";
import { auth } from "@/firebase";

import { useShoppingListStore } from "@/stores/shoppingList";

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

        const shopping = useShoppingListStore();
        if (u) shopping.init();
        else shopping.items = [];
      });
    },

    logout() {
      return signOut(auth);
    }
  },
});
