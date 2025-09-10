<script setup>
import { useShoppingListStore } from "@/stores/shoppingList";

const shoppingList = useShoppingListStore();
</script>

<template>
  <header class="bg-emerald-700 shadow-md">
    <div class="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
      <h1 class="text-2xl font-bold text-gray-50">Liste de courses</h1>

      <nav>
        <ul class="flex gap-6 font-medium">
          <li>
            <router-link
              to="/"
              class="text-gray-50 hover:text-gray-300 transition-colors"
            >
              Accueil
            </router-link>
          </li>
          <li class="relative">
            <router-link
              to="/list"
              class="text-gray-50 hover:text-gray-300 transition-colors"
            >
              Ma liste
            </router-link>
            <span
              v-if="shoppingList.totalCount > 0"
              class="absolute -top-2 -right-3 bg-gray-200 text-emerald-900 text-xs font-bold rounded-full px-2 py-0.5 shadow"
            >
              {{ shoppingList.totalCount }}
            </span>
          </li>

          <li>
            <router-link
              to="/contact"
              class="text-gray-50 hover:text-gray-300 transition-colors"
            >
              Contact
            </router-link>
          </li>
          <li>
            <router-link
              to="/auth"
              class="text-gray-50 hover:text-gray-300 transition-colors"
            >
              Connexion
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
