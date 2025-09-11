<template>
  <footer class="bg-emerald-700 mt-12">
    <div class="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-gray-50">
      <p class="text-sm">
        © 2025 Ma Liste de Courses — Tous droits réservés
      </p>

      <nav class="flex gap-4 mt-3 sm:mt-0 text-sm">
        <router-link to="/" class="hover:text-gray-300 transition-colors">Accueil</router-link>
        <router-link to="/contact" class="hover:text-gray-300 transition-colors">Contact</router-link>
        <a
          href="https://github.com/OceaneGuiochet/projet1ecole"
          target="_blank"
          rel="noopener"
          class="hover:text-gray-300 transition-colors"
        >
          GitHub
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup>

</script>
