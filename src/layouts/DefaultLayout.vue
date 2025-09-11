<script setup>
import Header from "../components/AppHeader.vue";
import Footer from "../components/AppFooter.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
