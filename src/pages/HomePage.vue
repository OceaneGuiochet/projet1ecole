<script setup>
import { ref, onMounted } from "vue"
import ShoppingItem from "@/components/ShoppingItem.vue"

const products = ref([])
const page = ref(1) 
const pageSize = 40

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
  <div >
    <h1 >Produits</h1>

  
    <ul >
      <ShoppingItem
        v-for="product in products"
        :key="product.code"
        :item="product"
      />
    </ul>

    <div >
      <button
        @click="prevPage"
        :disabled="page === 1"
        
      >
        Précédent
      </button>
      <span>Page {{ page }}</span>
      <button
        @click="nextPage"
       
      >
        Suivant
      </button>
    </div>
  </div>
</template>
