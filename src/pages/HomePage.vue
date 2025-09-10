<script setup>
import { ref, onMounted } from "vue"
import ShoppingItem from "@/components/ShoppingItem.vue"

const products = ref([])
const page = ref(1) 
const pageSize = 100 

async function fetchProducts() {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/search?fields=code,generic_name_fr,image_front_url&page_size=${pageSize}&page=${page.value}`
    )
    const data = await response.json()
    products.value = data.products.filter(
      p => p.image_front_url && p.generic_name_fr
    )
  } catch (err) {
    console.error("Erreur API:", err)
  }
}

function nextPage() {
  page.value++
  fetchProducts()
}

function prevPage() {
  if (page.value > 1) {
    page.value--
    fetchProducts()
  }
}

onMounted(fetchProducts)
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-emerald-800 mb-8 text-center">
      Produits
    </h1>

    <ul class="grid grid-cols-5 gap-6">
      <ShoppingItem
        v-for="product in products"
        :key="product.code"
        :item="product"
      />
    </ul>

    <div class="flex items-center justify-center gap-4 mt-8">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
      >
         Précédent
      </button>

      <span class="text-emerald-800 font-semibold">Page {{ page }}</span>

      <button
        @click="nextPage"
        class="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
      >
        Suivant 
      </button>
    </div>
  </div>
</template>
