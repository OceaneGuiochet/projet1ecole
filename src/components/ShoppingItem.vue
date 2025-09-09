<script setup>
import { ref, onMounted } from "vue";

const photos = ref([]);
const loading = ref(false);
const error = ref(null);

async function loadPhotos(query = "ferrari") {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) throw new Error("Erreur lors du chargement des photos");

    const data = await response.json();
    photos.value = data.results;
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

// charger les photos au montage
onMounted(() => {
  loadPhotos();
});
</script>

<template>
  <div>
    <h2>Galerie de photos</h2>

    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur : {{ error }}</div>
    <div v-else>
      <div v-for="photo in photos" :key="photo.id">
        <img :src="photo.urls.small" :alt="photo.alt_description" />
      </div>
    </div>
  </div>
</template>
