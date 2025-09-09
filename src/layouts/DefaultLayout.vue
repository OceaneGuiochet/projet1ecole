<script setup>
import Header from '../components/AppHeader.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>
