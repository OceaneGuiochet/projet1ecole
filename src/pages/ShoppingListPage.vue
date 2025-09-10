<script setup>
import { useShoppingListStore } from "@/stores/shoppingList";

const shoppingList = useShoppingListStore();
</script>

<template>
  <div
    class="max-w-7xl mx-auto p-8 mt-12 bg-gray-50 rounded-2xl border"
  >
    <h1 class="text-3xl font-bold text-emerald-800 mb-8 text-center">
      Ma liste de courses
    </h1>

    <div
      v-if="shoppingList.items.length === 0"
      class="text-center text-yellow-700 italic"
    >
      <p>Aucun produit pour le moment.</p>
    </div>

    <ul v-else class="grid grid-cols-5 gap-6">
      <li
        v-for="item in shoppingList.items"
        :key="item.code"
        class="flex flex-col justify-between bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 border-2 border-gray-200"
      >
        <div class="flex flex-col items-center text-center">
          <img
            :src="item.image_front_url"
            :alt="item.generic_name_fr"
            class="w-20 h-20 object-cover rounded-lg border border-gray-300 mb-2"
          />
          <span
            class="text-emerald-800 font-medium text-sm text-center line-clamp-2"
          >
            {{ item.generic_name_fr }}
          </span>
          <span class="text-yellow-700 text-xs"> x{{ item.quantity }} </span>
        </div>

        <div class="flex justify-center gap-3 mt-3">
          <button
            @click="shoppingList.removeItem(item.code)"
            class="w-8 h-8 flex items-center justify-center bg-amber-700 text-white rounded-full text-lg font-bold hover:bg-amber-600 active:scale-95 transition-all"
          >
            -
          </button>
          <button
            @click="shoppingList.addItem(item)"
            class="w-8 h-8 flex items-center justify-center bg-emerald-600 text-white rounded-full text-lg font-bold hover:bg-emerald-700 active:scale-95 transition-all"
          >
            +
          </button>
        </div>
      </li>
    </ul>

    <p
      v-if="shoppingList.totalCount > 0"
      class="mt-8 text-right text-emerald-900 font-semibold"
    >
      Total d'articles : {{ shoppingList.totalCount }}
    </p>

    <button
      v-if="shoppingList.items.length > 0"
      @click="shoppingList.clearList"
      class="mt-4 w-full bg-emerald-700 text-white py-2 rounded-xl font-semibold hover:bg-emerald-800 active:scale-95 transition-all"
    >
      Supprimer ma liste
    </button>
  </div>
</template>
