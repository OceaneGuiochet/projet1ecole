<script setup>
import { defineProps } from "vue"
import { useShoppingListStore } from "@/stores/shoppingList"

const shoppingList = useShoppingListStore()

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

function addToList() {
  shoppingList.addItem(props.item)
}
</script>

<template>
  <li
    class="bg-white rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center justify-between p-4 border"
  >
    <img
      :src="item.image_front_url"
      :alt="item.generic_name_fr"
      class="w-32 h-32 object-contain rounded-md mb-3"
    />

    <p class="text-gray-800 text-sm font-medium text-center line-clamp-2 h-10">
      {{ item.generic_name_fr }}
    </p>

    <button
      @click="addToList"
      class="mt-3 w-8 h-8 flex items-center justify-center bg-emerald-600 text-white rounded-full text-lg font-bold hover:bg-emerald-700 active:scale-95 transition"
    >
      +
    </button>
  </li>
</template>
