<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <li>
    <div>
      <img :src="item.image_front_url" :alt="item.generic_name_fr" />
      <p>{{ item.generic_name_fr }}</p>
      <button>+</button>
    </div>
  </li>
</template>
