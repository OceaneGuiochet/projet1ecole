import { defineStore } from "pinia"

export const useShoppingListStore = defineStore("shoppingList", {
  state: () => ({
    items: []
  }),
  getters: {
    totalCount: (state) =>
      state.items.reduce((acc, item) => acc + item.quantity, 0)
  },

  actions: {
    addItem(item) {
      const existing = this.items.find(p => p.code === item.code)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
    },
    removeItem(code) {
      const existing = this.items.find(p => p.code === code)
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity--
        } else {
          this.items = this.items.filter(p => p.code !== code)
        }
      }
    },
    clearList() {
      this.items = []
    }
  }
})
