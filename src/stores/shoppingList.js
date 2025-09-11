import { defineStore } from "pinia";
import { db } from "@/firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { useUserStore } from "@/stores/authStore";

export const useShoppingListStore = defineStore("shoppingList", {
  state: () => ({
    items: [],
  }),

  getters: {
    totalCount: (state) =>
      state.items.reduce((acc, item) => acc + (item.quantity || 0), 0),
  },

  actions: {
    init() {
      const userStore = useUserStore();
      if (userStore.user) {
        const colRef = collection(
          db,
          "shoppingLists",
          userStore.user.uid,
          "items"
        );
        onSnapshot(colRef, (snap) => {
          this.items = snap.docs.map((d) => ({ code: d.id, ...d.data() }));
        });
      } else {
        const saved = localStorage.getItem("shoppingItems");
        this.items = saved ? JSON.parse(saved) : [];
      }
    },
    async addItem(item) {
      const userStore = useUserStore();
      if (!userStore.user) {
        const existing = this.items.find((p) => p.code === item.code);
        if (existing) existing.quantity++;
        else this.items.push({ ...item, quantity: 1 });
        localStorage.setItem("shoppingItems", JSON.stringify(this.items));
        return;
      }

      const ref = doc(
        db,
        "shoppingLists",
        userStore.user.uid,
        "items",
        item.code
      );
      const existing = this.items.find((p) => p.code === item.code);
      const quantity = existing ? existing.quantity + 1 : 1;
      await setDoc(ref, { ...item, quantity });
    },

    async removeItem(code) {
      const userStore = useUserStore();
      const current = this.items.find((p) => p.code === code);
      if (!current) return;
      if (userStore.user) {
        const ref = doc(db, "shoppingLists", userStore.user.uid, "items", code);
        if (current.quantity > 1) {
          await setDoc(ref, { ...current, quantity: current.quantity - 1 });
        } else {
          await deleteDoc(ref);
        }
      } else {
        if (current.quantity > 1) {
          current.quantity -= 1;
        } else {
          this.items = this.items.filter((p) => p.code !== code);
        }
        localStorage.setItem("shoppingList", JSON.stringify(this.items));
      }
    },

    async clearList() {
      const userStore = useUserStore();
      if (userStore.user) {
        for (const it of this.items) {
          await deleteDoc(
            doc(db, "shoppingLists", userStore.user.uid, "items", it.code)
          );
        }
      }
      this.items = [];
      localStorage.removeItem("shoppingList");
    },
  },
});
